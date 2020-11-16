<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill'| localizeFilter}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div v-else class="row" >

      <HomeMoney
        :rates="currency.rates"
        :curIndex="curIndex"
      />

      <HomeRate
        :rates="currency.rates"
        :today="currency.date"
        :curIndex="curIndex"
      />

    </div>
  </div>

</template>

<script>

import HomeMoney from '@/components/HomeMoney';
import HomeRate from '@/components/HomeRate';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'home',
  data:()=>({
    loading: true,
    currency: null,
    curIndex: ['EUR','RUB','USD'],
  }),
  metaInfo: () => ({
    title: `${localizeFilter('Bill')} | ${process.env.VUE_APP_TILTE}`,
  }),
  async mounted(){
    this.currency = await this.$store.dispatch('fetchCurrency', this.curIndex)
    this.loading = false
  },
  methods:{
    async refresh(){
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency', this.curIndex)
      
      this.loading = false
    }
  },
  components:{
    HomeMoney,HomeRate
  },
  
}
</script>
