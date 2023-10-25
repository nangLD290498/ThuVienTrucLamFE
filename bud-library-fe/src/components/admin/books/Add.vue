<template>
  <section class="section" v-if="book">
    <div class="section-header ">
      <div class="section-title mt-0" v-if="mode == 'create'">Thêm sách</div>
      <div class="section-title mt-0" v-else>Chỉnh sửa sách</div>
      <!-- <div class="section-header-breadcrumb">
        <div class="breadcrumb-item"><a href="#">Quản lý sách</a></div>
        <div class="breadcrumb-item">Thêm sách</div>
      </div> -->
    </div>

    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">

                <div class="col-12" v-if="mode == 'create'">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">File PDF</label>
                    <input type="file" class="form-control" @change="onFileUploadPdf"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12" v-if="mode == 'create'">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">Ảnh bìa</label>
                    <input type="file" class="form-control" @change="onFileUploadThumb"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1"  class="form-label p-0 m-0" >Thể loại</label>
                    <!-- <select  class="form-control" v-model="category"  v-if="categories">
                      <option v-for="cate in categories" :key="cate" :value="cate.name" >{{ cate.name }}</option>
                    </select> -->
                    <AutoComplete :Vmodel="category" :list="categories.map(cate=>cate.name)" @getTextContent="getCateContent"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">Tên sách</label>
                    <input type="text" v-model='book.name' class="form-control"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">Tác giả</label>
                    <AutoComplete :Vmodel="book.author" :list="authors" @getTextContent="getAuthorContent"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">Nhà xuất bản</label>
                    <!-- <input type="text" v-model='book.publisher' class="form-control"/> -->
                    <AutoComplete :Vmodel="book.publisher" :list="publishers" @getTextContent="getPublisherContent"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">Năm xuất bản</label>
                    <input type="number" v-model='book.publishedYear' class="form-control"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <div class="mt-1">
                      <div class="d-flex">
                        <div style="width: 100%;">Mục lục</div>
                        <div class="btn btn-outline-success ml-2" @click="addChild()">+</div>
                      </div>
                    </div>

                    <TreeNode
                        v-for="child in book.tableContent"
                        :key="child.id"
                        :node="child"
                        :spacing="0"
                    />
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>

                  <button type="submit" class="btn btn-primary" @click="excute()">
                    {{ mode === 'create' ? 'Thêm sách' : 'lưu thay đổi' }}
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CONSTANT, {dump_menus} from '../../../config/constants';
import TreeNode from "@/components/commons/TreeNode.vue";
import { mapState } from 'vuex';
import AutoComplete from "@/components/commons/AutoComplete.vue";

