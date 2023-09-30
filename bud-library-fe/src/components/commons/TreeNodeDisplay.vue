<template>
  <div :style="nodeMargin" class="mt-1">
    <div class="d-flex">
      <div class="table-content-item" :style="contentItem"> 
        <router-link :to="{ name: 'ViewPdf' , params: { id: id, startPage: node.fromPage, index: 1 }}" >
          {{node.headerContent}} 
        </router-link>
      </div>
      <span class="font-weight-bold" style="width: 100px; padding: 3px 0 0 10px;"> {{node.fromPage}} <label v-if="node.toPage != null && node.toPage != ''">-</label> {{node.toPage}} </span>
    </div>

    <div v-if="hasChildren">
      <TreeNode
          v-for="child in node.childs"
          :key="child.id"
          :node="child"
          :spacing="spacing + 20"
          :index="index + 1"
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
 .d-flex{
  cursor: pointer;
 }
</style>
