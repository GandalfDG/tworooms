<script setup>
import { reactive, computed, watch } from 'vue'
import { START_LOCATION } from 'vue-router';

const time = reactive({
    start_time: 0, //new Date().getTime(),
    duration: 60,
    seconds_remaining: 0,
    paused: true
})

const update_rate_ms = 200

const timestring = computed(() => {
    // duration - current time - start time
    if (time.start_time === 0) {
        time.start_time = new Date().getTime()
    }
    // format text nicely
    let minutes = (Math.floor(time.seconds_remaining / 60)).toString()
    let seconds = (Math.floor(time.seconds_remaining % 60)).toString()

    let padded_seconds = seconds.length < 2 ? "0" + seconds : seconds
    return "".concat(minutes, ":", padded_seconds)
})

function update_time() {
    let current_time = new Date().getTime()
    time.seconds_remaining = time.duration - ((current_time - time.start_time) / 1000)
}

var timer_interval

// when we pause or unpause, set or clear an interval
watch(() => time.paused, () => {
    if (!time.paused) {
        // set interval to tick
        timer_interval = setInterval(()=>{update_time()}, update_rate_ms)
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

<style>
.timer {
    font-family: monospace;
    font-size: 5em;
    flex: 1;
}
</style>