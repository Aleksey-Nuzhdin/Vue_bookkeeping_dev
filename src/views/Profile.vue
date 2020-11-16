<template>
  <div>
    <div class="page-title">
      <h3>{{ `ProfileTitle` | localizeFilter }}</h3>
    </div>
    <Loader v-if="loading" />
    <form class="form" v-else @submit.prevent="submitUpdateName">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="userName"
          :class="{ invalid: $v.userName.$dirty && !$v.userName.required }"
        />
        <label for="description">{{ 'Name' | localizeFilter }}</label>
        <small
          v-if="$v.userName.$dirty && !$v.userName.required"
          class="helper-text invalid"
          >{{ 'NotBeEmpty' | localizeFilter }}</small
        >
      </div>

      <div class="switch">
        <label>
          Русский
          <input type="checkbox" v-model="isEnLocale" />
          <span class="lever"></span>
          English
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'Update' | localizeFilter }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import localizeFilter from '@/filters/localize.filter'

export default {
  data: () => ({
    userName: '',
    isEnLocale: false,
    loading: true,
  }),
  metaInfo: () => ({
    title: `${localizeFilter('ProfileTitle')} | ${process.env.VUE_APP_TILTE}`,
  }),
  async mounted() {
    this.userName = this.info.name
    this.isEnLocale = this.info.locale === 'en-US' ? true : false
    setTimeout(() => {
      M.updateTextFields()
    })

    this.loading = false
  },
  methods: {
    async submitUpdateName() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        await this.$store.dispatch('updataInfo', {
          name: this.userName,
          locale: this.isEnLocale ? 'en-US' : 'ru-RU',
        })
        this.$messagePlugin(localizeFilter('ProfileMesseg__ChangesApp'))
      } catch (e) {
        this.$error(localizeFilter('ProfileMesseg__NoChangesApp'))
      }
    },
  },
  computed: {
    ...mapGetters(['info']),
  },
  validations: {
    userName: { required },
  },
}
</script>

<style lang="scss" scope>
.switch {
  margin-bottom: 1.5rem;
}
</style>
