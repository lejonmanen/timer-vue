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
				<div class="icon close" @click="doClose"> 🗑️ </div>
			</div>
			<div class="settings-menu" v-show="showSettings">
				<label> Counting {{countUp ? 'up' : 'down'}}
					<OnOff @toggle="countUp = !countUp" :initial="true"></OnOff>
				</label>
				<input type="text" v-model="durationRaw" :disabled="countUp" />
				<label> {{showTenths ? 'Show' : 'Hide'}} tenths
					<OnOff @toggle="showTenths = !showTenths" :initial="false"></OnOff>
				</label>
			</div>
		</div>
	</div>
</template>


<script>
import OnOff from './OnOff.vue'
import { formatNumber, getClockComponents } from '../utils/funcs.js';
const STOPPED = 1, STARTED = 2, PAUSED = 3;
export default {
	components: { OnOff },
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
			// if( t.hours === 0)
			// 	return t.sign + formatNumber(t.minutes) + ':' + formatNumber(t.seconds) + '.' + t.tenths
			// return `${t.sign}${formatNumber(t.hours)}:${formatNumber(t.minutes)}:${formatNumber(t.seconds)}.${t.tenths}`

			// let total = this.seconds + (this.countUp ? this.prevSeconds : 0)
			// let x = Math.floor(total)
			// let tenths = Math.round((total - x) * 10) / 10
			// if( tenths === 0 ) tenths = '0'
			// tenths = '.' + tenths
			// let sign = x >= 0 ? '' : '-'
			// x = Math.abs(x)
			// let s = x % 60;
			// x = (x - s) / 60;
			// let m = x % 60;
			// let h = (x - m) / 60;
			// if( h === 0 )
			// 	return sign + formatNumber(m) + ':' + formatNumber(s)
			// return `${sign}${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}`
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
				console.log('count down');
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
.timer {
	--running-bg: #C9F7FF;
	--paused-bg: #DEEBED;
	--hover-icon-bg: lightgray;
	--icon-bg: #F7F7F7;
	--button-bg: #A7E1F3;
	--button-border: #1189AF;
	--ghost-bg: white;
	--button-hover: #77CFEB;
	--overdue-bg: #FFE1E9;
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


.align-top-right {
	position: absolute;
	top: 0px;
	right: 0px;
	display: flex;
	flex-direction: column;
	z-index: 1;
	/* justify-content: flex-start; */
	/* text-align: right; */
}
.grow {
	flex-grow: 1;
}
.floating-icons {
	/* position: relative;
	z-index: 10; */
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

.settings-menu {
	/* position: relative;
	z-index: 20; */
	background-color: var(--icon-bg);
	font-size: 1.05em;
	padding: 0.2em 1em;
	display: inline-flex;
	flex-direction: column;
	text-align: left;
	width: 8em;
	margin-top: 0em;
	border: 1px solid lightgray;
	border-radius: 0.2em;
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
button {
	margin: 0.3em;
	padding: 0.7em 1.5em;
	font-size: 1em;
	border-radius: 0.4em;
	background-color: var(--button-bg);
	border-color: var(--button-border);
	transition: all 0.6s;
}
button.ghost {
	background-color: var(--ghost-bg);
}
button:hover {
	background-color: var(--button-hover);
	cursor: pointer;
	/* border-color: #1189AF */
}
</style>
