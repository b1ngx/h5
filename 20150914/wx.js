var app = {};

(function(){
  var param = {
    timestamp: Date.now(),
    url: location.href.split("#")[0],
    nonceStr: Math.random().toString(36).substr(2)
  };

  var config = {
    title: '我的风骚指数是100%，快来测测你的是多少？',
    desc: "快来测一测，超准哦",
    link: "http://wx.hr72.com/20150914/index.html",
    imgUrl: "http://wx.hr72.com/20150914/logo.jpg"
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

      /*wx.ready(function() {
        shareOnReady();
      });*/
  }

  function isWeixin() {
    var a = navigator.userAgent.toLowerCase();
    return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
  }

  function ajax(type, url, data, fn){
    var xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data ? data : null);
    xhr.onreadystatechange = function(){
      if (xhr.readyState == 4) {
        var result, error = false;
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          result = xhr.responseText;
          fn(result);
        } else {
          alert(xhr.statusText || 'ajax error');
        }
      }
    }
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

  /*$.get("http://mp.linkin.net/Account/GetSignature", param, function(res){
    init(res);
  });*/

  var url = "http://mp.linkin.net/Account/GetSignature?timestamp=" + param.timestamp + '&url=' + encodeURIComponent(param.url) + '&nonceStr=' + param.nonceStr;

  ajax('GET', url, null, function(res){
    init(res);
  });


  var section = document.querySelectorAll('section');


  app.start = function(){
    section[0].style.display = 'none';
    section[1].style.display = 'block';
  };
  app.result = function(char){
    switch (char){
      case 'a':
        config.title = "我的风骚指数是90%，快来测测你的是多少？";
        break;
      case 'b':
        config.title = "我的风骚指数是20%，快来测测你的是多少？";
        break;
      case 'c':
        config.title = "我的风骚指数是40%，快来测测你的是多少？";
        break;
      case 'd':
        config.title = "我的风骚指数是70%，快来测测你的是多少？";
        break;
      default :
        config.title = "我的风骚指数是100%，快来测测你的是多少？";
        break;
    }

    section[1].style.display = 'none';
    section[2].style.display = 'block';
    section[3].querySelector('.' + char).style.display = 'block';

    wx.ready(function() {
      shareOnReady();
    });
  };
  app.share = function(){
    section[2].style.display = 'none';
    section[3].style.display = 'block';
  }
})();