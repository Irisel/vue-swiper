const FETCH_API = {

};

import fetch from 'isomorphic-fetch'


function requestPosts(action, method) {
  return {
    type: 'REQUEST_POSTS',
    method,
    name: action
  }
}


function receivePosts(action, json) {
  return {
    type: 'RECEIVE_POSTS',
    data: json,
    name: action,
    receivedAt: Date.now()
  }
}

function errorPosts(error, action) {
  return {
    type: 'ERROR_POSTS',
    error,
    name: action,
    errorAt: Date.now()
  }
}

function urlLink(url, action, method, params) {
  if(params)url+='?';
  var pack = false;
  for(let param in params){
        if(pack)url+='&';
        url+= param + '=' + params[param];
        pack = true;
  }
  return {
    url,
    method,
    action
  }
}

export function ajax (action, params){
  var url = FETCH_API[action].url,
  method = FETCH_API[action].method,
  link = urlLink(url, action, method, params);
  return dispatch => {
    dispatch(requestPosts(action, method));
    dispatch(loading_mask());
    return fetch(link.url, { method: link.method })
      .then(response => response.json())
      .then(function(json){
        dispatch(receivePosts(action, json));
        dispatch(clear_mask());
      })
      .catch(function(error){
        dispatch(errorPosts(error, action));
        dispatch(clear_mask());
      })
  }
}

export function loading_mask(){
  return {
    type: 'LOADING_MASK'
  }
}

export function loading_cover(){
  return {
    type: 'COVER_MASK'
  }
}

export function clear_mask(){
  return {
    type: 'CLEAR_MASK'
  }
}

export function init(attrs){
  return {
     type: 'INIT',
     attrs
  }
}

export function plu_add(name){
  return {
    type: 'PLU_ADD',
    name
  }
}

export function plu_show(name){
  return {
    type: 'PLU_SHOW',
    name
  }
}

export function plu_hide(name){
  return {
    type: 'PLU_HIDE',
    name
  }
}

