<template>
  <div class="d-none">  {{loadScript}} </div>
  <div class="base-page">
    <div class="bg" :style="cssProps"></div>
    <Header></Header>
    <div class="main" style="position: relative; z-index: 1050;">
      <router-view class="main-content" style="padding: 80px 100px 0 100px !important;" :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>


<script>
import Header from '../parts/normals/Header.vue'
import Footer from '../parts/normals/Footer.vue'

export default {
  data() {
    return {
      cssProps: {
      },
      loadScript: false
    }
  },
  components:{
    Header, Footer
  },
  created(){
    if(this.loginedUser)
      this.$store.dispatch('Account/getProfile');
  },
    mounted() {
        console.log('Component mounted BaseAdmin.')
        this.loadScript = true;
    },
    updated: function () {
        this.$nextTick(function () {
        })
    },
}
</script>

<style>

.bg {
  position: relative;
  z-index: 1;
}
.bg:before {
  content: " ";
  top: 0;
  left: 0;
  width: 100%;
  height: 1000px;
  opacity: .7;
  z-index: -1;
}
.navbar {
  left: 0;
}
.main-color {
  color: rgb(163 122 0 / 90%) !important;
}
.main-color-light {
  color: rgb(255, 164, 38) !important;
}
.table-content-item {
  background-color: rgb(253, 247, 235);
  border: 1px solid rgb(255, 245, 187);
  width: 100%;
  vertical-align: middle;
  line-height: 30px;
  padding-left: 10px;
}
</style>