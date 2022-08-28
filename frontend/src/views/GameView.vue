<script setup>
import {ref} from 'vue'
import Card from "@/components/GameCard.vue";
import Timer from "@/components/Timer.vue";

import {useGameState} from "@/stores/gamestate"

const gamestate = useGameState()

let cardidx = gamestate.playerdata.card;

const visibility = ref('none')

</script>

<template>
    <h2>The room leader must select {{hostages}} hostage{{hostages>1?'s':''}} in</h2>
    <Timer/>
    <Card v-model:visibility="visibility" cardname="president"/>
    <div class="buttoncontainer">
        <button @click="visibility='color'">Color Reveal</button>
        <button @click="visibility='full'">Full Reveal</button>
        <button @click="visibility='none'">Hide Card</button>
    </div>
</template>
