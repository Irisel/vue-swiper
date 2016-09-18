import hreflist from './components/href-list.vue'
import template from './html/template.js'

module.exports = {
  template: template('index', {}),
  components: {
    hreflist
  },
  data (){
    return {
      hrefs: []
    }
  }
}