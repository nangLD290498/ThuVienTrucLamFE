<template>
  <div>
    <section class="section">
      <div class="section-header d-block p-3">
        <div class="section-title m-0 main-color">{{ cateName }} (tất cả)</div>
      </div>
    </section>

    <div class="row">
        <div v-for="book in books" class="col-3" :key="book">
          <div class="card card-warning" style="max-width: 260px; max-height: 365px; margin: auto;">
            <div class="card-body" style="height: 300px;">
              <a href="#">
                  <img :src="getThumbnailUrl(book.id)" style='height: 100%; width: 100%; object-fit: contain; background-color: #f4f6f9;'/>
              </a>
            </div>
            <div class="card-details" style="height: 95px; padding-left: 10px;">
                <router-link :to="{name: 'books.read', params: { id: book.id }}">
                  <a href="#"><p class="main-color-light" id="book-name"> {{book.name}} </p></a>
                  <a href="#">
                    <p class="details">Tác giả: {{ book.author }}</p>
                  <p class="details">Xuất bản: {{ book.publishedYear }}</p>
                  </a>    
                </router-link>
                </div>
          </div>
        </div>      
    </div>
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
</template>

<script>
import { mapState } from 'vuex';
import CONSTANT from '../../../config/constants';
import config from '../../../config/index';
import Paginate from 'vuejs-paginate-next';

export default {
  name: "ListBook",
  components: {
     paginate: Paginate,
  },
  data() {
    return {
      page: CONSTANT.DEFAULT_PAGE,
      config: config,
      id: this.$route.params.id,
      cateName: this.$route.params.name,
    }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState('Book', ['books', 'pageCount'])
  },
  methods: {
    clickCallback() {
      this.getData();
    },
    getData() {
      this.$store.dispatch('Book/getByCate', {cateId: this.id, page: this.page})
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
      .pagination{
      display: inline-flex;
    }
    .text-center{
      padding-top: 14px;
      background-color: white;
      margin-bottom: 50px;
    }
</style>