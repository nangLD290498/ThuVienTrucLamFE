<template>
    <section class="section" v-if="book" @click="clearPopup">
        <div class = "content">
           <div ref="col12" class="col-12">
                <div class="card card-warning" style="max-width: 2200px; margin: auto;">
                  <div class="card-body px-0">
                    <div class="row text-center">
                      <div class="col-1  px-0">
                          <a href="#" :class="'btn btn-icon btn-info ' + ((pageLeft == 1 || !isDoneLoading2 )? ' disabled' : '')"  style="margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%); transform: translateX(-50%); border-radius: 28px;" @click="prevPage()"><i class="fas fa-angle-left"></i></a>
                      </div>
                      <div @click.right="handlerFunction($event)" @click="clearPopup" class="col-5 pl-0">
                        <div class = "page-content">
                            <vue-pdf-embed
                            style="box-shadow: rgb(136, 136, 136) 5px 5px 5px 5px;"
                            @click="selectOnPage('LEFT')"
                            :source="pdfSource"
                            :page="pageLeft"
                            @rendered="handleDocumentRender"
                            @password-requested="handlePasswordRequest"
                        />
                        </div>
                      </div>
                      <div @click.right="handlerFunction($event)" @click="clearPopup" class="col-5 mx-0 pr-0">
                        <div class = "page-content" v-dragscroll='true'>
                            <vue-pdf-embed
                                style="box-shadow: rgb(136, 136, 136) 5px 5px 5px 5px;"
                                @click="selectOnPage('RIGHT')"
                                ref="pdfRef"
                                :source="pdfSource"
                                :page="pageRight"
                            />
                        </div>
                      </div>
                      <div class="col-1 px-0">
                        <a href="#" :class="'btn btn-icon btn-info' + ((!isDoneLoading2 || isLastPage)? ' disabled' : '')" style="border-radius: 28px; top: 50%; position: absolute; transform: translateX(-50%);" @click="nextPage()"><i class="fas fa-angle-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="loader-background" :class="{ 'done-loading' : isDoneLoading }">
                <Loader class="loader"/>
            </div>
        </div>

        <div :style="'background: rgb(253 147 0); z-index: 1; position: absolute; top: '+posY+'px; left: '+posX+'px;'" v-if="hasSelectedString">
            <div class="speech-bubble">
                <div class="share-inside">
                    <a href="javascript:void(0);" @click="showPopup()">
                        <b>Chi tiết</b>
                    </a>
                </div>
            </div>
        </div>
        <button class="d-none btn btn-primary btn-info mx-2 trigger--fire-modal-confirm" data-toggle="modal" data-target="#fire-modal-confirm" id="fire-modal" @click="clickModal()">Delete all</button>
        <div ref="reference" class="modal fade"
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
                            <div class="col-8 main-color"><span class="main-color"> {{ this.pagePosition == 'LEFT' ? this.pageLeft : this.pageRight }}</span></div>
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
    </section>
    <div class="app-header" v-if="book">
        <template v-if="!isDoneLoading">
        Loading...
        </template>

        <template v-else>
        <span class="page-setting">
            <div>
                <ul id="menu" >
                    <li class="parent" >
                        <div class="menu-display"><span>{{ currentTableContent }}</span></div>
                        <NestedDropdown @changePageToHeader="changePageToHeader" :contentTables="book.tableContents" />
                    </li>
                </ul>
            </div>
            &nbsp;&nbsp;
            <input @keyup.enter="handlePageChange()" ref="selectPageInput" type="number" min="1" :max="pageCount" :value="pageLeft"  @focusout="handlePageChange()"/>
            &nbsp;Trang {{ pageLeft }} - {{ pageRight }} / {{ pageCount }}
        </span>
        &nbsp;&nbsp;
        <span class="zoom">
            <i @click="zoomOut" ref="zout" class="fa fa-search-minus" style="font-size:15px;color:white;cursor: pointer;"></i>
            &nbsp;
            <i @click="zoomIn" ref="zin" class="fa fa-search-plus" style="font-size:15px;color:white;cursor: pointer;"></i>
        </span>

        <router-link v-if="$route.params.index == 1" :to="{name: 'books.read', params: { id: $route.params.id }}">
            <span class="close-sign">X</span>
        </router-link>
        <router-link v-if="$route.params.index == 2" to="/">
            <span class="close-sign">X</span>
        </router-link>
        </template>
    </div>
</template>

