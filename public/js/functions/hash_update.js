var hash_store = (function(){
  function single(){
    this.href = '',
    this.update = function(){
      this.href = location.href;
    }
  }
  var init = false, obj;
  return function(){
    if(!init){
      obj = new single();
      init = true;
    }
    return obj;
  }
})();

export { hash_store }


function hash_get(){
  var hash = [];
  window.location.hash.replace(/(\w+)=(\w+)/ig, function(a, b, c){
      hash.push({
        key: b,
        val: c
      });
  });
  return hash;
}

export function hash_add(name, val){
    var hash = hash_get(), _hash = '', dict={}, _hash_store = hash_store();
    hash.push({
      key: name,
      val: val
    });
    [].forEach.call(hash, function(item){
        if(!dict[item.key]){
          _hash.length?_hash+='&':_hash+='#';
          _hash+= item.key + '=' + item.val;
          dict[item.key] = true;
        }
    })
    history.pushState({}, '', location.pathname + _hash);
    _hash_store.update();
}

export function hash_pop(name){
  var hash = hash_get(), _hash = '', _hash_store = hash_store();
  [].forEach.call(hash, function(item){
      if(item.key != name){
          _hash.length?_hash+='&':_hash+='#';
          _hash+= item.key + '=' + item.val;
      }
  })
  history.pushState({}, '', location.pathname + _hash);
  _hash_store.update();
}
