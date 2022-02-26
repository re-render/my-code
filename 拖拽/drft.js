Element.prototype.myDrft = (function (eleClick, menu) {

  var wWdith = getViewportSize().width,
    wHeight = getViewportSize().height,
    elWidth = getStyle(this, 'width'),
    elHeight = getStyle(this, 'height'),
    menu = menu,
    mWidth = menu && getStyle(menu, 'width'),
    mHeight = menu && getStyle(menu, 'height'),
    bTime = 0,
    eTime = 0,
    count = 0,
    t = null;

  addDrag(this);


  addEvent(window, 'resize', function () {
    wWdith = getViewportSize().width;
    wHeight = getViewportSize().height;
  })

  function addDrag(el) {

    var x,
      y;



    addEvent(el, 'mousedown', mouseDown);
    addEvent(document, 'contextmenu', contentMenu);
    addEvent(document, 'click', function () {
      menu.style.display = 'none';
    });

    addEvent(menu, 'click', function (e) {
      var e = e || window.event;
      cancelBubble(e);
    })

    function mouseDown(e) {
      var e = e || window.event;

      if (e.button === 0) {

        menu.style.display = 'none';
        x = pagePos(e).X - getStyle(el, 'left');
        y = pagePos(e).Y - getStyle(el, 'top');

        addEvent(document, 'mousemove', mouseMove);
        addEvent(document, 'mouseup', mouseUp);

        cancelBubble(e);
        preventDefaultEvent(e);
      }

      if (e.button === 2) {
        var mLeft = pagePos(e).X,
          mTop = pagePos(e).Y;

        if (mLeft <= 0) {
          mLeft = 0
        } else if (mLeft >= wWdith - elWidth) {
          mLeft = mLeft - mWidth;
        }

        if (mTop <= 0) {
          mTop = 0
        } else if (mTop >= wHeight - elHeight) {
          mTop = mTop - mHeight;
        }

        menu.style.left = mLeft + 'px';
        menu.style.top = mTop + 'px';
        menu.style.display = 'block';

      }
    }

    function contentMenu(e) {
      var e = e || window.event;
      preventDefaultEvent(e)
    }

    function mouseMove(e) {

      var e = e || window.event,
        elLeft = pagePos(e).X - x,
        elTop = pagePos(e).Y - y;

      if (elLeft <= 0) {
        elLeft = 0;
      } else if (elLeft >= wWdith - elWidth) {
        elLeft = wWdith - elWidth - 1;
      }

      if (elTop <= 0) {
        elTop = 0;
      } else if (elTop >= wHeight - elHeight) {
        elTop = wHeight - elHeight - 1;
      }

      el.style.left = elLeft + 'px';
      el.style.top = elTop + 'px';

    }

    function mouseUp() {

      count++
      if (count === 1) {

        bTime = new Date();
      }

      if (count === 2) {
        eTime = new Date();
      }

      if (bTime && eTime && eTime - bTime < 200) {
        eleClick();
        count = 0;
        bTime = 0;
        eTime = 0;
      }

      t = setTimeout(() => {
        count = 0;
        bTime = 0;
        eTime = 0;
        t = null;
      }, 300)


      removeEvent(document, 'mousemove', mouseMove);
      removeEvent(document, 'mouseup', mouseUp);
    }

  }

})