<script>
import TreeNodeDisplay from "@/components/commons/TreeNodeDisplay.vue";
import Loader from "@/components/commons/Loader.vue";
import NestedDropdown from "@/components/commons/NestedDropdown.vue";
import VuePdfEmbed from 'vue-pdf-embed'
import config from '../../../config/index.js';

export default {
    name: "ViewBook",
    components: {
        TreeNodeDisplay,
        VuePdfEmbed,
        Loader,
        NestedDropdown,
    },
    data() {
        return {
            zoomIndex: 1,
            pdfSource: null,
            pageLeft: 1,
            pageRight: 2,
            posX: 0,
            posY: 0,
            selectedString: '',
            hasSelectedString: false,
            book: null,
            tableContentsArr: [],
            selectedStringMenu: '',
            selectedStringMenuParents: [],
            pagePosition: '',
            config: config,
            isDoneLoading: false,
            isDoneLoading2: false,
            pageCount:0,
            isLastPage: false,
            currentTableContent: '',
        }
    },
    created() {
      if (this.$route.params.id) {
        this.$store.dispatch('Book/findById', this.$route.params.id)
            .then(response => {
              let respBook = response.data.content.book;
              this.pageCount = response.data.content.pageCount
              this.book = respBook;
              this.book.tableContents = respBook.tableContent;
              this.pdfSource = this.config.VUE_APP_BASE_URL + `/books/${this.$route.params.id}/pdf`;
              let tableContents = this.book.tableContents;
              tableContents.forEach(tableContent => {
                this.getChilds(tableContent, null, []);
              })
            });
      }
    },
    computed: {
    },
    mounted() {
        try {
            let initPage = parseInt(this.$route.params.startPage)
             console.log("initPage", initPage, this.pageCount)
            if(initPage % 2 == 1){
                this.isDoneLoading2 = false
                this.pageLeft = initPage;
                this.pageRight = initPage + 1;
            } else {
                this.initPage = false
                this.pageRight = initPage;
                this.pageLeft = initPage - 1;
            }
        } catch (exceptionVar) {
            this.$notify({type: 'error', text: 'Trang không hợp lệ !'});
        }
        
    },
    methods: {
        zoomOut(){
            let col12 = this.$refs.col12;
            if(this.zoomIndex >= 0.5){
                this.zoomIndex = this.zoomIndex - 0.1
                console.log("zoomOut ", this.zoomIndex)
                col12.style.zoom = this.zoomIndex
                let zin = this.$refs.zin;
                zin.style.color = "white";
            } else {
                let zout = this.$refs.zout;
                zout.style.color = "grey";
            }
            
        },
        zoomIn(){
            let col12 = this.$refs.col12;
            if(this.zoomIndex <= 1.5){
                this.zoomIndex = this.zoomIndex + 0.1
                console.log("zoomIn ", this.zoomIndex)
                col12.style.zoom = this.zoomIndex
                let zout = this.$refs.zout;
                zout.style.color = "white";
            } else {
                let zin = this.$refs.zin;
                zin.style.color = "grey";
            }
        },
        changePageToHeader(page){
            console.log("code herre ", page)
            if(page % 2 == 1){
                this.isDoneLoading2 = false
                this.pageLeft = page;
                this.pageRight = page + 1;
            } else {
                this.isDoneLoading2 = false
                this.pageRight = page;
                this.pageLeft = page - 1;
            }
            this.$notify({type: 'success', text: 'Chuyển mục lục thành công'});
        },
        handlePageChange(){
            let selectedPage = parseInt(this.$refs.selectPageInput.value)
            if(isNaN(selectedPage) || selectedPage == undefined || selectedPage == null 
                                            || selectedPage<1 || selectedPage>this.pageCount){
                this.$notify({type: 'error', text: 'Trang không hợp lệ !'});
                return
            }
            if(selectedPage === this.pageLeft || selectedPage === this.pageRight){
                this.$notify({type: 'warning', text: ('Bạn hiện đang ở trang ' + this.pageLeft + ' ' + this.pageRight +' !')});
                return
            }
            if(selectedPage % 2 == 1){
                this.isDoneLoading2 = false
                this.pageLeft = selectedPage;
                this.pageRight = selectedPage + 1;
            } else {
                this.isDoneLoading2 = false
                this.pageRight = selectedPage;
                this.pageLeft = selectedPage - 1;
            }
            this.$notify({type: 'success', text: 'Chuyển trang thành công'});
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
        prevPage() {
            this.isDoneLoading2 = false
            this.pageLeft -= 2;
            this.pageRight -= 2;
            this.isLastPage = false
        },
        nextPage() {
            this.isDoneLoading2 = false
            this.pageLeft += 2;
            this.pageRight += 2;
        },
        clearPopup(){
            this.hasSelectedString = false
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

                // Find out how much (if any) user has scrolled
                var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

                // Get cursor position
                const posX = event.clientX;
                const posY = event.clientY + 20 + scrollTop;

                this.posX = posX;
                this.posY = posY;
            }
        },
        showPopup() {
            console.log(this.pageLeft);
            this.selectedStringMenuParents = []
            this.tableContentsArr.forEach(tableContentEle => {
                console.log(tableContentEle);
                if (tableContentEle.fromPage <= this.pageLeft && tableContentEle.toPage >= this.pageLeft) {
                    this.selectedStringMenuParents = [tableContentEle.headerContent];
                    this.getParents(tableContentEle);
                    console.log('set content table at ', tableContentEle);
                }
            })
            if(this.selectedStringMenuParents.length === 0){
                this.selectedStringMenuParents.push('Không có mục lục')
            }
            $("#fire-modal").click();
        },
        clickModal() {
            this.$refs.copyBtn.innerHTML = 'Sao chép';
            this.$refs.copyBtn.style.backgroundColor = '#6777ef'
        },
        doExtractInfo(){
            console.log("data", this.selectedStringMenuParents)
            var tableContent = ''
            for (let i = 0; i < this.selectedStringMenuParents.length; i++) {
                tableContent += this.selectedStringMenuParents[i] + "/ ";
            }

            const message = '"' + this.selectedString +
                '"\nTrang '+ (this.pagePosition == 'LEFT' ? this.pageLeft : this.pageRight) +
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
        selectOnPage(pagePosition) {
            this.pagePosition = pagePosition;
        },
       handlePasswordRequest(callback, retry) {
        callback(prompt(retry
            ? 'Enter password again'
            : 'Enter password'
        ))
        },
         handleDocumentRender() {
            this.isDoneLoading = true
            this.isDoneLoading2 = true
            if(this.pageRight == this.pageCount){
                 this.isLastPage = true
            }
            let gap = 1000
            this.tableContentsArr.forEach(tableContentEle => {
                    if(tableContentEle.fromPage <= this.pageRight && this.pageRight <= tableContentEle.toPage){
                        if((tableContentEle.toPage - tableContentEle.fromPage) <= gap){
                            gap = tableContentEle.toPage - tableContentEle.fromPage
                            this.currentTableContent = tableContentEle.headerContent
                        }
                    }
                })
        },
    
    }
}
</script>

<style scoped>
.zoom{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.page-content{
    position: relative;
    top: 44px;
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

.parent li {
	background-color: #F0F0F0;
}

.expand {
	font-size: 12px;
	float: right;
	margin-right: 5px;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  width: 43px;
  height: 21px;
}
.close-sign{
    float: right;
    font-weight: bold;
    cursor:pointer;
    color: white;
}
.page-setting{
    font-weight: bold;
}
html{
    background-color: rgb(231, 231, 231);
    position: relative;
}
.content{
    zoom: 1.01;
    height: 100vh;
    display: grid;
    align-items: center;
    justify-content: center;
}
.loader-background{
    background-color: rgb(231, 231, 231);
    position: fixed;
    width: 100%;
    height: 100vh;
    /* display:none; */
    margin-top: 1px;
    z-index: 1000;
}
.col-12{
    width: 975px;
    margin: 0;
    position: relative;
    /* position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%); */
    margin: 0 auto;
}
.done-loading{
    display:none;
}
.card-body{
    padding: 0;
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

.bg-copy-x {
  background: url('/public/img/background-copy-menu-4.jpg') repeat;
}
.bg-copy {
  position: relative;
  z-index: 1;
}
.bg-copy:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 500px;
  opacity: .7;
  z-index: -1;
  background: url('/public/img/background-copy-menu.jpg') repeat;
}
.loader{
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
.text-center{
    height: 100vh;
}
.section {
    position: inherit;
}
.app-header {
    padding-bottom: 28px;
    padding-top: 8px;
    padding-left: 15px;
    padding-right: 15px;
    box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
    background-color: #555;
    color: #ddd;
    top: 0px;
    position: fixed;
    width: 100%;
    height: 5px;
    /* opacity: 0.5; */
}
.page-setting #menu{
    width: 350px;
}

.page-setting #menu .parent{
    background: #F0F0F0;
    color: rgb(75, 74, 74);
    font-weight: 400;
}
.menu-display{
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
}
</style>