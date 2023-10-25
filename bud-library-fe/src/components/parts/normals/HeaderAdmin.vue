<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="z-index: 2000; position: inherit; width:100%; ">
    <router-link to="/" class="logo" style="color: #ffa426;">Thư viện trúc lâm</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item home">
          <router-link :to="{ name: 'admin.books'}"  :class="'nav-link main-color ' + (isSelected1? 'selected' :  '')">Quản lý sách</router-link>
        </li>
      </ul>
    </div>
    <div class="form-inline my-2 my-lg-0">
        <span class="username"> Xin chào {{ username }} </span> &nbsp;&nbsp;&nbsp;
        <div class="dropdown" >
          <i class='fas fa-user-circle logout dropdown-toggle' style='font-size:30px' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <div @click="logout"  class="dropdown-item">
              Đăng xuất
            </div>
            <router-link  class="dropdown-item"  to="/register">
              Đăng kí tài khoản
            </router-link>
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
      username: localStorage.getItem('username')
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    logout(){
      console.log('loggin out')
      localStorage.removeItem('user');
      localStorage.removeItem('username');
      this.$router.go(this.$router.currentRoute)
    }
  }
}
</script>

<style scoped>
.dropdown-item{
    cursor: pointer;
    padding: 10px 20px;
    font-weight: 500;
    line-height: 1.2;
    font-size: 13px;
}
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
