<template>
    <div>
        <header class="smi-header">
            <go-back></go-back>
            <h2>修改密码</h2>
        </header>
        <main class="smi-content">
    
            <div class="password-reset-form">
                <div class="smi-content-user">
                    <input type="password" placeholder="请输入初始密码" v-model="orgin_password">
                </div>
    
                <div class="smi-content-pwd">
                    <input type="password" placeholder="输入新密码" v-model="new_password">
                </div>
    
                <div class="smi-content-pwd">
                    <input type="password" placeholder="再次输入新密码" v-model="repeat_password">
                </div>
            </div>
    
            <div class="smi-content-login" @click="goResetPwd()">
                <span>确认修改</span>
            </div>
        </main>
    </div>
</template>

<script>
import GoBack from '@/components/GoBack';

export default {
    name: 'login',
    components: {
        'go-back': GoBack
    },
    data() {
        return {
            isShow: false,
            orgin_password: '',
            new_password: '',
            repeat_password: '',
        }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        goResetPwd() {
            this.checkData()
                .then(() => {
                    var userInfo = JSON.parse(this.$_cookie.get('shop_userinfo'))
                    this.$_api.post({
                        ext: 'user/editPassword',
                        userId: userInfo.userId,
                        oldPassword: this.$_api.md5(this.orgin_password),
                        fristNewPassword: this.$_api.md5(this.new_password),
                        secNewPassword: this.$_api.md5(this.repeat_password),
                    }, true)
                        .then(res => {
                            if (res.code === 1) {
                                this.$_showtip('修改密码成功,请重新登录!')
                                this.$_cookie.set({
                                    'shop_userinfo': res.data.user,
                                    'shop_token': res.data.shopToken
                                }, -24 * 60)
                                this.$router.replace({
                                    'path': '/login'
                                })
                            }
                            else {
                                this.$_showtip(res.msg, 'error')
                            }
                        })
                })
                .catch(err => {
                    console.log(err)
                    this.$_showtip(err, 'error')
                })
        },
        checkData() {
            return new Promise((resolve, reject) => {
                if (this.orgin_password === '') {
                    throw '原始密码不能为空'
                }
                else if (this.new_password === '') {
                    throw '新密码不能为空'
                }
                else if (this.repeat_password !== this.new_password) {
                    throw '两次密码不一致'
                }
                resolve(true)
            })
        }
    }
}
</script>
<style lang="scss" src="./password-reset.scss" scoped></style>

