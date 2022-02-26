
init();


function init(){
  initAmbul;
}

var arr = [
  {src: 'image/1.jpg'},
  {src: 'image/2.jpg'},
  {src: 'image/3.jpg'},
  {src: 'image/4.jpg'},
  {src: 'image/5.jpg'},
  {src: 'image/6.jpg'},
  {src: 'image/6.jpg'},
  {src: 'image/6.jpg'},
]

var initAmbul = (function(){

  var oImg = document.getElementsByTagName('img')[0],
      oUl = document.getElementsByClassName('j-photo-list')[0],
      len = arr.length,
      oItem;

  for(var i = 0; i < len; i++){
    oItem = arr[i];
    oUl.innerHTML += itemTpl(oItem.src);

  }

  //事件代理添加事件
  addEvent(oUl, 'click', function(e){
    var e = e || window.event;
    var tar = e.target || e.srcElement;
    var nodes = elemNode(oUl);

    tar.className += ' cur'
    oImg.src = tar.src

    nodes.forEach(item => {
      if(elemNode(item)[0] !== tar){
        elemNode(item)[0].className = "item-img"
      }
      
    })

  });

})();


function itemTpl(src){
  return (
    `<li class="item" >
      <img class="item-img" src=${src} />
    </li>`
  )
}


