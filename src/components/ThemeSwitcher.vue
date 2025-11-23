<template>
    <div class="component">
        Select theme
        <div>
            <button @click="switchTheme('')" :class="t1class"> Light </button>
            <button @click="switchTheme('dark')" :class="t2class"> Dark </button>
            <button @click="switchTheme('forest')" :class="t3class"> Forest </button>
            <button @click="switchTheme('orange')" :class="t4class"> Orange </button>
            <button @click="switchTheme('xmas')" :class="t5class"> Christmas </button>
        </div>
    </div>
</template>

<script>
const LS_KEY = 'timer-vue/theme'
export default {
    name: '',
    props: {},
    data: () => ({
        theme: ''  // theme corresponds with value in global.css
    }),
	computed: {
		t1class() {
			return 'ghost' + (this.theme == '' ? ' selected' : '')
		},
		t2class() {
			return 'ghost' + (this.theme == 'dark' ? ' selected' : '')
		},
		t3class() {
			return 'ghost' + (this.theme == 'forest' ? ' selected' : '')
		},
		t4class() {
			return 'ghost' + (this.theme == 'orange' ? ' selected' : '')
		},
		t5class() {
			return 'ghost' + (this.theme == 'xmas' ? ' selected' : '')
		},
	},
	mounted() {
        let localTheme = localStorage.getItem(LS_KEY);
		if( !LS_KEY ) return;
        document.documentElement.setAttribute('data-theme', localTheme);
		this.theme = localTheme
	},
	methods: {
		switchTheme(newTheme) {
			this.theme = newTheme
			document.documentElement.setAttribute('data-theme', this.theme);
			localStorage.setItem(LS_KEY, this.theme);
		}
	} // methods
}
</script>

<style scoped>
.component {
	color: var(--text);
}
button.ghost.selected {
	background-color: var(--button-hover);
}
</style>
