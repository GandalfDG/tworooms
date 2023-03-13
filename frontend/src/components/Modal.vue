<script setup>
const props = defineProps(['active'])
defineEmits(['deactivate'])

</script>

<template>

    <div class="modal" :class="{'is-active': active}">
        <div class="modal-background" @click="$emit('deactivate')"></div>
        <div class="modal-content">
            <slot></slot>
        </div>
    </div>

</template>