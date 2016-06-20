(function(){
  var param = {
    timestamp: Date.now(),
    url: location.href.split("#")[0],
    nonceStr: Math.random().toString(36).substr(2)
  };

  if(isWeixin()){
    $.get("/Account/GetSignature", param, function(res){
      init(res);
    });
  }

  var config = {
    title: "你老公值多少钱？要不要扔掉！",
    desc: "任何东西都有自身的价值，衣服、饭菜、楼房……甚至是你身边那位也有哦~快来算算自己的老公或者准老公到底值多少钱吧~",
    link: "http://mp.linkin.net/s/150710/index.html",
    imgUrl: "http://mp.linkin.net/s/150710/logo.jpg"
  };

  function init(signature){
      wx.config({
        debug: 0,
        appId: 'wx76545552ca4bc8af',
        timestamp: param.timestamp,
        nonceStr: param.nonceStr,
        signature: signature,
        jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
      });

      wx.ready(function() {
        shareOnReady();
      });
  }

  function isWeixin() {
    var a = navigator.userAgent.toLowerCase();
    return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
  }

  function shareOnReady() {
    wx.onMenuShareTimeline({
      title: config.title, // 分享标题
      link: config.link, // 分享链接
      imgUrl: config.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        app.share();
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

    wx.onMenuShareAppMessage({
      title: config.title, // 分享标题
      desc: config.desc, // 分享描述
      link: config.link, // 分享链接
      imgUrl: config.imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        app.share();
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

    wx.onMenuShareQQ({
      title: config.title, // 分享标题
      desc: config.desc, // 分享描述
      link: config.link, // 分享链接
      imgUrl: config.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        app.share();
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });

    wx.onMenuShareWeibo({
      title: config.title, // 分享标题
      desc: config.desc, // 分享描述
      link: config.link, // 分享链接
      imgUrl: config.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        app.share();
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  }
})();