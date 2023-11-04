<template>
    <div class="row search-bar">
            <i  class="fas fa-book-open mr-2"></i>
            <select name="categories" id="cate" v-model="category">
              <option value="*">Tất cả</option>
              <option v-for="cate in categories" :key="cate.name" :value="cate.name" >{{ cate.name }}</option>
            </select>
            <input v-model="searchText"  class="ng-tns-c84-8 ui-inputtext ui-widget ui-state-default ui-corner-all ui-autocomplete-input ng-star-inserted" type="text" placeholder="Tìm kiếm theo nội dung sách" size="50">
            <button class="btn-search" :disabled="isLoading" @click="reloadSearchResult(category, 1)"><i class="fas fa-search fa-fw"></i></button>
    </div>
    <div class="search-body" style="margin: 40px 100px;" >
        <div>
            <section class="section">
            <div class="section-header d-block p-3">
                <div class="section-title m-0 main-color">Kết quả tìm kiếm</div>
            </div>
            </section>
        </div>
        <h6 v-if="!isLoading">{{ totalElementsV2 }} kết quả</h6><br>
        <Loader  v-if="isLoading" class="loader"/>
        <div class="table" v-if="totalElementsV2 > 0 && (!isLoading)">
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
                    <td v-html="item.content"></td>
                    <td>
                        <!-- <button class="view-details btn btn-primary btn-info mx-2 trigger--fire-modal-confirm" data-toggle="modal" data-target="#fire-modal-confirm" id="fire-modal">xem</button> -->
                        <button class="view-details btn btn-primary"  @click="viewDetails(item, index)">xem</button>
                    </td>
                </tr>
            </table>
        </div>
        <nav class="text-center" v-if="totalElementsV2 > 0 && (!isLoading)">
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
   
      <div @click="clearPopup" v-if="modalShow" ref="modal1"  class="custome-modal"
              tabindex="-1"
              
              aria-modal="true"
              role="dialog">
              <div class=" modal-md modal-dialog-centered" role="document">
                  <div class="modal-content bg-copy-x">
                      <div class="modal-header mh pt-3" style="border-bottom: solid 1px #dbdbdb;">
                          <h5 class="modal-title">Chi tiết</h5>
                      </div>
                      <div ref="searchContent" class="modal-body mb" style="border-bottom: solid 1px #dbdbdb;">
                        <div :style="'background: rgb(253 147 0); z-index: 1111111; position: absolute; top: '+posY+'px; left: '+posX+'px;'" v-if="hasSelectedString">
                          <div class="speech-bubble">
                              <div class="share-inside">
                                  <a href="javascript:void(0);" @click="showPopup()">
                                      <b>Chi tiết</b>
                                  </a>
                              </div>
                          </div>
                      </div>
                        <div class="col-12">
                          <div class="sutra__header">
                            <div class="sutra-head__book-cover"><img class="img-fluid" src="https://api.phapbao.org/uploads/tu-tuong-phat-giao-an-do.JPG"></div>
                            <div class="sutra-head-detail">
                              <h1 class="sutra-name">{{ bookCurrent.book_name }}</h1>
                              <div class="sutra-author ng-star-inserted"><a href="javascript:void(0);"> (Tác giả: {{bookCurrent.author}} - Xuất bản {{bookCurrent.published_year}}) </a></div>
                            </div>
                          </div>
                          <hr class="my-2">
                          <form class="pagedetail-form form-inline ng-untouched ng-pristine ng-valid">
                            <div class="pagedetail-form__flex-group group-1">
                              <button @click="toNextItem(indexItem)" type="button" class="btn btn-sm btn-outline-secondary ng-star-inserted">
                                <i class="fas fa-binoculars mr-1"></i> Kết quả tiếp thep </button>
                               &nbsp;
                              <button @click="toPrevItem(indexItem)" type="button" class="btn btn-sm btn-outline-secondary ng-star-inserted">
                                <i class="fas fa-binoculars mr-1"></i> Kết quả trước đó </button>
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
                            <div class="content" ref="pdfContent" @click.right="handlerFunction($event)" @click="clearPopup">
                              <vue-pdf-embed
                                  :source="pdfSource"
                                  :textLayer="true"
                                  :annotationLayer="true"
                                  :page="bookCurrent.page_no"
                                  @rendered="handleDocumentRender"
                              />
                            </div>
                            <div class="loader-background" :class="{ 'done-loading' : isDoneLoading }">
                                Đang tải ...
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer mf" style="padding: 10px 10px 10px 0px;">
                          <router-link :to="{ name: 'ViewPdf' , params: { id: bookCurrent.id, startPage: bookCurrent.page_no , index: 2 }}" target="_blank" class="btn btn-primary">
                              Xem toàn bộ
                          </router-link>
                          <button type="button" class="btn btn-primary" @click="close">
                              Đóng
                          </button>
                      </div>
                  </div>
              </div>
      </div>
      
        <button class="d-none btn btn-primary btn-info mx-2 trigger--fire-modal-confirm" data-toggle="modal" data-target="#fire-modal-confirm" id="fire-modal" >Delete all</button>
        <div v-if="book && modalShow2" ref="reference" class="custome-modal-2"
             tabindex="-1"
             id="fire-modal-confirm"
             aria-modal="true"
             role="dialog">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content bg-copy-x">
                    <div class="modal-header pt-3" style="border-bottom: solid 1px #dbdbdb;">
                        <h5 class="modal-title">Trích dẫn</h5>
                    </div>
                    <div class="modal-body" style="border-bottom: solid 1px #dbdbdb;">
                        <span class="main-color"> "{{ this.selectedString }}" </span>
                        <hr>
                        <div class="row">
                            <div class="col-4 font-weight-bold">Tác giả/Dịch giả</div>
                            <div class="col-8 main-color"> {{ book.author }} </div>
                        </div>
                        <div class="row">
                            <div class="col-4 font-weight-bold">Tên sách</div>
                            <div class="col-8 main-color">{{ book.name }}</div>
                        </div>
                        <div class="row">
                            <div class="col-4 font-weight-bold">Mục lục</div>
                            <div class="col-8">
                                <template v-for="selectedStringMenuParent in selectedStringMenuParents" :key="selectedStringMenuParent">
                                    <span class="main-color"> {{ selectedStringMenuParent }}</span> <br>
                                </template>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-4 font-weight-bold">Nhà xuất bản</div>
                            <div class="col-8 main-color"> {{ book.publisher }} </div>
                        </div>
                        <div class="row">
                            <div class="col-4 font-weight-bold">Năm xuất bản</div>
                            <div class="col-8 main-color"> {{ book.publishedYear }} </div>
                        </div>
                        <div class="row">
                            <div class="col-4 font-weight-bold">Trang</div>
                            <div class="col-8 main-color"><span class="main-color"> {{bookCurrent.page_no}}</span></div>
                        </div>
                    </div>
                    <div class="modal-footer" style="padding: 10px 10px 10px 0px;">
                        <button type="button" @click="doExtractInfo()" ref="copyBtn" class="btn btn-primary copy-btn">
                             Sao chép
                        </button>
                    </div>
                </div>
            </div>
        </div>
     <div  v-if="modalShow" class="modal-cover" @click="clearPopup">
      
    </div> 
    <div  v-if="modalShow2" class="modal-cover-2"  @click="modalShow2 = false">
      
    </div> 
