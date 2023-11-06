<template>
  <div class="categories" v-for="cate in bookcases" :key="cate.id">
    <div>
      <section class="section">
        <div class="section-header d-block p-3">
          <div class="section-title m-0 main-color">
            <router-link :to="{name: 'allBooks' , params: { id: cate.id, name: cate.name }}" class = "cate">
              {{cate.name}}
            </router-link>
          </div>
        </div>
      </section>

      <div class="row">
          <div v-for="book in cate.books" class="col-3" :key="book">
            <div class="card card-warning" style="max-width: 260px; height: 100%; margin: auto;">
              <div class="card-body" style="height: 300px;">
                <router-link :to="{name: 'books.read', params: { id: book.id }}">
                  <img :src="getThumbnailUrl(book.id)" style='height: 100%; width: 100%; object-fit: contain; background-color: #f4f6f9;'/>
                </router-link>
              </div>
              <div class="card-details" style=" height:120px; overflow: hidden; padding-left: 10px;">
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
    }
  },
  created() {
    this.getData();
  },
  computed: {
    ...mapState('Bookcase', ['bookcases'])
  },
  methods: {
    getData() {
      this.$store.dispatch('Bookcase/get');
    },
    getThumbnailUrl(bookId) {
      return this.config.VUE_APP_BASE_URL + `/books/${bookId}/thumbnail`;
    }
  }
}
</script>

<style scoped>
    .cate{
          color: rgb(163 122 0 / 90%) !important;
          font-weight: bold;
    }
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
      /* margin-bottom: 50px; */
    }
    .categories{
      margin: 80px 100px;
    }
</style>