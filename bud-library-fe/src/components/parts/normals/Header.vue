<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="z-index: 2000; position: inherit; width:100%; ">
    <a class="navbar-brand" href="#" style="color: #ffa426;">Thư viện trúc lâm</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item home" @click="handleHeaderSelection(1)">
          <router-link to="/"  :class="'nav-link main-color ' + (isSelected1? 'selected' :  '')">Đầu sách<span class="sr-only">(current)</span></router-link>
        </li>
        <li class="nav-item author"  @click="handleHeaderSelection(2)">
          <router-link to="/authors"  :class="'nav-link main-color ' + (isSelected2? 'selected' :  '')">Tác giả</router-link>
        </li>
         <li class="nav-item content-tables"  @click="handleHeaderSelection(3)">
          <router-link to="/categories"  :class="'nav-link main-color ' + (isSelected3? 'selected' :  '')">Danh mục</router-link>
        </li>
        <li class="nav-item admin"  @click="handleHeaderSelection(4)">
          <router-link  :to="{ name: 'admin.books'}" :class="'nav-link main-color ' + (isSelected4? 'selected' :  '')">Quản lý sách</router-link>
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
      searchText: '',
      isSelected1: true,
      isSelected2: false,
      isSelected3: false,
      isSelected4: false,
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    handleHeaderSelection(index) {
      this.isSelected1 = false
      this.isSelected2 = false
      this.isSelected3 = false
      this.isSelected4 = false

      switch(index) {
        case 1:
          this.isSelected1 = true
          break;
        case 2:
          this.isSelected2 = true
          break;
        case 3:
          this.isSelected3 = true
          break;
        case 4:
          this.isSelected4 = true
          break;
        default:
  
      }
    },
  }
}
</script>

<style scoped>
 nav{
      padding: .5rem 100px;
 }
 .selected{
    font-weight: bold;
 }
</style>
