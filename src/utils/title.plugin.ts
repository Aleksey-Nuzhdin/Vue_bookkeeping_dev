import Vue from 'vue'
import LocalizeFilter from '@/filters/localize.filter'

export default{
  install(Vue:any) {
    Vue.prototype.$title = function(key:string):string{
      console.log(LocalizeFilter(key));
      
      const appName = process.env.VUE_APP_TILTE
      return `${LocalizeFilter(key)} | ${appName}`
    }
  },
}
