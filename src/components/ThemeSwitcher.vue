<template>
    <div class="component">
        Select theme
        <div>
            <button @click="switchTheme('')" class="ghost"> Light </button>
            <button @click="switchTheme('dark')" class="ghost"> Dark </button>
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
	mounted() {
        let localTheme = localStorage.getItem(LS_KEY);
		if( !LS_KEY ) return;
        document.documentElement.setAttribute('data-theme', localTheme);
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

}
</style>
