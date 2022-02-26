class EventEmitter {
  constructor() {
    this.collector = {};
  }

  on(cbname, callback, once) {
    if (!this.collector[cbname]) {
      this.collector[cbname] = [];
    }

    if (!this.collector[cbname].includes(callback)) {
      this.collector[cbname].push(callback);
      callback.once = once;
    }
  }

  once(cbname, callback) {
    this.on(cbname, callback, true);
  }

  off(cbname, callback) {
    if (this.collector[cbname]) {
      this.collector[cbname] = this.collector[cbname].filter(fn => {
        return fn !== callback;
      });
    }
  }


  emit(cbname, context, ...args) {
    if (this.collector[cbname]) {
      this.collector[cbname].forEach(fn => {
        fn.apply(context, args);
        if (fn.once) {
          this.off(cbname, fn);
        }
      });
    }
  }
}



var emitter = new EventEmitter();

emitter.on('test', function (data, val) {
  console.log(data);
})

emitter.once('test', function (data, val) {
  console.log(data, 'once');
})


setInterval(() => {
  emitter.emit('test', { a: 1 }, 'this is data', 5665);
}, 1000)