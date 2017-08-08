<template>
    <div class="check-sell-history-page">
        <header class="smi-header">
            <go-back></go-back>
            <h2>核销历史</h2>
        </header>
        <main class="smi-content">
            <div class="fix-bg"></div>
            <div class="sell-container">
                <div class="sell-history-wrap" v-infinite-scroll="loadMoreData" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <ul class="sell-history-list">
                        <li class="sell-history-item" v-for="(item,index) in checkSellList" :key="index">
                            <div class="sell-header-date">
                            {{item.lastUpdateTime|substr_format(16)}}
                            </div>
                            <router-link :to="{'name':'order-detail',params:{'orderId':item.orderId}}">
                                <div class="sell-content cl">
                                    <div class="shop-avatar fl">
                                        <img :src="item.goodsLogo" alt="">
                                    </div>
                                    <div class="shop-info">
                                        <h5 class="shop-title">{{item.orderTitle}}</h5>
                                        <div class="info-row">
                                            <b>数量:</b>
                                            <span>{{item.goodsNum}}</span>
                                        </div>
                                        <div class="info-row">
                                            <b>订单总额:</b>
                                            <span>¥{{item.totalPrice}}</span>
                                        </div>
                                    </div>
                                    <div class="sell-arrow-link">
                                        <i class="iconfont icon-right"></i>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <load-more :loading="loading" :allLoaded="allLoaded"></load-more>
        </main>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';
import LoadMore from '@/components/LoadMore.vue';

export default {
    name: 'check-sell-history',
    components: {
        'load-more': LoadMore,
        'go-back': GoBack
    },
    data() {
        return {
            checkSellList:[],
            pSize: 10,
			loading:true,
			allLoaded:false,
        }
    },
    computed: {
        ...mapGetters({
        })
    },
    mounted() {
        this.getCheckedList();
    },
    methods: {
        getCheckedList(pIndex = 1) {
            this.loading = true
            var userInfo = JSON.parse(this.$_cookie.get('shop_userinfo'))
            this.$_api.post({
                ext: 'check-sell/order-page',
                shopId: userInfo.shopId,
                businessId: userInfo.businessId,
                pageNum: pIndex,
                pageSize: this.pSize
            })
                .then(res => {
					if (res.code === 1) {
						if (res.data.list.length < this.pSize) {
							this.allLoaded = true;
						}
						this.checkSellList = this.checkSellList.concat(res.data.list);
                        this.total = res.data.total;
						this.loading = false;
                    }
                    else{
						// this.allLoaded = true;
						// this.loading = false;
                    }
                })
        },
        loadMoreData() {
            if (this.allLoaded||this.loading) {
                return false;
            }
            var nextIndex = Math.ceil(this.checkSellList.length / this.pSize) + 1;
            this.getCheckedList(nextIndex);
        },
    }
}
</script>
<style lang="scss" src="./check-sell-history.scss" scoped></style>
