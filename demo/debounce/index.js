function debounce (fn, delay, invokeNow){
     var t = null;

     var debounced = function (){
        var _this = this,
            args = arguments;

            if(t){
               clearTimeout(t);
            }

            if(invokeNow){
               var execute = !t;

               t = setTimeout(() => {
                  t = null;
               }, delay)

               if(execute){
                 fn.call(_this, args)
               }
            }else {
              t = setTimeout(() => {
                 fn.call(_this, args)
              }, delay)
            }
     }

     return debounced
}
