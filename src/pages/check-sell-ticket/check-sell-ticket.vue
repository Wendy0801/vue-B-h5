<template>
    <div class="check-sell-ticket-page">
        <header class="smi-header">
            <go-back></go-back>
            <h2>核销券码</h2>
        </header>
        <main class="smi-content">
            <div class="check-ticket-wrap">
                <div class="check-ticket-block">
                    <div class="block-title block-row">
                        <h4>选择门店</h4>
                    </div>
                    <div class="block-title block-row cl" @click="showAddrChoose()">
                        <h5 class="fl">所在区域</h5>
                        <span class="block-row-value fr">
                            <b>{{proVinceChoose.name}} {{cityChoose.name}} {{disChoose.name}}</b>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                    <div class="block-title block-row cl" @click="showShopChoose()">
                        <h5 class="fl">门店名称</h5>
                        <span class="block-row-value fr">
                            <b v-if="shopChooseInfo">{{shopChooseInfo.shopName}}</b>
                            <i class="iconfont icon-right"></i>
                        </span>
                    </div>
                </div>
                <div class="check-ticket-block">
                    <div class="block-title block-row">
                        <h4>核销券码</h4>
                    </div>
                    <div class="check-ticket-main">
                        <input type="text" v-model="ticketCode" placeholder="扫描或输入星美券码" @focus="hideCheckBtn" @blur="showCheckBtn">
                        <button type="button" class="scanner-btn" @click="scanTicket()">
                            <i class="iconfont icon-saomahexiao"></i>
                        </button>
                    </div>
                </div>
            </div>
            <mt-popup v-model="addrPopupVisible" position="bottom" :closeOnClickModal="false">
                <div class="page-picker addr-picker">
                    <div class="page-picker-wrapper">
                        <div class="picker-toolbar">
                            <span class="mint-datetime-action mint-datetime-cancel" @click="addrChooseCancel()">取消</span>
                            <span class="mint-datetime-action mint-datetime-confirm" @click="addrChooseConfirm()">确定</span>
                        </div>
                        <mt-picker :slots="addressSlots" :valueKey="'name'" @change="onAddressChange" :visible-item-count="5"></mt-picker>
                    </div>
                    <!-- <p class="page-picker-desc">地址: {{ addressProvince }} {{ addressCity }}</p> -->
                </div>
            </mt-popup>
            <mt-popup v-model="shopPopupVisible" position="bottom" :closeOnClickModal="false">
                <div class="page-picker shop-picker">
                    <div class="page-picker-wrapper">
                        <div class="picker-toolbar">
                            <span class="mint-datetime-action mint-datetime-cancel" @click="shopChooseCancel()">取消</span>
                            <span class="mint-datetime-action mint-datetime-confirm" @click="shopChooseConfirm()">确定</span>
                        </div>
                        <mt-picker :slots="shopSlots" :valueKey="'shopName'" :visible-item-count="5" @change="onShopChange"></mt-picker>
                    </div>
                </div>
            </mt-popup>
        </main>
        <div class="smi-action-bar actionbar-fixed-bottom" v-show="isShowCheckBtn">
            <button type="button" @click="checkSell()">确认核销</button>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import GoBack from '@/components/GoBack';
import LoadMore from '@/components/LoadMore.vue';
import { MessageBox } from 'mint-ui'


