const defaultPlus = { 

}

export default function layer (plus = defaultPlus, action) {
  switch (action.type) {
    case 'PLU_ADD':
      var plu = {};
      plu[action.name] = {
        show: false
      }
      return Object.assign({}, plus, plu)
    
    case 'PLU_SHOW':
      plus[action.name].show = true;
      return Object.assign({}, plus, {})

    case 'PLU_HIDE':
      plus[action.name].show = false;
      return Object.assign({}, plus, {})

    default:
      return plus
  }
}