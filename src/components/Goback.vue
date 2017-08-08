<template>
  <div>

    <div v-if="!isApp">
      <div v-if="hashNow!==enterHash" class="smi-header-icon smi-header-icon-left" @click="goBack">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div v-if="hashNow===enterHash" class="smi-header-icon smi-header-icon-left" @click="goHome">
        <i class="iconfont icon-shouye"></i>
      </div>
    </div>

    <div v-if="isApp">
      <a v-if="!url" class="smi-header-icon smi-header-icon-left" href="smifun://back?page=information">
        <i class="iconfont icon-fanhui"></i>
      </a>
      <div v-if="url">
        <a v-if="url!=='justgoback'" class="smi-header-icon smi-header-icon-left" :href="url">
          <i class="iconfont icon-shouye"></i>
        </a>
        <div v-if="url==='justgoback'" class="smi-header-icon smi-header-icon-left" @click="goBack">
          <i class="iconfont icon-shouye"></i>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'Goback',
    props: [
      'isApp',
      'url',
      'title'
    ],
    data() {
      return {
        hashNow: '',
        // enterHash:''
      }
    },
    computed: {
    ...mapGetters({
        'enterHash': 'getEnterHash',
      })
    },
    mounted() {
      this.hashNow = window.location.hash;
      // console.log(this.enterHash)
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      goHome() {
        this.$router.push({ 'path': '/' });
        this.$store.dispatch('SET_ENTER_HASH', '');
      }
    },
    beforeDestroy() {
      // alert('销毁了')
    },
    beforeRouteLeave(to, from, next) {
    }
  }

</script>
<style lang="scss">

</style>