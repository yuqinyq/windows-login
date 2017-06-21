/**
 * Created by PX on 2017/6/20.
 */
/**
 * 功能：模拟window登录
 * 日期：2017/4/24
 **/

//登录界面实现跳转 angular.js
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {
    $scope.loginIpt = true;
    $scope.show = function() {
        $scope.loginIpt = false;
        //结束阴影扩散动画
        $(".headImg").css(
            {
                "WebkitAnimation":'webkitAnimationEnd',
                "animation": 'animationend'
            }
        )
    };
    $scope.enter = function () {
        //登录页面跳转提示函数
        enterPage();
    }
})

$(function() {
    //键盘回车登录界面跳转
    $($(".loginBox>input")).keydown(function (event) {
        if (event.keyCode == 13 ) {
            enterPage();
        }
    })
});

//登录页面跳转提示函数
function enterPage() {
    var iptVal = $(".loginBox>input").val();
    if(iptVal == ""){
        $(".loginBox>p").text("请输入密码!")
    } else if(iptVal === "123"){
        window.location.href = "html/desktop.html";
    }else {
        $(".loginBox>p").text("密码有误，请重新输入！")
    }
}