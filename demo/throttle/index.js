function throttle (fn, time){
    var t = null,
        bTime = new Date().getTime();

    var throttle = function(){
        var _this = this,
            args = arguments,
            eTime = new Date().getTime();

        clearTimeout(t);

        if(eTime - bTime > time){
           fn.call(_this, args);
           bTime = eTime;
        }else {
          t = setTimeout(() => {
            fn.call(_this, args);
          }, time)
        }

    }

    return throttle;
}