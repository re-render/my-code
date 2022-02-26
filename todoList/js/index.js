


var initTodoList = (function(){
 
   var addBtn = document.getElementsByClassName('j-show-input')[0],
       listInput = document.getElementsByClassName('list-input-box')[0],
       listBody = document.getElementsByClassName('list-body')[0],
       listBtn = document.getElementsByClassName('j-add-item')[0],
       oUl = document.getElementsByClassName('body-list')[0],
       input = listInput.getElementsByClassName('list-input')[0],
       isShow = false;


   addEvent(addBtn, 'click', function(){
      //展示输入框
      if(isShow){
        listInput.style.display = 'none';
        isShow = false;
        listBody.style.top = '50px';
      }else{
        listInput.style.display = 'block';
        isShow = true;
        listBody.style.top = '100px';
      }

   })

   addEvent(listBtn, 'click', function(){
      
      var items = oUl.getElementsByClassName('item-content'),
          item,
          exit = false,
          value = input.value;
    
      if(input.value || input.value === 0){
        //添加内容
        //验证是否有重复内容存在
        for(var i = 0; i < items.length; i++){
          item = items[i];
          if(item.innerText === value){
            exit = true;
            break;
          }
        }

        if(exit){

          alert('该项目已经存在')
          return;

        }else{

          oUl.innerHTML += itemTpl(value);
          input.value = '';
        }
        
      }else{
          //当没有输入内容时候默认返回，不执行操作
          return;
      }
   })


   addEvent(oUl, 'click', function(e){
      
      var e = e || window.event,
          target = e.target || e.srcElement,
          clickedItem = elemParent(target, 2),
          item = clickedItem.getElementsByTagName('p')[0],
          oList = childElemNodes(oUl);

      if(target.className === 'btn-edit fa fa-pencil-square-o'){
        listInput.style.display = 'block';
        isShow = true;
        listBody.style.top = '100px';
        input.value = item.innerText;

      }else if(target.className === 'btn-delete fa fa-times'){


         for (let i = 0; i < oList.length; i++) {
           const element = oList[i];
           if(clickedItem === element){
             element.remove();
           }
         }
      }
      

   })
  
}());


function itemTpl(text){
  return (
    `<li class="list-item">
       <p class="item-content">${text}</p>
       <div class="btn-box">
         <a href="javascript:;" class="btn-edit fa fa-pencil-square-o" ></a>
         <a href="javascript:;" class="btn-delete fa fa-times" ></a>
       </div>
    </li>`
  )
}

