<template>
  <div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!record">{{'RecordNotFound'|localizeFilter}}</p>
    <div v-else>
      <div class="breadcrumb-wrap">
        <router-link class="breadcrumb" to="/history">{{'History'|localizeFilter}}</router-link>
        <a @click.prevent class="breadcrumb">
          {{record.typeTitle}}
        </a>
      </div>
      <div class="row" >
        <div class="col s12 m6">
          <div class="card" :class="record.class">
            <div class="card-content white-text">
              <p>{{'Description'|localizeFilter}}: {{ record.description }}</p>
              <p>{{'Amount'|localizeFilter}}: {{ record.amount | currencyFilter}}</p>
              <p>{{'Category'|localizeFilter}}: {{ record.title }}</p>

              <small>{{ record.date.slice(0,10) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'detail',
  data:()=>({
    loading: true,
    record: null,
  }),
  metaInfo: () => ({
    title: `${localizeFilter('Details')} | ${process.env.VUE_APP_TILTE}`,
  }),
  async mounted(){
    const id = this.$route.params.recordID
    const record = await this.$store.dispatch('fetchRecordByID', id)
    const category = await this.$store.dispatch('fetchCategoryByID', record.categoryID)
    
    this.record = {
      ...record,
      title: category.title,
      class: record.type === 'outcome'? 'red': 'green',
      typeTitle: record.type === 'outcome' ? 
      localizeFilter('Outcome') : 
      localizeFilter('Income')
    }
    this.loading = false 
  },

}
</script>