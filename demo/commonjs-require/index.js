

//  var a = 1;
//console.log(window.a);

// 顶层对象;
//  console.log(setInterval);

//  const obj = require('./a'); // 形参;
//  //  const path = require('path');
//  console.log(obj);

//  console.log(this === module.exports);
//  console.log(this === exports);
//  console.log(module.exports === exports);
//  console.log(arguments[0] === module.exports)
//  console.log(arguments[1] === require);
//  console.log(arguments[2] === module);
//  console.log(arguments[3] === __filename);
//  console.log(arguments[4] === __dirname);
const path = require('path');
const fs = require('fs');
const vm = require('vm');

function Module(filename) {
    this.id = filename;
    this.exports = {};

}

Module.extensions = {
    '.js'(module) {
        let script = fs.readFileSync(module.id, 'utf8');
        // let fn = eval(Module.wrapper[0] + script + Module.wrapper[1]);
        let fn = vm.runInThisContext(Module.wrapper[0] + script + Module.wrapper[1])
        //let fn = new Function('exports', 'require', 'module', '__filename', '__dirname', script);
        //  exports, require, module, __filename, __dirname
        fn.call(module.exports, module.exports, myRequire, module, module.id, path.dirname(module.id));
    },
    '.json'(module) {
        let json = fs.readFileSync(module.id, 'utf8');
        module.exports = JSON.parse(json);
    }
}

Module.prototype.load = function () {
    let ext = path.extname(this.id);

    Module.extensions[ext](this)
}

Module.wrapper = [
    ";(function(exports, require, module, __filename, __dirname){", "});"
]

Module.resolveFilename = function (filename) {
    let absPath = path.resolve(__dirname, filename);
    // c:\Users\asus\Desktop\common\a
    let current = absPath;
    let flag = fs.existsSync(absPath);

    if (!flag) {
        current = Object.keys(Module.extensions)
            .map(key => current + key)
            .filter(current => fs.existsSync(current))
            .join();
        if (!current) {
            throw new Error('文件不存在');
        }
    }
    return current;
}

Module._cache = {}


// 1. 相对路径 => 绝对路径;
function myRequire(filename) {
    let current = Module.resolveFilename(filename);
    if (Module._cache[current]) {
        return Module._cache[current].exports;
    }

    let module = new Module(current);
    Module._cache[current] = module;
    module.load();

    return module.exports;
}

let res = myRequire('./a');
myRequire('./a');
console.log(res);
 //  console.log(process.cwd());
 //  console.log(path.resolve());

 //