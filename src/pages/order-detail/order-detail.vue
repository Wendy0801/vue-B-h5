<template>
    <div class="order-detail-page">
        <header class="smi-header">
            <go-back></go-back>
            <h2>订单详情</h2>
        </header>
        <main class="smi-content" v-if="orderInfo&&orderInfo.goods">
            <div class="order-main">
                <!-- 商品基本信息  -->
                <div class="order-shop-info detial-block">
                    <div class="block-content">
                        <div class="info-wrap cl">
                            <div class="shop-logo fl">
                                <img :src="orderInfo.goodsLogo" alt="">
                            </div>
                            <div class="shop-info">
                                <h4 class="shop-title">
                                    {{orderInfo.goods.goodsName}}
                                </h4>
                                <div class="shop-price">
                                    <span>￥{{orderInfo.goods.standardPrice}}</span>
                                    <del>￥{{orderInfo.goods.purchasePrice}}</del>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="shop-tags block-footer">
                        <ul class="tags-list cl">
                            <li class="tag-item">
                                <i class="iconfont icon-zhengque"></i>
                                <!-- <span>{{orderInfo.goods.isRefund==1?'':'不'}}支持退款</span> -->
                                <span>不支持退款</span>
                            </li>
                            <li class="tag-item">
                                <i class="iconfont icon-zhengque"></i>
                                <span>{{orderInfo.goods.isExpect==1?'':'无'}}需预约</span>
                            </li>
                            <li class="tag-item" v-if="orderInfo.goods.isFlowBuy===1">
                                <i class="iconfont icon-zhengque"></i>
                                <span>流量抵扣</span>
                            </li>
                            <li class="tag-item">
                                <i class="iconfont icon-zhengque dark"></i>
                                <span>已售{{orderInfo.goods.soldNumber}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
    
                <!-- 星美券(已使用)  -->
                <div class="order-voncher-ed cl detial-block detail-single-row" v-if="orderInfo.isCheckSold===1">
                    <div class="fl">星美券(已使用)</div>
                    <div class="fr">{{orderInfo.ticketCode||'1313123'}}</div>
                </div>
                <!-- 套餐内容  -->
                <div class="order-package detial-block">
                    <div class="block-header">套餐内容</div>
                    <div class="block-content">
    
                        <div class="block-row cl" v-for="(item,index) in orderInfo.orderGoodsList" :key="index">
                            <div class="row-title fl">
                                {{item.goodsName}}
                            </div>
                            <div class="row-unit fl">
                                {{item.goodsNumber}}{{item.unitName||'个'}}
                            </div>
                            <div class="row-price fl">
                                {{item.standardPrice}}元
                            </div>
                        </div>
    
                        <div class="block-row cl" v-for="(item,index) in orderInfo.goodsGiftList" :key="index">
                            <div class="row-title fl">
                                {{item.goodsName}}
                            </div>
                            <div class="row-unit fl">
                                {{item.goodsNumber}}{{item.unitName||'个'}}
                            </div>
                            <div class="row-price fl">
                                {{item.standardPrice}}元
                            </div>
                        </div>
    
                        <div class="block-row cl">
                            <div class="row-title fl">
                            </div>
                            <div class="row-unit row-unit-dark fl">
                                原价
                            </div>
                            <div class="row-price fl">
                                {{allPrcie}}元
                            </div>
                        </div>
                        <div class="block-row cl">
                            <div class="row-title fl">
                            </div>
                            <div class="row-unit row-unit-dark fl">
                                特惠价
                            </div>
                            <div class="row-price fl">
                                {{orderInfo.goods.standardPrice}}元
                            </div>
                        </div>
                    </div>
                    <div class="block-footer">
                        <router-link :to="{'name':'graphic-details',params:{'businessId':orderInfo.goods.businessId,'productId':product_id}}">
                            <div class="cl">
                                <span class="fl">查看图文详情</span>
                                <span class="fr">
                                    <i class="iconfont icon-right"></i>
                                </span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <!-- 订单信息  -->
                <div class="order-info-detail detial-block">
                    <div class="block-header cl">
                        <h5 class="fl">订单信息</h5>
                    </div>
                    <div class="block-content">
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                订单编号:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.orderNo}}
                            </div>
                        </div>
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                手机号:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.orderMobile}}
                            </div>
                        </div>
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                数量:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.goodsNum}}
                            </div>
                        </div>
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                商品总价:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.goods.standardPrice*orderInfo.goodsNum}}元
                            </div>
                        </div>
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                流量抵扣:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.flowExchangeMoney}}元
                            </div>
                        </div>
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                订单总额:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.goods.standardPrice*orderInfo.goodsNum-orderInfo.flowExchangeMoney}}元
                            </div>
                        </div>
                        <div class="order-info-row cl">
                            <div class="order-info-label fl">
                                下单时间:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.orderTime|substr_format(16)}}
                            </div>
                        </div>
                        <div class="order-info-row cl" v-if="orderInfo.orderPayTime">
                            <div class="order-info-label fl">
                                支付时间:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.orderPayTime|substr_format(16)}}
                            </div>
                        </div>
                        <div class="order-info-row cl" v-if="orderInfo.useTime">
                            <div class="order-info-label fl">
                                使用时间:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.useTime|substr_format(16)}}
                            </div>
                        </div>
                        <div class="order-info-row cl" v-if="orderInfo.orderFinishTime">
                            <div class="order-info-label fl">
                                评价时间:
                            </div>
                            <div class="order-info-desc fr">
                                {{orderInfo.orderFinishTime|substr_format(16)}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';

export default {
    name: 'order-detail',
    components: {
        'go-back': GoBack,
    },
    data() {
        return {
            orderInfo: {},
            business_id: '',
            product_id: '',
            latelyShop: {},
            orderStatus: 0,
            orderTime: new Date('2017-07-18 14:26:50.0'),
            countDownTimer: null,
            restPayTime: 0,
            payCountDownTime: null,
            productInfo: {}
        }
    },
    computed: {
        allPrcie: function () {
            var goodPrice = 0;
            var giftPrice = 0;
            this.orderInfo.goodsGiftList.map(item => {
                giftPrice += item.goodsNumber * item.standardPrice
            })
            this.orderInfo.orderGoodsList.map(item => {
                goodPrice += item.goodsNumber * item.standardPrice
            })
            return goodPrice + giftPrice;
        },
    },
    mounted() {
        this.orderId = this.$route.params.orderId;
        this.getOrderDetail();
    },
    methods: {
        getOrderDetail() {
            this.$_api.post({
                'ext': 'check-sell/order-details',
                'orderId': this.orderId,
            }, true)
                .then(res => {
                    if (res.code == 1) {
                        this.orderInfo = res.data;
                        this.business_id = res.data.goods.businessId;
                        this.product_id = res.data.goods.goodsId;
                        this.orderStatus = res.data.orderStatus;
                        this.orderTime = res.data.orderTime || new Date('2017-07-18 15:22:50.0');
                        // this.orderStatus = 6;
                        this.countDownPay();
                        this.getLatelyShop();
                        if (this.orderStatus === 2) {
                            this.getProductInfo();
                        }
                    }
                })
        },
        getProductInfo() {
            // 
            this.$_api.post({
                'ext': 'product/product-info',
                'product_id': this.product_id
            })
                .then(res => {
                    if (res.code === 1) {
                        this.productInfo = res.data;
                    }
                })
        },
    },
}

</script>
<style lang="scss" src="./order-detail.scss" scoped></style>