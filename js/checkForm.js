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
      "code": /^\d{4}/,
      "sfz": /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/  // 出生日期(1800~2099)
   };

   this.form = config.form || '#forms';
   this.btn = config.btn || '.submit';
   this.list = config.list || null;
   this.error = config.error || null;
   this.complete = config.complete || null;

   function selector(selector, obj) {
      return obj ? obj.querySelectorAll(selector) : document.querySelector(selector);
   };

   let _this = this, _btn = selector(this.btn), _form = selector(this.form);
   if (!_btn || !_form) return this;

   _btn.addEventListener('click', function () {
      let posts = [], data = {}, _list = selector(_this.list, _form);
      for (let i = 0; i < _list.length; i++) {
         let item = selector('input,select,textarea', _list[i]);
         for (let j = 0; j < item.length; j++) {
            let val = item[j].value.trim(),
               name = item[j].getAttribute('name'),
               rule = item[j].getAttribute('data-rule'),
               ruleReg = _this.defaultRule[rule],
               errmsg = item[j].getAttribute('data-errmsg'),
               sync = item[j].getAttribute('data-sync');
            if (!ruleReg.test(val)) {
               item[j].focus();
               return _this.error(item[j], errmsg);
            } else if (posts.length && sync) {
               if (val == posts[j - 1][name]) {
                  item[j].focus();
                  return _this.error(item[j], sync);
               } else {
                  data[`${name}`] = val;
               }
            } else {
               data[`${name}`] = val;
            }
         }
         posts.push(data);
         data = {};
      }
      _this.complete(posts);
   })
}