<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories'| localizeFilter}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div v-else class="row">
        <CategoriesCreate @created="creatingCategory" />

        <CategoriesEdit 
          v-if="categories.length"
          :categories="categories"
          :key="countUpdates"
          @update="updateFormCat"
        />
        <p v-else class="center">{{'CreateNewEntry'|localizeFilter}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoriesCreate from '@/components/CategoriesCreate';
import CategoriesEdit from '@/components/CatagoriesEdit';
import localizeFilter from '@/filters/localize.filter';

export default {
  name: 'categories',
  data: ()=>({
    categories: [],
    loading: true,
    countUpdates: 0
  }),
  metaInfo: () => ({
    title: `${localizeFilter('Categories')} | ${process.env.VUE_APP_TILTE}`,
  }),
  async mounted(){
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  },
  components:{
    CategoriesCreate, CategoriesEdit,
  },
  methods:{
    creatingCategory(category){
      this.categories.push(category)
      this.countUpdates++
    }, 
    updateFormCat(category){
      const thisID = category.id
      this.categories.forEach(el => {
        if(el.id == thisID){
          el.title = category.title
          el.limit = category.limit
          this.countUpdates++
        }
      })
    }
  },
}
</script>

<style>

</style>