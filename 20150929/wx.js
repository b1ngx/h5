var app = {
  initialize: function(){

    this.section = document.querySelectorAll('section');

    this.options = {
      timestamp: Date.now(),
      url: location.href.split("#")[0],
      nonceStr: Math.random().toString(36).substr(2),
      title: '杨昆长这么大主要是靠...',
      desc: "漫漫人森路哇，能长大是一件不容易的事情，这么多年你都依靠着什么慢慢长成一个大人的，快来测测吧！",
      link: "http://wx.hr72.com/20150929/index.html",
      imgUrl: "http://wx.hr72.com/20150929/ico.jpg"
    };

    this.getSignature();

    this.load();
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

  },
  test: function(){
    var name =  document.querySelector('#name').value;

    if(!name.replace(/(^\s*)|(\s*$)/g, "")) {
      alert('请输入您的姓名');
      return;
    }

    location.href = 'http://www.linkin.net/wx?name='+name;
    //this.result(name);
  },
  load: function(){
    var section = this.section;
    var name = this.getQueryString('name');
    name &&  (name = decodeURIComponent(name));
    if(!name || !name.replace(/(^\s*)|(\s*$)/g, "")){
      section[0].style.display = "block";
      section[1].style.display = "none";
      return;
    }
    this.result(name);
  },
  result: function(name){
    var section = this.section;

    var hash = md5(name);
    var lastChar = hash .slice(hash.length-1);
    var n = parseInt(lastChar, 16).toString(10) - 0 + 1;

    document.querySelector('#kao').innerText = name;
    document.querySelector('#result').src = 'http://cdn.bbyxy.com/quiz/1/img/zhangda/'+ n +'.jpg';

    section[0].style.display = "none";
    section[1].style.display = "block";

    this.options.title = name + '长这么大主要是靠...';
    this.options.link = "http://wx.hr72.com/20150929/index.html?name=" + name;
    this.shareOnReady();
  },
  getQueryString:function (name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    return r ? r[2] : null;
  },
  toShare: function(){
    document.querySelector('#share').style.display = "block";
  }
};

app.initialize();