</template>

<script>
import { mapState } from 'vuex';
import Paginate from 'vuejs-paginate-next';
import CONSTANT from '../../config/constants';
import VuePdfEmbed from 'vue-pdf-embed';
import config from '../../config/index';
import Loader from "@/components/commons/Loader.vue";

export default {
  components: {
     paginate: Paginate,
     VuePdfEmbed,
     config: config,
     Loader,
  },
  data() {
    return {
      isDoneLoading: false,
      zoomIndex: 1,
      modalShow: false,
      modalShow2: false,
      searchText: '',
      category: '*',
      searchItemsV2: [],
      pageCount: 0,
      totalElementsV2: 0,
      page: CONSTANT.DEFAULT_PAGE,
      pageSize: CONSTANT.PAGE_SIZE,
      book: null,
      bookCurrent: null,
      page:1,
      pdfSource: 'http://localhost:8088/books/1623/pdf',
      hasSelectedString: false,
      selectedString: '',
      posX: 0,
      posY: 0,
      selectedStringMenuParents: [],
      tableContentsArr: [],
      isLoading: false,
      indexItem: 0,
    }
  },
  computed: {
    ...mapState('Category', ['categories'])
  },
  created(){
    this.$store.dispatch('Category/get');
  },
  methods: {
    toNextItem(index){
      if(index < this.searchItemsV2.length-1){
        this.isDoneLoading=false
        let item = this.searchItemsV2[index+1]
        this.viewDetails(item, index +1)
    
      }else{
        this.$notify({type: 'warning', text: 'Bạn đang ở kết quả cuối, hãy chuyển trang để tiếp tục chuyển tiếp !'});
      }
      
    },
    toPrevItem(index){
      if(index > 0){
        this.isDoneLoading=false
        let item = this.searchItemsV2[index-1]
        this.viewDetails(item, index -1)
      }else{
        this.$notify({type: 'warning', text: 'Bạn đang ở kết quả đầu tiên, hãy chuyển trang để tiếp tục chuyển tiếp !'});
      }

    },
    contentLoad(event,content){
      console.log("contentLoad: ", content, event)
      event.target.innerHTML = content
    },
    getChilds(tableContent, parent, arrParents) {
            if (typeof tableContent.parent === 'undefined') tableContent.parent = parent;

            this.tableContentsArr.push({
                headerContent: tableContent.headerContent,
                fromPage: tableContent.fromPage,
                toPage: tableContent.toPage,
                parent: tableContent.parent,
            })

            if (tableContent.childs.length > 0) {
                tableContent.childs.forEach(child => {
                    this.getChilds(child, tableContent, arrParents);
                })
            }
        },
    getParents(node) {
            if (node.parent != null) {
                this.selectedStringMenuParents.push(node.parent.headerContent);

                console.log(node.parent);

                this.getParents(node.parent);
            }
        },
    doExtractInfo(){
            console.log("data", this.selectedStringMenuParents)
            var tableContent = ''
            for (let i = 0; i < this.selectedStringMenuParents.length; i++) {
                tableContent += this.selectedStringMenuParents[i] + "/ ";
            }

            const message = '"' + this.selectedString +
                '"\nTrang '+ this.bookCurrent.page_no +
                " - Mục: " + tableContent.substring(0, tableContent.length - 2) +
                " - Sách: "+ this.book.name + 
                " - Tác giả: " + this.book.author + 
                " - Xuất bản: " +  this.book.publisher + " (" + this.book.publishedYear + ")";
            const storage = document.createElement('textarea');
            storage.value = message;
            this.$refs.reference.appendChild(storage);
            storage.select();
            storage.setSelectionRange(0, 99999);
            document.execCommand('copy');
            this.$refs.reference.removeChild(storage);
            this.$refs.copyBtn.innerHTML = 'Đã sao chép';
            this.$refs.copyBtn.style.backgroundColor = 'green'
        },
    // clickModal() {
    //         this.$refs.copyBtn.innerHTML = 'Sao chép';
    //         this.$refs.copyBtn.style.backgroundColor = '#6777ef'
    //     },
    clearPopup(){
            this.hasSelectedString = false
        },
    showPopup() {
            this.tableContentsArr.forEach(tableContentEle => {
                console.log("trich dan: ", tableContentEle);
                if (tableContentEle.fromPage <= this.bookCurrent.page_no && tableContentEle.toPage >= this.bookCurrent.page_no) {
                    this.selectedStringMenuParents = [tableContentEle.headerContent];
                    this.getParents(tableContentEle);
                    console.log('set content table at ', tableContentEle);
                }
            })
            $("#fire-modal").click();
            this.modalShow2 = true
        },
    close(){
      this.modalShow = false
      this.isDoneLoading = false
      this.hasSelectedString = false
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
    viewDetails(item, index){
      console.log("sss: ", index, this.searchItemsV2.length)
      this.indexItem = index
      this.modalShow = true
      this.bookCurrent = item
      this.pdfSource = config.VUE_APP_BASE_URL + `/books/${item.id}/pdf`;
      console.log("base url: ", this.pdfSource)
      this.$store.dispatch('Book/findById', item.id)
            .then(response => {
              let respBook = response.data.content.book;
              this.book = respBook;
              this.book.tableContents = respBook.tableContent;
              let tableContents = this.book.tableContents;
              tableContents.forEach(tableContent => {
                this.getChilds(tableContent, null, []);
              })
            });
    },
    clickCallback() {
      this.reloadSearchResult(this.category, this.page);
      window.scrollTo(0, 0)
    },
    async reloadSearchResult(cate, page) {
      console.log("searchText: ", this.searchText)
      if(!this.searchText == null && !this.searchText == undefined  || !this.searchText.trim() == ''){
        this.page = page
        this.isLoading = true
        await this.$store.dispatch('Search/get', {page: page, searchText: this.searchText, category: cate}).then(response => {
              
              this.searchItemsV2 = response.data.content;
              this.totalElementsV2 = response.data.totalElements;
              this.pageCount = response.data.totalPages;
            });
          this.isLoading = false
      }
    },
     handleDocumentRender() {
            this.isDoneLoading = true
    },
    handlerFunction(event) {
            event.preventDefault()
            console.log("length: ",window.getSelection().toString() , window.getSelection().toString().length, this.hasSelectedString)
            if(window.getSelection().toString() != this.selectedString){
              this.hasSelectedString = false
            }
            if(
                window.getSelection().toString().length > 0
                && this.hasSelectedString == true
            ) {
                return;
            }
            let pattern = /^[a-z0-9]$/i;
            if(
                window.getSelection().toString().length == 1
                && !pattern.test(window.getSelection().toString())
            ){
                return;
            }

            this.hasSelectedString = false;

            // Check if any text was selected
            if(window.getSelection().toString().length > 0) {

                this.hasSelectedString = true;

                // Get selected text and encode it
                const selection = encodeURIComponent(window.getSelection().toString()).replace(/[!'()*]/g, escape);
                this.selectedString = window.getSelection().toString();
                // Get cursor position
                const posX = event.clientX - 100;
                const posY = event.clientY + this.$refs.searchContent.scrollTop - 70;
              

                this.posX = posX;
                this.posY = posY;
            }
        },
  }
}
</script>

<style scoped>
.loader{
  zoom: 0.3;
}
.mark, mark{
    background-color: yellow !important;
}


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
.modal-footer {
    position: fixed;
    bottom: 0px;
    right: 0px;
    width: 100%;
    background: white;
    height: 10%;
}
.modal-body {
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
.modal-cover-2{
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 10002;
    width: 100%;
    height: 100%;
    background: #525243;
    opacity: .5;
}
.custome-modal-2{
    position: fixed;
    left: 50%;
    width: 40%;
    height: 90%;
    z-index:10003;
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
.parent {
	display: block;
	position: relative;
	float: left;
	line-height: 21px;
	background-color: transparent;
	border-right: #CCC 1px solid;
}

.parent a {
	margin: 10px;
	color: #FFFFFF;
	text-decoration: none;
}

.parent:hover>ul {
	display: block;
	position: absolute;
}

.child {
	display: none;
}

.child li {
	background-color: #E4EFF7;
	line-height: 30px;
	border-bottom: #CCC 1px solid;
	border-right: #CCC 1px solid;
	width: 100%;
}

.child li a {
	color: #000000;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0px;
	min-width: 10em;
}

ul ul ul {
	left: 100%;
	top: 0;
	margin-left: 1px;
}

li:hover {
	background-color: #95B4CA;
}

.parent li:hover {
	background-color: #F0F0F0;
}

.expand {
	font-size: 12px;
	float: right;
	margin-right: 5px;
}
.speech-bubble {
    position: relative;
    background: #ffffff;
    border-radius: .4em;
    color: white;
}
.speech-bubble:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 12px solid transparent;
    border-bottom-color: #ffffff;
    border-top: 0;
    margin-left: -12px;
    margin-top: -12px;
}
.share-inside {
    background: url('https://awik.io/demo/js-selected-text/twicon.png');
    background-repeat: no-repeat;
    background-position: 10px center;
    background-size: 24px 19px;
}

.share-inside a {
    display: inline-block;
    text-decoration: none;
    color: #ef5a00;
    font-size: 14px;
    padding: 5px 10px 5px 10px;
    padding-left: 40px;
}
</style>