<script setup>
import { reactive, computed, watch, onMounted } from 'vue'

const time = reactive({
    start_time: 0, //new Date().getTime(),
    duration: 60,
    ticks: 0,
    paused: false
})

const timestring = computed(() => {
    // duration - current time - start time
    let current_time = 0 //new Date().getTime()
    let seconds_remaining = time.duration - (time.ticks % time.duration)//current_time - time.start_time
    // format text nicely
    let minutes = (Math.floor(seconds_remaining / 60)).toString()
    let seconds = (seconds_remaining % 60).toString()

    let padded_seconds = seconds.length < 2 ? "0" + seconds : seconds
    return "".concat(minutes, ":", padded_seconds)
})

var timer_interval

// onMounted(() => {
//     timer_interval = setInterval(() => { time.ticks++ }, 1000)
// })

// when we pause or unpause, set or clear an interval
watch(() => time.paused, () => {
    if (!time.paused) {
        // set interval to tick
        timer_interval = setInterval(() => { time.ticks++ }, 1000)
    }
    else {
        // stop the interval
        clearInterval(timer_interval)
    }
})

</script>

<template>
    <h1 class="timer">{{ timestring }}</h1>
</template>