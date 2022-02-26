
/**
 *    1.返回一个函数
 *    2.函数是构造函数，还是普通函数修改this指向 -> 需要判断返回的函数this是什么
 *    3.需要一个圣杯模式对象进行继承
 */


Function.prototype.bindy = function (context) {
   var _this = this,
      args = Array.prototype.slice.call(arguments, 1);

   function Buffer() { }

   let fn = function () {
      var newArgs = Array.prototype.slice.call(arguments),
         news = args.concat(newArgs);

      _this.apply(this instanceof _this ? this : context, news);//判断作为普通函数还是构造函数？
   }

   Buffer.prototype = this.prototype;
   fn.prototype = new Buffer;

   return fn;
}