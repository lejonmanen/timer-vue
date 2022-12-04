<template>
    <div class="widget">
        <Timer v-if="type=='timer'" :isTop="isTop" @close="$emit('close', id)" @up="$emit('up', id)" />
        <Note v-if="type=='note'" :isTop="isTop" @close="$emit('close', id)" @up="$emit('up', id)" />
    </div>
</template>

<script>
import Timer from './Timer.vue'
import Note from './Note.vue'
export default {
    components: { Timer, Note },
    props: { type: String, id: Number, isTop: { type: Boolean, value: false } },
    data: () => ({

    })
}
</script>

<style>
.widget {

}
.widget button {
	margin: 0.3em;
	padding: 0.7em 1.5em;
	font-size: 1em;
	border-radius: 0.4em;
	background-color: var(--button-bg);
	border-color: var(--button-border);
	transition: all 0.6s;
}
.widget button.ghost {
	background-color: var(--ghost-bg);
}
.widget button:hover {
	background-color: var(--button-hover);
	cursor: pointer;
	/* border-color: #1189AF */
}

.align-top-right {
	position: absolute;
	top: 0px;
	right: 0px;
	display: flex;
	flex-direction: column;
}
.grow {
	flex-grow: 1;
}
.floating-icons {
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
}

</style>
