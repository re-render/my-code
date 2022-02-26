module.exports.a = 4;
const m1 = require('./module1');
console.log('m2', m1.a);
module.exports.a = 2;