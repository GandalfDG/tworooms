<script setup>
import router from '../router';
import { reactive, ref } from 'vue'
import { useGameState } from '@/stores/gamestate'

const gamestate = useGameState()

const toggle_selection = ref("join")

const forminput = reactive({
    playername: "",
    roomcode: ""
})

async function create_game() {
    gamestate.ishost = true
    gamestate.playername = forminput.playername
    await gamestate.createRoom()
    router.push("/lobby")
}

async function join_game() {
    gamestate.ishost = false
    gamestate.playername = forminput.playername
    gamestate.roomcode = forminput.roomcode.toUpperCase()
    await gamestate.joinRoom()
    router.push("/lobby")
}
</script>

<template>
    <div class="block">
        <div class="tabs is-large is-toggle is-centered">
            <ul>
                <li v-bind:class="{ 'is-active': toggle_selection === 'host' }" @click="toggle_selection = 'host'">
                    <a>Host</a>
                </li>
                <li v-bind:class="{ 'is-active': toggle_selection === 'join' }" @click="toggle_selection = 'join'">
                    <a>Join</a>
                </li>
            </ul>
        </div>
        <div class="field">
            <label class="label">Your Name</label>
            <p class="control">
                <input class="input" type="text" placeholder="John Doe" v-model="forminput.playername">
            </p>
        </div>
        <div class="field">
            <label class="label">Room Code</label>
            <p class="control">
                <input class="input" type="text" placeholder="XXXX" v-model="forminput.roomcode" v-bind:disabled="toggle_selection!=='join'">
            </p>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-link is-large" @click="toggle_selection==='host'?create_game():join_game()">Let's Play!</button>
            </p>
        </div>
    </div>
</template>
