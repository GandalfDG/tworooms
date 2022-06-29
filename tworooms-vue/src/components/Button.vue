<script setup>
import {reactive} from 'vue'

const props = defineProps(["text"])

function clickHandler() {

}

</script>

<template>
    <button @click="$emit('clicked')"><h1>{{props.text}}</h1></button>
</template>

<style>
button {
    background-color: transparent;
    border: 2px solid;
    padding: 30px;
    border-radius: 10px;
    border-color: #c4c4c4;
}
</style>