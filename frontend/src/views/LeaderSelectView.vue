<script setup>
    import { useGameState } from '@/stores/gamestate'
    import ColumnList from '../components/ColumnList.vue'

    const gamestate = useGameState()
</script>

<template>
    <ColumnList :list="gamestate.roommates" :columns="2"><template v-slot="value">
        <input class="button" :value="value.value"/>
    </template></ColumnList>
</template>
