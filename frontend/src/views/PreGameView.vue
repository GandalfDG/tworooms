<script setup>
import {reactive} from 'vue'
import { useGameState } from '@/stores/gamestate.js';

const gamestate = useGameState();

</script>

<template>
<h1>Make your way to {{gamestate.playerdata.start_room}} with</h1>
<ul>
    <li v-for="player in gamestate.roommates">{{player}}</li>
</ul>
</template>