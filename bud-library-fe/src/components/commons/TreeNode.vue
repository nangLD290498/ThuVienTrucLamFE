<template>
  <div v-if="node" :style="nodeMargin" class="mt-1">
    <div class="d-flex">
      <input v-model="node.headerContent" class="form-control"/>
      <input v-model="node.fromPage" min="1" class="form-control" type="number" placeholder="từ trang" style="width: 100px;"/>
      <input v-model="node.toPage" min="1" class="form-control" type="number" placeholder="đến trang" style="width: 100px;"/>
      <div class="btn btn-outline-success ml-2 my-1" @click="addNext()">&#x25BC;</div>
      <div class="btn btn-outline-success ml-2 my-1" @click="addPrev()">&#x25B2;</div>
      <div class="btn btn-outline-success ml-2 my-1" @click="addChild()">+</div>
      <div style="background: antiquewhite;" class="btn btn-outline-success ml-2 my-1" @click="deleteSelf()">-</div>
      </div>

    <div v-if="hasChildren">
      <TreeNode
          v-for="child in node.childs"
          :key="child"
          :node="child"
          @deleteNode="(n) => $emit('deleteNode', n)"
          @insertPrevNode="(n) => $emit('insertPrevNode', n)"
          @insertNextNode="(n) => $emit('insertNextNode', n)"
          :spacing="spacing + 20"
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
      required: false
    },
    spacing: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nodeMargin() {
      return {
        'margin-left': `40px`
      }
    },
    hasChildren() {
      const { childs } = this.node
      return childs && childs.length > 0
    },
  },
  methods: {
    addPrev(){
      this.$emit('insertPrevNode', this.node)
    },
    addNext(){
      this.$emit('insertNextNode', this.node)
    },
    deleteSelf(){
      this.$emit('deleteNode', this.node)
    },
    addChild() {
      this.node.childs.push({
        "headerContent" : "",
        "childs" : []
      })
    }
  }
}
</script>
