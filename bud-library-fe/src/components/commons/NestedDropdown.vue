<template>
		<ul class="child" v-if="contentTables.length > 0">
			<li v-for="item in contentTables" :key="item" class="parent">
				<div class="div" @mouseleave="mouseMoveEvent">
					<div  @click="$emit('changePageToHeader', item.fromPage)"> {{ item.headerContent }} 
						<span v-if="(item.childs && item.childs.length > 0)" class="expand">»</span>
					</div>
				</div>
				<NestedDropdown @mouseenter="mouseOverHandle" :style="(isUpperHalf ? 'top' : 'bottom') + ': 0;  max-height: 300px;'" @changePageToHeader="(n) => $emit('changePageToHeader', n)" :page="item.fromPage" v-if="(item.childs && item.childs.length > 0)" :contentTables="item.childs" key=""/>
			</li>
		</ul>
</template>

<script>
export default {
    props: {
        contentTables: {
            type: Object,
            default: []
        },
    },
	data() {
        return {
            isUpperHalf: true,
			middlehalf: 0,
			clientY: 0, 
			nestedElement: null,
        }
    },
    methods: {
		mouseOverHandle(event){
			this.nestedElement = event.target
		},
		mouseMoveEvent(event){
			this.middlehalf = window.innerHeight / 2;
            if (event.clientY >= this.middlehalf) {
                this.isUpperHalf = false
            } else {
                this.isUpperHalf = true
            }
		}

    }

}
</script>

<style>
.div{
	padding-left: 10px;
	color: rgb(75, 74, 74);
	font-weight: 400;
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
	position: absolute;
}

.child li {
	background-color: #E4EFF7;
	line-height: 30px;
	border-bottom: #CCC 1px solid;
	border-right: #CCC 1px solid;
	width: 350px;
	cursor: pointer;
	/* width: 100%; */
}

.child li a {
	color: #000000;
}

ul {
	list-style: none;
	margin: 0;
	padding: 0px;
	/* min-width: 10em; */
}

ul ul ul {
	left: 100%;
	margin-left: 1px;
}

li:hover {
	background-color: #95B4CA;
}

.parent li:hover {
	background-color: #F0F0F0;
}
.expand {
	font-size: 12px;
	float: right;
	margin-right: 5px;
}
</style>