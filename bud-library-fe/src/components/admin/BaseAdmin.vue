<template>
  <div class = "bg bg-header">
    <Header></Header>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { defineComponent, isProxy, toRaw } from "vue";
import Header from '../parts/normals/HeaderAdmin.vue'

export default defineComponent({
  components: {
    Header
  },

  updated: function () {
    this.$nextTick(function () {
      require("../../../public/library/jquery/dist/jquery.min.js");
      require("../../../public/library/popper.js/dist/popper.js");
      require("../../../public/library/tooltip.js/dist/tooltip.js");
      require("../../../public/library/bootstrap/dist/js/bootstrap.min.js");
      require("../../../public/library/jquery.nicescroll/dist/jquery.nicescroll.min.js");
      require("../../../public/js/stisla.js");
      require("../../../public/js/custom.js");
      require("../../../public/js/scripts.js");
    })
  },
})
</script>
<style scoped>
.main-content {
  padding-right: 100px;
  padding-left: 100px;
  margin-bottom: 200px;
}
</style>

