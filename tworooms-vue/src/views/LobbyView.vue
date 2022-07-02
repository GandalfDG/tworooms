<script setup>
import { useGameState } from '@/stores/gamestate'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue';

const gamestate = useGameState()

onMounted(() => {
    if(gamestate.ishost) {
        gamestate.createRoom()
    }
    else {
        gamestate.joinRoom()
    }
})


</script>

<template>
    <h1>Room Code: {{gamestate.roomcode}}</h1>
    <h2>Players</h2>
    <ul>
        <li>{{gamestate.playername}}</li>
    </ul>
</template>
