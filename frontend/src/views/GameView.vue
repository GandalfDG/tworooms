<script setup>
import {ref} from 'vue'
import Card from "@/components/GameCard.vue";
import Timer from "@/components/Timer.vue";

import {useGameState} from "@/stores/gamestate"

const gamestate = useGameState()

const visibility = ref('none')

</script>

<template>
    <Timer />
    <Card v-model:visibility="visibility" />
    <div class="buttoncontainer">
        <button @click="visibility='color'">Color Reveal</button>
        <button @click="visibility='full'">Full Reveal</button>
        <button @click="visibility='none'">Hide Card</button>
    </div>
</template>
