<script setup>
    import { ref } from 'vue'
    import { useGameState } from '@/stores/gamestate'
    import router from '@/router'
    import ColumnList from './ColumnList.vue'

    const emit = defineEmits(['done'])

    const gamestate = useGameState()

    const selectedPlayer = ref(null)
    
    function selectName(playername) {
        if (selectedPlayer.value === playername) {
            selectedPlayer.value = null
        }
        else {
            selectedPlayer.value = playername
        }
    }

    async function leaderSelect(playername) {
        // send a message to the backend with the selected leader name
        await gamestate.sendLeaderSelectMessage(playername)
        emit('done')
    }
</script>

<template>

    <!-- 
        Show list of roommates, none selected
        when a selection is made, enable the submit button
        player name buttons act like radio buttons. Selecting one deselects the other
        on submit send the message and emit an event on which to close the modal
     -->

    <div class="block">
        <h1 class="title is-3">Select the leader for your room</h1>
    </div>
    <ColumnList :list="gamestate.roommates" :columns="2">
        <template v-slot="playername">
            <button class="button is-fullwidth mb-2" :class="{'is-primary':playername.value===selectedPlayer}" :value="playername.value" @click="selectName(playername.value)">{{ playername.value }}</button>
        </template>
    </ColumnList>   
    <button class="button is-link is-large" :disabled="selectedPlayer===null" @click="leaderSelect(selectedPlayer)">Submit</button>

</template>
