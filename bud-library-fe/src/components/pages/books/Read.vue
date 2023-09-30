<template>
    <section v-if="book" class="section">
        <div class="section-header d-block p-3">
            <div class="main-color font-weight-bold" style="font-size: 20px; padding-left: 18px;">
                <span>{{ book.name }}</span>
                <div class="float-right">
                    <router-link :to="{ name: 'ViewPdf' , params: { id: id, startPage: 1, index: 1 }}" class="btn btn-success">Đọc sách</router-link>
                </div>
            </div>
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
                <div class="card card-warning">
                  <div class="card-header py-0"  style="min-height: 40px !important;">
                    <h4 class="main-color">MỤC LỤC</h4>
                  </div>
                  <div class="card-body px-0">
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
            id: this.$route.params.id
        }
    },
    created() {
      if (this.$route.params.id) {
        this.$store.dispatch('Book/findById', this.$route.params.id)
            .then(response => {
              let respBook = response.data.content.book;
              this.book = respBook;
              this.book.tableContents = respBook.tableContent;
              let tableContents = this.book.tableContents;
              tableContents.forEach(tableContent => {
                this.getChilds(tableContent, null, []);
              })
            });
      }
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
        }
        },
    }
</script>

<style scoped>
    .card-warning{
        padding: 31px;
    }
    .card-header {
        padding-left: 0px;
    }
    .read-book .row{
        position: relative;
        display: contents;
    }
</style>