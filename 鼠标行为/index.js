window.onload = function(){
   init()
}

var init = function(){
   initDom();
}

var initDom = (function(){
   var leftWrap = document.getElementsByClassName('box')[0],
       boxItem = leftWrap.getElementsByClassName('box-item'),
       rightWrap = document.getElementsByClassName('right-list')[0],
       items = rightWrap.getElementsByClassName('item'),
       wrapper = document.getElementsByClassName('wrapper')[0];
       t = null,
       isFirst = true,
       collect = [],
       TL = {},
       BL = {};
      

   initSide();
   addEvent(leftWrap, 'mouseover', mouseOverEvent);
   addEvent(wrapper, 'mouseleave', mouseLeaveEvent);
   addEvent(leftWrap, 'mousemove', mouseMoveEvent);
   
    
   function initSide(){
      TL = {
        x: getStyle(wrapper, 'left') + getStyle(leftWrap, 'width'),
        y: getStyle(wrapper, 'top')
      }

      BL = {
        x: getStyle(wrapper, 'left') + getStyle(leftWrap, 'width'),
        y: getStyle(wrapper, 'top') + getStyle(leftWrap, 'height')
      }

   }


   function mouseOverEvent(e){
      var e = e || window.event,
         tar = e.target || e.srcElement,
         index = Array.prototype.indexOf.call(boxItem, tar);
      
      if(isFirst){
        hoverEvent(tar);
        displayRight(index);
        isFirst = false;
      }else{
        t = setTimeout(() => {
          hoverEvent(tar);
          displayRight(index);
        }, 30);
      }
      
      
   }

   function mouseLeaveEvent(e){
      var e = e || window.event;
      clearTimer();
      hiddenRight();
      reBackLeft();
      isFirst = true;
   }

   function mouseMoveEvent(e){
      var e = e || window.event;
      collect.push({
        X: pagePos(e).X,
        Y: pagePos(e).Y
      })

      if(collect.length >= 3){
        collect.shift();
      }
   }

  //  function 

   function hoverEvent(target){
      reBackLeft();
      target.className += ' active';
   }

   function displayRight(index){
      hiddenRight();
      items[index].style.display = 'block';
   }

   function hiddenRight(){
    for(var i = 0; i< items.length; i++){
      items[i].style.display = 'none';
    }
   }

   function reBackLeft(){
    for(var i = 0; i< boxItem.length; i++){
      boxItem[i].className = 'box-item';
    }
   }

   function clearTimer(){
    clearTimeout(t);
    t = null;
   }
  





})