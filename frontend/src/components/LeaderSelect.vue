<script setup>
    import { useGameState } from '@/stores/gamestate'
    import router from '@/router'
    import ColumnList from './ColumnList.vue'

    const gamestate = useGameState()

    async function leaderSelect(playername) {
        // send a message to the backend with the selected leader name
        await gamestate.sendLeaderSelectMessage(playername)
        router.push('game')
    }
</script>

<template>
    <div class="is-flex is-flex-direction-column" style="height:100vh">
        <div class="block mt-5">
            <h1 class="title is-3">Select the leader for your room</h1>
        </div>
        <ColumnList :list="gamestate.roommates" :columns="2">
            <template v-slot="playername">
                <button class="button is-fullwidth mb-2" :value="playername.value" @click="leaderSelect(playername.value)">{{ playername.value }}</button>
            </template>
        </ColumnList>   
    </div>
</template>
