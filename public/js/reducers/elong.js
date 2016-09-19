const defaultElong = {
  hotels: {
    list: [],
    index: 0,
    msg: '',
    params: {},
    loading: false,
    hasMore: true
  }
}

export default function elong (elong = defaultElong, action) {
  switch (action.type) {
    case 'REQUEST_POSTS':
      switch (action.name){
        case 'HOTEL_LIST':
          var hotels = elong.hotels;
          hotels.loading = true;
          return Object.assign({}, elong, {
              hotels: hotels
          })
      }

    case 'RECEIVE_POSTS':
      switch (action.name){
        case 'HOTEL_LIST':
          var hotels = elong.hotels,
          list = [].concat((elong.hotels.list || []), action.data.list),
          index = elong.hotels.index + 1,
          params = elong.hotels.params,
          hasMore = !!action.data.hasMore;

          return Object.assign({}, elong, {
              hotels: {
                list: list,
                loading: false,
                index: index,
                params: params,
                hasMore: hasMore,
                msg: '',
                updateAt: action.receivedAt,
                errorAt: action.errorAt
              }
          })
        default:
          return elong
      }

    case 'ERROR_POSTS':
      switch (action.name){
        case 'HOTEL_LIST':
          var hotels = elong.hotels;
          hotels.loading = false;
          hotels.msg = action.error.message;
          hotels.errorAt = action.errorAt;
          return Object.assign({}, elong, {
              hotels: hotels
          })
        default:
          return elong
      }

    default:
      return elong
  }
}
