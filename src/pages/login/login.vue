<template>
  <div>
    <header class="smi-header">
      <!-- <go-back></go-back> -->
      <h2>商家登录</h2>
    </header>
    <main class="smi-content">
      <div class="smi-content-img">
        <img src="../../assets/login_logo.png" alt="">
      </div>
  
      <div class="smi-content-title">
        星美生活商家中心
      </div>
  
      <div class="smi-content-user">
        <i class="iconfont icon-touxiang"></i>
        <input type="text" placeholder="商家帐号" v-model="username">
      </div>
  
      <div class="smi-content-pwd">
        <i class="iconfont icon-mima1"></i>
        <input type="password" placeholder="密码" v-model="password">
      </div>
  
      <div class="smi-content-login" @click="goLogin()">
        <span>登录</span>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      isShow: false,
      username: 'test5',
      password: '123qwe'
    }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    goLogin() {
      this.checkData()
        .then(() => {
          this.$_api.post({
            ext: 'login/user-login',
            username: this.username,
            password: this.$_api.md5(this.password)
          }, true)
            .then(res => {
              if (res.code === 1) {
                this.$_cookie.set({
                  'shop_userinfo': {
                    'businessId':res.data.user.businessId,
                    'userId':res.data.user.userId,
                    'shopId':res.data.user.shopId,
                  },
                  'shop_token': res.data.shopToken
                })
                this.$router.replace({
                  'path': '/'
                })
              }
              else {
                this.$_showtip(res.msg, 'error')
              }
            })
        })
        .catch(err => {
          this.$_showtip(err, 'error')
        })
    },
    checkData() {
      return new Promise((resolve, reject) => {
        if (this.username === '') {
          throw '用户名不能为空'
        }
        else if (this.password === '') {
          throw '密码不能为空'
        }
        resolve(true)
      })
    }
  }
}
</script>
<style lang="scss" src="./login.scss" scoped></style>

