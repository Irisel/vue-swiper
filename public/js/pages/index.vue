<template>
  <div class="swiper-wrapper">
    <sectionslide v-for="slide in slides" :slide="slide"></sectionslide>
    <img src="../../images/arrow.png" style="width:20px;height:15px; top:460px; left:150px;" id="array" class="resize"> 
  </div>
</template>

<script>
import store from '../store'
import sectionslide from '../components/section-slide.vue'
import consts from '../consts'

export default {
  components: {
    sectionslide
  },
  methods: {

  },
  ready (){
    var scaleW=window.innerWidth/320;
    var scaleH=window.innerHeight/480;
    var resizes = document.querySelectorAll('.resize');
    for (var j=0; j<resizes.length; j++) {
      resizes[j].style.width=parseInt(resizes[j].style.width)*scaleW+'px';
      resizes[j].style.height=parseInt(resizes[j].style.height)*scaleH+'px';
      resizes[j].style.top=parseInt(resizes[j].style.top)*scaleH+'px';
      resizes[j].style.left=parseInt(resizes[j].style.left)*scaleW+'px'; 
    };
    var mySwiper = new Swiper ('.swiper-container', {
       direction : 'vertical',
       pagination: '.swiper-pagination',
       mousewheelControl : true,
       onInit: function(swiper){
         swiperAnimateCache(swiper);
         swiperAnimate(swiper);
       },
       onSlideChangeEnd: function(swiper){
         console.log('onSlideChangeEnd');
         swiperAnimate(swiper);
       },
       onTransitionEnd: function(swiper){
         console.log('onTransitionEnd');
         swiperAnimate(swiper);
       },
       watchSlidesProgress: true,
       onProgress: function(swiper){
        for (var i = 0; i < swiper.slides.length; i++){
          var slide = swiper.slides[i];
          var progress = slide.progress;
          var translate = progress*swiper.height/4;  
          var scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
          var opacity = 1 - Math.min(Math.abs(progress/2),0.5);
          slide.style.opacity = opacity;
          var es = slide.style;
          es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,'+translate+'px,-'+translate+'px) scaleY(' + scale + ')';
        }
       },
       onSetTransition: function(swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++){
          var es = swiper.slides[i].style;
          es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
        }
       },
    })         
  },
  data (){
    return {
        slides:consts.tecent
    }
  }
}
</script>

<style>

</style>
