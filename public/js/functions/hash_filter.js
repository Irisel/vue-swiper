export default function(_location, _ignored){

  var hash = [],url = '',ignored = _ignored || ['plu'],hash_url = '',packed={},plus=[],

  location_hash = window.location.hash || '';

  if(_location)location_hash = _location.indexOf('#') >-1 ? _location.split('#')[1] : '';

  location_hash.replace(/(\w+)=(\w+)/ig, function(a, b, c){
    if(b.indexOf(ignored)<0){
      hash.push({
        key: b,
        val: c
      });
    }else{
      plus.push(c);
    }
  });
  [].forEach.call(hash, function(param){
    if(!packed[param.key]){
      hash_url.length?hash_url+='&':hash_url+='#';
      hash_url+=param.key + '=' + param.val
      packed[param.key] = param.val;
    }
  });
  return {
    path: hash_url,
    plus: plus
  }
}
