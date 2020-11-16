<template>
  <div>
    <div class="page-title">
      <h3>{{'RecordHistory'| localizeFilter}}</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading"/>
    <p class="center" v-else-if="!records.length" ><router-link to="/record">{{'CreateFirstRecord' | localizeFilter}}</router-link></p>
    <section v-else>
     <HistoryTable :records="items"/>
     <Paginate  
      v-model="page"
      :page-count="pageCount"
      :click-handler="paginateFunc"
      :prev-text="'<<'"
      :next-text="'>>'"
      :container-class="'pagination'"
      :page-class="'waves-effect'"
    />
    </section>
  </div>
</template>

<script>
import HistoryTable from '@/components/HistoryTable';
import paginationMixin from '@/mixins/paginate.mixin';
import localizeFilter from '@/filters/localize.filter';
import {Pie} from 'vue-chartjs';

export default {
  name:'history',
  extends: Pie,
  mixins:[paginationMixin],
  data:()=>({
    loading: true,
    records: [],
    bgc: ['#000080','#FF00FF','#800080','#0000FF','#FF0000','#800000','#00FF00','#008000','#00FFFF','#008080',],
   
  }),
  metaInfo: () => ({
    title: `${localizeFilter('History')} | ${process.env.VUE_APP_TILTE}`,
  }),
  async mounted(){
    const categories = await this.$store.dispatch('fetchCategories')
    this.records = await this.$store.dispatch('fetchRecords')
  
    this.setup(categories)
    
    this.loading = false;
  },
  methods:{
    setup(categories){
      this.setupPagination(this.records.map(rec => {return{
        ...rec,
        categoryName: categories.find(cat => cat.id === rec.categoryID).title,
        class: rec.type === 'income'? 'green':'red',
        text: rec.type=== 'income'?       
          localizeFilter('Income') : 
          localizeFilter('Outcome'),
      }}))

      this.renderChart({
          labels: categories.map(c => c.title),
          datasets: [
            {
              label: localizeFilter('Categories'),
              backgroundColor: categories.map( (c, idx)=> this.bgc[idx % (this.bgc.length-1)]),
              data: categories.map(c =>{ return this.records.reduce((acc, r)=>{
                
                if(r.categoryID === c.id && r.type === 'outcome') acc += +r.amount
                return acc
                }, 0)})
            }
          ]
        },
      )
    }
  },
  components:{HistoryTable},
}
</script>