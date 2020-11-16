<template>
  <div>
    <div class="page-title">
      <h3>{{'Planning'| localizeFilter}}</h3>
      <h4>{{info.bill | currencyFilter('RUB')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length"><router-link to="/categories">{{'AddCategory' | localizeFilter}}</router-link> </p>
    <section v-else>
      <div v-for="c of categories" :key='c.id'>
        <p>
          <strong>{{c.title}}:</strong>
          {{c.spend | currencyFilter('RUB')}} {{'outOf' | localizeFilter}} {{c.limit | currencyFilter('RUB')}}
        </p>
        <div class="progress" v-tooltip="c.tooltip">
          <div
              class="determinate"
              :class="[c.chekProgress]"
              :style="{width: c.balancePerc+'%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'plunning',
  data:()=>({
    loading: true,
    categories: []
  }),
  metaInfo: () => ({
    title: `${localizeFilter('Planning')} | ${process.env.VUE_APP_TILTE}`,
  }),
  async mounted(){
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    
    this.categories = categories.map(c => {
      const spend = records
        .filter( r => r.categoryID === c.id && r.type === 'outcome')
        .reduce( (acc, rec) => acc+= +rec.amount, 0)

      const percent = 100 * (spend / c.limit) 
      const balancePerc = percent > 100 ? 100: percent
      const chekProgress =  percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'

      const tooltipValue = c.limit - spend
      const tooltip = `${tooltipValue < 0 ? 
        localizeFilter('ExcessBy') : 
        localizeFilter('Left')} 
        ${currencyFilter(Math.abs(tooltipValue))}`

      return{
        ...c,
        spend,
        balancePerc,
        chekProgress,
        tooltip,
      }
    })
    this.loading = false

  },
  computed:{
    ...mapGetters(['info'])
  }
}
</script>