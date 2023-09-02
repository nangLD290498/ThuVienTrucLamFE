<template>
  <div :style="nodeMargin" class="mt-1">
    <div class="d-flex">
      <input v-model="node.headerContent" class="form-control"/>
      <input v-model="node.fromPage" class="form-control" placeholder="từ trang" style="width: 100px;"/>
      <input v-model="node.toPage" class="form-control" placeholder="đến trang" style="width: 100px;"/>
      <div class="btn btn-outline-success ml-2 my-1" @click="addChild()">+</div>
    </div>

    <div v-if="hasChildren">
      <TreeNode
          v-for="child in node.childs"
          :key="child.id"
          :node="child"
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
      required: true
    },
    spacing: {
      type: Number,
      default: 0
    }
  },
  computed: {
    nodeMargin() {
      return {
        // 'margin-left': `${this.spacing}px`
        'margin-left': `40px`
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
