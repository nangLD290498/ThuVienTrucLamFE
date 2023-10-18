<template>
  <section class="section">
    <div class="section-header d-block">
      <div class="section-title mt-0">Quản lý sách</div>
      <div class="add-book">
        <div class="row">
          <div class="col-md-12">
            <div class="float-right">
              <router-link to="/admin/books/add" class="btn btn-success">Thêm sách</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <i><b><span>{{ total }}</span></b> books</i>
              <table class="table-hover table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên sách</th>
                  <th scope="col">Chi tiết</th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for=" (book, index) in books" :key="book.id">
                  <td>{{ index + 1 + (page-1)*pageSize }}</td>
                  <td> <b>{{ book.name }} - {{ book.author }}</b></td>
                  <td>
                    <span class="badge badge-info"> {{ book.publisher }} </span>
                    <span class="badge badge-info"> {{ book.publishedYear }} </span>
                    <span class="badge badge-info mx-1"> {{ book.category.name }} </span>
                  </td>
                  <td>
                    <div class="btn-group" role="group">
                      <router-link :to="{name: 'admin.books-update', params: { id: book.id, cate: book.category.name }}">
                        <i class="fas fa-edit" title="Chỉnh xửa sách"  style="font-size:15px;color:black; cursor: pointer;"></i>
                      </router-link>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i class="fas fa-trash-alt" @click="_delete(book)"  title="Xóa sách"  style="font-size:15px;color:red; cursor: pointer;"></i>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
              <nav class="text-center">
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CONSTANT from '../../../config/constants';
import { mapState } from 'vuex';
import Paginate from 'vuejs-paginate-next';

export default {
  data() {
    return {
      page: CONSTANT.DEFAULT_PAGE,
      pageSize: CONSTANT.PAGE_SIZE,
      filterParams: {},

    }
  },
  computed: {
    ...mapState('Book', ['books', 'pageCount', 'total'])
  },
  components: {
     paginate: Paginate,
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let _this = this;
      this.$store.dispatch('Book/get', {page: this.page}).then(() => {
      }).catch(function (error) {
        _this.$notify({type: 'error', text: 'Execute failed!'});
      });
    },
    clickCallback() {
      this.getData();
    },
    _delete(book) {
      if (confirm("Bạn thực sự muốn xóa sách này !")) {
        this.$store.dispatch('Book/delete', book)
            .then(() => {
              this.$notify({type: 'success', text: 'Xóa thành công !'});
              this.getData();
            }).catch(function (error) {
          _this.$notify({type: 'error', text: 'Execute failed!'});
        });
      } else {
       
      }
      // let _this = this;
      
    },
  }
}
</script>

<style scoped>
  div .section-title {
    display: inline-block;
  }
  .add-book {
    display: inline-block;
    float: right;
  }
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
</style>