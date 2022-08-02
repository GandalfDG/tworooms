<script setup>
import { useGameState } from '@/stores/gamestate'
import router from '@/router'
import { onMounted } from 'vue';
import {wsEvent} from '@/gamelogic'

const gamestate = useGameState()

onMounted(() => {
    if(gamestate.ishost) {
        gamestate.createRoom()
    }
    else {
        gamestate.joinRoom()
    }
})

async function cutoffLobby() {
    await gamestate.sendLobbyCutoffMessage();
    // wait for the response to fill in the player data object
    window.addEventListener("wsmessage", ()=>{router.push('pregame')});
}


</script>

<template>
    <h1>Room Code: {{gamestate.roomcode}}</h1>
    <h2>Players</h2>
    <ul>
        <li v-for="player in gamestate.playerlist">{{player}}</li>
    </ul>
    <button @click="cutoffLobby()">cutoff</button>
    <button v-if="gamestate.ishost" @click="">Start Game</button>
</template>
