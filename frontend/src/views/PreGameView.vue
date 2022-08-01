<script setup>
import {reactive} from 'vue'
import { useGameState } from '@/stores/gamestate.js';

const gamestate = useGameState();

</script>

<template>
<h1>Make your way to {{gamestate}}</h1>
</template>