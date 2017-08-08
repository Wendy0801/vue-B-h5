<template>
  <!-- App -->
  <div id="app" class="app" :class="{'h5-in-app':isApp,'h5-in-wechat':isWechat}">
    <router-view></router-view>
    <transition name="fade">
      <loading v-show="loadingNow"></loading>
    </transition>
    <mt-popup v-model="popupVisible" position="top" class="mint-popup-2" :class="popupClass" :modal="false">
      <p>{{message}}</p>
    </mt-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Loading from '@/components/Loadding';

export default {
  components: {
    'loading': Loading
  },
  data() {
    return {
      popupVisible: false,
      popupClass: 'info',
      message: '操作成功',
      showMusicPlayer: false,
      musicBarDeg: 0,
    }
  },
  computed: {
    ...mapGetters({
      loadingNow: 'getLoadingStatu',
      actionStatu: 'getActionStatu',
      userinfo: 'getUserinfo',
      isWechat:'getIsWechat',
      isApp:'getIsApp',
    })
  },
  watch: {
    'actionStatu': function () {
      this.type = this.actionStatu.type;
      this.popupClass = this.actionStatu.isFromApp
        ? `${this.actionStatu.type} mint-popup-app`
        : this.actionStatu.type;
      this.message = this.actionStatu.message;
      this.popupVisible = true;
      setTimeout(() => {
        this.popupVisible = false;
      }, 1500)
    }
  },
  mounted() {
 
  },
  methods: {
    addUserinfo() {
      this.$store.dispatch('SET_USERINFO', {
        // username: 'xiaobing',
        // age: 27
      })
    },
    changeUserinfo() {
      this.$store.dispatch('SET_USERINFO', {
        // username: '张三',
        // age: 27
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.fade-leave-active {
  opacity: 0;
  transition: all 0.5s ease
}
</style>
