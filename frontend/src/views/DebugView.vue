<script setup>
import card from '../components/GameCard.vue';
import cards from "@/cardmap";
import {ref} from "vue"

const selected_card = ref("president")
</script>



<template>
    <card visibility="full" :cardname="selected_card"></card>
    <div class="select">
        <select v-model="selected_card">
            <option v-for="card in Object.keys(cards)">
                {{ card }}
            </option>
        </select>
    </div>
</template>