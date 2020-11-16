<template>
  <div class="grey darken-1 empty-layout">
    <router-view/>
  </div>
</template>

<script>
import message from '@/utils/message'
import localizeFilter from '@/filters/localize.filter'

export default {
  computed:{
    error(){
      return this.$store.getters.error
    },
  },
  watch:{
    error(firebaseError){
      if(message[firebaseError.code]){
        this.$error(`${message[firebaseError.code]}`)
      }else{
        this.$error(localizeFilter('Error__All'))
      }
    }
  },
}
</script>

<style>

</style>