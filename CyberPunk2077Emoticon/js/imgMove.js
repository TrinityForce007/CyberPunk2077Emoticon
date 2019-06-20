let basicParameters1 = {
    isXCenter: false, //屏幕可用区域宽度
    isYCenter: false, //屏幕可用区域高度
    left: 0,
    top: 0,
};
let imgFloatSize = 30;
let imgMain_x, imgMain_y, imgFloat_x, imgFloat_y, mouse_x, mouse_y, mouse_x_1, mouse_y_1;
let box = $("#img-warp");
let floatIcon = $("#img-floatIcon-warp");
//鼠标移动
floatIcon.on("mousedown", function (event) {
    imgMoveStart(event, false);
    box.on("mousemove", function (event) {
        imgMove(event, false);
    });
});
floatIcon.on("mouseup", function () {
    box.off("mousemove");
});
//手指移动
floatIcon.on("touchstart", function (event) {
    imgMoveStart(event, true);
    box.on("touchmove", function (event) {
        imgMove(event, true);
    });
});
floatIcon.on("mouseup", function () {
    box.off("mousemove");
});
floatIcon.on("touchend", function () {
    box.off("touchmove");
});

//开始移动
function imgMoveStart(event, isFinger) {
    // alert("move")
    event.preventDefault();
    //背景图片到屏幕边界的距离；
    imgMain_x = box.offset().left;
    imgMain_y = box.offset().top - $("#header")
        .height();
    //图标到屏幕边缘的距离;
    imgFloat_x = floatIcon.offset().left;
    imgFloat_y = floatIcon.offset().top - $("#header")
        .height();
    if (isFinger == false) {
        //鼠标到屏幕边缘的距离
        mouse_x = event.pageX;
        mouse_y = event.pageY - $("#header").height();
    } else {
        //获取手指位置的方法
        let touch = event.originalEvent.targetTouches[0];
        mouse_x = touch.pageX;
        mouse_y = touch.pageY - $("#header").height();
    }
    //鼠标到图标边缘的距离
    mouse_x_1 = mouse_x - imgFloat_x;
    mouse_y_1 = mouse_y - imgFloat_y;
    // alert(mouse_x,mouse_y)
}

//移动
function imgMove(event, isFinger) {
    event.preventDefault();
    let mouse_x_2;
    let mouse_y_2
    if (isFinger == false) {
        //鼠标到背景图片边缘的距离
        mouse_x_2 = event.pageX - imgMain_x;
        mouse_y_2 = event.pageY - $("#header").height() - imgMain_y;
    } else {
        //获取手指位置的方法
        let touch = event.originalEvent.targetTouches[0];
        mouse_x_2 = touch.pageX - imgMain_x;
        mouse_y_2 = touch.pageY - $("#header").height() - imgMain_y;
    }
    let left = mouse_x_2 - mouse_x_1;
    let top = mouse_y_2 - mouse_y_1;
    //边界值判断
    if (left <= 0) {
        left = 0;
    }
    if (top <= 0) {
        top = 0
    }
    if (left + floatIcon.outerWidth(true) >= box.outerWidth(true)) {
        left = box.outerWidth(true) - floatIcon.outerWidth(true);
    }
    if (top + floatIcon.outerHeight(true) >= box.outerHeight(true)) {
        top = box.outerHeight(true) - floatIcon.outerHeight(true);
    }
    basicParameters.left = left;
    basicParameters.top = top;
    if (!basicParameters1.isXCenter && !basicParameters1.isYCenter) {
        floatIcon.css({
            "top": top + "px",
            "left": left + "px"
        });
    } else if (basicParameters1.isXCenter && basicParameters1.isYCenter) {
    } else {
        if (basicParameters1.isXCenter) {
            floatIcon.css({
                "top": top + "px",
            });
        }
        if (basicParameters1.isYCenter) {
            floatIcon.css({
                "left": left + "px"
            });
        }
    }
}

//图片缩小
$("#btn-img-narrow").click(function () {
    if (imgFloatSize == 5){
        alert("不可以再缩小了");
        return;
    }
    imgFloatSize -= 5;
    $("#img-floatIcon-warp").css("width", imgFloatSize + "%");
})
//图片放大
$("#btn-img-enlarge").click(function () {
    if (imgFloatSize == 100){
        alert("不可以再放大");
        return;
    }
    imgFloatSize += 5;
    $("#img-floatIcon-warp").css("width", imgFloatSize + "%");
})
// 水平居中按钮
// 通过给css设置important来达到限制移动的效果
$("#btn-center-x")
    .click(function () {
        if (basicParameters1.isXCenter) {
            basicParameters1.isXCenter = false;
            $(this)
                .attr("class", "btn btn-default");
        } else {
            let left = (box.outerWidth(true) - floatIcon.outerWidth(true)) / 2;
            floatIcon.css("left", left + "px");
            basicParameters1.isXCenter = true;
            $(this)
                .attr("class", "btn btn-success");
        }
    });
// 垂直居中按钮
// 通过给css设置important来达到限制移动的效果
$("#ben-center-y")
    .on("click", function () {
        if (basicParameters1.isYCenter) {
            basicParameters1.isYCenter = false;
            $(this)
                .attr("class", "btn btn-default");
        } else {
            let top = (box.outerHeight(true) - floatIcon.outerHeight(true)) / 2;
            floatIcon.css("top", top + "px");
            basicParameters1.isYCenter = true;
            $(this)
                .attr("class", "btn btn-success");
        }
    });
$("#export")
    .click(function () {
        $.ajax({
            url: "",
            type: "post",
            dataType: "json",
            data: {
                "imgMainWidth": box.outerWidth(true),
                "floatIconWidth": floatIcon.outerWidth(true),
                "left": basicParameters1.left,
                "top": basicParameters1.top
            },
            success: function (data) {
            }, error: function () {
            }
        })
    });