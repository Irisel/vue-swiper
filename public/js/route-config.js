import store from './store'
import hash_filter from './functions/hash_filter'
import { hash_store } from './functions/hash_update'

export function configRouter (router) {

  // normal routes
  router.map({

    // not found handler
    '*': {
      component: require('./components/not-found.vue')
    },

    '/app/index': {
      // the component can also be a plain string component id,
      // but a component with that id must be available in the
      // App component's scope.
      component: require('./pages/index.vue')
    }
  });

  // redirect
  router.redirect({

  });

  // global before
  // 3 options:
  // 1. return a boolean
  // 2. return a Promise that resolves to a boolean
  // 3. call transition.next() or transition.abort()
  router.beforeEach((transition) => {
    if (transition.to.path === '/app/forbidden') {
      router.app.authenticating = true
      setTimeout(() => {
        router.app.authenticating = false
        console.log('this route is forbidden by a global before hook')
        transition.abort()
      }, 3000)
    } else {
      transition.next()
    }
  });

  router.afterEach((transition) => {
       var filter = hash_filter();
       history.replaceState({},'', location.pathname + filter.path);
   }
 );
}

window.onhashchange=function(){
    var last_url = hash_store();

    var filter = hash_filter();
    var _filter = hash_filter(last_url.href, []);

    if(_filter.plus.length > filter.plus.length){
      store.dispatch(store.actions.plu_hide(_filter.plus[0]));
    }
    else if(filter.plus.length > _filter.plus.length){
      store.dispatch(store.actions.plu_show(filter.plus[0]));
    }
    last_url.update();
}
