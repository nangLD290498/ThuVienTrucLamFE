<template>
    <section class="section">
        <div class="section-header d-block p-3" style="border-top: 5px solid #ffa426;">
            <div class="section-title m-0 main-color font-weight-bold" style="font-size: 20px;">{{ book.name }}</div>
            <div class="row m-1">
                <div class="col-12">
                    <label>Tác giả: <span class="main-color font-weight-bold">{{ book.author }}</span></label>
                </div>
                <div class="col-12">
                    <label>Nhà xuất bản: <span class="main-color">{{ book.publisher }}</span></label>
                    <label class="ml-1">- <span class="main-color">{{ book.publishedYear }}</span></label>
                </div>
                <div class="col-12">
                    <span class="badge badge-info"> {{ book.publisher }} </span>
                    <span class="badge badge-info mx-1"> {{ book.category.name }} </span>
                </div>
            </div>
        </div>
        <div class="section-body">
            <div class="row">
              <div class="col-3">
                <div class="card card-warning" style="border-top: 5px solid #ffa426; zoom: 75%;">
                  <div class="card-header py-0"  style="min-height: 40px !important;">
                    <h4 class="main-color">MỤC LỤC</h4>
                    <div class="card-header-action">
                      <a class="btn btn-icon" @click="toggleMenu()">
                        <i class="fas fa-angle-down" v-if="showMenu"></i>
                        <i class="fas fa-angle-left" v-if="!showMenu"></i>
                      </a>
                    </div>
                  </div>
                  <div class="card-body px-0" v-if="showMenu">
                    <TreeNodeDisplay
                        v-for="child in book.tableContents"
                        :key="child.id"
                        :node="child"
                        :spacing="0"
                        :index="0"
                    />
                  </div>
                </div>
              </div>
              <div class="col-9">
                <div class="card card-warning" style="border-top: 5px solid #ffa426; max-width: 2200px; margin: auto;">
                  <div class="card-body px-0">
                    <div class="row text-center">
                      <div class="col-1  px-0">
                          <a href="#" :class="'btn btn-icon btn-info ' + (pageLeft == 1 ? ' disabled' : '')"  style="margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%); transform: translateX(-50%); border-radius: 28px;" @click="prevPage()"><i class="fas fa-angle-left"></i></a>
                      </div>
                      <div class="col-5 pl-0">
                        <vue-pdf-embed
                            class=""
                            style="box-shadow: rgb(136, 136, 136) 5px 0px 10px 0px;"
                            @click="selectOnPage('LEFT')"
                            ref="pdfRef"
                            :source="pdfSource"
                            :page="pageLeft"
                        />
                      </div>
                      <div class="col-5 mx-0 pr-0">
                            <vue-pdf-embed
                                style="box-shadow: rgb(136, 136, 136) 5px 10px 10px -10px;"
                                @click="selectOnPage('RIGHT')"
                                ref="pdfRef"
                                :source="pdfSource"
                                :page="pageRight"
                            />
                      </div>
<!--                      <div class="col-1" style="margin: 0; position: absolute; top: 50%; -ms-transform: translateY(-50%); transform: translateY(-50%);">-->
                      <div class="col-1 px-0">
                        <a href="#" class="btn btn-icon btn-info" style="border-radius: 28px; top: 50%; position: absolute; transform: translateX(-50%);" @click="nextPage()"><i class="fas fa-angle-right"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
        <button class="d-none btn btn-info mx-2 trigger--fire-modal-confirm" data-toggle="modal" data-target="#fire-modal-confirm" id="fire-modal" @click="clickModal()">Delete all</button>
        <div class="modal fade"
             tabindex="-1"
             id="fire-modal-confirm"
             aria-modal="true"
             role="dialog">
            <div class="modal-dialog modal-md modal-dialog-centered" role="document">
                <div class="modal-content bg-copy-x">
<!--                    <div class="bg-copy"></div>-->
                    <div class="modal-header pt-3" style="border-bottom: solid 1px #dbdbdb;">
                        <h5 class="modal-title">Trích dẫn</h5>
                    </div>
                    <div class="modal-body" style="border-bottom: solid 1px #dbdbdb;">
                        <span class="main-color"> {{ this.selectedString }} </span>
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
                                <template v-for="selectedStringMenuParent in selectedStringMenuParents">
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
                        <button type="button" class="btn btn-primary">
                             Sao chép
                        </button>
                            <!--                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="close-confirm-modal">-->
