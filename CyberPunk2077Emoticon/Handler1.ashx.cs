using System;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Web;

namespace CyberPunk2077Emoticon
{
    /// <summary>
    /// Handler1 的摘要说明
    /// </summary>
    public class Handler1 : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            string str1 = DateTime.Now.ToString("yyyyMMddHHmmssff");
            string s;
            if (context.Request.Files.Count > 0)
            {
                HttpFileCollection files = context.Request.Files;
                string str2 = files[0].FileName.Substring(files[0].FileName.LastIndexOf(".") + 1, files[0].FileName.Length - files[0].FileName.LastIndexOf(".") - 1);
                string str3 = "CyberPunk2077_" + str1 + "." + str2;
                string path = context.Server.MapPath("./") + "upload";
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                string filename = path + "\\" + str3;
                string str4 = "./upload/" + str3;
                files[0].SaveAs(filename);
                s = new JObject()
        {
          {
            "msg",
            (JToken) "文件上传成功！"
          },
          {
            "imgServerPath",
            (JToken) str4
          }
        }.ToString();
            }
            else
                s = "{msg:'" + "文件上传失败！" + "'}";
            context.Response.Write(s);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}