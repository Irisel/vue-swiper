var obj = {
  private: {
    name: 'likd-a'
  }
};

Object.defineProperty(
  obj,
  "name",
  {
    get : function(){
      console.log('my name is ' + this.private.name);
      return this.private.name;
    },
    set : function(newValue){
      this.private.name = newValue;
      console.log(this.private.name + ' is my new name');
    },
    enumerable : true,
    configurable : true
  }
);
