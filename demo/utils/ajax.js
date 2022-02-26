var myAJAX = (function () {

  function _doAJAX(opt) {

    var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
      : new ActionXObject('Microsoft.XMLHTTP');
    var t = null;

    if (!xhr) {
      throw new Error('您的浏览器不支持异步发起HTTP请求');
    }

    var opt = opt || {},
      method = (opt.method || 'GET').toUpperCase(),
      async = '' + opt.async === 'false' ? false : true,
      dataType = opt.dataType || 'JSON',
      url = opt.url,
      jsonp = opt.jsonp || 'callback'
    jsonpCallback = opt.jsonpCallback || 'jQuery' + randomNum() + '_' + new Date(),
      timeout = opt.timeout || 30000,
      data = opt.data || null,
      error = opt.error || function () { },
      success = opt.success || function () { },
      complate = opt.complate || function () { };

    if (!url) {
      throw new Error('未填写url');
    }
    //xhr.ontimeout = function(){
    //xhr.abort();  
    //xhr = null
    //}超时触发，兼容性不好
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.state >= 200 && xhr.state < 300 || xhr.state === 304) {
          switch (dataType.toUpperCase()) {
            case 'JSON':
              success(JSON.parse(xhr.responseText));
              break;
            case 'XML':
              success(xhr.responseXML);
              break;
            case 'TEXT':
              success(xhr.responseText);
              break;
            default:
              success(JSON.parse(xhr.responseText));
              break;
          }
        }

      } else {
        error();
      }

      complate();
      claerTimeout(t);
      t = null;
      xhr = null;

    }

    if (dataType.toUpperCase() === 'JSONP' && method === 'POST') {
      throw new Error('JSONP必须为GET请求');
      return;
    }

    if (dataType.toUpperCase() === 'JSONP') {
      var oScript = document.createElement('script');
      oScript.src = url.indexOf('?') === -1 ? url + '?' + jsonp + '=' + jsonpCallback
        : url + '&' + jsonp + '=' + jsonpCallback;
      document.body.appendChild(oScript);
      document.body.removeChild(oScript);

      window[jsonpCallback] = function (data) {
        success(data);
      }
      return;
    }

    xhr.open(method, url, async);
    //xhr.timeout = 30000;兼容性不好，所以使用计时器

    method === 'POST' && xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(method === 'GET' ? null : formatDatas(data));

    t = setTimeout(function () {

      xhr.abort();
      claerTimeout(t);
      t = null;
      xhr = null;
      complate();
    }, timeout)
  }

  function formatDatas(obj) {
    var str = '';

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        str += key + '=' + obj[key] + '&';
      }
    }

    return str.replace(/&$/, '');
  }

  function randomNum() {
    var num = '';
    for (let i = 0; i < 20; i++) {
      num += Math.floor(Math.random() * 10);
    }

    return num;
  }

  return {
    ajax: function (opt) {
      _doAJAX(opt);
    },
    post: function (url, data, callback) {
      _doAJAX({
        method: 'POST',
        url: url,
        data: data,
        success: callback
      })
    }
  }

}());