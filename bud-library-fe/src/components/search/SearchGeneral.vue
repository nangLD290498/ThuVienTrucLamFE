<template>
    <div class="row search-bar">
            <i  class="fas fa-book-open mr-2"></i>
            <select name="categories" id="cate" v-model="category">
              <option value="*">Tất cả</option>
              <option v-for="cate in categories" :key="cate.name" :value="cate.name" >{{ cate.name }}</option>
            </select>
            <input v-model="searchText"  class="ng-tns-c84-8 ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input ng-star-inserted" type="text" placeholder="Tìm kiếm theo nội dung sách" size="50">
            <button class="btn-search" @click="reloadSearchResult(category, 1)"><i class="fas fa-search fa-fw"></i></button>
    </div>
    <div class="search-body" style="margin: 40px 100px;" >
        <div>
            <section class="section">
            <div class="section-header d-block p-3">
                <div class="section-title m-0 main-color">Kết quả tìm kiếm</div>
            </div>
            </section>
        </div>
        <h6>{{ totalElementsV2 }} kết quả</h6><br>
        <div class="table" v-if="totalElementsV2 > 0">
            <table>
                <tr>
                    <th>#</th>
                    <th style="min-width:111px;">Thư mục</th>
                    <th>Sách</th>
                    <th style="min-width:100px;">Tác giả</th>
                    <th style="min-width:111px;">Mục lục</th>
                    <th>Trang</th>
                    <th>Nội dung</th>
                    <th style="min-width:100px;">Chi tiết</th>
                </tr>
                <tr v-for="(item, index) in searchItemsV2" :key="item">
                    <td>{{ index + 1 + (page-1)*pageSize }}</td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.book_name }}</td>
                    <td>{{ item.author }}</td>
                    <td>{{ item.header_content }}</td>
                    <td>{{ item.page_no }}</td>
                    <td>{{ item.content }}</td>
                    <td>
                        <!-- <button class="view-details btn btn-primary btn-info mx-2 trigger--fire-modal-confirm" data-toggle="modal" data-target="#fire-modal-confirm" id="fire-modal">xem</button> -->
                        <button class="view-details btn btn-primary"  @click="viewDetails(item)">xem</button>
                    </td>
                </tr>
            </table>
        </div>
        <nav class="text-center" v-if="totalElementsV2 > 0">
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
   
      <div v-if="modalShow"  class="custome-modal"
              tabindex="-1"
              id="fire-modal-confirm"
              aria-modal="true"
              role="dialog">
              <div class=" modal-md modal-dialog-centered" role="document">
                  <div class="modal-content bg-copy-x">
                      <div class="modal-header pt-3" style="border-bottom: solid 1px #dbdbdb;">
                          <h5 class="modal-title">Chi tiết</h5>
                      </div>
                      <div class="modal-body" style="border-bottom: solid 1px #dbdbdb;">
                        <div class="col-12">
                          <div class="sutra__header">
                            <div class="sutra-head__book-cover"><img class="img-fluid" src="https://api.phapbao.org/uploads/tu-tuong-phat-giao-an-do.JPG"></div>
                            <div class="sutra-head-detail">
                              <h1 class="sutra-name">Tư Tưởng Phật Giáo Ấn Độ</h1>
                              <div class="sutra-author ng-star-inserted"><a href="javascript:void(0);"> (Tác giả: Hạnh Viên - Xuất bản 2011) </a></div>
                            </div>
                          </div>
                          <hr class="my-2">
                          <form class="pagedetail-form form-inline ng-untouched ng-pristine ng-valid">
                            <div class="pagedetail-form__flex-group group-1">
                              <button type="button" class="btn btn-sm btn-outline-secondary ng-star-inserted"><i class="fas fa-binoculars mr-1"></i> Kết quả sau </button>
                               &nbsp;
                              <button type="button" class="btn btn-sm btn-outline-secondary ng-star-inserted"><i class="fas fa-binoculars mr-1"></i> Kết quả trước </button>
                            </div>
                             <span class="zoom">
                                <i @click="zoomOut" ref="zout" class="fa fa-search-minus" style="font-size:22px;color:rgb(108 117 125);cursor: pointer;"></i>
                                &nbsp;
                                <i @click="zoomIn" ref="zin" class="fa fa-search-plus" style="font-size:22px;color:rgb(108 117 125);cursor: pointer;"></i>
                            </span>
                          </form>
                          <hr class="d-none d-lg-block d-xl-block my-2">
                          <small class="d-none d-lg-block d-xl-block mt-2 font-italic"> 
                            Chọn nội dung và click phải sử dụng tính năng Trích Dẫn 
                          </small>
                          <hr class="my-2">
                          <div class="page-content">
                            <div class="content" ref="pdfContent">
                              <vue-pdf-embed
                                  :source="pdfSource"
                                  :page="page"
                                  @rendered="handleDocumentRender"
                              />
                            </div>
                            <div class="loader-background" :class="{ 'done-loading' : isDoneLoading }">
                                Đang tải ...
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer" style="padding: 10px 10px 10px 0px;">
                          <router-link :to="{ name: 'ViewPdf' , params: { id: book.id, startPage: book.page_no , index: 2 }}" target="_blank" class="btn btn-primary">
                              Xem toàn bộ
                          </router-link>
                          <button type="button" class="btn btn-primary" @click="close">
                              Đóng
                          </button>
                      </div>
                  </div>
              </div>
          </div>
     <div  v-if="modalShow" class="modal-cover">
    </div> 
