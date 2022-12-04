<template>
    <div class="component">
        <Timer v-if="type=='timer'" @close="$emit('close', id)" />
        <Note v-if="type=='note'" @close="$emit('close', id)" />
    </div>
</template>

<script>
import Timer from './Timer.vue'
import Note from './Note.vue'
export default {
    components: { Timer, Note },
    props: { type: String, id: Number },
    data: () => ({

    })
}
</script>

<style scoped>
.component {

}
</style>
