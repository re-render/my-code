// iconv
// icon - lite
// var x = new Uint8Array();
// var y = new Uint16Array();
// var z = new Uint32Array();
// console.log(x, y, z)

const buf = Buffer.from('中文字符串');
console.log(buf.length)
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

for (let i = 0; i < buf.length; i += 5) {
  const b = Buffer.alloc(5);
  buf.copy(b, 0, i);
  // console.log(b.toString());
  console.log(decoder.write(b))
}