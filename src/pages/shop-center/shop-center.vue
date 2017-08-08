<template>
    <div class="shop-center-page">
        <header class="smi-header">
            <h2>商家中心</h2>
            <div class="smi-header-icon smi-header-icon-right" @click="showLogoutWrap()">
                <i class="iconfont icon-shezhi"></i>
            </div>
            <div class="setting-wrap" v-show="settingVisible">
                <ul class="setting-list">
                    <li class="setting-item">
                        <router-link class="setting-item-container" :to="{'path':'/password-reset'}">
                            <i class="iconfont icon-mima"></i>
                            <span>修改密码</span>
                        </router-link>
                    </li>
                    <li class="setting-item">
                        <div class="setting-item-container" @click="logOut()">
                            <i class="iconfont icon-tuichu"></i>
                            <span>退出登录</span>
                        </div>
                    </li>
                </ul>
            </div>
        </header>
        <main class="smi-content" @click="settingVisible=false">
            <div class="shop-placeholder-bg"></div>
            <div class="shop-center-main cl">
                <router-link class="center-nav-item fl" :to="{'name':'check-sell-ticket'}">
                    <i class="iconfont icon-zhifuhexiaomingxi"></i>
                    <h5 class="icon-title-l">核销券码</h5>
                </router-link>
                <router-link class="center-nav-item fl" :to="{'name':'check-sell-history'}">
                    <i class="iconfont icon-sorderaudit"></i>
                    <h5 class="icon-title-r">核销历史</h5>
                </router-link>
            </div>
            <div style="height:200px;"></div>
        </main>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default {
    name: 'center',
    data() {
        return {
            settingVisible: false
        }
    },
    mounted() {
    },
    methods: {
        showLogoutWrap() {
            this.settingVisible = !this.settingVisible
        },
        logOut() {
            this.logoutVisible = false;
            MessageBox({
                title: '',
                message: '确定退出登录吗?',
                confirmButtonText: '确定',
                showCancelButton: true
            }).then(action => {
                if (action === 'confirm') {
                    this.$_cookie.set({
                        'shop_userinfo': '',
                        'shop_token': ''
                    }, -24 * 60)
                    this.$router.replace({
                        path: '/login'
                    })
                }
            });
        }
    }
}
</script>
<style lang="scss" src="./shop-center.scss" scoped></style>


