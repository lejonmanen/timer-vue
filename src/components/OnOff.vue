<template>
    <div :class="onOffClass" @click="handleClick">
        <div :class="isOn ? 'grow' : ''"> </div>
        <div class="ball"> </div>
        <div :class="isOn ? '' : 'grow'"> </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        initial: { type: Boolean, default: true }
    },
    data: function() {
        return {
            isOn: this.initial
        }
    },
    computed: {
        onOffClass() {
            return 'on-off ' + (this.isOn ? 'on' : 'off')
        }
    },
    methods: {
        handleClick(e) {
            this.isOn = !this.isOn
            this.$emit('toggle')
        }
    }
}
</script>

<style scoped>
:root {
	--button-border: #1189AF;
	--button-bg: #A7E1F3;
    --running-bg: #C9F7FF;
    --paused-bg: #DEEBED;
}
.on-off {
    font-size: 1.2em;
    width: 3em;
    border-radius: 1em;
    border: 1px solid var(--button-border);
    background-color: var(--paused-bg);
    display: flex;
    flex-direction: row;
    margin: 0.2em;
}
.on-off.on {
    background-color: var(--running-bg);
}
.on-off:hover {
    cursor: pointer;
}
.on-off > * {
    transition: all 0.5s linear;
}
.grow { flex-grow: 1; }

.ball {
    font-size: 0.9em;
	border-radius: 1em;
    border: 1px solid var(--button-border);
    background-color: var(--button-border);
    width: 1em;
    height: 1em;
    margin: 0.2em;
}
</style>
