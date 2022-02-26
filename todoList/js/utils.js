//获取元素的子元素节点
function childElemNodes(node){
   
    var nodes = node.childNodes,
        len = nodes.length,
        item,
        obj = {
            'length': 0,
            'push' : Array.prototype.push,
            'splice': Array.prototype.splice
        }

    for(var i = 0; i < len; i++){        
      item = nodes[i];
      if(item.nodeType === 1){
        obj.push(item);
      }
    }

    return obj

}

//阻止事件冒泡
function cancelBubble(e){

   if(e.stopPropgation){
      e.stopPropgation();
   }else{
      e.cancelBubble = true;
   }

}

//添加事件，兼容性写法，兼容IE和低版本
function addEvent(el, type, fn){
    
  if(el.addEventListener){
    el.addEventListener(type , fn , false);
  }else if(el.attachEvent){
    el.attachEvent('on' + type , fn);
  }else{
    el['on' + type] = fn;
  }
  
}


//寻找元素的第n层父级元素节点
function elemParent(node, n){
  
  var type = typeof(n);

  if(type === undefined){
    return node.parentNode;
  }else if(n < 0 || type !== 'number'){
    return undefined;
  }

  while(n){
    node = node.parentNode;
    n--;
  }
  
  return node

}

