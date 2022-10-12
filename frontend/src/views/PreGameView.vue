<script setup>
import { reactive } from 'vue'
import { useGameState } from '@/stores/gamestate.js'
import roomNames from '@/roomnames'

const gamestate = useGameState()

async function startGame () {
  await gamestate.sendStartGameMessage()
}

function getRoomNames () {
  const truncStamp = Math.trunc(gamestate.start_timestamp)
  const roomA = (truncStamp & 0xf) % roomNames.length
  let roomB = ((truncStamp >> 2) & 0xf) % roomNames.length
  if (roomB === roomA) {
    roomB++
  }
  const roomNameA = roomNames[roomA]
  const roomNameB = roomNames[roomB]

  return [roomNameA, roomNameB]
}

</script>

<template>
    <div class="block">
        <h1 class="title is-4">Make your way to the <span class="has-text-info">{{ getRoomNames()[gamestate.playerdata.start_room] }}</span> to
          receive your assignment along with:</h1>
    </div>
    <ul>
        <li v-for="player in gamestate.roommates">{{ player }}</li>
    </ul>
    <div class="field" v-if="gamestate.ishost">
        <p class="control">
            <button class="button is-link is-large" @click="startGame()">Start Game</button>
        </p>
    </div>
</template>
