function elemNode(node){

   var nodes = node.childNodes,
       item, 
       arr = [];

   for(var i = 0; i < nodes.length; i++){
      item = nodes[i];

      if(item.nodeType === 1){
        arr.push(nodes[i])
      }
   }

   return arr

}


function getElemNode(node){
  
  var obj = {
    'length': 0,
    'splice': Array.prototype.splice,
    'push': Array.prototype.push
  }

  var nodes = node.childNodes,
      itemNode;

  for(let i = 0; i < nodes.length; i++){
     itemNode = nodes[i];
     if(item.nodeType === 1){
       nodes.push(itemNode)
     }
  }

  return obj

}

function addEvent(elem, type, fn){

  if(elem.addEventListener){
    elem.addEventListener(type, fn, false);
  }else if(elem.attachEvent){
    elem.attachEvent('on' + type , fn);
  }else{
    elem['on' + type] = fn;
  }
}