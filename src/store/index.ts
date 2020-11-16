import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error){
      state.error = error
    },
    clearError(state){
      state.error = null
    },
  },
  getters:{
    error: s => s.error
  },
  actions: {
    async fetchCurrency({dispatch, commit}, curIdnex:any){
      
      //const key = process.env.VUE_APP_FIXER
      //const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`)
      // let res = await fetch(`http://data.fixer.io/api/latest?access_key=3d5cffe612300192ff2d61a67d44f210&symbols=USD,EUR,RUB`)
      // res = await res.json()
      // console.log(res);
      // ^^^^^^^^^^^^^^^^^^
      // Не работает из-за смешивания протоколв http & https
   
      let resJson:any = await fetch(`https://www.cbr-xml-daily.ru/daily_json.js`)
      resJson = await resJson.json()
      let result:any = {
        date: resJson.Date.slice(0, 10), 
        rates:{
          RUB: resJson.Valute.EUR.Value,
          EUR: 1,
        }
      }
      
      for(let val of curIdnex){
        if(val == 'EUR' || val == 'RUB') continue
        result.rates[val] = (resJson.Valute.EUR.Value/resJson.Valute[val].Value).toFixed(4)
      }
      
      return result
    }
  },
  modules: {
    record, auth, info, category,
  },
});
