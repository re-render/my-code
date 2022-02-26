/**
 *  1.call传入基本值会变成包装类对象
 *  2.call函数接收参数从第二个参数开始，第一个是函数的this指向
 *  3.删除执行上下文中的函数
 */


Function.prototype.myCall = function(ctx){
    var args = [],
        ctx = ctx ? Object(ctx) : window, // call函数会将ctx如果不是对象转换为对象
        len = arguments.length,
        res;

        ctx.fn = this;

        for(var i = 1; i < len; i++){
          args.push('arguments[' + i + ']');
        }

       res = eval('ctx.fn(' + args + ')');
       delete ctx.fn;

       return res;
}