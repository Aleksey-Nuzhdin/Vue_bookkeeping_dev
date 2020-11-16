const _ = require('lodash');

export default{
  data:()=>({
    page: 1,
    pageSize: 5,
    pageCount: 1,
    allItems: [],
    items: [],
  }),
  mounted(){
    this.page = +this.$route.query.page
  },
  methods:{
    setupPagination(allItems){
      this.allItems = _.chunk(allItems,this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
    paginateFunc(page){
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
    
  }
}