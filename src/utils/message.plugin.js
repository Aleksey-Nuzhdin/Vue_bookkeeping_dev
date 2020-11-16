import Vue from 'vue'

export default{
  install(options){
    Vue.prototype.$messagePlugin = function(html){
      M.toast({html})
    }

    Vue.prototype.$error = function(html){
      M.toast({html: `[Error]: ${html}`})
    }
  }
}

