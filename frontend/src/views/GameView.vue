<script setup>
import {ref, computed} from 'vue'
import Card from "@/components/GameCard.vue";
import Timer from "@/components/Timer.vue";

import { getRoundHostages } from '@/gamelogic';
import {useGameState} from "@/stores/gamestate"

const gamestate = useGameState()

const hostages = computed(()=>{
    return getRoundHostages(gamestate.current_round, gamestate.num_rounds, gamestate.playerlist.length)
})

const visibility = ref('none')

</script>

<template>
    <h2>The room leader must select {{hostages}} hostage{{hostages>1?'s':''}} in</h2>
    <Timer/>
    <Card v-model:visibility="visibility" v-model:cardname="gamestate.card.name"/>
    <div class="buttoncontainer">
        <button @click="visibility='color'">Color Reveal</button>
        <button @click="visibility='full'">Full Reveal</button>
        <button @click="visibility='none'">Hide Card</button>
    </div>
</template>
