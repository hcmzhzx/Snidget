/**
 * 节流函数 返回函数连续调用时
 * @param method {function}  请求关联函数，实际应用需要调用的函数
 * @param duration  {number} 延迟时间，单位毫秒
 */
function _throttle(method, duration) {
   var begin = new Date();
   return function () {
      var current = new Date();
      if (current - begin >= duration) {
         method.apply(this, arguments);
         begin = current;
      }
   }
}
/**
 * 加载动画
 * @param str string 提示文字
 */
function showProgress(str) {
   var template = document.createElement('div');
   var loadingText = str ? `<div class="text">${str}</div>` : '';
   var str = `<div class="container"><div class="loader"></div>${loadingText}</div>`;
   template.id = 'loading';
   template.innerHTML = str;
   document.body.appendChild(template);
}
/**
 * 提示框
 * @param msg 描述
 * @param state 状态
 * @param dom 要插入到的元素
 * @param timeout 隐藏时间
 */
function showMsg(msg, state, dom, timeout) {
   var state = state || 0, timeout = timeout || 1000, dom = dom || 'body';
   var icon = '', bgColor = '', pos = dom == 'body' ? 'fixed' : 'absolute';
   if (state == 0) {
      bgColor = 'background:rgba(255,0,0,0.6)';
      icon = '<span style="position:absolute;top:16px;left:6px;right:6px;height:2px;background:#fff;transform:rotate(45deg);"></span><span style="position:absolute;top:16px;left:6px;right:6px;height:2px;background:#fff;transform:rotate(-45deg);"></span>';
   } else {
      bgColor = 'background:rgba(0,0,0,0.6)';
      icon = '<span style="position:absolute;top:18px;left:10px;width:24px;height:2px;background:#fff;transform:rotate(-45deg);"></span><span style="position:absolute;top:22px;left:2px;width:14px;height:2px;background:#fff;transform:rotate(45deg);"></span>';
   }
   var template = `<div id="msgBox" style="position:${pos};top:50%;left:50%;width:160px;padding:10px;margin-left:-90px;${bgColor};border-radius:4px;transform:scale(0);transition:transform 0.2s linear;z-index:999;">
       <div class="icon" style="position:relative;width:36px;height:36px;border-radius:50%;border:2px solid #fff;margin:0 auto;">${icon}</div>
       <div class="msg" style="padding:8px 0;text-align:center;color:#fff;">${msg}</div>
       </div>`;
   $(template).appendTo($(dom));
   setTimeout(function () {
      var ih = ($('#msgBox').height() + 20) / 2;
      $('#msgBox').css({'margin-top': -ih, 'transform': 'scale(1)'});
   }, 100);
   setTimeout(function () {
      $('#msgBox').remove();
   }, timeout + 100);
}

/**
 * 短信验证码定时器
 * @param obj 发送按钮
 * @param html 设置文字
 * @param interval 间隔时间
 * @param cls 移除元素设置的class
 */
function smsTimer(obj, html, interval, cls) {
   obj.addClass(cls);
   obj.html(html + '(' + interval + 's)');
   interval--;
   var time = setInterval(function () {
      if (interval == 0) {
         obj.attr('style', '').removeClass(cls).text(html);
         clearInterval(time);
      } else {
         obj.text(html + '(' + (interval--) + 's)');
      }
   }, 1000);
}

