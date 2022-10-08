<script setup>
import { getRoundHostages } from '@/gamelogic';
import { useGameState } from '@/stores/gamestate';

const gamestate = useGameState();

let hostages = getRoundHostages(gamestate.current_round, gamestate.num_rounds,
    gamestate.playerlist.length)

function nextRound() {
    gamestate.startNextRound();
}

</script>

<template>
    <div class="block">
        <h1 class="title is-4">Round Ended, time to transfer {{hostages}} hostage{{hostages>1?'s':''}}
        </h1>
    </div>
    <!-- <ul>
        <li v-for="player in gamestate.roommates">{{ player }}</li>
    </ul> -->
    <div class="field" v-if="gamestate.ishost">
        <p class="control">
            <button class="button is-link is-large" @click="nextRound()">Next Round</button>
        </p>
    </div>
</template>