</template>

<script>
import { mapState } from 'vuex';
import Paginate from 'vuejs-paginate-next';
import CONSTANT from '../../config/constants';
import VuePdfEmbed from 'vue-pdf-embed'

export default {
  components: {
     paginate: Paginate,
     VuePdfEmbed,
  },
  data() {
    return {
      isDoneLoading: false,
      zoomIndex: 1,
      modalShow: false,
      searchText: '',
      category: '*',
      searchItemsV2: [],
      pageCount: 0,
      totalElementsV2: 0,
      page: CONSTANT.DEFAULT_PAGE,
      pageSize: CONSTANT.PAGE_SIZE,
      book: null,
      page:1,
      pdfSource: 'http://localhost:8088/books/1623/pdf',
    }
  },
  computed: {
    ...mapState('Category', ['categories'])
  },
  created(){
    this.$store.dispatch('Category/get');
  },
  methods: {
    close(){
      this.modalShow = false
      this.isDoneLoading = false
    },
    zoomOut(){
            let pdfContent = this.$refs.pdfContent;
            if(this.zoomIndex >= 0.5){
                this.zoomIndex = this.zoomIndex - 0.1
                console.log("zoomOut ", this.zoomIndex)
                pdfContent.style.zoom = this.zoomIndex
                let zin = this.$refs.zin;
                zin.style.color = "rgb(108 117 125)";
            } else {
                let zout = this.$refs.zout;
                zout.style.color = "rgb(218 226 232)";
            }
            
        },
        zoomIn(){
            let pdfContent = this.$refs.pdfContent;
            if(this.zoomIndex <= 1.5){
                this.zoomIndex = this.zoomIndex + 0.1
                console.log("zoomIn ", this.zoomIndex)
                pdfContent.style.zoom = this.zoomIndex
                let zout = this.$refs.zout;
                zout.style.color = "rgb(108 117 125)";
            } else {
                let zin = this.$refs.zin;
                zin.style.color = "rgb(218 226 232)";
            }
        },
    viewDetails(item){
      this.modalShow = true
      this.book = item
    },
    clickCallback() {
      this.reloadSearchResult(this.category, this.page);
      window.scrollTo(0, 0)
    },
    reloadSearchResult(cate, page) {
      console.log("searchText: ", this.searchText)
      if(!this.searchText == null && !this.searchText == undefined  || !this.searchText.trim() == ''){
        this.page = page
        this.$store.dispatch('Search/get', {page: page, searchText: this.searchText, category: cate}).then(response => {
              this.searchItemsV2 = response.data.content;
              this.totalElementsV2 = response.data.totalElements;
              this.pageCount = response.data.totalPages;
            });
      }
    },
     handleDocumentRender() {
            this.isDoneLoading = true
    },
    
  }
}
</script>

<style scoped>
.loader-background{
  background: #d1d4c6;
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  padding-top: 65px;
  text-align: center;
  color: black;
}
.done-loading{
    display:none;
}
.content{
  width: 500px;
  position: relative;
  margin: 0 auto;
  padding: 10px;
}
.page-content{
  background: #c6ccd4;
  width: 100%;
  min-height: 500px;
  position: relative;
}
small{
  color:rgb(108 117 125);
}
.zoom{
  float: right;
}
.form-inline{
  display: flow-root;
}
.group-1{
  display: contents;
}
.sutra__header{
    display: grid;
    grid-template-columns: 80px 1fr;
    -moz-column-gap: 1rem;
    column-gap: 1rem;
}
.modal-footer{
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 100%;
    background: white;
    height: 10%;
}
.modal-body{
    position: fixed;
    bottom: 10%;
    right: 0px;
    width: 100%;
    background: white;
    height: 80%;
    overflow-y: scroll;
}
.modal-header{
    position: fixed;
    top: 0px;
    right: 0px;
    width: 100%;
    background: white;
    height: 10%;
}
.modal-cover{
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 10000;
    width: 100%;
    height: 100%;
    background: #525243;
    opacity: .5;
}
.custome-modal{
    position: fixed;
    left: 50%;
    width: 90%;
    height: 90%;
    z-index:10001;
    top: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    /* overflow-y: scroll; */
}
.fa-book-open:before {
    content: "\f518";
    font-size: 33px;
}
.btn-search{
   background: #c6ccd4;;
   border: 1px solid #767676;
   width: 50px;
   margin-left: 3px;
}
.btn-search:hover{
   background: #44d064;
   border: 1px solid #767676;
   width: 50px;
   margin-left: 3px;
}
.cate-drop{
  background: white;
  border: 1px solid transparent;
}
.search-bar{
  margin: 30px auto;
  justify-content: center;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
th{
  background-color: #dddddd;
}
.view-details{
    background-color: #007ad9;
    color: white;
}
h6{
    width: 100%;
    float: left;
    margin: 0px;
    padding-bottom: 25px;
}
#cate{
  float: right;
}
.table{
  margin-bottom: 50px;
}
.pagination{
  float:right;
}
.section {
  min-width: 872px;
}
html{
    background-color: rgb(231, 231, 231);
    position: relative;
}
::ng-deep .modal-backdrop.show 
{
    opacity:0.05 !important;
    display: none;
}
</style>