import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({commmit, dispatch}:any, dataCategory:{title:string,limit:number}){
      try {
        const userID = await dispatch('getUserId')
        const category = await firebase.database().ref(`/users/${userID}/categories`).push(dataCategory)
        return {title: dataCategory.title, limit: dataCategory.limit, id: category.key}
      } catch (error) {
        commmit('setError', error)
        throw error
      }
    },
    async updateCategory({commmit, dispatch}:any, dataCategory:{title:string,limit:number,id:string}){   
      try {
        const userID = await dispatch('getUserId')  
        let a = await firebase.database().ref(`/users/${userID}/categories`).child(dataCategory.id)
        .update({title:dataCategory.title, limit: dataCategory.limit})
      } catch (error) {
        commmit('setError', error)
        throw error
      }
    },
    async fetchCategories({commmit, dispatch}:any){
      try {
        const userID = await dispatch('getUserId')
        const categorysData = (await firebase.database().ref(`/users/${userID}/categories`).once('value')).val() || {}
        
        // Object.keys(categorysData).forEach((key:any) => {
        //   categorysMass.push({
        //     id: key,
        //     title: categorysMass[key].title,
        //     limit: categorysMass[key].limit
        //   }) 
        // }) 
       
        return Object.keys(categorysData).map((key:any) => ({ id: key, ...categorysData[key] }))
        
      } catch (error) {
        commmit('setError', error)
        throw error
      }
    },
    async fetchCategoryByID({commmit, dispatch}:any, id:string){
      try {
        const userID = await dispatch('getUserId')
        const category = (await firebase.database().ref(`/users/${userID}/categories`).child(id).once('value')).val() || {}
      
        return {...category, id}
      } catch (error) {
        commmit('setError', error)
        throw error
      }
    },
  }
}