const ONPENDING = 'pending',
  ONREJCTED = 'rejected',
  ONFULFILLED = 'fulfilled';

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError('错误-循环引用');
  }
  let called = false;

  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      let then = x.then;

      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) return;
          called = true;
          reject(r);
        })
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }


}

function isPromise(x) {
  if ((typeof x === 'object' && typeof x !== null) || typeof x === 'function') {
    let then = x.then;

    return typeof then === 'function';
  }

  return false;
}

function isIterable(value) {
  return value !== null && value !== undefined && typeof value[Symbol.iterator] === 'function';
}

class MyPromise {
  constructor(executor) {
    this.state = ONPENDING;

    this.value = undefined;
    this.reason = undefined;

    this.fulfilledCallBack = [];
    this.rejectedCallBack = [];

    const resolve = (val) => {
      if (val instanceof MyPromise) {
        val.then(resolve, reject);
        return;
      }

      if (this.state === ONPENDING) {
        this.state = ONFULFILLED;
        this.value = val;
        this.fulfilledCallBack.forEach(fn => fn());
      }
    }

    const reject = (reason) => {
      if (this.state === ONPENDING) {
        this.state = ONREJCTED;
        this.reason = reason;
        this.rejectedCallBack.forEach(fn => fn());
      }

    }

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }

  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promsie2 = new MyPromise((resolve, reject) => {
      if (this.state === ONFULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);

      }

      if (this.state === ONREJCTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promsie2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.state === ONPENDING) {
        this.fulfilledCallBack.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.rejectedCallBack.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promsie2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    })

    return promsie2;
  }

  catch(errorCallback) {
    return this.then(null, errorCallback);
  }



  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    })
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    })
  }

  finally(finallyCallback) {
    return this.then(res => {
      return MyPromise.resolve(finallyCallback()).then(() => res);
    }, reason => {
      console.log(reason)
      return MyPromise.resolve(finallyCallback()).then(() => { throw reason })
    })
  }

  static all(arr) {
    let resultArr = [],
      i = 0;

    function formatData(value, index, resolve) {
      resultArr[index] = value;

      if (++i === arr.length) {
        resolve(resultArr);
      }
    }

    return new MyPromise((resolve, reject) => {
      arr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(res => {
            formatData(res, index, resolve);
          }, reject)
        } else {
          formatData(res, index, resolve);
        }
      })
    })
  }

  static allSettled(promsieArr) {
    if (isPromise(promsieArr)) {
      throw new TypeError(`${promsieArr} is not iterable`)
    }

    let resArr = [],
      index = 0;

    function formatData(state, result, i, resolve) {
      console.log(i)
      switch (state) {
        case 'fulfilled':
          resArr[i] = {
            state,
            value: result
          }
          break;
        case 'rejected':
          resArr[i] = {
            state,
            reason: result
          }
          break;
        default:
          break;
      }

      if (++index === promsieArr.length) {
        resolve(resArr);
      }
    }

    return new MyPromise((resolve, reject) => {
      if (promsieArr.length === 0) {
        resolve([]);
      }

      promsieArr.forEach((promise, index) => {
        if (isPromise(promise)) {
          promise.then(res => {
            formatData('fulfilled', res, index, resolve);
          }, reason => {
            formatData('rejected', reason, index, resolve);
          })
        } else {
          formatData('fulfilled', promise, index, resolve);
        }
      })


    })

  }



}


MyPromise.defer = MyPromise.deferred = function () {
  let defer = {};

  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  })

  return defer;
}

// module.exports = MyPromise
