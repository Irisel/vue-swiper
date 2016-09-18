<template>
  <div class="swiper-wrapper">
    <sectionslide :number=1></sectionslide>
    <sectionslide :number=2></sectionslide>
    <sectionslide :number=3 ></sectionslide>
    <sectionslide :number=4></sectionslide>
  </div>
</template>

<script>
import store from '../store'
import sectionslide from '../components/section-slide.vue'

export default {
  components: {
    sectionslide
  },
  methods: {

  },
  ready (){
    var mySwiper = new Swiper ('.swiper-container', {
       direction : 'vertical',
       pagination: '.swiper-pagination',
       mousewheelControl : true,
       onInit: function(swiper){
         swiperAnimateCache(swiper);
         swiperAnimate(swiper);
       },
       onSlideChangeEnd: function(swiper){
         swiperAnimate(swiper);
       },
       onTransitionEnd: function(swiper){
         swiperAnimate(swiper);
       },
       watchSlidesProgress: true,
       onProgress: function(swiper){

       },
       onSetTransition: function(swiper, speed) {

       },
    })         
  },
  data (){
    return {

    }
  }
}
</script>

<style>

</style>
