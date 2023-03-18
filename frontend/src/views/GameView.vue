<script setup>
import { ref, computed } from 'vue'
import Card from '@/components/GameCard.vue'
import Timer from '@/components/Timer.vue'
import Modal from '@/components/Modal.vue'
import LeaderSelect from '@/components/LeaderSelect.vue'

import { getRoundHostages, getRoundDuration } from '@/gamelogic'
import { useGameState } from '@/stores/gamestate'
import router from '@/router'

const gamestate = useGameState()

const hostages = computed(() => {
  return getRoundHostages(gamestate.current_round, gamestate.num_rounds, gamestate.playerlist.length)
})

const roundDuration = computed(() => {
  return getRoundDuration(gamestate.current_round, gamestate.num_rounds)
})

const visibility = ref('none')

const leaderSelectVisibility = ref(false)

function roundEnded() {
  if (gamestate.current_round === gamestate.num_rounds) {
    router.push('gameover')
  } else {
    router.push('betweenround')
  }
}

</script>

<template>
  <!-- Leader select notification -->
  <div class="notification is-primary mt-2" @click="leaderSelectVisibility = true" v-if="!gamestate.roomleader">
    <div class="level is-mobile">
      <div class="level-item is-flex-shrink-1">Select a leader for the room! The first person selected will become the leader, so act fast!</div>
      <div class="level-item">
        <button class="button is-primary">
          <span class="icon">
            <i class="fas fa-chevron-right"></i>
          </span>
        </button>
      </div>
    </div>
  </div>
  <h1 v-if="gamestate.roomleader">
    <span class="has-text-primary has-text-weight-bold">{{gamestate.roomleader}}</span> must select {{ hostages }} hostage{{ hostages > 1 ? 's' : '' }} in:
  </h1>
  <Timer :duration=roundDuration :paused=false :start-timestamp=gamestate.start_timestamp @time-elapsed="roundEnded()" />
  <Card v-model:visibility="visibility" v-model:cardname="gamestate.card.name" />
  <div class="buttoncontainer">
    <button @click="visibility = 'color'">Color Reveal</button>
    <button @click="visibility = 'full'">Full Reveal</button>
    <button @click="visibility = 'none'">Hide Card</button>
  </div>

  <Modal :active="leaderSelectVisibility" @deactivate="leaderSelectVisibility = false">
    <div class="box">
      <LeaderSelect @done="leaderSelectVisibility = false"></LeaderSelect>
    </div>
  </Modal>
</template>
