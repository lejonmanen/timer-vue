<script setup>
// Vue 3 <script setup> SFCs: https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>

<template>
	<div id="app">
		<Widget v-for="(t, index) in ts" :key="t.id" :type="t.type" :id="t.id"
			:isTop="index === 0"
			:countdown="!!t.countdown"
			@close="remove(t.id)"
			@up="moveUp(t.id)"
			/>

		<button class="ghost"
			@click="addTimer">Add timer</button>
		<button class="ghost"
			@click="addText">Add note</button>

		<ThemeSwitcher />

		<About />
	</div>
</template>

<script>
import Widget from './components/Widget.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import About from './components/About.vue'

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
			this.addWidget('timer', true)
		},
		addText() {
			this.addWidget('note')
		},
		addWidget(type, countdown=undefined) {
			let id = this.getNewId(this.ts)
			let o = { type: type, id: id }
			if( (typeof countdown) === 'boolean' ) {
				o.countdown = countdown
			}
			console.log('App.addWidget', o);
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
