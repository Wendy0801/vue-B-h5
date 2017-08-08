<template>
    <div class="graphic-details-page">
        <header class="smi-header">
            <go-back></go-back>
            <h2>图文详情</h2>
        </header>
        <main class="smi-content">
            <div v-html="detailInfo"></div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';
import LoadMore from '@/components/LoadMore.vue';

export default {
  name:'graphic-details',
  components: {
    'load-more': LoadMore,
    'go-back': GoBack
  },
  data(){
      return {
        'detailInfo':`<div>123</div>`
      }
  },
  computed: {
    ...mapGetters({
    })
  },
  mounted(){
    this.productId = this.$route.params.productId
    this.getDetail()
  },
  methods : {
    getDetail(){
        this.$_api.post({
            ext:'check-sell/product-details',
            product_id:this.productId
        })
        .then(res=>{
            if(res.code===1){
                this.detailInfo = res.data.content
            }
        })
    }
  }
}
</script>
<style lang="scss" src="./graphic-details.scss" scoped></style>
