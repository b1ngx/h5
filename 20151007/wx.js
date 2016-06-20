var app = {
  initialize: function(){

    this.section = document.querySelectorAll('section');

    this.options = {
      timestamp: Date.now(),
      url: location.href.split("#")[0],
      nonceStr: Math.random().toString(36).substr(2),
      title: '测一测，你是传说中的优质女婿吗？',
      desc: "中国好女婿独门秘笈，教你如何搞定丈母娘！乖女婿们，我只能帮你到这了！",
      link: "http://wx.hr72.com/20151007/index.html",
      imgUrl: "http://wx.hr72.com/20151007/ico.jpg"
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
  start: function(){
    var section = this.section;
    section[0].style.display = 'none';
    section[1].style.display = 'block';
    this.render();
  },
  share: function(){

  },
  toShare: function(){
    document.querySelector('#share').style.display = "block";
  },
  render: function(i){
    i = i || this.index;
    var qa = QA[i];
    qa.IND = this.index + 1;
    var temp = document.querySelector('#tpl').innerHTML;
    document.querySelector(('#st')).innerHTML = this.tpl(temp, qa)
  },
  result: function(e){
    this.total = this.total || 0;
    this.total += parseInt(e.querySelector('input').value);
    this.next();
  },
  index: 0,
  next: function(){
    var index = ++this.index,
        section = this.section,
        result = 'a',
        map = {
          a:{
            h:'极差',
            p:'想追我女儿！做梦吧你就'
          },
          b:{
            h:'很差',
            p:'棒打鸳鸯'
          },
          c:{
            h:'及格',
            p:'可接受，需要考察'
          },
          d:{
            h:'良好',
            p:'没什么不能接受的，也就别犹豫嫁了吧'
          },
          e:{
            h:'优秀',
            p:'马上嫁'
          },
          f:{
            h:'完美',
            p:'放开那个男人，让我来'
          }
        };

    if(QA.length <= index){
      if(this.total >110){
        result = 'f';
      }else if(this.total >90){
        result = 'e';
      }else if(this.total >70){
        result = 'd';
      }else if(this.total >60){
        result = 'c';
      }else if(this.total >0){
        result = 'b';
      }else if(this.total ==0){
        result = 'a';
      }
      var temp = document.querySelector('#rtpl').innerHTML;
      document.querySelector('#result').innerHTML = this.tpl(temp, map[result]);
      section[1].style.display = 'none';
      section[2].style.display = 'block';

      this.options.title = ['我是',map[result].h,'女婿，你是传说中的优质女婿吗？'].join('');
      this.shareOnReady();
    }else{
      this.render(index);
    }
  }
};

!function ($) {
  var _private = {};
  _private.cache = {};
  $.tpl = function (str, data, env) {
    // 判断str参数，如str为script标签的id，则取该标签的innerHTML，再递归调用自身
    // 如str为HTML文本，则分析文本并构造渲染函数
    var fn = !/[^\w\-\.:]/.test(str)
        ? _private.cache[str] = _private.cache[str] || this.get(document.getElementById(str).innerHTML)
        : function (data, env) {
      var i, variable = [], value = []; // variable数组存放变量名，对应data结构的成员变量；value数组存放各变量的值
      for (i in data) {
        variable.push(i);
        value.push(data[i]);
      }
      return (new Function(variable, fn.code))
          .apply(env || data, value); // 此处的new Function是由下面fn.code产生的渲染函数；执行后即返回渲染结果HTML
    };

    fn.code = fn.code || "var $parts=[]; $parts.push('"
        + str
            .replace(/\\/g, '\\\\') // 处理模板中的\转义
            .replace(/[\r\t\n]/g, " ") // 去掉换行符和tab符，将模板合并为一行
            .split("<%").join("\t") // 将模板左标签<%替换为tab，起到分割作用
            .replace(/(^|%>)[^\t]*/g, function(str) { return str.replace(/'/g, "\\'"); }) // 将模板中文本部分的单引号替换为\'
            .replace(/\t=(.*?)%>/g, "',$1,'") // 将模板中<%= %>的直接数据引用（无逻辑代码）与两侧的文本用'和,隔开，同时去掉了左标签产生的tab符
            .split("\t").join("');") // 将tab符（上面替换左标签产生）替换为'); 由于上一步已经把<%=产生的tab符去掉，因此这里实际替换的只有逻辑代码的左标签
            .split("%>").join("$parts.push('") // 把剩下的右标签%>（逻辑代码的）替换为"$parts.push('"
        + "'); return $parts.join('');"; // 最后得到的就是一段JS代码，保留模板中的逻辑，并依次把模板中的常量和变量压入$parts数组

    return data ? fn(data, env) : fn; // 如果传入了数据，则直接返回渲染结果HTML文本，否则返回一个渲染函数
  };
}(app);

app.initialize();