<script setup>
import {reactive} from 'vue'
import { useGameState } from '@/stores/gamestate.js';

const gamestate = useGameState();

async function startGame() {
    await gamestate.sendStartGameMessage();
}

</script>

<template>
<h1>Make your way to {{gamestate.playerdata.start_room}} to receive your assignment along with</h1>
<ul>
    <li v-for="player in gamestate.roommates">{{player}}</li>
</ul>
<button v-if="gamestate.ishost" @click="startGame()">Start Game</button>
</template>