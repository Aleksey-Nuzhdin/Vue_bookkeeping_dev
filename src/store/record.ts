import firebase from 'firebase/app';

export default {
  actions:{
    async crateRecord({dispatch, commit}:any, recordData:{categoryID:string,type:string,amount:number,description:string,date:string}){  
      try {
        const userID = await dispatch('getUserId')
        return await firebase.database().ref(`/users/${userID}/records`).push(recordData)
      } catch (e) {   
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords({dispatch, commit}:any){
      try {
        const userID = await dispatch('getUserId')
        const records = (await firebase.database().ref(`/users/${userID}/records`).once('value')).val() || {}
        return Object.keys(records).map((key:any) => ({ id: key, ...records[key] }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordByID({dispatch, commit}:any, id:string){
      try {
        const userID = await dispatch('getUserId')
        const record = (await firebase.database().ref(`/users/${userID}/records`).child(id).once('value')).val() || {}
        return {...record, id}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}