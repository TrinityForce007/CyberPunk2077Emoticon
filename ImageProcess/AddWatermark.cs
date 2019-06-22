using System;
using System.Drawing;
using System.Drawing.Drawing2D;

namespace ImageProcess
{
    public class AddWatermark
    {
        /// <summary>
        /// 绘制图片
        /// </summary>
        /// <param name="imgMainPath">背景图片路径</param>
        /// <param name="imgIconPath">图标图片路径</param>
        /// <param name="imgExportPath">输出图片的路径</param>
        /// <param name="IconWidth">图标宽度占背景图片的百分比</param>
        /// <param name="left">图片left值占背景图片宽度的百分比</param>
        /// <param name="top">图片top值占背景图片高度的百分比</param>
        /// <returns></returns>
        public static bool DrawImage(string imgMainPath, string imgIconPath, string imgExportPath, float IconWidth, float left, float top)
        {
            bool result = true;
            //图片对象
            Image imgMainObj = Image.FromFile(imgMainPath);
            Image imgIconObj = Image.FromFile(imgIconPath);
            float imgMainWidth = imgMainObj.Width;
            float imgMainHeight = imgMainObj.Height;

            //GDI图片对象
            Bitmap imgMainBitMap = new Bitmap(imgMainObj);
            Bitmap imgIconBitMap = new Bitmap(imgIconObj);

            //画板对象
            Graphics imgMainGraphics = Graphics.FromImage(imgMainBitMap);
            Graphics imgIconGraphics = Graphics.FromImage(imgIconBitMap);

            try
            {
                //绘制底图到画板
                imgMainGraphics.SmoothingMode = SmoothingMode.AntiAlias;
                imgMainGraphics.DrawImage(imgMainBitMap, 0, 0);

                //绘制图标到画板
                imgIconGraphics.DrawImage(imgMainBitMap, imgMainWidth * IconWidth, imgMainHeight * IconWidth, imgMainWidth * left, imgMainHeight * top);

                //保存图片
                imgMainBitMap.Save(imgExportPath);
            } catch (Exception ex)
            {
                result = false;
            } finally
            {
                imgMainObj.Dispose();
                imgIconObj.Dispose();
                imgMainBitMap.Dispose();
                imgIconBitMap.Dispose();
                imgMainGraphics.Dispose();
                imgIconGraphics.Dispose();
            }
            return result;
        }
    }
}