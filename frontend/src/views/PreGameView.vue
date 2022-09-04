<script setup>
import { reactive } from 'vue'
import { useGameState } from '@/stores/gamestate.js';

const gamestate = useGameState();

async function startGame() {
    await gamestate.sendStartGameMessage();
}

</script>

<template>
    <div class="block">
        <h1 class="title is-4">Make your way to {{ gamestate.playerdata.start_room }} to receive your assignment along with:</h1>
    </div>
    <ul>
        <li v-for="player in gamestate.roommates">{{ player }}</li>
    </ul>
    <div class="field" v-if="gamestate.ishost">
        <p class="control">
            <button class="button is-link is-large" @click="startGame()">Start Game</button>
        </p>
    </div>
</template>