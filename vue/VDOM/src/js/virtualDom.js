import ObjElement from './virtualElement'

function createElement(el, props, children){
   return new ObjElement(el, props, children)
}

function setAttrs(node, key, value){
   switch (key) {
      case 'value' :
          if(node.tagName === 'INPUT' || node.tagName === 'TEXTAREA'){
            node.value = value;
          }else {
            node.setAttribute(key, value);
          }
          break;
      case 'class' :
          node.style.cssText = value;
          break;
      default:
          node.setAttribute(key, value);
        break;
   }
}

function render (vDom){
   const { el, props, children } = vDom,
          node = document.createElement(el);

   for(const key in props){
     setAttrs(node, key, props[key]);
   }
   children.forEach((c) => {
      c = c instanceof ObjElement ? render(c) 
                                  : document.createTextNode(c);
      node.appendChild(c);
   })

   return node;
}

function initDom(rDom, MountDom){
  document.querySelector(MountDom).appendChild(rDom);
}


export {
  createElement,
  render,
  setAttrs,
  initDom
}