<!--                            Sao chép-->
<!--                        </button>-->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TreeNodeDisplay from "@/components/commons/TreeNodeDisplay.vue";
import VuePdfEmbed from 'vue-pdf-embed'
import config from '../../../config/index';

export default {
    name: "ViewBook",
    components: {
        TreeNodeDisplay,
        VuePdfEmbed,
    },
    data() {
        return {
            showMenu: true,
            pdfSource: '',
            // pdfSource: '/N5-testtt.pdf',
            pageLeft: 1,
            pageRight: 2,
            posX: 0,
            posY: 0,
            selectedString: '',
            hasSelectedString: false,
            book: {
                "id": 1,
                "name": "KY YEU",
                "author": "Thích Thanh Từ",
                "publisher": "NBX tôn giáo VN",
                "publishedYear": "1990",
                "remarks": "",
                "category": {
                    "id": 2,
                    "name": "Kiến thức",
                    "remarks": "",
                    "books": null
                },
                "tableContents": [
                    {
                        "headerContent": "LỜI DẪN",
                        "fromPage": 9,
                        "childs": [],
                        "toPage": 10
                    },
                    {
                        "headerContent": "ĐÈN THIỀN SÁNG LẠI",
                        "fromPage": 13,
                        "childs": [
                            {
                                "headerContent": "THẦY HIỆN TRONG CON - Nhật Quang",
                                "fromPage": 13,
                                "childs": [
                                    {
                                        "headerContent": "Nhất dương thần quang",
                                        "fromPage": 13,
                                        "childs": [],
                                        "toPage": 14
                                    },
                                ],
                                "toPage": null
                            },
                            {
                                "headerContent": " CHƠN TÂM VÔ NIỆM - Đắc Huyền",
                                "fromPage": 21,
                                "childs": [],
                                "toPage": null
                            }
                        ],
                        "toPage": null
                    },
                    {
                        "headerContent": "TỎA RẠNG MUÔN NƠI",
                        "fromPage": 185,
                        "childs": [
                            {
                                "headerContent": "CÕI THANH TỪ - Thông Thiền",
                                "fromPage": 186,
                                "childs": [],
                                "toPage": null
                            },
                            {
                                "headerContent": "CHÙM THƠ DÂNG THẦY - Thông Thiền",
                                "fromPage": 188,
                                "childs": [],
                                "toPage": null
                            }
                        ],
                        "toPage": null
                    },
                    {
                        "headerContent": "LỜI BẠT",
                        "fromPage": 350,
                        "childs": [],
                        "toPage": null
                    },
                    {
                        "headerContent": "MỤC LỤC",
                        "fromPage": 351,
                        "childs": [],
                        "toPage": null
                    }
                ]
            },
            tableContentsArr: [],
            selectedStringMenu: '',
            selectedStringMenuParents: [],
            pagePosition: '',
            config: config,
        }
    },
    created() {
      if (this.$route.params.id) {
        this.$store.dispatch('Book/findById', this.$route.params.id)
            .then(response => {
              let respBook = response.data.content;
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
        document.addEventListener('mouseup', this.handlerFunction, false);
    },
    methods: {
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
            // let parents = [];
            if (node.parent != null) {
                this.selectedStringMenuParents.push(node.parent.headerContent);

                console.log(node.parent);

                this.getParents(node.parent);
            }
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        prevPage() {
            this.pageLeft -= 2;
            this.pageRight -= 2;
        },
        nextPage() {
            this.pageLeft += 2;
            this.pageRight += 2;
        },
        handlerFunction(event) {
            if(
                window.getSelection().toString().length > 0
                && this.hasSelectedString == true
                // && window.getSelection().toString().length === this.hasSelectedString.length
            ) {
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
            $("#fire-modal").click();
            console.log(this.pageLeft);
            this.tableContentsArr.forEach(tableContentEle => {
                console.log(tableContentEle);
                if (tableContentEle.fromPage <= this.pageLeft && tableContentEle.toPage >= this.pageLeft) {
                    this.selectedStringMenuParents = [tableContentEle.headerContent];
                    this.getParents(tableContentEle);
                    console.log('this.selectedStringMenuParents', this.selectedStringMenuParents);
                }
            })
        },
        clickModal() {
        },
        selectOnPage(pagePosition) {
            this.pagePosition = pagePosition;
        }
    }
}
</script>

<style>
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
    //padding-left: 40px;
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
</style>