import firebase from 'firebase/app';

export default {
  state: {
    info: {}
  },
  mutations:{
    setInfo(state:any, info:any){ 
      state.info = info
    },
    clearInfo(state:any){
      state.info = {}
    }
  },
  actions:{
    async fetchInfo({dispatch, commit}:any ){
      try {
        const userID = await dispatch('getUserId')
        const info = (await firebase.database().ref(`/users/${userID}/info`).once('value')).val()
  
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updataInfo({dispatch, commit, getters}:any, data:any){   
      try {
        const userID = await dispatch('getUserId')  
        const updateInfo = {...getters.info, ...data}
        await firebase.database().ref(`/users/${userID}/info`).update(updateInfo)

        commit('setInfo', updateInfo)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters:{
    info: (s:any) => s.info
  }
}