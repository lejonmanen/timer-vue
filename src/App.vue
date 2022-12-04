<script setup>
// Vue 3 <script setup> SFCs: https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="app">
		<Widget v-for="t in ts" :key="t.id" :type="t.type" :id="t.id"
			@close="remove(t.id)" />
		<button class="ghost"
			@click="addTimer">Add timer</button>
		<button class="ghost"
			@click="addText">Add note</button>
	</div>
</template>

<script>
import Widget from './components/Widget.vue'

export default {
	name: 'App',
	components: {
		Widget
	},
	data: () => ({
		ts: [0]
	}),
	methods: {
		addTimer() {
			let id = this.getNewId(this.ts)
			let o = { type: 'timer', id: id }
			this.ts.push(o)
		},
		addText() {
			let id = this.getNewId(this.ts)
			let o = { type: 'note', id: id }
			this.ts.push(o)
		},
		remove(id) {
			this.ts = this.ts.filter(o => o.id !== id);
		},
		getNewId(oldIds) {
			let id;
			do {
				id = Math.random();
			} while( oldIds.some(o => o.id === id) );
			return id;
		}
	}
}
</script>

<style>
body {
	margin: 0em;
	padding: 1em;
	background-color: #F3F3F3;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0px;
	padding: 0em;
}
button {
	margin: 0.3em;
	padding: 0.7em 3.5em;
	font-size: 1em;
	border-radius: 0.4em;
	background-color: #A7E1F3;
	border-color: #1189AF;
	transition: all 0.6s;
}
button.ghost {
	background-color: white;
}
button:hover {
	background-color: #77CFEB;
	cursor: pointer;
	/* border-color: #1189AF */
}
</style>
