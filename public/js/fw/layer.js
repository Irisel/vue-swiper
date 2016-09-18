import $ from '../zepto.js'
import store from '../store'

export default {
  props: {
    type: String,
    name: String
  },
  data: function(){
    return {
        stages_p: [false, false, false, false, false],
        step: '',
        private: {
          plugin_show: false,
          transitioning: false,
          origin_step: ''
        },
        elong: this.$select('elong'),
        plugin: this.$select('plugin')
      }
  },
  attached: function(){
     this.private.plugin_show = false;
     this.private.transitioning = false;
  },
  computed: {
     stages: function(){
         return this.stages_p;
     },
     plugin_show: function(){
        return this.private.plugin_show;
     },
     transitioning: function(){
        return this.private.transitioning;
     }
  },
  watch: {
    'step': function(){
        var _stages = [false, false, false, false, false];
        _stages[this.step] = true;
        this.stages_p = _stages;
    },
    'plugin': function(){
      var _this = this;
      if(_this.plugin[_this.name]){
        if(_this.plugin[_this.name].show){
            _this.$emit('show');
        }else{
            _this.$emit('hide');
        }
      }
    }
  },
  events: {
    show: function(){
      var _this = this;
      this.private.plugin_show = true;
      this.private.transitioning = true;
      setTimeout(function(){
        _this.step = 0;
      });
    },
    hide: function(){
      var _this = this;
      if(_this.step != _this.private.origin_step){
        this.private.transitioning = true;
        setTimeout(function(){
          _this.step = _this.private.origin_step;
        });
      }
    }
  },
  methods: {
    touch: function(){

    }
  },
  created: function(){
    var _this = this;
    switch(this.type){
        case 'right-center':
           _this.step = 2;
           _this.private.origin_step = 2;
           break;
        default:
           break;
    }
    if(_this.name)store.dispatch(store.actions.plu_add(_this.name));
  },
  ready: function(){
    var _this = this;
    if(_this.elong.attrs.transitionEnd){
      $(_this.$el).on(_this.elong.attrs.transitionEnd, function(){
        _this.private.transitioning = false;
        if(_this.plugin[_this.name] && _this.plugin[_this.name].show == false){
          _this.private.plugin_show = false;
        }
      })
    }
  }
}
