;(function() {
   
    var MyDot = function (opt) {

       this.wrapper = opt.wrapper;
       this.picList = opt.picList;
      
       this.dotlen = this.picList.length;

       this.fragement = document.createDocumentFragment();
       this.dotWrapper = document.createElement('div');
       this.image = document.createElement('img');
        
    }

    MyDot.prototype = {

      init: function(){
         this.initDom();
         this.addDotEvent();
      },

      initDom: function() {
          
          var nodes;
          
          this.wrapper.className = 'wrapper';
          this.dotWrapper.className = 'dot-wrapper';
          
          for (let i = 0; i < this.dotlen; i++) {
            var  oI = document.createElement('i');
            oI.className = 'dot-item';
            this.fragement.appendChild(oI);
          }

          this.dotWrapper.appendChild(this.fragement);
          nodes =  getElementNode(this.dotWrapper);
          nodes[0].className += ' active';

          this.wrapper.appendChild(this.dotWrapper);
          this.image.src = this.picList[0].src;
          this.wrapper.appendChild(this.image);
      },

      addDotEvent: function() {
          
          var _this = this;

          addEvent(this.dotWrapper, 'click', function(e){

            var e = e || window.event,
                tar = e.target || e.srcElement,
                nodes =  getElementNode(this),
                len = nodes.length,
                index = Array.prototype.indexOf.call(nodes, tar),
                item;
            
            for (let i = 0; i < len; i++) {
                item = nodes[i];
                
                if(item === tar) {
                  tar.className += ' active';
                }else{
                  item.className = 'dot-item';
                }
            }
           
            _this.image.src = _this.picList[index].src;

          })
      }

    }


    window.MyDot = MyDot;

}())

