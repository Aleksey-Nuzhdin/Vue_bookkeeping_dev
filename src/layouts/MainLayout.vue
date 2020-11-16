<template>
  <div>
    <Loader v-if="loading" />
    <div v-else class="app-main-layout">
      <Navbar @click="isOpen = !isOpen" />

      <Sidebar v-model="isOpen" :key="locale" />

      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link
          class="btn-floating btn-large blue"
          to="/record"
          :key="locale"
          v-tooltip="CreateNewEntry"
        >
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import message from '@/utils/message'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true,
    CreateNewEntry:"Создать новую запись"
  }),
  components: { Navbar, Sidebar },
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    },
  },
  watch: {
    locale(){
      this.CreateNewEntry = localizeFilter('CreateNewEntry')
    },
    error(firebaseError) {
      console.log(firebaseError.code)
      if (message[firebaseError.code]) {
        this.$error(`[Error]: ${message[firebaseError.code]}`)
      } else {
        this.$error(localizeFilter('Error__All'))
      }
    },
  },
}
</script>

<style></style>
