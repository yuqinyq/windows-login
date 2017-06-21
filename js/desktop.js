/**
 * Created by PX on 2017/6/20.
 */
/**
 * 功能：桌面展示
 * 日期：2017/4/24
 **/

//Angular显示时间
var app = angular.module("myApp",[]);
app.controller("myCtrl",function ($scope,$interval) {
    $scope.myTime = dateTime().slice(11,16);
    $scope.myDate = dateTime().slice(0,10);
    $interval(function () {
        $scope.myTime =dateTime().slice(11,16);
        $scope.myDate = dateTime().slice(0,10);
    }, 1000);
})

$(function () {
    //禁用鼠标默认事件
    document.oncontextmenu = function() {
        return false;
    }
    // ajax请求桌面图标数据
    appData();
    //右键事件函数
    rightEvent();
})

//右键事件函数
function rightEvent() {
    $(".deskTopRight").mousedown(function(e) {
        $(".rightMenu").hide();
        if (e.which == 3) {
            if ((e.pageX + 200) < $(this).width() && (e.pageY + 318) < $(this).height()) {
                $(".rightMenu").css({"top": e.pageY + "px", "left": e.pageX + "px"}).fadeIn();
            } else if (e.pageY < 318) {
                $(".rightMenu").css({"top": e.pageY + "px", "left": (e.pageX - 200) + "px"}).fadeIn();
            } else if (e.pageX < 200) {
                $(".rightMenu").css({"top": (e.pageY - 318) + "px", "left": e.pageX + "px"}).fadeIn();
            } else {
                $(".rightMenu").css({"top": (e.pageY - 318) + "px", "left": (e.pageX - 200) + "px"}).fadeIn();
            }
        };
        //点击新建事件
        $(".newFile").off("mousedown").mousedown(function(e){
            e.stopPropagation();
        });
        //点击大图标
        $(".fileMax").off("mousedown").mousedown(function(e){
            e.stopPropagation();
            changeFile("70px","60px");
            $(".rightMenu").hide();
        });
        //点击中图标
        $(".fileCenter").off("mousedown").mousedown(function(e){
            e.stopPropagation();
            changeFile("60px","50px");
            $(".rightMenu").hide();
        });
        //点击小图标
        $(".fileMin").off("mousedown").mousedown(function(e){
            e.stopPropagation();
            changeFile("50px","40px");
            $(".rightMenu").hide();
        });
        //点击切换壁纸
        $(".bgBtn").off("mousedown").mousedown(function(e){
            e.stopPropagation();
            //添加上传文件界面
            $(".bgFile").click();
            $(".rightMenu").hide();
        });
        //更换图片存储图片名称
        $(".bgFile").off("change").change(function(e){
            e.stopPropagation();
            var fileUrl = $(this).val().slice($(this).val().lastIndexOf("\\")+1);
            //本地存储图片名称
            localStorage.setItem("bg",fileUrl);
            setBg();
        });
        //点击切换用户
        $(".changeUser").off("mousedown").mousedown(function(e){
            e.stopPropagation();
            window.location.href = "../index.html";
            $(".rightMenu").hide();
        });
        //点击关机
        $(".close").off("mousedown").mousedown(function(e){
            e.stopPropagation();
            window.location.href = "../html/close.html";
            $(".rightMenu").hide();
        });
    });
}

//获取本地背景图片的名字
function setBg() {
    var fileUrl = localStorage.getItem("bg");
    $("body").css("background-image","url(../img/bg/"+fileUrl+"");
}
//右键图标变化函数
function changeFile(a,b) {
    $(".deskTopIcon>a").css({
        "height":a,
        "width":a,
    })
    $(".deskTopIcon>a>img").css({
        "height":b,
        "width":b,
    })
}


// ajax请求桌面图标数据
function appData() {
    $.getJSON("../json/app.json",function (data) {
        //遍历数据
        $.each(data, function (idx, info) {
            $(".deskTopIcon").append(`
                <a href="${info.appUrl}"><img src="${info.appIcon}"></a>
            `)
        })
    });
}

//获取日期时间函数
function dateTime() {
    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    var myDate = new Date();
//获取当前年
    var year=myDate.getFullYear();
//获取当前月
    var month=myDate.getMonth()+1;
//获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();
    var now = year+'/'+p(month)+"/"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);
    return now;
}