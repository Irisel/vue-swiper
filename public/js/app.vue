<template>
  <div class="pages">
    <router-view class="view" transition="test" transition-mode="out-in" keep-alive></router-view>
    <masklay></masklay>
    <div id="transitioner"></div>
  </div>
</template>

<script>
import masklay from './plugin/masklay.vue'
import Transitioner from './structor/transitioner.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    masklay
  },
  ready: function(){
    var transitioner = new Transitioner({});
    transitioner.$mount('#transitioner');
  }
}
</script>

<style>
</style>
