function addEvent (el, type, fn){
  if(el.addEventListener){
      el.addEventListener(type, fn, false);
  }else if(el.attachEvent){
      el.attachEvent('on' + type, function(){
          fn.call(el);
      });
  }else {
      el['on' + type] = fn;
  }
}

function getElementNode(el){
   
    var obj = {
        'length': 0,
        'push': Array.prototype.push,
        'splice': Array.prototype.splice
    };
    var nodes = el.childNodes,
        len = nodes.length;
    
    for (let i = 0; i < len; i++) {
        const element = nodes[i];
        if(element.nodeType === 1){
            obj.push(element);
        }
    }
  
    return obj;
  
  }