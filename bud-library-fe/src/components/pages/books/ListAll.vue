<template>
  <div>
    <section class="section">
      <div class="section-header d-block p-3">
        <div class="section-title m-0 main-color">Kinh (tất cả)</div>
      </div>
    </section>

    <div class="row">
      <div v-for="item in nldTestList" :key="item">
        <div v-for="book in books" class="col-3" :key="book">
          <div class="card card-warning" style="max-width: 260px; max-height: 365px; margin: auto;">
            <div class="card-body" style="height: 300px;">
              <a href="#">
                  <img :src="getThumbnailUrl(book.id)" style='height: 100%; width: 100%; object-fit: contain; background-color: #f4f6f9;'/>
              </a>
            </div>
            <div class="card-details" style="height: 95px; padding-left: 10px;">
                <a href="#"><p class="main-color-light" id="book-name"> {{book.name}} </p></a>
                <a href="#">
                  <p class="details">Tác giả: sư ông Thanh Từ</p>
                  <p class="details">Xuất bản: 2021</p>
                </a>
              </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CONSTANT from '../../../config/constants';
import config from '../../../config/index';

export default {
  name: "ListBook",
  data() {
    return {
      page: CONSTANT.DEFAULT_PAGE,
      config: config,
      nldTestList: [ 1, 2 ,3 ,4 , 5, 6, 7, 8, 9, 10 ]
    }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState('Book', ['books', 'pageCount'])
  },
  methods: {
    getData() {
      this.$store.dispatch('Book/get', {page: 1 });
    },
    getThumbnailUrl(bookId) {
      return this.config.VUE_APP_BASE_URL + `/books/${bookId}/thumbnail`;
    }
  }
}
</script>

<style scoped>
    .card-body{
      border: 1px solid #cdd3d8;
      padding: 0px;
    }
    #book-name{
      font-size: 16px;
      font-weight: bold;
      color: #a98517 !important;
      margin-bottom: 2px;
    }
    .details{
      margin-bottom: 0;
      line-height: 21px;
      color: #4f4f4f ;
      font-weight: 600;
    }
    .card-details{
      background-color: #28a7457a;
    }
    .row .col-3{
      max-width: 100%;
      margin-bottom: 50px;
    }
</style>