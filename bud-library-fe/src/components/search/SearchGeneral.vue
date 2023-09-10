<template>
    <div class="search-body">
        <div>
            <section class="section">
            <div class="section-header d-block p-3">
                <div class="section-title m-0 main-color">Kết quả tìm kiếm {{ category }}</div>
            </div>
            </section>
        </div>
        <select name="categories" id="cate" v-model="category" @change="reloadSearchResult(category)">
          <option value="*">Tất cả</option>
          <option v-for="cate in categories" :key="cate" :value="cate" >{{ cate }}</option>
        </select>
        <h6>{{ totalElementsV2 }} kết quả</h6><br>
        <div class="table">
            <table>
                <tr>
                    <th>#</th>
                    <th style="min-width:111px;">Thư mục</th>
                    <th>Sách</th>
                    <th style="min-width:100px;">Tác giả</th>
                    <th style="min-width:111px;">Mục lục</th>
                    <th>Trang</th>
                    <th>Nội dung</th>
                    <th style="min-width:100px;">Chi tiết</th>
                </tr>
                <tr v-for="(item, index) in searchItemsV2" :key="item">
                    <td>{{ index +1 }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.book_name }}</td>
                    <td>{{ item.author }}</td>
                    <td>{{ item.header_content }}</td>
                    <td>{{ item.page_no }}</td>
                    <td>{{ item.content }}</td>
                    <td>
                        <button class="view-details">xem</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      searchText: this.$route.params.search,
      category: '*',
      searchItemsV2: [],
      totalElementsV2: 0,
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
      this.$store.dispatch('Search/get', {page: 1, searchText: this.searchText, category: this.category}).then(response => {
              this.searchItemsV2 = response.data.content;
              this.totalElementsV2 = response.data.totalElements;
            });
      this.$store.dispatch('Category/get');
    },
    reloadSearchResult(cate) {
      console.log("loggg")
      this.$store.dispatch('Search/get', {page: 1, searchText: this.searchText, category: cate}).then(response => {
              this.searchItemsV2 = response.data.content;
              this.totalElementsV2 = response.data.totalElements;
            });
    },
  }
}
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th{
  background-color: #dddddd;
}
.view-details{
    background-color: #007ad9;
    color: white;
}
h6{
    width: 99px;
    float: left;
    margin: 0px;
    padding-bottom: 25px;
}
#cate{
  float: right;
}
.table{
  margin-bottom: 50px;
}
</style>