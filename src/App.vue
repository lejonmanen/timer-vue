<script setup>
// Vue 3 <script setup> SFCs: https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="app">
		<button class="ghost"
			@click="addTimer">Add timer</button>
		<Timer v-for="t in ts" :key="t"
			@close="removeTimer(t)"/>
	</div>
</template>

<script>
import Timer from './components/Timer.vue'

export default {
	name: 'App',
	components: {
		Timer
	},
	data: () => ({
		ts: [0]
	}),
	methods: {
		addTimer() {
			this.ts.push(this.getNewId(this.ts))
		},
		removeTimer(id) {
			this.ts = this.ts.filter(i => i !== id);
		},
		getNewId(oldIds) {
			let id;
			do {
				id = Math.random();
			} while( oldIds.some(i => i === id) );
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
