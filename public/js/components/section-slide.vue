<template>
    <section class="swiper-slide" :style="[slide.style]">
        <div class="container">
          <img v-bind:src="img.src" :class="[img.class]" :style="[img.style]" :swiper-animate-effect="img.effect" :swiper-animate-duration="img.duration" :swiper-animate-delay="img.delay"  v-for="img in slide.imgs">
        </div>
    </section>
</template>
<script>
export default {
  props: {
      slide: 'Object'
  },
  data: function(){
    return {

    }
  },
  attached: function(){

  },
  computed: {

  },
  watch: {

  },
  events: {

  },
  methods: {

  },
  created: function(){

  },
  ready: function(){

  }
}
</script>
<style>
</style>