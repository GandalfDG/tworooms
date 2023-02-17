<script setup>
    import { useGameState } from '@/stores/gamestate'
    import ColumnList from '../components/ColumnList.vue'

    const gamestate = useGameState()
</script>

<template>
    <div class="is-flex is-flex-direction-column" style="height:100vh">
        <div class="block mt-5">
            <h1 class="title is-3">Select your room's leader</h1>
        </div>
        <ColumnList :list="gamestate.roommates" :columns="2">
            <template v-slot="playername">
                <button class="button is-fullwidth">{{ playername.value }}</button>
            </template>
        </ColumnList>   
    </div>
</template>
