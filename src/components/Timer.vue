<template>
	<div :class="timerClass">
		<div class="row">
			<input v-show="editingTitle" type="text" placeholder="Title" v-model="title" @blur="hideTitleInput" ref="title" @keyup.enter="$refs.title.blur()" />
			<h3 v-show="!editingTitle" @click="showTitleInput">{{title}} 🖊️ </h3>
		</div>

		<div class="row time"> {{displayTime}} </div>

		<div class="row">
			<button @click="startPause">{{ isRunning ? 'Pause' : 'Start'}}</button>
			<button @click="reset" class="ghost">Reset</button>
		</div>

		<div class="align-top-right">
			<div class="floating-icons">
				<div class="grow"> </div>
				<div class="icon settings" @click="showSettings = !showSettings"> ⚙️️ </div>
				<div v-if="!isTop" class="icon up" @click="$emit('up')">
                    <UpArrow />
                </div>
				<div class="icon close" @click="doClose"> 🗑️ </div>
			</div>
			<div class="settings-menu" v-show="showSettings">
				<label> Counting {{countUp ? 'up' : 'down'}}
					<div class="separator"></div>
					<OnOff @toggle="countUp = !countUp" :initial="true"></OnOff>
				</label>
				<input type="text" v-model="durationRaw" :disabled="countUp" />
				<label> {{showTenths ? 'Show' : 'Hide'}} tenths
					<div class="separator"></div>
					<OnOff @toggle="showTenths = !showTenths" :initial="false"></OnOff>
				</label>
			</div>
		</div>
	</div>
</template>


<script>
import UpArrow from './svg/UpArrow.vue'
import OnOff from './OnOff.vue'
import { formatNumber, getClockComponents } from '../utils/funcs.js';
const STOPPED = 1, STARTED = 2, PAUSED = 3;
export default {
	components: { OnOff, UpArrow },
	props: ['isTop'],
	data: () => ({
		state: STOPPED,
		seconds: 0,
		prevSeconds: 0,
		intervalId: null,
		startTime: null,
		countUp: true,
		// duration: 10,   // duration in seconds, used for counting down
		durationRaw: '1',  // duration in minutes
		timeLeft: 10,
		showSettings: false,
		title: 'Timer',
		editingTitle: false,
		showTenths: false
	}),
	computed: {
		timerClass() {
			return "timer " + (this.isRunning ? 'running' : 'paused') + ' ' + (this.isOverdue ? 'overdue' : '')
		},
		duration() {
			let ts = this.durationRaw.split(':')
			let s = 0, m = 0, h = 0
			if( ts.length < 2 ) {
				m = this.convertStrToNum(ts[0])
			} else if( ts.length == 2 ) {
				m = this.convertStrToNum(ts[0])
				s = this.convertStrToNum(ts[1])
			} else {  //  > 2
				h = this.convertStrToNum(ts[0])
				m = this.convertStrToNum(ts[1])
				s = this.convertStrToNum(ts[2])
			}
			return h * 3600 + m * 60 + s;
		},
		displayTime() {
			let total = this.seconds + (this.countUp ? this.prevSeconds : 0)
			let t = getClockComponents(total)

			let result = `${formatNumber(t.minutes)}:${formatNumber(t.seconds)}`
			if( t.hours > 0 )
				result = formatNumber(t.hours) + ':' + result
			if( this.showTenths )
				result += '.' + t.tenths

			return t.sign + result
		},
		isRunning() { return this.state === STARTED },
		isOverdue() { return this.seconds < 0 }
	},

	methods: {
		reset() {
			this.stop();
			this.prevSeconds = 0;
			if( this.countUp ) {
				this.seconds = 0;
			} else {
				this.seconds = this.duration;
				this.timeLeft = this.duration;
			}
		},
		startPause() {
			if( this.state === STOPPED || this.state === PAUSED ) {
				this.start();
			} else {
				this.stop();
			}
		},
		start() {
			const DELAY = 50
			this.state = STARTED;
			if( this.countUp ) {
				this.startTime = (new Date()).getTime();
				this.intervalId = window.setInterval(() => {
					let now = (new Date()).getTime()
					this.seconds = (now - this.startTime) / 1000;
					// console.log('interval', this.seconds);
				}, DELAY)
			} else {
				this.startTime = (new Date()).getTime();
				this.intervalId = window.setInterval(() => {
					let now = (new Date()).getTime()
					let elapsed = now - this.startTime
					let diff = this.timeLeft - elapsed
					this.seconds = this.timeLeft + diff / 1000;
				}, DELAY)
			}
		},
		stop() {
			this.prevSeconds += this.seconds;
			this.timeLeft;
			if( this.countUp ) {
				this.seconds = 0
			} else {
				this.timeLeft = this.seconds
			}
			this.state = STOPPED;
			window.clearInterval(this.intervalId);
			this.intervalId = null;
			this.startTime = null;
		},
		doClose() {
			this.reset()
			this.$emit('close')
		},

		showTitleInput() {
			this.editingTitle = true;
			this.$nextTick(() => {
				this.$refs.title.focus()
				this.$refs.title.select()
			})
		},
		hideTitleInput() {
			this.editingTitle = false
		},
		convertStrToNum(str) {
			try {
				let n = Number(str)
				return isNaN(n) ? 0 : n;
			} catch {
				return 0
			}
		}
	}
}
</script>


<style lang="css" scoped>
.timerClass {
	color: var(--text);
}
.running {
	background-color: var(--running-bg);
}
.paused {
	background-color: var(--paused-bg);
}
.overdue {
	background-color: var(--overdue-bg);
}

.settings-menu {
	z-index: 2;
	position: absolute;
	right: 2.3em;
	background-color: var(--icon-bg);
	font-size: 1.05em;
	padding: 0.2em 1em;
	display: inline-flex;
	flex-direction: column;
	text-align: left;
	width: 11em;
	margin-top: 0em;
	border: 1px solid lightgray;
	border-radius: 0.2em;
}
.settings-menu label {
	line-height: 2em;
	/* border: 1px dotted black; */
	display: flex;
	flex-direction: row;
}
.settings-menu .separator {
	flex-grow: 1;
	/* border: 1px dashed red; */
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
.timer h3 {
	margin: 0em;
	font-weight: normal;
	font-size: 1.1em;
}
.timer h3:hover {
	cursor: pointer;
}

</style>
