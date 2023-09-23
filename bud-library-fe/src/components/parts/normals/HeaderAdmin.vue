<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light" style="z-index: 2000; position: inherit; width:100%; ">
    <router-link to="/" class="logo" style="color: #ffa426;">Thư viện trúc lâm</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item home">
          <router-link to="/"  :class="'nav-link main-color ' + (isSelected1? 'selected' :  '')">Quản lý sách</router-link>
        </li>
      </ul>
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
    }
  },
  computed: {

  },
  watch: {},
  methods: {
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
