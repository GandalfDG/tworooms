<script setup>
import { useGameState } from '../stores/gamestate';
import Card from "@/components/GameCard.vue"
import router from '../router';

const gamestate = useGameState();

async function reset() {
    await gamestate.resetGame();
    await router.push("/");
}

</script>

<template>
    <div class="block">
        <h1 class="title is-4">Game over!</h1>
    </div>
    <Card visibility="full" v-model:cardname="gamestate.card.name"/>
    <div class="field" v-if="gamestate.ishost">
        <p class="control">
            <button class="button is-link is-large" @click="reset()">End Game</button>
        </p>
    </div>
</template>