<template>
  <div class="markers">
      <div v-if="layer.mask" class="preloader-indicator-overlay"></div>
      <div v-if="layer.loading" class="preloader-indicator-modal"></div>
      <div v-if="layer.cover" class="preloader-indicator-cover"></div>
  </div>
</template>

<script>
export default {
  ready() {

  },
  data () {
    return {
      layer: this.$select('layer')
    }
  }
}
</script>

<style>

</style>
