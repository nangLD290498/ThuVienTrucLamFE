<template>
    <div class="row search-bar">
            <i  class="fas fa-book-open mr-2"></i>
            <select name="categories" id="cate" v-model="category" @change="reloadSearchResult(category, 1)">
              <option value="*">Tất cả</option>
              <option v-for="cate in categories" :key="cate.name" :value="cate.name" >{{ cate.name }}</option>
            </select>
            <input v-model="searchText"  class="ng-tns-c84-8 ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input ng-star-inserted" type="text" placeholder="Tìm kiếm: kinh trường bộ hoặc như lai + công đức" size="50">
            <button class="btn-search" @click="reloadSearchResult(category, 1)"><i class="fas fa-search fa-fw"></i></button>
    </div>
    <div class="search-body" style="margin: 40px 100px;" >
        <div>
            <section class="section">
            <div class="section-header d-block p-3">
                <div class="section-title m-0 main-color">Kết quả tìm kiếm</div>
            </div>
            </section>
        </div>
        <h6>{{ totalElementsV2 }} kết quả</h6><br>
        <div class="table" v-if="totalElementsV2 > 0">
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
                    <td>{{ index + 1 + (page-1)*pageSize }}</td>
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
        <nav class="text-center" v-if="totalElementsV2 > 0">
            <paginate
              v-model="page"
              :page-count="pageCount"
              :page-range="3"
              :margin-pages="2"
              :click-handler="clickCallback"
              :container-class="'pagination'"
              :page-class="'page-item'"
              :next-link-class="'page-link'"
              :prev-link-class="'page-link'">
            </paginate>
          </nav>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import Paginate from 'vuejs-paginate-next';
import CONSTANT from '../../config/constants';

export default {
  components: {
     paginate: Paginate,
  },
  data() {
    return {
      searchText: '',
      category: '*',
      searchItemsV2: [],
      pageCount: 0,
      totalElementsV2: 0,
      page: CONSTANT.DEFAULT_PAGE,
      pageSize: CONSTANT.PAGE_SIZE,
    }
  },
  computed: {
    ...mapState('Category', ['categories'])
  },
  created(){
    this.$store.dispatch('Category/get');
  },
  methods: {
    clickCallback() {
      this.reloadSearchResult(this.category, this.page);
      window.scrollTo(0, 0)
    },
    reloadSearchResult(cate, page) {
      console.log("searchText: ", this.searchText)
      if(!this.searchText == null && !this.searchText == undefined  || !this.searchText.trim() == ''){
        this.page = page
        this.$store.dispatch('Search/get', {page: page, searchText: this.searchText, category: cate}).then(response => {
              this.searchItemsV2 = response.data.content;
              this.totalElementsV2 = response.data.totalElements;
              this.pageCount = response.data.totalPages;
            });
      }
    },
  }
}
</script>

<style scoped>
.fa-book-open:before {
    content: "\f518";
    font-size: 33px;
}
.btn-search{
   background: #c6ccd4;;
   border: 1px solid #767676;
   width: 50px;
   margin-left: 3px;
}
.btn-search:hover{
   background: #44d064;
   border: 1px solid #767676;
   width: 50px;
   margin-left: 3px;
}
.cate-drop{
  background: white;
  border: 1px solid transparent;
}
.search-bar{
  margin: 30px auto;
  justify-content: center;
}
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
.pagination{
  float:right;
}
</style>