export default {
  data() {
    return {
      book: null,
      bookDefalt: {
        name: '',
        author: '',
        publisher: '',
        publishedYear: 2015,
        tableContent: [
          {
            "headerContent" : "",
            "childs" : []
          }
        ],
      },
      mode: CONSTANT.CREATE,
      error: {},
      PDF_FILE: null,
      THUMB_FILE: null,
      category: '',
      isSaved: '',
      authors: [],
      publishers: [],
    };
  },
  components: {
    TreeNode,
    AutoComplete
  },
  beforeDestroy(){
    
  },
  created() {
    this.getData();
    if (this.$route.params.id) {
      this.$store.dispatch('Book/findById', this.$route.params.id)
          .then(response => {
            let respBook = response.data.content.book;
            this.book = respBook;
          });
      this.mode = CONSTANT.UPDATE;
      this.category = this.$route.params.cate
    }else {
      this.book = this.bookDefalt
    }
    this.$store.dispatch('Author/get', {page: -1})
      .then(response => {
        this.authors = response.data.content
        this.authors = this.authors.map(item => item.author)
        });
    this.$store.dispatch('Publisher/get', {page: -1})
      .then(response => {
        this.publishers = response.data.content
        this.publishers = this.publishers.map(item => item.publisher)
        });
  },
  computed: {
    ...mapState('Category', ['categories']),
  },
  methods: {
    getPublisherContent(text){
      this.book.publisher = text
    },
    getAuthorContent(text){
      this.book.author = text
    },
    getCateContent(text){
      this.category = text
    },
    getData() {
      this.$store.dispatch('Category/get');
    },
    async excute() {
      let _this = this;
      let token = localStorage.getItem('user')
      if((this.book.name.trim() === '' ||
             this.book.author.trim() === '' ||
             this.book.publisher.trim() === '' ||
             this.category == null ||
             this.category.trim() === '' ||
             this.PDF_FILE == null ||
             !this.isContenTableValid(this.book.tableContent[0])) &&
             this.mode === 'create'
      ){
       _this.$notify({type: 'error', text: 'Bạn cần nhập thông tin đầy đủ và chính xác !'});
        return
      }

      if((this.book.name.trim() === '' ||
             this.book.author.trim() === '' ||
             this.book.publisher.trim() === '' ||
             this.category == null ||
             this.category.trim() === '' ||
             !this.isContenTableValid(this.book.tableContent[0])) &&
             this.mode === 'update'
      ){
       _this.$notify({type: 'error', text: 'Bạn cần nhập thông tin đầy đủ và chính xác !'});
        return
      }

        try { 
        let bookInfo = null
        if(this.mode === 'create') {
          bookInfo = {
            "name": this.book.name,
            "author": this.book.author,
            "publisher": this.book.publisher,
            "publishedYear": this.book.publishedYear.toString(),
            "remarks": "",
            "category": {
              "name": this.category,
              "remarks": ""
            }
          };
        } else {
           bookInfo = {
            "id": this.book.id,
            "name": this.book.name,
            "author": this.book.author,
            "publisher": this.book.publisher,
            "publishedYear": this.book.publishedYear.toString(),
            "remarks": "",
            "category": {
              "name": this.category,
              "remarks": ""
            }
          };
        }

        let tableContents = this.book.tableContent;

        console.log('bookInfo', bookInfo);
        console.log('tableContents', this.book.tableContent);

        // upload file
        const formData = new FormData();
        if(this.mode === 'create'){
          formData.append('file', this.PDF_FILE, this.PDF_FILE.name);
          formData.append('thumbnailPic', this.THUMB_FILE, this.THUMB_FILE.name);
        }
        formData.append('bookString', btoa(unescape(encodeURIComponent(JSON.stringify(bookInfo)))));
        formData.append('tableContent', btoa(unescape(encodeURIComponent(JSON.stringify(tableContents)))));
        await this.$store.dispatch('Book/' + this.mode, {token: token, formData: formData})
        .then((response) => {
              this.status = response.data.status
              console.log("status: ", response.data.status)
              if(response.data.status === 'NOK'){
                 _this.$notify({type: 'error', text: response.data.message});
                 return;
              }else{
                if(this.mode === 'create'){
                  _this.$notify({type: 'success', text: 'Thêm sách thành công!'});
                } else {
                  _this.$notify({type: 'success', text: 'Chỉnh sửa sách thành công!'});
                }
              
                _this.$router.push({ name: "admin.books" })
              }
        },
        (error) => {
          if (error.request.status === 401) {
                  alert("Bạn đã hết phiên đăng nhập, hãy đăng nhập lại để tiếp tục !");
                  console.log('loggin out')
                  localStorage.removeItem('user');
                  localStorage.removeItem('username');
                  _this.$router.go('/login')
                  return
          } else{
              if (error.response && error.response.data.error) {
                _this.error = error.response.data.error;
              } else {
                _this.$notify({type: 'error', text: 'Hãy kiểm tra lại thông tin sách !'});
              } 
          }
        });
        this.$store.dispatch('Book/deleteTC', token) .then((response) => {}, (error) => {})
        }
      catch(err) {
        console.log("Error: ", err)
        _this.$notify({type: 'error', text: 'Bạn cần nhập thông tin đầy đủ và chính xác !'});
      }
    },
    onFileUploadPdf (event) {
      this.PDF_FILE = event.target.files[0]
    },
    onFileUploadThumb (event) {
      this.THUMB_FILE = event.target.files[0]
    },
    addChild() {
      console.log("Daata: ", this.book)
      this.book.tableContent.push({
        "headerContent" : "",
        "childs" : []
      })
    },
    isContenTableValid(header){
      if(header.headerContent === '' || header.fromPage == undefined || header.toPage == undefined
          || header.fromPage == '' || header.toPage == '') {
        return false
      }
      return true
    }
  }
};
</script>

<style scoped>
.author-list{
    position: absolute;
    background: whitesmoke;
    list-style-type: none;
    padding-left: 0px;
    overflow: scroll;
    max-height: 400px;
    z-index: 1000000;
    right: 0px;
    left:15px;
}
.author-list li{
    padding-left: 20px;
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: .5px solid rgb(173, 172, 172);
    border-left: .5px solid rgb(173, 172, 172);
    border-right: .5px solid rgb(173, 172, 172);
    cursor: pointer;
} 

</style>
