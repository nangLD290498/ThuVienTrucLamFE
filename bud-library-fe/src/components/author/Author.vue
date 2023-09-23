<template>
  <section class="section">
    <div class="section-header d-block">
      <div class="section-title mt-0">Tác giả</div>
    </div>
    <div class="section-body">
          <div class="card">
            <div class="card-body">
              <i><b><span>{{  total }}</span></b> tác giả</i>
              <table class="table-hover table">
                <thead>
                <tr>
                  <th scope="col" style="width: 10px">#</th>
                  <th scope="col" style="width: 200px">Tên tác giả</th>
                  <th scope="col">Số lượng sách</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(author, index) in authors" :key="author"  @click="goToListBooks(author)">
                  <td>{{ index + 1 + (page-1)*pageSize }}</td>
                  <td>{{ author.author }}</td>
                  <td>{{ author.count }} Sách</td>
                </tr>
                </tbody>
              </table>
              <nav class="text-center">
                <paginate
                    v-model="page"
                    :page-count="pageCount"
                    :page-range="3"
                    :margin-pages="2"
                    :container-class="'pagination'"
                    :click-handler="clickCallback"
                    :page-class="'page-item'"
                    :next-link-class="'page-link'"
                    :prev-link-class="'page-link'">
                </paginate>
              </nav>
            </div>
          </div>
    </div>
  </section>
</template>

<script>
import CONSTANT from '../../config/constants';
import { mapState } from 'vuex';
import Paginate from 'vuejs-paginate-next';

export default {
  data() {
    return {
        page: CONSTANT.DEFAULT_PAGE,
        pageSize: CONSTANT.PAGE_SIZE,
    }
  },
  components: {
     paginate: Paginate,
  },
 computed: {
    ...mapState('Author', ['authors', 'pageCount', 'total'])
  },
   created() {
    this.getData();
  },
  methods: {
    goToListBooks(item){
      this.$router.push({name: 'allBooksByAuthor' , params: { author: item.author }})
    },
    clickCallback() {
      this.getData();
    },
    getData() {
      this.$store.dispatch('Author/get', {page: this.page})
      .then(response => {
        this.authors = response.data.content
        this.totalElements = response.data.totalElements
        });
    }
 }
}

</script>

<style scoped>
  .section {
    position: inherit;
  }
  .pagination{
     display: inline-flex;
  }
  .text-center{
    padding-top: 14px;
    background-color: whitesmoke;
  }
  tr{
    cursor: pointer;
  }
</style>