<script setup>
import router from '../router'
import { reactive, ref, onMounted } from 'vue'
import { useGameState } from '@/stores/gamestate'

const gamestate = useGameState()

const toggleSelection = ref('join')
const waitingForServer = ref(false)
const roomCodeFailed = ref(false)

const forminput = reactive({
  playername: '',
  roomcode: ''
})

const git_sha = String(import.meta.env.VITE_GIT_SHA).slice(0,10).toUpperCase()

onMounted(() => {
  gamestate.$reset()
})

async function createGame() {
  waitingForServer.value = true
  gamestate.ishost = true
  gamestate.playername = forminput.playername
  await gamestate.createRoom()
  router.push('/lobby')
}

async function joinGame() {

  try {
    roomCodeFailed.value = false
    waitingForServer.value = true
    gamestate.ishost = false
    gamestate.playername = forminput.playername
    gamestate.roomcode = forminput.roomcode.toUpperCase()
    await gamestate.joinRoom()
    router.push('/lobby')
  } catch(e) {
    // show an error in the room code box
    waitingForServer.value = false
    forminput.roomcode = null
    roomCodeFailed.value = true
  }
}
</script>

<template>
  <div class="section">
    <div class="block">
      <h1 class="title">Welcome to <span class="is-italic is-bold">tworooms.online</span></h1>
    </div>
  </div>
  <div class="box">
    <div class="tabs is-large is-boxed is-centered">
      <ul>
        <li v-bind:class="{ 'is-active': toggleSelection === 'join' }" @click="toggleSelection = 'join'">
          <a>Join</a>
        </li>
        <li v-bind:class="{ 'is-active': toggleSelection === 'host' }" @click="toggleSelection = 'host'">
          <a>Host</a>
        </li>
      </ul>
    </div>
    <div class="block">
      <div class="field">
        <label class="label">Your Name</label>
        <p class="control">
          <input class="input" type="text" placeholder="John Doe" v-model="forminput.playername">
        </p>
      </div>
      <div class="field">
        <label class="label" v-bind:class="{ 'has-text-grey-lighter': toggleSelection === 'host' }">Room
          Code</label>
        <p class="control">
          <input class="input is-uppercase" :class="{'is-danger': roomCodeFailed && toggleSelection === 'join'}" type="text" placeholder="XXXX" v-model="forminput.roomcode"
            v-bind:disabled="toggleSelection !== 'join'">
        </p>
      </div>
    </div>
    <div class="field">
      <p class="control">
        <button class="button is-link is-large" :class="{}" v-bind:class="{ 'is-loading': waitingForServer }"
          @click="toggleSelection === 'host' ? createGame() : joinGame()">Let's Play!</button>
      </p>
    </div>
  </div>

  <div class="section px-0">
    <footer class="footer">
      <p>A web implementation of <a href="https://www.tuesdayknightgames.com/tworoomsandaboom/"><span
            class="is-italic">Two Rooms and a Boom</span> by Tuesday Knight Games</a></p>
      <hr>
      <div class="block">
        <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License"
            style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br />This
        work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative
          Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.
      </div>
      <div class="block">
        <button class="button" onclick="window.location='https://github.com/GandalfDG/tworooms'"><span>View on GitHub</span>
          <span class="icon"><i class="fab fa-github"></i></span></button>
      </div>
      <p class="is-size-7 has-text-weight-light has-text-grey">git SHA: {{ git_sha }}</p>
    </footer>
  </div>
</template>
