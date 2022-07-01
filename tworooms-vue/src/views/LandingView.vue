<script setup>
import router from '../router';
import { storeToRefs } from 'pinia';
import {useGameState} from '@/stores/gamestate'

const gamestate = useGameState()

const {playername} = storeToRefs(gamestate)

function create_game(playername) {

    router.push("/lobby")
}

function join_game(playername, roomcode) {

    router.push("/lobby")
}
</script>

<template>
    <label for="name">Your Name:</label>
    <input :="playername">
    <button @click="create_game()">host game</button>
    <p>or</p>
    <!-- form input for room code -->
    <label for="roomcode">Room Code:</label>
    <input type="text" id="roomcode" name="room code">
    <button @click="join_game()">join game</button>
</template>
