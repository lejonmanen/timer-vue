<template>
	<div class="timer">
		<div class="row">
			<input type="text" placeholder="Title" />
		</div>
		<div class="row time"> {{displayTime}} </div>
		<div class="row">
			<button @click="startPause">{{ isRunning ? 'Pause' : 'Start'}}</button>
			<button @click="reset" class="ghost">Reset</button>
		</div>
		<div class="close" @click="doClose"> X </div>
	</div>
</template>


<script>
import { formatNumber } from '../utils/funcs.js';
const STOPPED = 1, STARTED = 2, PAUSED = 3;
export default {
	data: () => ({
		state: STOPPED,
		seconds: 0,
		prevSeconds: 0,
		intervalId: null,
		startTime: null
	}),
	computed: {
		displayTime() {
			let x = Math.floor(this.seconds + this.prevSeconds);
			let s = x % 60;
			x = (x - s) / 60;
			let m = x % 60;
			let h = (x - m) / 60;
			if( h === 0 )
				return formatNumber(m) + ':' + formatNumber(s)
			return `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`
		},
		isRunning() { return this.state === STARTED }
	},
	methods: {
		reset() {
			this.stop();
			this.seconds = 0;
			this.prevSeconds = 0;
		},
		startPause() {
			if( this.state === STOPPED || this.state === PAUSED ) {
				this.start();
			} else {
				this.stop();
			}
		},
		start() {
			this.startTime = (new Date()).getTime();
			this.state = STARTED;
			this.intervalId = window.setInterval(() => {
				let now = (new Date()).getTime()
				this.seconds = (now - this.startTime) / 1000;
				// console.log('interval', this.seconds);
			}, 250)
		},
		stop() {
			this.prevSeconds += this.seconds;
			this.seconds = 0;
			this.state = STOPPED;
			window.clearInterval(this.intervalId);
			this.intervalId = null;
			this.startTime = null;
		},
		doClose() {
			this.reset()
			this.$emit('close')
		}
	}
}
</script>


<style lang="css" scoped>
.timer .close {
	position: absolute;
	top: 0px;
	right: 0px;
	font-family: Courier New;
	font-weight: bold;
	background-color: white;
	border: 1px solid lightgray;
	border-radius: 0.2em;
	margin: 0.1em;
	padding: 0.2em;
	transition: all 1s;
}
.timer .close:hover {
	cursor: pointer;
	background-color: lightgray;
}
.timer {
	position: relative;
	border: 1px solid gray;
	border-radius: 0.2em;
	padding: 1em;
}
.timer .time {
	font-size: 3em;
	font-family: Courier New;
	font-weight: bold;
}
button {
	margin: 0.3em;
	padding: 0.7em 1.5em;
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
