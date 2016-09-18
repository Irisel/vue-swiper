const defaultLayer = {
  mask: false,
  loading: false,
  cover: false,
  title: '北京'
}

export default function layer (layer = defaultLayer, action) {
  switch (action.type) {
    case 'LOADING_MASK':
      return Object.assign({}, layer, {
        mask: true,
        loading: true,
        cover: false
      })

    case 'COVER_MASK':
      return Object.assign({}, layer, {
        mask: false,
        loading: false,
        cover: true
      })

    case 'CLEAR_MASK':
      return Object.assign({}, layer, {
        mask: false,
        loading: false,
        cover: false
      })

    default:
      return layer
  }
}
