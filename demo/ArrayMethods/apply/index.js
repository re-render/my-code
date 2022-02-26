/**
 * 1.apply传入基本值会变成包装类对象 -> 对象包裹
 * 2.apply只能传两个参数，并且第二个参数为数组 -> 排除非数组， 数字和字符串报错，函数和对象忽略
 */

Function.prototype.myApply = function (ctx, args) {
  var ctx = ctx ? Object(ctx) : window, // apply函数会将ctx如果不是对象转换为对象
    type = myTypeof(args),
    res;

  ctx.fn = this;

  if (type === 'number' || type === 'string') {
    throw new TypeError('CreateListFromArrayLike called on non-object');
  }

  if (type === 'function' || type === 'Object') {
    res = eval('ctx.fn()');
    delete ctx.fn;
    return res;
  }

  res = eval('ctx.fn( ' + args + ')');
  delete ctx.fn;
  return res;
}




function myTypeof(value) {

  return typeof value === 'object' ? {
    '[object Object]': 'Object',
    '[object Array]': 'Array',
    '[object Boolean]': 'Boolean',
    '[object String]': 'String',
    '[object Number]': 'Number'
  }[({}).toString.call(value)] : typeof value;

}