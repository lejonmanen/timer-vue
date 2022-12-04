<script setup>
// Vue 3 <script setup> SFCs: https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="app">
		<Widget v-for="(t, index) in ts" :key="t.id" :type="t.type" :id="t.id"
		:isTop="index === 0"
			@close="remove(t.id)"
			@up="moveUp(t.id)" />
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
		},
		moveUp(id) {
			let newTs = [ ...this.ts ]
			let i = newTs.findIndex(x => x.id === id)
			if( i <= 0 ) return;

			let temp = newTs[i]
			newTs[i] = newTs[i-1]
			newTs[i-1] = temp
			this.ts = newTs
		}
	}
}
</script>

<style>

</style>
