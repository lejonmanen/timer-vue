<template>
    <div class="note">
        <div class="row">
            <input v-show="editingText" type="text" placeholder="Description" v-model="text" @blur="editingText = false" ref="textRef" @keyup.enter="$refs.textRef.blur()" />
            <h3 v-show="!editingText" @click="showAndFocus">{{text}}</h3>
        </div>
        <div class="align-top-right">
            <div class="floating-icons">
                <div class="grow"> </div>
                <div v-if="!isTop" class="icon up" @click="$emit('up')">
                    <UpArrow />
                </div>
                <div class="icon close" @click="$emit('close')"> 🗑️ </div>
            </div>
        </div>
	</div>
</template>

<script>
import UpArrow from './svg/UpArrow.vue'
export default {
    components: { UpArrow },
    props: ['isTop'],
    data: () => ({
        editingText: false,
		text: "Click to change text"
    }),
	methods: {
        showAndFocus() {
            this.editingText = true;
            this.$nextTick(() => {
                this.$refs.textRef.focus()
                this.$refs.textRef.select()
            })
        }
	} // methods
}
</script>

<style scoped>
.note {
    position: relative;
    border: 1px solid gray;
    border-radius: 0.2em;
    padding: 1em;

    display: flex;
    flex-direction: column;
    min-height: 3em;
    justify-content: center;
}
.note h3, .note input {
    /* width: 100%; */
    /* border: 1px dotted hotpink; */
    flex-grow: 1;
    margin: 0em;
	font-weight: normal;
	font-size: 1.1em;
}
.note h3:hover {
	cursor: pointer;
}


/* .align-top-right {
	position: absolute;
	top: 0px;
	right: 0px;
	display: flex;
	flex-direction: column;
	z-index: 1;
}
.grow {
	flex-grow: 1;
} */
/* .floating-icons {
	font-family: Courier New;
	font-weight: bold;
	font-size: 1.2em;
	display: flex;
	flex-direction: row;
	user-select: none;
}
.floating-icons > .icon {
	background-color: var(--icon-bg);
	border: 1px solid lightgray;
	border-radius: 0.2em;
	padding: 0.2em;
	margin: 0.1em;
	transition: all 1s;
}
.floating-icons .icon:hover {
	cursor: pointer;
	background-color: var(--hover-icon-bg);
} */
.icon.up {
    /* height: 1em; */
    display: grid;
    /* justify-content: center; */
    align-items: center;
}

</style>
