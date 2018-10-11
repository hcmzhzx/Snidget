var checkForm = function (config) {
   this.defaultRule = {
      "*": /^[\w\W]+$/,
      "*6-16": /^[\w\W]{6,16}$/,
      "n": /^\d+$/,
      "m": /^1[3456789]\d{9}$/,
      "e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      "qq": /^\d[1-9][0-9]{4,14}/,
      "cname": /^[\u4e00-\u9fa5]{2,4}$/,
      "idcard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      "card": /^\d{13,21}$/,
      "pwd": /^[^\s]{6,16}$/,
      "domain": /^[^\s]{3,6}$/,
      "code": /^\d{6}/,
      "sfz": /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
   };

   this.form = config.form || '#forms';
   this.btn = config.btn || '.submit';
   this.error = config.error || null;
   this.complete = config.complete || null;

   function selector(selector,obj){
      return obj ? obj.querySelectorAll(selector) : document.querySelector(selector);
   };

   var _this = this, _btn = selector(_this.btn), _form = selector(_this.form);
   if(!_btn || !_form) return this;

   _btn.addEventListener('click',function (){
      var _formEle = selector('input,select,textarea',_form), posts = {}, data = {};
      for (var i = 0; i < _formEle.length; i++) {
         var ele = _formEle[i], value = ele.value, name = ele.getAttribute('name'), rule = ele.getAttribute('data-rule'), sync = ele.getAttribute('data-sync');
         // 是否开启验证
         if (sync) {
            // 判断是否属于下拉框
            if (inputs[i].localName == 'select') {
               var errmsg = ele.getAttribute('data-errmsg');
               if (value == '0' || value != '') {
                  return error(errmsg)
               } else {
                  posts[name] = value
               }
            } else {
               var ruleReg = _this.defaultRule[rule], errmsg = ele.getAttribute('data-errmsg');
               if (!ruleReg.test(value)) {
                  ele.focus();
                  return error(errmsg)
               } else {
                  posts[name] = value
               }
            }
         } else {
            posts[name] = value
         }
      }
      // 过滤掉没有 name 的值
      for (let [key, val] of Object.entries(posts)) {
         if (key != 'null') {
            data[key] = val;
         }
      }
      _this.complete(data);
   })
}
