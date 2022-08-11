<script setup>
import { useGameState } from '@/stores/gamestate'
import router from '@/router'
import { onMounted } from 'vue';
import {wsEvent} from '@/gamelogic'
import cardsets from '@/cardsets'
import cardmap from '@/cardmap'

const gamestate = useGameState()

async function cutoffLobby() {
    await gamestate.sendLobbyCutoffMessage();
    // wait for the response to fill in the player data object
    window.addEventListener("wsmessage", ()=> {
        router.push('pregame'); 
        // TODO send selected cardset to the server, receive cardset from websocket
        // gamestate.card = cardmap[gamestate.deck[gamestate.playerdata.card]]
    }, {once: true});
}


</script>

<template>
    <h1>Room Code: {{gamestate.roomcode}}</h1>
    <h2>Players</h2>
    <ul>
        <li v-for="player in gamestate.playerlist">{{player}}</li>
    </ul>
    <h2>Select a card set</h2>
    <select v-model="gamestate.cardset">
        <option v-for="cardset in Object.keys(cardsets)">{{cardset}}</option>
    </select>
    <button v-if="gamestate.ishost" @click="cutoffLobby()">Start Game</button>
</template>
