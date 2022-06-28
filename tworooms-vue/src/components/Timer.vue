<script setup>
import {reactive, computed} from 'vue'

const time = reactive({
    start_time: 0, //new Date().getTime(),
    duration: 60
})

const timestring = computed(() => {
    // duration - current time - start time
    let current_time = 0 //new Date().getTime()
    let seconds_remaining = time.duration - current_time - time.start_time
    // format text nicely
    let minutes = (Math.floor(seconds_remaining / 60)).toString()
    let seconds = (seconds_remaining % 60).toString()

    let padded_seconds = seconds.length < 2 ? "0" + seconds : seconds
    return "".concat(minutes, ":", padded_seconds)
})

</script>

<template>
    <h1 class="timer">{{timestring}}</h1>
</template>