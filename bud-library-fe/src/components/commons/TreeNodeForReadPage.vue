<template>
  <div :style="nodeMargin" class="mt-1">
    <div :class="'d-flex '+ (isCurrent?'current-item':'')">
      <div class="table-content-item" :style="contentItem" @click="$emit('changePageToHeader', node.fromPage)"> 
        &nbsp;
        <a href="#" :class="isCurrent?'current':''">
          {{node.headerContent}} 
        </a>
      </div>
    </div>

    <div v-if="hasChildren">
      <TreeNode
          v-for="child in node.childs"
          :key="child.id"
          :node="child"
          :spacing="spacing + 20"
          :index="index + 1"
          :currentTableContentArray="currentTableContentArray"
           @changePageToHeader="(n) => $emit('changePageToHeader', n)" 
      />
    </div>
  </div>
</template>
<script>

export default {
  name: 'TreeNode',
  props: {
    node: {
      type: Object,
      required: true
    },
    spacing: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    currentTableContentArray: {
      type: Array,
      default: []
    }
  },
  data() {
        return {
            isCurrent: false,
        }
    },
  computed: {
    nodeMargin() {
      return {
        // 'margin-left': `${this.spacing}px`
        'margin-left': this.index == 0 ? '10px' : `40px`
      }
    },
    contentItem() {
      return {
        'font-weight': 900 - this.index * 200
      }
    },
    hasChildren() {
      const { childs } = this.node
      return childs && childs.length > 0
    },
  },
  mounted(){
     this.currentTableContentArray.forEach(tableContentEle => {
                if (
                    tableContentEle.fromPage == this.node.fromPage &&
                    tableContentEle.toPage == this.node.toPage &&
                    tableContentEle.headerContent == this.node.headerContent) {
                      this.isCurrent = true
                }
            })
  },
  methods: {
    addChild() {
      this.node.childs.push({
        "headerContent" : "",
        "childs" : []
      })
    }
  }
}
</script>

<style scoped>
  .current-item{
    background: gray;
    border-radius: 1px;
  }
  .current{
    color: aliceblue;
  }
 .d-flex{
  cursor: pointer;
 }
 .table-content-item{
  background: transparent;
  border: transparent;
 }
 a{
  color: #545454;
 }
</style>