export default {
    name: 'check-sell-ticket',
    components: {
        'load-more': LoadMore,
        'go-back': GoBack
    },
    data() {
        return {
            addrPopupVisible: false,
            addressSlots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                },
                {
                    divider: true,
                    content: '-',
                    className: 'slot2'
                },
                {
                    flex: 1,
                    values: [],
                    className: 'slot3',
                    textAlign: 'center'
                },
            ],
            allShopAddress: [],
            shopPopupVisible: false,
            shopSlots: [
                {
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            shopList: [],
            shopChooseInfo: {},
            ticketCode: '',

            proVinceChoose: {},
            proVinceChooseCache: {},

            cityChoose: {},
            cityChooseCache: {},

            disChoose: {},
            disChooseCache: {},

            addrChooseInfo: {},

            addressInfoCache: {},  // 选择前的地址缓存,取消则还原
            shopInfoCache: {}, // 选择前门店信息缓存,取消则还原
            addrPicker: null,
            shopPicker: null,

            isShowCheckBtn: true,
        }
    },
    computed: {
        ...mapGetters({
        })
    },
    mounted() {
        this.getShopAddrList()
    },
    methods: {
        showAddrChoose() {
            this.addrPopupVisible = true
        },
        onAddressChange(picker, values) {
            if (!this.addrPicker) {
                this.addrPicker = picker
            }
            // 省发生变化
            if (values[0] && this.proVinceChooseCache.id !== values[0].id) {
                this.proVinceChooseCache = values[0]
                picker.setSlotValues(1, values[0].citys);
            }
            // 市发生变化
            if (values[1] && this.cityChooseCache.id !== values[1].id) {
                picker.setSlotValues(2, values[1].dists);
                this.cityChooseCache = values[1]
            }
            // 区发生变化
            if (values[2] && this.disChooseCache.id !== values[2].id) {
                this.disChooseCache = values[2]
            }
        },
        addrChooseCancel() {
            this.addrPopupVisible = false
        },
        addrChooseConfirm() {
            this.addrPopupVisible = false

            this.proVinceChoose = this.addrPicker.getValues()[0]
            this.cityChoose = this.addrPicker.getValues()[1]
            this.disChoose = this.addrPicker.getValues()[2]

            this.filterShopListByAddr()
        },


        showShopChoose() {
            this.shopPopupVisible = true
        },
        onShopChange(picker, values) {
            if (!this.shopPicker) {
                this.shopPicker = picker
            }
        },
        shopChooseCancel() {
            this.shopPopupVisible = false
        },
        shopChooseConfirm() {
            this.shopPopupVisible = false
            this.shopChooseInfo = this.shopPicker.getValues()[0]
        },

        getShopAddrList() {
            var userInfo = JSON.parse(this.$_cookie.get('shop_userinfo'))
            this.$_api.get({
                ext: 'check-sell/get-province-city-district',
                businessId: userInfo.businessId,
            }, true)
                .then(res => {
                    if (res.code === 1) {
                        this.allShopAddress = res.data
                        this.initAddrChoose()
                    }
                })
        },
        initAddrChoose() {
            this.addressSlots[0].values = this.allShopAddress
            this.addressSlots[2].values = this.allShopAddress[0].citys
            this.addressSlots[4].values = this.allShopAddress[0].citys[0].dists

            this.proVinceChoose = this.allShopAddress[0]
            this.cityChoose = this.allShopAddress[0].citys[0]
            this.disChoose = this.allShopAddress[0].citys[0].dists[0]

            this.filterShopListByAddr()
        },
        filterShopListByAddr() {
            this.addrPopupVisible = false
            this.$_api.get({
                ext: 'check-sell/shop-list',
                province_id: this.proVinceChoose.id,
                city_id: this.cityChoose.id,
                district_id: this.disChoose.id
            })
                .then(res => {
                    if (res.code === 1) {
                        this.shopList = res.data
                        this.shopSlots[0].values = res.data
                        this.shopChooseInfo = res.data[0]
                    }
                })
        },
        scanTicket() {
            this.$_social.scanQrCode()
                .then(res => {
                    console.log(res)
                    this.ticketCode = res
                })
                .catch(err => {
                    this.$_showtip('扫描调起失败,请手动输入!', 'error')
                })
        },
        checkSell() {
            this.checkData()
                .then(() => {
                    this.$_api.post({
                        ext: 'check-sell/qr-code',
                        shop_id: this.shopChooseInfo.shopId,
                        qr_code: this.ticketCode,
                    }, true)
                        .then(res => {
                            if (res.code === 1) {
                                // this.$_showtip('核销成功!')
                                // this.$router.push({
                                //     path: '/check-sell-history'
                                // })
                                MessageBox({
                                    title: '',
                                    message: '核销成功!',
                                    confirmButtonText: '确认',
                                    showCancelButton: false
                                }).then(action => {
                                    if (action === 'confirm') {
                                        this.ticketCode = ''
                                    }
                                })
                            }
                            else {
                                MessageBox({
                                    title: '',
                                    message: '核销失败,'+res.msg,
                                    confirmButtonText: '确认',
                                    showCancelButton: false
                                }).then(action => {
                                    // if (action === 'confirm') {
                                    //     this.ticketCode = ''
                                    // }
                                })
                                // MessageBox.alert()
                                // this.$_showtip('核销失败,' + res.msg, 'error')
                            }
                        })
                })
                .catch(err => {
                    this.$_showtip(err, 'error')
                })
        },
        checkData() {
            return new Promise((resolve, reject) => {
                if (!this.shopChooseInfo.shopId) {
                    throw '请选择门店'
                }
                if (this.ticketCode.trim() === '') {
                    throw '请扫描或输入星美券码'
                }
                resolve(true)
            })
        },
        hideCheckBtn() {
            this.isShowCheckBtn = false
        },
        showCheckBtn() {
            setTimeout(() => {
                this.isShowCheckBtn = true
            }, 300)
        }
    }
}
</script>
<style lang="scss" src="./check-sell-ticket.scss" scoped></style>
