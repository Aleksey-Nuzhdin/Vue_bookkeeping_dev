<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Edit'| localizeFilter}}</h4>
      </div>

      <form @submit.prevent="submitCarEdit">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c"
              
            >{{c.title}}</option>
          </select>
          <label>{{'SelectCategory' | localizeFilter}}</label>
        </div>

        <div class="input-field">
          <input 
            type="text" 
            id="name"
            v-model="title"
            :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">{{'CategoriesTitle' | localizeFilter}}</label>
          <span class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >{{'EnterCategoryName' | localizeFilter}}</span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model="limit"
              :class="{invalid: ($v.limit.$dirty && !$v.limit.minValue)}"
          >
          <label for="limit">{{'Limit'|localizeFilter}}</label>
          <span class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >{{'CategoriesMessegMinimumValue' | localizeFilter}} {{$v.limit.$params.minValue.min}}</span>
          
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Update' | localizeFilter}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators';
import localizeFilter from '@/filters/localize.filter'

export default {
  props:{
    categories:{
      type: Array,
      reqyured: true,
    }
  },
  data: ()=>({
    select: null,
    title: '',
    limit: 0,
    current: null
    
  }),
  methods:{
    async submitCarEdit(){
      
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
      try {
        const catDate = {
          title: this.title,
          limit: this.limit,
          id: this.current.id
        }
        await this.$store.dispatch('updateCategory', catDate)
        M.toast({html: `${localizeFilter('Category')} "${this.title}", ${localizeFilter('SuccessfullyUpdated')}`})
        this.$emit('update', catDate)

      }catch (error) {}
    },
   
  },
  validations:{
    title:{required},
    limit: {minValue:minValue(100)}
  },
  mounted(){
    M.updateTextFields();
    this.select = M.FormSelect.init(this.$refs.select);
  },
  created(){
    const {id, title, limit} = this.categories[0]
    this.title = title
    this.limit = limit
    this.current = this.categories[0]
  },
  watch:{
    current(value){
      this.title = value.title
      this.limit = value.limit
      this.current = value
    }
  },
  destroyed(){
    if(this.select && this.select.destroyed){
      this.select.destroyed()
    }
  }
}
</script>