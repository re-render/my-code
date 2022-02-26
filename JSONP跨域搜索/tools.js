

  function deepClone(target, origin){
  
      var origin = origin || {},
          arrType = '[object Array]',
          toStr = Object.prototype.toString,
          item;

      for (const key in target) {
        if (Object.hasOwnProperty.call(target, key)) {
            item = target[key];
            if(typeof(item) === 'object' && item !== null){
              if(toStr.call(item) !== arrType){
              origin[key] = {};
              }else{
              origin[key] = [];
              }
              deepClone(target[key], origin[key]);
            }else{
              origin[key] = item
            }
        }
      }
    
    return origin;
  }
 
  //forEach改变原有的素组
  Array.prototype.myForEach = function (cb) {
      
      var _arr = this,
          _thisArg = arguments[1] || window,
          item;

      for(var i = 0 ; i < _arr.length; i++){
          cb.apply(_thisArg, [_arr[i], i, _arr]);
      }
  }

  //filter返回一个新的数组
  Array.prototype.myFilter = function(cb) {

      var _arr = this,
          _thisArg = arguments[1] || window,
          newArr = [],
          item;
      
      for(var i = 0; i< _arr.length; i++){
        item = deepClone(_arr[i]);
        cb.call(_thisArg, _arr[i], i, _arr) ? newArr.push(item) : ''
      }
      
      return newArr;

  }

  //map返回一个新的数组
  Array.prototype.myMap = function (cb){
      
    var _arr = this,
          _thisArg = arguments[1] || window,
          newArr = [],
          item;
      
      for(var i = 0; i< _arr.length; i++){
        item = deepClone(_arr[i]);
        newArr.push(cb.call(_thisArg, item, i, _arr))
      }
      
      return newArr;
  }

  //reduce
  Array.prototype.myReduce = function (cb, initValue){
     
       var prev = initValue,
           _arr = this;
       
       for(var i = 0; i< _arr.length; i++){
         prev = cb(prev, _arr[i], i, _arr);
       }

       return prev;

  }

  //myReduceRight
  Array.prototype.myReduceRight = function (cb, initValue){
      
       var prev = initValue,
           _arr = this;
      
      for(var i = _arr.length - 1; i >= 0; i--){
        prev = cb(prev, _arr[i], i, _arr);
      }
      
      return prev;
  }
  
