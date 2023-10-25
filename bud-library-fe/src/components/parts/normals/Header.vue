<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="z-index: 2000; position: inherit; width:100%; ">
    <router-link  @click="handleHeaderSelection(1)" to="/" class="logo" style="color: #ffa426;">Thư viện trúc lâm</router-link>
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
         <li class="nav-item content-tables"  @click="handleHeaderSelection(4)">
          <router-link :to="{ name: 'search'}"  :class="'nav-link main-color ' + (isSelected4? 'selected' :  '')">Tìm kiếm</router-link>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <span v-if="username" class="username"> Xin chào {{ username }} </span> 
        &nbsp;&nbsp;&nbsp;
        <div class="dropdown" >
          <i class='fas fa-user-circle logout dropdown-toggle' style='font-size:30px' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <router-link  class="dropdown-item"  :to="{ name: 'admin.books'}">
              Quản lí sách
            </router-link>
          </div>
        </div>
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
      username: localStorage.getItem('username')
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
.logo{
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 700;
  font-size: 23px;
}
.dropdown-menu {
  box-shadow: 0 10px 40px 0 rgba(51, 73, 94, 0.15);
  border: none;
  width: 80px!important;
}
.dropdown-toggle:empty::after {
  display: none;
}
.logout{
  color: #c0982c;
  cursor: pointer;
}
.logout:hover{
  color: #a9852c;
  cursor: pointer;
}
 nav{
      padding: .5rem 100px;
 }
 .selected{
    font-weight: bold;
 }
</style>
