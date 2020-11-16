<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{'Create'| localizeFilter}}</h4>
      </div>

      <form @submit.prevent="submitCarCreate">
        <div class="input-field">
          <input
              id="name"
              type="text"
              v-model="title"
              :class="{invalid: ($v.title.$dirty && !$v.title.required)}"
          >
          <label for="name">{{'Title'| localizeFilter}}</label>
          <span class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
          >{{'EnterCategoryName'|localizeFilter}}</span>
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
          >{{'CategoriesMessegMinimumValue'|localizeFilter}} {{$v.limit.$params.minValue.min}}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{'Create'|localizeFilter}}
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
  data: ()=>({
    title: '',
    limit: 1,
  }),
  validations:{
    title:{
      required
    },
    limit: {
      minValue:minValue(100)
    }
  },
  mounted(){
    M.updateTextFields();
  },
  methods:{
    async submitCarCreate(){
      if(this.$v.$invalid){
        this.$v.$touch()
        return
      }
    try {
      const category = await this.$store.dispatch('createCategory',{
        title: this.title,
        limit: this.limit
      })
      M.toast({html: `${localizeFilter('Category')} "${this.title}", ${localizeFilter('SuccessfullyCreated')}`})    
      this.title = ''
      this.limit = 100
      this.$v.$reset()
      this.$emit('creatingCategory', category)

    } catch (error) {}

    },
  }
}
</script>