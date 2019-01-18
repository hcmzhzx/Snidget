/**
 * 节流函数 (固定时间周期执行  )
 * @param method   {function}  请求关联函数，实际应用需要调用的函数
 * @param duration {number} 延迟时间，单位毫秒
 */
function _throttle(method, duration) {
   let begin = new Date();
   return function () {
      let current = new Date();
      if (current - begin >= duration) {
         method.apply(this, arguments);
         begin = current;
      }
   }
}
/**
 * 去抖函数 (n秒内调用不执行,n秒后才会执行)
 * @param method {function}  请求关联函数，实际应用需要调用的函数
 * @param delay  {number} 延迟时间，单位毫秒
 */
function _debounce(method, delay){
   return function () {
      clearTimeout(method.id);
      method.id = setTimeout(() => {
         method.call(this, arguments);
      }, delay);
   }
}
/**
 * 截取字符串
 * @param str string 要截取的字符串
 * @param size number 截取位数
 * @param blen Boolean 是否转化为数字
 */
function Substring(str, size, blen) {
   size = size || 2; blen = blen || false;
   if (blen) {
      return Number(str.substring(0, str.length - size));
   }
   return str.substring(0, str.length - size);
}
/**
 * 获取元素的属性
 * @param dom 节点名
 * @param attr string 属性名
 */
function getStyle(dom, attr) {
   return window.getComputedStyle(document.querySelector(dom))[attr];
}
/**
 * 温馨提示自动隐藏
 * @param text 提示文字
 * @param time 删除时间
 * @param dom  插入节点名
 */
function Toast(text, time, dom) {
   dom = dom || 'body'; time = time || 2000;
   if (document.querySelector('#toast')) document.body.removeChild(document.querySelector('#toast'));
   const box = `<div id="toast" style="position:fixed;top:50%;left:50%;display:flex;justify-content:center;align-items:center;padding:.6rem 2rem;height:4rem;background:rgba(0,0,0,.7);border-radius:.6rem;font-size:1.5em;color:#fff;visibility:hidden;z-index:999">${text}</div>`;
   $(dom).append(box);
   let W = Substring(getStyle('#toast', 'width'), 2, true) / 2, H = Substring(getStyle('#toast', 'height'), 2, true) / 2;
   $('#toast').css({'margin': `-${H}px 0 0 -${W}px`, 'animation': 'fadeInUp .2s linear both', 'visibility': 'visible'})
   setTimeout(() => {
      $('#toast').css({'animation': 'fadeOutUp .2s linear both'});
      setTimeout(() => {
         $('#toast').remove();
      }, 500);
   }, time);
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
 * 删除加载动画
 */
function hideProgress() {
   var object = document.getElementById('loading');
   if (object) document.body.removeChild(object);
}
/**
 * 提示框
 * @param msg 描述
 * @param state 状态
 * @param timeout 隐藏时间
 * @param dom 要插入到的元素
 */
function showMsg(msg, state, timeout, dom) {
   state = state || 0; timeout = timeout || 1000; dom = dom || 'body';
   var icon = '', bgColor = '', pos = dom == 'body' ? 'fixed' : 'absolute';
   if (state == 0) {
      bgColor = 'background:rgba(255,0,0,0.6)';
      icon = '<span style="position:absolute;top:16px;left:6px;right:6px;height:2px;background:#fff;transform:rotate(45deg);"></span><span style="position:absolute;top:16px;left:6px;right:6px;height:2px;background:#fff;transform:rotate(-45deg);"></span>';
   } else {
      bgColor = 'background:rgba(0,0,0,0.6)';
      icon = '<span style="position:absolute;top:18px;left:10px;width:24px;height:2px;background:#fff;transform:rotate(-45deg);"></span><span style="position:absolute;top:22px;left:2px;width:14px;height:2px;background:#fff;transform:rotate(45deg);"></span>';
   }
   var template = `<div id="msgBox" style="display:none;position:${pos};top:50%;left:50%;min-width:120px;padding:10px;${bgColor};border-radius:4px;transform:translate(-50%,-50%);z-index:999;">
       <div class="icon" style="position:relative;width:36px;height:36px;border-radius:50%;border:2px solid #fff;margin:0 auto;">${icon}</div>
       <div class="msg" style="padding:8px 0;text-align:center;font-size:1.4em;color:#fff;">${msg}</div>
       </div>`;
   $(template).appendTo($(dom));

   //setTimeout(function () {
      $('#msgBox').fadeIn()
      //let ih = Substring(getStyle('#msgBox', 'height'), 2 ,true) / 2, iw = Substring(getStyle('#msgBox', 'width'), 2, true) / 2;
      //setTimeout(function () {$('#msgBox').css({'margin':`-${ih}px 0 0 -${iw}px`})},50)
   //}, 100);
   setTimeout(function () {
      $('#msgBox').remove();
   }, timeout + 100);
}
/**
 * 短信验证码定时器
 * @param obj 发送按钮
 * @param html 设置文字
 * @param cls 移除元素设置的class
 * @param interval 间隔时间
 */
function smsTimer(obj, html, cls, interval) {
   interval = interval || sessionStorage.getItem('Tcode');
   if(!interval || interval <= 1){
      sessionStorage.removeItem('Tcode');
      return false
   } else {
      obj.addClass(cls);
      obj.html(`${html}(${interval}s)`);
      interval--;
      let time = setInterval(()=>{
         if (interval <= 0) {
            obj.removeClass(cls).text(html);
            clearInterval(time);
            sessionStorage.removeItem('Tcode');
         } else {
            obj.text(`${html}(${interval--}s)`);
            sessionStorage.setItem('Tcode', interval);
         }
      }, 1000)
   }
}
/**
 * 复制到剪切板  (暂时不要用,不行)
 * @param cls 要复制的元素class
 * @param text string 提示文字
 */
function copyPlate(cls, text) {
   if (document.querySelector('#copyPlate')) document.body.removeChild(document.querySelector('#copyPlate'));
   var otext = document.createElement('textarea');
   otext.setAttribute('id', 'copyPlate');
   otext.setAttribute('readonly', '');
   otext.style = `font-size:12pt;border:0px;padding:0px;margin:0px;position:absolute;left:-9999px;top:0px;-webkit-user-select:text;`;
   otext.value = document.querySelector(cls).getAttribute('data-copy');
   document.body.appendChild(otext);
   otext.focus();
   otext.setSelectionRange(0, otext.value.length);
   otext.select(); // 选中当前对象
   document.createRange().selectNode(otext);
   window.getSelection().addRange(document.createRange())
   document.execCommand("Copy"); // 将当前选中区复制到剪贴板。
   Toast(text);
}
