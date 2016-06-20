var app = {
  initialize: function(){

    this.section = document.querySelectorAll('section');

    this.options = {
      timestamp: Date.now(),
      url: location.href.split("#")[0],
      nonceStr: Math.random().toString(36).substr(2),
      title: '象棋摆局解密。【看完没有几个不转的】',
      desc: "象棋中红“帅”是男孩，黑“将”是女孩，这棋是红的先走，其实会下棋的人都能看明白",
      link: "http://wx.hr72.com/20150928/index.html",
      imgUrl: "http://wx.hr72.com/20150928/t.jpg"
    };

    this.getSignature();
  },
  isWeixin: function(){
    var a = navigator.userAgent.toLowerCase();
    return t = -1 != a.indexOf("micromessenger");
    /*return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1*/
  },
  ajax: function(type, url, data, fn){
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
  },
  getSignature: function(){
    var me = this, param = me.options;
    var url = "http://mp.linkin.net/Account/GetSignature?timestamp=" + param.timestamp + '&url=' + encodeURIComponent(param.url) + '&nonceStr=' + param.nonceStr;

    this.ajax('GET', url, null, function(signature){
      me.wxConfig(signature);
    });
  },
  wxConfig: function(signature){
    var me = this, param = this.options;
    wx.config({
      debug: 0,
      appId: 'wx76545552ca4bc8af',
      timestamp: param.timestamp,
      nonceStr: param.nonceStr,
      signature: signature,
      jsApiList: ["checkJsApi", "onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"]
    });
    wx.ready(function() {
      me.shareOnReady();
    });
  },
  shareOnReady: function () {
    var me = this, config = me.options;
    wx.onMenuShareTimeline({
      title: config.title, // 分享标题
      link: config.link, // 分享链接
      imgUrl: config.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
        me.share();
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
        me.share();
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
        me.share();
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
        me.share();
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    });
  },
  share: function(){
    /*var section = this.section;
    section[0].style.display = 'none';
    section[1].style.display = 'block';*/
    location.href="http://mp.weixin.qq.com/s?__biz=MzIwMjAwMDgzNg==&mid=211724379&idx=1&sn=35bdc96dd6804d5b677ffe0f0258ffdd#rd";
  }
};

app.initialize();