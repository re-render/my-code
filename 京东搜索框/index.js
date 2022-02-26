

;(function(){
   
   var t = null;

   function JDInput(opt) {
       this.el= opt.el;
       this.time = opt.time || 2000;
   }

   JDInput.prototype = {

      init: function(){
        this.initDom();
      },

      initDom: function(){
        var wrap = document.querySelector(this.el),
            cinput = document.createElement('input'),
            cspan = document.createElement('span');

        wrap.appendChild(cspan);
        wrap.appendChild(cinput);

        this.initEvent(cinput, cspan);
        this.spaInterval(cspan);
        
       
      },

      initEvent: function(inp, spa){

        var _this = this;

        addEvent(inp, 'focus', inputFocus);
        addEvent(inp, 'input', inputInput);
        addEvent(inp, 'blur', inputBlur);

        function inputFocus(e){
            var e = e || window.event;
            spa.style.color = 'rgb(200, 200, 200)'
   
        }

        function inputInput(e){
          var e = e || window.event;
          if(this.value.length > 0){
            spa.textContent = '';
            clearTimeout(t);
          }else{
            _this.spaInterval(spa);
          }

        }

        function inputBlur(e){
          var e = e || window.event;
          spa.style.color = '#333'

        }   
      },

      spaInterval: function(spa){
         var i = 0,
             data = ['特价手机', '超级笔记本', 'macbook'];
         
         spa.textContent = data[i];

         t = setInterval(() => {
            spa.textContent = data[i++]

            if(i > 2){
              i = 0;
            }
         }, this.time);

      }

      
   }

   window.JDInput = JDInput;

})();