<script setup>
import { useGameState } from '@/stores/gamestate'
import { onMounted } from 'vue';

const gamestate = useGameState()


</script>

<template>
    <h1>Room Code: {{gamestate.roomcode}}</h1>
    <h2>Players</h2>
    <ul>
        <li v-for="player in gamestate.playerlist">{{player}}</li>
    </ul>
    <button v-if="gamestate.ishost" @click="">Start Game</button>
</template>
