<template>
  <section class="section">
    <div class="section-header d-block">
      <div class="section-title mt-0">Danh mục</div>
    </div>
    <div class="section-body">
          <div class="card">
            <div class="card-body">
              <i><b><span>{{ categories.length }}</span></b> danh mục </i>
              <table class="table-hover table">
                <thead>
                <tr>
                  <th scope="col" style="width: 10px">#</th>
                  <th scope="col" style="width: 200px">Tên danh mục</th>
                  <th scope="col">Số lượng sách</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in categories" :key="item.id"  @click="goToListBooks(item)"> 
                  <td>{{ index + 1 }}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.count}} Sách</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
    }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState('Category', ['categories'])
  },
  methods: {
    getData() {
      this.$store.dispatch('Category/get');
    },
    goToListBooks(item){
      this.$router.push({name: 'allBooks' , params: { id: item.id, name: item.name }})
    }
 }
}

</script>

<style scoped>
  .section {
    position: inherit;
    margin-top: 80px;
    margin-bottom: 80px;
    padding: 0px 100px 0px !important;
  }
  tr{
    cursor: pointer;
  }
</style>