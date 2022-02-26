//获取所有子元素节点
function getElementNode(el) {

  var obj = {
    'length': 0,
    'push': Array.prototype.push,
    'splice': Array.prototype.splice
  };
  var nodes = el.childNodes,
    len = nodes.length;

  for (let i = 0; i < len; i++) {
    const element = nodes[i];
    if (element.nodeType === 1) {
      obj.push(element);
    }
  }

  return obj;

}

//获取节点的第n层父节点
function getParentNode(node, n) {

  var type = typeof (n);

  if (type === 'undefined') {
    return node.parentNode;
  } else if (n < 0 || type !== 'number') {
    return undefined
  }

  while (n) {
    node = node.parentNode;
    n--;
  }

  return node;
}

//添加事件，兼容低版本，IE9，IE8及以下
function addEvent(el, type, fn) {

  if (el.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (el.addEvent) {
    el.addEvent('on' + type, function () {
      fn.call(el)
    });
  } else {
    el['on' + type] = fn;
  }

}

//移出事件，兼容低版本
function removeEvent(el, type, fn) {

  if (el.removeEventListener) {
    el.removeEventListener(type, fn, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function () {
      fn.call(el);
    })
  } else {
    el['on' + type] = null;
  }

}

//阻止事件冒泡兼容IE
//e是事件对象
function cancelBubble(e) {

  var e = e || window.event;
  if (e.stopPropagation) {
    e.stopPropagation();
  } else {
    e.cancelBubble = true;
  }

}

//阻止默认事件
function preventDefaultEvent(e) {

  var e = e || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }

}


//封装滚动条
function getScrollOffset() {

  if (window.pageXOffset) {
    return {
      //常规IE9以上
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    return {
      //IE9或者IE8及以下，包含两对，互斥，一个为零，另一个为0
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }

}

//兼容性函数，查看当前窗口宽高
function getViewportSize() {
  //常规状态
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {//兼容IE9或者IE8及以下
    //浏览器怪异模式下
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {//标准模式下
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }

  }

}

//查看计算样式兼容ie8及以下,属性填写了后面没有单位
function getStyle(elem, prop) {

  if (window.getComputedStyle) {
    if (prop) {
      return parseInt(window.getComputedStyle(elem, null)[prop]);
    } else {
      return window.getComputedStyle(elem);
    }
  } else {
    if (prop) {
      return parseInt(elem.currentStyle[prop]);
    } else {
      return elem.currentStyle;
    }
  }
}

//获取元素的定位,一直找到body的边界
function getElemPosition(el) {

  var parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    left: offsetLeft,
    top: offsetTop
  }
}

//考虑到鼠标坐标pageX/Y兼容性重新封装函数
function pagePos(e) { //e事件对象
  var sLeft = getScrollOffset().left,
    sTop = getScrollOffset().top,
    //去除偏移，因为有的浏览器去掉了body的margin还是有可能会被计算在内
    cLeft = document.documentElement.clientLeft || 0,
    cTop = document.documentElement.clientTop || 0;

  return {
    X: e.clientX + sLeft - cLeft,
    Y: e.clientY + sTop - cTop
  }
}

//简单元素拖拽，mousedown、mousemove、mouseup
function addDrag(el) {

  var x,
    y;

  addEvent(el, 'mousedown', mouseDown);

  function mouseDown(e) {
    var e = e || window.event;
    x = pagePos(e).X - getStyle(el, 'left');
    y = pagePos(e).Y - getStyle(el, 'top');

    addEvent(document, 'mousemove', mouseMove);
    addEvent(document, 'mouseup', mouseUp);

    cancelBubble(e);
    preventDefaultEvent(e);
  }

  function mouseMove(e) {

    var e = e || window.event;
    el.style.left = pagePos(e).X - x + 'px';
    el.style.top = pagePos(e).Y - y + 'px';

  }

  function mouseUp() {
    removeEvent(document, 'mousemove', mouseMove);
    removeEvent(document, 'mouseup', mouseUp);
  }

}


//原型上封装一个遍历父元素的子元素节点
Element.prototype.elemChildrens = function (index) {

  var nodes = el.childNodes,
    len = nodes.length,
    obj = {
      'length': 0,
      'push': Array.prototype.push,
      'splice': Array.prototype.splice
    };

  for (let i = 0; i < len; i++) {
    const element = nodes[i];
    if (element.nodeType === 1) {
      obj.push(element);
    }
  }

  if (index !== undefined && typeof (index) !== 'number') {
    return undefined;
  }

  return index === undefined ? obj : obj[index];
}

//原型上封装一个找出一个元素的第N层父级元素
Element.prototype.elemParent = function (n) {

  var type = typeof (n);
  _this = this;

  if (type === 'undefined' || type !== 'number') {
    return _this.parentNode;
  } else if (n < 0) {
    return undefined;
  }

  while (n) {
    if (_this.nodeName === 'HTML') {
      return _this = null;
    }
    _this = _this.parentNode;
    n--;
  }

  return _this;
}

//原型上写hasChild寻找元素子节点是否存在
Element.prototype.hasChildren = function () {

  var childrens = this.childNodes,
    len = childrens.length,
    item;

  for (let i = 0; i < len; i++) {
    item = childrens[i]
    if (item.nodeType === 1) {
      return true;
    }
  }

  return false;
}

//原型上找兄弟元素方法，正数找之后，负数找之前， 0找自己
Element.prototype.elemSibliing = function (n) {

  var _this = this;

  while (n) {

    if (n > 0) {
      _this = _this.nextSibling;
      while (_this && _this.nodeType !== 1) {
        _this = _this.nextSibling;
      }
      n--;
    } else if (n < 0) {
      _this = _this.previousSibling;
      while (_this && _this.nodeType !== 1) {
        _this = _this.previousSibling;
      }
    }

  }

  return _this;
}
//防抖
function debounce(cb, time, triggerNow) {

  var t = null;

  var debounced = function () {

    var _this = this,
      args = arguments;

    if (t) {
      clearTimeout(t);//清除计时器
    }

    if (triggerNow) {
      var execute = !t;

      t = setTimeout(() => {
        t = null;
      }, time)

      if (execute) {
        cb.call(_this, args);
      }
    } else {
      t = setTimeout(() => {
        cb.call(_this, args);
      }, time)
    }

  }

  debounced.remove = function () {
    clearTimeout(t);
    t = null;
  }

  return debounced;

}

//函数节流：事件被触发，n秒内只执行一次事件处理函数
//输入验证
function throttle(fn, delay) {
  var t = null,
    begin = new Date().getTime();

  return function () {
    var _this = this,
      args = arguments,
      cur = new Date().getTime();

    clearTimeout(t);

    if (cur - begin >= delay) {
      fn.apply(_this, args);
      begin = cur;
    } else {
      t = setTimeout(() => {
        fn.apply(_this, args);
      }, delay);
    }
  }
}