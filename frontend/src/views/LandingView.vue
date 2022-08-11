<script setup>
import router from '../router';
import {reactive} from 'vue'
import {useGameState} from '@/stores/gamestate'

const gamestate = useGameState()

const forminput = reactive({
    playername: "",
    roomcode: ""
})

async function create_game() {
    gamestate.ishost = true
    gamestate.playername = forminput.playername
    await gamestate.createRoom()
    router.push("/lobby")
}

async function join_game() {
    gamestate.ishost = false
    gamestate.playername = forminput.playername
    gamestate.roomcode = forminput.roomcode.toUpperCase()
    await gamestate.joinRoom()
    router.push("/lobby")
}
</script>

<template>
    <label for="name">Your Name:</label>
    <input v-model="forminput.playername">
    <button class="button" @click="create_game()">host game</button>
    <p>or</p>
    <!-- form input for room code -->
    <label for="roomcode">Room Code:</label>
    <input v-model="forminput.roomcode">
    <button @click="join_game()">join game</button>
</template>
