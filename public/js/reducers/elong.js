const defaultElong = {
  city: {
    name: '北京'
  } ,
  hotels: {
    list: [],
    index: 0,
    msg: '',
    params: {},
    loading: false,
    hasMore: true
  },
  detail:{

  },
  hotelId: undefined,
  hotelDetail: {}
}

export default function elong (elong = defaultElong, action) {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return Object.assign({}, elong, {
        city: {
            name: action.text
        }
      })
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

    case 'CLEAR_HOTELS':
      return Object.assign({}, elong, {
          hotels: {
            list: [],
            params: {},
            index: 0,
            msg: ''
          }
      })

    case 'EMPTY_HOTELS':
      var hotels = elong.hotels;
      hotels.list = [];
      return Object.assign({}, elong, {
          hotels
      })
    case 'INIT':
      return Object.assign({}, elong, {
          attrs: action.attrs
      })
    case 'HOTEL_PARAMS_UPDATE':
      var hotels = elong.hotels;
      var params = hotels.params;
      params[action.param] = action.val;
      hotels.params = params;
      return Object.assign({}, elong, {
          hotels
      })
    case 'HOTELID_UPDATE':
      return Object.assign({}, elong, {
          hotelId: action.hotelId
      })
    case 'HOTELDETAIL_UPDATE':
      return Object.assign({}, elong, {
        hotelDetail: action.detail
      })
    default:
      return elong
  }
}
