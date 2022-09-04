<script setup>
import card from '../components/GameCard.vue';
import cards from "@/cardmap";

import Timer from '../components/Timer.vue'
import {ref} from "vue"

const selected_card = ref("president")
const visibility = ref("full")

//Timer

const duration = ref(10)
const paused = ref(true)

</script>



<template>
    <!-- Card -->
    <card :visibility="visibility" :cardname="selected_card"></card>
    <div class="buttoncontainer">
        <button @click="visibility='color'">Color Reveal</button>
        <button @click="visibility='full'">Full Reveal</button>
        <button @click="visibility='none'">Hide Card</button>
    </div>
    <div class="select">
        <select v-model="selected_card">
            <option v-for="card in Object.keys(cards)">
                {{ card }}
            </option>
        </select>
    </div>

    <!-- Timer -->
    <Timer :duration="duration" :paused="paused"></Timer>
    <button @click="paused = !paused">toggle pause</button>
</template>