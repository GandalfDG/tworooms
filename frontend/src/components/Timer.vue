<script setup>
import { reactive, computed, watch } from 'vue'
import { START_LOCATION } from 'vue-router';

const update_rate_ms = 100;

const props = defineProps({
    duration: Number,
    paused: Boolean
});

const emit = defineEmits(["timeElapsed"]);

const time = reactive({
    start_time: 0, //new Date().getTime(),
    seconds_remaining: 0,
    running: false
});


function update_time() {
    let current_time = new Date().getTime();
    time.seconds_remaining = props.duration - ((current_time - time.start_time) / 1000);
    if(time.seconds_remaining <= 0) {
        time.seconds_remaining = 0;
        time_elapsed();
    }
}

function time_elapsed() {
    // emit an event to notify the parent component of the time elapsing
    emit("timeElapsed");
    clearInterval(timer_interval);
    console.log("timer elapsed");
}

const timestring = computed(() => {
    // format text nicely
    let minutes = (Math.floor(time.seconds_remaining / 60)).toString()
    let seconds = (Math.floor(time.seconds_remaining % 60)).toString()

    let padded_seconds = seconds.length < 2 ? "0" + seconds : seconds
    return "".concat(minutes, ":", padded_seconds)
})


var timer_interval

// when we pause or unpause, set or clear an interval
watch(() => props.paused, () => {
    if (time.start_time === 0) {
        time.start_time = new Date().getTime()
    }
    if (!props.paused) {
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