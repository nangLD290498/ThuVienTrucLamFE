<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="z-index: 2000; position: inherit; width:100%; ">
    <a class="navbar-brand" href="#" style="color: #ffa426;">Thư viện trúc lâm</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item home">
          <router-link to="/" class="nav-link main-color">Đầu sách<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item admin">
          <router-link :to="{ name: 'admin.books'}" class="nav-link main-color">Quản lý sách</router-link>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" v-model="searchText" placeholder="Nhập nội dung tìm kiếm" aria-label="Search">
        <router-link v-if="searchText" :to="{ name: 'search', params: { search: searchText}}">
            <button class="btn btn-outline-success my-2 my-sm-0 main-color">Tìm kiếm</button>
        </router-link>
        <button v-else class="btn btn-outline-success my-2 my-sm-0 main-color">Tìm kiếm</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: [],
  data() {
    return {
      searchText: ''
    }
  },
  updated() {
    // const currentUrl = window.location.pathname;
    // console.log(currentUrl)
    // var collection = null
    // if(currentUrl.includes('admin')){
    //   collection = document.getElementsByClassName("admin")[0]
    // } else{
    //   collection = document.getElementsByClassName("home")[0]
    // }
    // console.log(collection)
  },
  computed: {

  },
  watch: {},
  methods: {
  }
}
</script>

<style scoped>
 nav{
      padding: .5rem 100px;
 }
</style>
