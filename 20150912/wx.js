(function(){
  var param = {
    timestamp: Date.now(),
    url: location.href.split("#")[0],
    nonceStr: Math.random().toString(36).substr(2)
  };

  var config = {
    title: "测测你有多幼稚？",
    desc: "被好朋友拉去回忆童年 - 拍大头贴，说好一起装幼稚",
    link: "http://wx.hr72.com/20150912/index.html",
    imgUrl: "http://wx.hr72.com/20150912/logo.jpg"
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
        share();
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
        share();
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
        share();
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
        share();
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
})();