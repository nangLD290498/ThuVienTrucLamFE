<template>
  <section class="section">
    <div class="section-header ">
      <div class="section-title mt-0">Thêm sách</div>
      <div class="section-header-breadcrumb">
        <div class="breadcrumb-item"><a href="#">Quản lý sách</a></div>
        <div class="breadcrumb-item">Thêm sách</div>
      </div>
    </div>

    <div class="section-body">
      <div class="row">
        <div class="col-12">
          <div class="card">
            <div class="card-body">
              <div class="row">

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">File PDF</label>
                    <input type="file" class="form-control" @change="onFileUploadPdf"/>
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label p-0 m-0">Ảnh bìa</label>
                    <input type="file" class="form-control" @change="onFileUploadThumb"/>
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
                    <div class="mt-1">
                      <div class="d-flex">
                        <div style="width: 100%;">Mục lục</div>
                        <div class="btn btn-outline-success ml-2" @click="addChild()">+</div>
<!--                        <div class="btn btn-outline-success ml-2" @click="addChild()">-</div>-->
                      </div>
                    </div>

                    <TreeNode
                        v-for="child in book.tableContents"
                        :key="child.id"
                        :node="child"
                        :spacing="0"
                    />
                    <div v-if="error.books" class="form-text text-danger"> {{ error.books[0] }} </div>
                  </div>

                  <button type="submit" class="btn btn-primary" @click="excute()">
                    {{ this.mode === CREATE ? 'Add' : 'Save' }}
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

export default {
  data() {
    return {
      book: {
        name: '',
        tableContents: [
          {
            "headerContent" : "",
            "childs" : []
          }
        ],
      },
      mode: CONSTANT.CREATE,
      CREATE: CONSTANT.CREATE,
      error: {},
      PDF_FILE: null,
      THUMB_FILE: null,
    };
  },
  components: {
    TreeNode,
  },
  created() {
    if (this.$route.params.id) {
      this.$store.dispatch('Book/findById', this.$route.params.id)
          .then(response => this.book = response.data);

      this.mode = CONSTANT.UPDATE;
    }
  },
  methods: {
    excute() {
      let _this = this;

      let bookInfo = {
        "name": this.book.name,
        "author": "Thích Thanh Từ",
        "publisher": "NBX tôn giáo VN",
        "publishedYear": "1990",
        "remarks": "",
        "category": {
          "name": "Kiến thức",
          "remarks": ""
        }
      };

      let tableContents = this.book.tableContents;

      console.log('bookInfo', bookInfo);
      console.log('tableContents', this.book.tableContents);

      // upload file
      const formData = new FormData();
      formData.append('file', this.PDF_FILE, this.PDF_FILE.name);
      formData.append('thumbnailPic', this.THUMB_FILE, this.THUMB_FILE.name);
      formData.append('bookString', btoa(unescape(encodeURIComponent(JSON.stringify(bookInfo)))));
      formData.append('tableContent', btoa(unescape(encodeURIComponent(JSON.stringify(tableContents)))));

      this.$store.dispatch('Book/' + this.mode, formData)
      .then(() => {
            _this.$notify({type: 'success', text: 'Thêm sách thành công!'});
            _this.$router.push({ name: "admin.books" })
      }).catch(function (error) {
        if (error.response && error.response.data.error) {
          _this.error = error.response.data.error;
        } else {
          _this.$notify({type: 'error', text: 'Execute failed!'});
        }
      });
    },
    onFileUploadPdf (event) {
      this.PDF_FILE = event.target.files[0]
    },
    onFileUploadThumb (event) {
      this.THUMB_FILE = event.target.files[0]
    },
    addChild() {
      this.book.tableContents.push({
        "headerContent" : "",
        "childs" : []
      })
    }
  }
};
</script>
