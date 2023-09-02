<template>
  <section class="section">
    <div class="section-header d-block">
      <div class="section-title mt-0">Quản lý sách</div>
      <div class="add-book">
        <div class="row">
          <div class="col-md-12">
            <div class="float-right">
              <router-link to="/admin/books/add" class="btn btn-success">Thêm sách</router-link>
<!--              <button class="btn btn-danger mx-2 trigger--fire-modal-confirm" data-toggle="modal" data-target="#fire-modal-confirm">Delete all</button>-->
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
              <nav class="text-center float-right">
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
              <table class="table-hover table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên sách</th>
                  <th scope="col">Tác giả</th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="book in books" :key="book.id">
                  <td>{{ book.id }}</td>
                  <td> <b>{{ book.name }} - {{ book.author }}</b></td>
                  <td>
                    <span class="badge badge-info"> {{ book.publisher }} </span>
                    <span class="badge badge-info"> {{ book.publishedYear }} </span>
                    <span class="badge badge-info mx-1"> {{ book.category.name }} </span>
                  </td>
                  <td>
                    <div class="btn-group" role="group">
                      <!--                      <button class="btn btn-danger" @click="_delete(book)">Delete</button>-->
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

export default {
  data() {
    return {
      page: CONSTANT.DEFAULT_PAGE,
      filterParams: {},

    }
  },
  computed: {
    ...mapState('Book', ['books', 'pageCount', 'total'])
  },
  components: {
  },
  created() {
    this.getPageNum();
    this.getData();
  },
  methods: {
    filter() {
      let _this = this;
      this.filterParams.page = this.page;
      this.$store.dispatch('Book/get', this.filterParams).then(() => {
      }).catch(function (error) {
        _this.$notify({type: 'error', text: 'Execute failed!'});
      });
    },
    truncateBooks() {
      let _this = this;
      this.$store.dispatch('Book/truncate')
          .then(() => {
            this.$notify({type: 'success', text: 'Delete successfully!'});
            document.getElementById("close-confirm-modal").click();
            this.getData();
          }).catch(function (error) {
        _this.$notify({type: 'error', text: 'Execute failed!'});
      });
    },
    _delete(book) {
      let _this = this;
      this.$store.dispatch('Book/delete', book)
          .then(() => {
            this.$notify({type: 'success', text: 'Delete successfully!'});
            this.getData();
          }).catch(function (error) {
        _this.$notify({type: 'error', text: 'Execute failed!'});
      });
    },
    getData() {
      let _this = this;
      this.$store.dispatch('Book/get', {page: this.page}).then(() => {
      }).catch(function (error) {
        _this.$notify({type: 'error', text: 'Execute failed!'});
      });
    },
    clickCallback(page) {
      this.page = page;
      this.$router.replace({name: "books", query:{page: page}});
      this.getData();
    },
    getPageNum() {
      if(this.$route.query.page)
        this.page = parseInt(this.$route.query.page);
    },
    isConfirm() {
      this.truncateBooks();
    }
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
</style>
