<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, computed, watch, onMounted } from 'vue'
import { useGameState } from '../stores/gamestate'

const updateRateMs = 100
const gamestate = useGameState()

const props = defineProps({
  duration: Number,
  paused: Boolean,
  startTimestamp: Number
})

const emit = defineEmits(['timeElapsed'])

const time = reactive({
  start_time: new Date(props.startTimestamp).getTime(), // new Date().getTime(),
  seconds_remaining: props.duration,
  running: true
})

onMounted(() => {
  timerInterval = setInterval(() => { updateTime() }, updateRateMs)
})

function updateTime () {
  const currentTime = new Date().getTime()
  time.seconds_remaining = props.duration - ((currentTime - time.start_time) / 1000)
  if (gamestate.debug.timer_debug) {
    time.seconds_remaining = 0
    gamestate.debug.timer_debug = false
  }
  if (time.seconds_remaining <= 0) {
    time.seconds_remaining = 0
    timeElapsed()
  }
}

function timeElapsed () {
  // emit an event to notify the parent component of the time elapsing
  emit('timeElapsed')
  clearInterval(timerInterval)
  console.log('timer elapsed')
}

const timestring = computed(() => {
  // format text nicely
  const minutes = (Math.floor(time.seconds_remaining / 60)).toString()
  const seconds = (Math.floor(time.seconds_remaining % 60)).toString()

  const paddedSeconds = seconds.length < 2 ? '0' + seconds : seconds
  return ''.concat(minutes, ':', paddedSeconds)
})

let timerInterval

// when we pause or unpause, set or clear an interval
watch(() => props.paused, () => {
  if (time.start_time === 0) {
    time.start_time = new Date().getTime()
  }
  if (!props.paused) {
    // set interval to tick
    timerInterval = setInterval(() => { updateTime() }, updateRateMs)
  } else {
    // stop the interval
    clearInterval(timerInterval)
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
