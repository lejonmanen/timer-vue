<template>
    <svg class="svg-up-arrow" viewBox="0 0 100 100">
        <polyline points="50,10 90,55 70,55 70,90 30,90 30,55 10,55 50,10"
        stroke-width="7px" stroke-linecap="round" stroke-linejoin="round"
        />
    </svg>
</template>

<script>
export default {
    // name: '',
    // props: { width: '1em', height: '1em' },
    data: () => ({

    })
}
</script>

<style>
.svg-up-arrow {
    width: 1em;
    height: 1.4em;
    /* background-color: var(--icon-bg); */
    /* color: var(--text); */
    fill: #CCCCCC;
}
.svg-up-arrow polyline {
    stroke: var(--text);
}
</style>
