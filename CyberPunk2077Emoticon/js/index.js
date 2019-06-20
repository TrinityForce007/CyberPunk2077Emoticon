let basicParameters = {
    contentWidth: 0, //屏幕可用区域宽度
    contentHeight: 0, //屏幕可用区域高度
};
basicParameters.contentHeight = $(document.body).height() - $("#header").height() - $("#footer").height();
basicParameters.contentWidth = $(document.body).width();

$(function () {
    $("#content").css({
        height: basicParameters.contentHeight
    });
    $("#btn-upload").css("display", "block");
});

$(window).resize(function () {
    basicParameters.contentHeight = $(document.body).height() - $("#header").height() - $("#footer").height();
    $("#content").css({
        height: basicParameters.contentHeight
    });
    mainImgAutoSize(basicParameters.contentWidth, basicParameters.contentHeight);
});

//打开文件选择窗口
function file_dialog_open() {
    $("#uploadFileHidden").trigger("click");
    $("#uploadFileHidden").off("click");

}

//上传图片
function imageUpload() {
    const imgFile = document.getElementById("uploadFileHidden").files[0];
    const imgFilePath = $("#uploadFileHidden").val();
    //图片大小验证 不能大于10M
    const imgFileSize = (imgFile.size / 1024) / 1024;
    if (imgFileSize.toFixed(2) > 10) {
        alert("上传的图片不可以大于10M");
        return;
    }
    $("#btn-upload").css("display", "none");
    $("#progressBar").css("display", "block");
    const formData = new FormData();
    formData.append("imgFile", imgFile);
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("post", "./Handler1.ashx", true);
    //进度条
    xmlHttp.upload.onprogress = function (ev) {
        if (ev.lengthComputable) {
            let percent = parseInt(ev.loaded / ev.total * 100).toString() + "%";
            $("#imgUploadProcessBar").css("width", percent).empty().html(percent);
        }
    };
    //预览
    let reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onload = function (e) {
        const newUrl = this.result;
        $("#img-main").attr("src", newUrl);
        mainImgAutoSize(basicParameters.contentWidth, basicParameters.contentHeight);
    };
    //回调
    xmlHttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            $("#upload").css("display", "none");
            $("#buttonGroup").css("display","block");
            let object = JSON.parse(this.responseText);
        } else {

        }
    };
    //发送
    xmlHttp.send(formData);
}

//背景图片处理 等比例缩放 适应屏幕大小
function mainImgAutoSize(maxWidth, maxHeight) {
    let img = $("#img-main");
    let image = new Image();
    image.src = img.attr("src");
    image.onload = function () {
        if (image.width < maxWidth && image.height < maxHeight) {
            img.attr({
                "width": image.width,
                "height": image.height
            });
        } else if (maxWidth / maxHeight <= image.width / image.height) {
            img.attr({
                "width": maxWidth,
                "height": maxWidth * (image.height / image.width)
            })
        } else if (maxWidth / maxHeight >= image.width / image.height) {
            img.attr({
                "width": maxHeight * (image.width / image.height),
                "height": maxHeight
            });
        }
    };
}


