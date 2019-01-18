// 高清处理
function pixelRatio (ctx) {
   var dpr = window.devicePixelRatio || 1,
      bsr = ctx.webkitBackingStorePixelRatio ||
         ctx.mozBackingStorePixelRatio ||
         ctx.msBackingStorePixelRatio ||
         ctx.oBackingStorePixelRatio ||
         ctx.backingStorePixelRatio || 1;
   return dpr / bsr;
};

/**
 * 图像处理
 * @param url  图片地址
 * @param callback  回调函数
 * @param wo  图片的位置及宽高
 */
function preImage(url, callback, wo) {
   var img = new Image(); //创建一个Image对象，实现图片的预下载
   img.src = url;
   if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
      callback.call(img, wo.x, wo.y, wo.width, wo.height);
      return; // 直接返回，不用再处理onload事件
   }
   img.onload = function () {  //图片下载完毕时异步调用callback函数。
      callback.call(img, wo.x, wo.y, wo.width, wo.height);  //将回调函数的this替换为Image对象
   }
}

/**
 * 控制文字
 * @param ctx canvas对象
 * @param t 需要生成的文字
 * @param x 坐标位置
 * @param y 坐标位置
 * @param w 文本展示宽度
 * @param z 文本字体大小
 * @param c 文本字体颜色
 * @param a 文本对齐方式
 */
function drawText(ctx, t, x, y, w, z, c, a='start') {
   ctx.save();
   let chr = t.split(""), temp = "", row = [];
   ctx.font = z + "px Arial";
   ctx.fillStyle = c;
   ctx.textBaseline = "middle";
   ctx.textAlign = a;
   chr.forEach(item => {
      if (ctx.measureText(temp).width > w) {
         row.push(temp);
         temp = "";
      }
      temp += item;
   })
   row.push(temp);
   row.forEach((item, index) => {
      ctx.fillText(item, x, y + (index + 1) * 20);
   })
   ctx.restore();
}

/**
 * 生成图片的缩略图
 * @param  {[type]} img    图片(img)对象或地址
 * @param  {[type]} width  缩略图宽
 * @param  {[type]} height 缩略图高
 * @return {[type]}        return base64 png图片字符串
 */
function thumb_image(img, width, height) {
   if (typeof img !== 'object') {
      var tem = new Image();
      tem.src = img;
      img = tem;
   }
   var _canv = document.createElement('canvas');
   _canv.width = width;
   _canv.height = height;
   _canv.getContext("2d").drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
   return _canv.toDataURL();
}

/**
 * 把图片处理成圆形,如果不是正方形就按最小边一半为半径处理
 * @param  {[type]} img 图片(img)对象或地址
 * @return {[type]}     return base64 png图片字符串
 */
function yuan_image(img) {
   if (typeof img !== 'object') {
      var tem = new Image();
      tem.src = img;
      img = tem;
   }
   var w, h, _canv, _contex, cli;
   if (img.width > img.height) {
      w = img.height;
      h = img.height;
   } else {
      w = img.width;
      h = img.width;
   }
   _canv = document.createElement('canvas');
   _canv.width = w;
   _canv.height = h;
   _contex = _canv.getContext("2d");
   cli = {
      x: w / 2,
      y: h / 2,
      r: w / 2
   };
   _contex.clearRect(0, 0, w, h);
   _contex.save();
   _contex.beginPath();
   _contex.arc(cli.x, cli.y, cli.r, 0, Math.PI * 2, false);
   _contex.clip();
   _contex.drawImage(img, 0, 0);
   _contex.restore();
   return _canv.toDataURL();
}
/**
 * 绘制虚线圆环
 * @param x 中心点x坐标
 * @param y 中心点y坐标
 * @param Ls 虚线长度
 * @param Lx 虚线间隔
 * @param Lw 虚线宽度
 * @param r 圆环半径
 * @param c 圆环颜色
 */
function dashed(x,y,Ls,Lx,Lw,r,c) {
   ctx.save();
   ctx.translate(x,y)   // 改变旋转中心点
   ctx.setLineDash([Ls,Lx]);  // 第一位是虚线长度,第二位是间隔长度(重复)
   ctx.lineWidth = Lw;       // 虚线宽度
   ctx.strokeStyle = c; // 虚线颜色
   //ctx.rotate(-Math.PI / 2);// 旋转角度
   ctx.beginPath();         // 开始绘制
   ctx.arc(0, 0, r, 0, Math.PI * 2, false)
   ctx.stroke();
   ctx.restore();
}