/**
 * 节流函数 返回函数连续调用时
 * @param method {function}  请求关联函数，实际应用需要调用的函数
 * @param duration  {number} 延迟时间，单位毫秒
 */
function _throttle(method, duration){
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
 * 短信验证码定时器
 * @param obj 发送按钮
 * @param html 设置文字
 * @param interval 间隔时间
 * @param cls 移除元素设置的class
 */
function smsTimer(obj, html, interval, cls) {
   obj.html(html + '(' + interval + ')');
   interval--;
   var time = setInterval(function () {
      if (interval == 0) {
         obj.attr('style', '').removeClass(cls).text(html);
         clearInterval(time);
      } else {
         obj.text(html + '(' + (interval--) + ')');
      }
   }, 1000);
}

