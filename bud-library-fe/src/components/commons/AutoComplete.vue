<template>
  <div>
    <input
      v-model="searchTerm"
      type="text"
      class="form-control"
      @focus="authorForcus"
      @focusout="authorForcusout"
    />
    <ul
      @mouseover="isMouseOnAuthor = true"
      @mouseleave="isMouseOnAuthor = false"
      v-if="searchAuthors.length && isShowAuthor"
      class="mb-3 author-list"
    >
      <li v-for="item in searchAuthors" :key="item" @click="selectAuthor(item)">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    data() {
    return {
        searchTerm: '',
        selectedAuthor: '',
        isShowAuthor: false,
        isMouseOnAuthor: false,
    };
  },
  props: {
        list: {
            type: Object,
            default: []
        },
    },
    watch: {
        searchTerm: function() {
            this.$emit('getTextContent', this.searchTerm)
        }
    },
     computed: {
        searchAuthors: function() {
        if (this.searchTerm === '') {
            return this.list
        }

        let matches = 0
        return this.list.filter(author => {
            if (
                author.toLowerCase().includes(this.searchTerm.toLowerCase())
                && matches < 10
            ) {
                matches++
                return author
            }
            })
        }
    },
  methods: {
    authorForcusout(){
       if(!this.isMouseOnAuthor) this.isShowAuthor = false
    },
    authorForcus(){
      this.isShowAuthor=true
    },
    selectAuthor(author){
      this.selectedAuthor = author
      this.searchTerm = author
      this.isShowAuthor = false
    },
  }
};
</script>

<style>
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