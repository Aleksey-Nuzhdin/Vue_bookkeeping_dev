<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{'CurrencyAccount'| localizeFilter}}</span>

        <p 
          v-for="cur of curIndex"
          :key='cur'
          class="currency-line"
        >
          <span>{{getCurrency(cur) | currencyFilter(cur)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props:['rates', 'curIndex'],
  computed:{
    base(){  
      return this.$store.getters.info.bill / this.rates['RUB']
    },
  },
  methods:{
    getCurrency(currency){
      return (this.base * this.rates[currency]).toFixed(2)
    }
  },
}
</script>