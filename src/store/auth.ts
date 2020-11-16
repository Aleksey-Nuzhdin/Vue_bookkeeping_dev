import firebase from 'firebase/app'

export default {
  actions: {
    async login(
      { dispatch, commit }: any,
      userData: { email: string; password: string },
    ) {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }: any) {
      await firebase.auth().signOut()
      commit('clearInfo')
    },
    getUserId(): string | null {
      let user: any = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async regUser(
      { dispatch, commit }: any,
      userData: { email: string; password: string; name: string },
    ) {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(userData.email, userData.password)
        const userID = await dispatch('getUserId')
        await firebase
          .database()
          .ref(`/users/${userID}/info`)
          .set({
            bill: 0,
            name: userData.name,
            locale: 'ru-RU',
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
}
