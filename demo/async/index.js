var p1 = function (value){
  return new Promise((resolve,reject) => {
    setTimeout(resolve(value), 1000)
  })
}

var p2 = function (value){
  return new Promise((resolve,reject) => {
    setTimeout(resolve(++ value), 1000)
  })
}

var p3 = function (value){
  return new Promise((resolve,reject) => {
    setTimeout(resolve(++ value), 1000)
  })
}




function *g (){
    let value1 = yield p1(1);
    let value2 = yield p2(value1);
    let value3 = yield p3(value2);
    return value3
}

let iter = g();

// let {value, done} = iter.next();
// value.then(res => {
//     let {value, done} = iter.next(res);
//     value.then(res1 => {
//        let {value, done} = iter.next(res1);
//        value.then(res2 => {
//           console.log(res2)
//        })
//     })
// })


//async + await = generator + Co + promisefy
function Co(iter){
   return new Promise((resolve, reject) => {
      let nextExecutor = function(val){
          let { value, done } = iter.next(val);
          if(!done){
            value.then(nextExecutor, reject);
          }else{
            resolve(val);
          }
      }
      
      nextExecutor();
   })
}

let p = Co(iter);
p.then(res => console.log(res))