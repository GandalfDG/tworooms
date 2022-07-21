<script setup>
import router from '../router';
import {reactive} from 'vue'
import {useGameState} from '@/stores/gamestate'

const gamestate = useGameState()

const forminput = reactive({
    playername: "",
    roomcode: ""
})

function create_game() {
    gamestate.ishost = true
    gamestate.playername = forminput.playername
    router.push("/lobby")
}

function join_game() {
    gamestate.ishost = false
    gamestate.playername = forminput.playername
    gamestate.roomcode = forminput.roomcode
    router.push("/lobby")
}
</script>

<template>
    <label for="name">Your Name:</label>
    <input v-model="forminput.playername">
    <button @click="create_game()">host game</button>
    <p>or</p>
    <!-- form input for room code -->
    <label for="roomcode">Room Code:</label>
    <input v-model="forminput.roomcode">
    <button @click="join_game()">join game</button>
</template>
