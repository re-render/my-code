module.exports.a = 3;
const m2 = require('./module2');
console.log('m1', m2.a);
module.exports.a = 1;

