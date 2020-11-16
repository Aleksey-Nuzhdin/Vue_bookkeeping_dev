<template>
  <div>
    <div class="page-title">
      <h3>{{'NewRecord' | localizeFilter}}</h3>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length"><router-link to="/categories">{{'AddCategory'| localizeFilter}}</router-link> </p>
    <form class="form" v-else @submit.prevent="submitRecord">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="cut in categories"
            :key="cut.id"
            :value="cut"
          >{{cut.title}}</option>
        </select>
        <label>{{'Record_SelectCategory'|localizeFilter}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{'Income'| localizeFilter}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{'Outcome'|localizeFilter}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{invalid: ($v.amount.$dirty && !$v.amount.minValue)}"
            
        >
        <label for="amount">{{'Amount'| localizeFilter}}</label>
        <span class="helper-text invalid"  
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >{{'CategoriesMessegMinimumValue'| localizeFilter}} {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="description"
            :class="{invalid: ($v.description.$dirty && !$v.description.required)}"
        >
        <label for="description">{{'Description'|localizeFilter}}</label>
        <span class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >{{'NotBeEmpty'|localizeFilter}}</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{'Create'|localizeFilter}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'

export default {
  name: 'record',
  data: ()=>({
    categories: [],
    loading: true,
    select: null,
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  metaInfo: () => ({
    title: `${localizeFilter('NewRecord')} | ${process.env.VUE_APP_TILTE}`,
  }),
  computed:{
    ...mapGetters(['info']),
    abilityCreateRecord(){
      if(this.type === 'income') return true

      return this.info.bill >= this.amount
    },
    
  },
  methods:{
    async submitRecord(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }

      if(this.abilityCreateRecord){
        try {
          await this.$store.dispatch('crateRecord', {
          categoryID: this.category.id,
          type: this.type,
          amount: this.amount,
          description: this.description,
          date: new Date().toJSON()
          })
          const newBill = this.type === 'outcome'? 
            this.info.bill - this.amount: 
            this.info.bill + this.amount
          await this.$store.dispatch('updataInfo', {bill: newBill})
          this.$messagePlugin(`${localizeFilter('CategoryEntry')} "${this.category.title}", ${localizeFilter('SuccessfullyCreated')}`)
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}


      }else{
        this.$messagePlugin(`${localizeFilter('NotEnoughFundsAvailableAmount')} ${currencyFilter(this.info.bill)}`)
      }
    }
  },
  async mounted(){
    this.loading = false
    this.categories = await this.$store.dispatch('fetchCategories')
    
    if(this.categories.length){
      this.category = this.categories[0]
    }

    // Не успевает рендеритсься и не подключается.
    setTimeout(()=>{
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields();
    }, 0)
    
  },
  destroyed(){
    if(this.select && this.select.destroyed){
      this.select.destroyed()
    }
  },
  validations:{
    description:{required},
    amount: {minValue:minValue(1)}
  },
}
</script>