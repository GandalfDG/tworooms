<script setup>
import { getRoundHostages } from '@/gamelogic';
import { useGameState } from '@/stores/gamestate';
import ColumnList from '@/components/ColumnList.vue'

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
    
    <div v-if="gamestate.isleader">
        <ColumnList :list="gamestate.roommates" :columns="2">
            <template v-slot="playername">
                <button class="button is-fullwidth mb-2" :class="{ 'is-primary': playername.value === selectedPlayer }" :value="playername.value" @click="selectName(playername.value)">{{ playername.value }}</button>
            </template>
        </ColumnList>   
    </div>

    <div class="field" v-if="gamestate.ishost">
        <p class="control">
            <button class="button is-link is-large" @click="nextRound()">Next Round</button>
        </p>
    </div>
</template>