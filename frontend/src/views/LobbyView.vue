<script setup>
import { useGameState } from '@/stores/gamestate'
import router from '@/router'
import { ref, computed } from 'vue';
import { wsEvent } from '@/gamelogic'
import cardsets from '@/cardsets'
import cardmap from '@/cardmap'


const gamestate = useGameState()

const waiting_for_server = ref(false)

async function cutoffLobby() {
    waiting_for_server.value = true
    await gamestate.sendLobbyCutoffMessage();
    // wait for the response to fill in the player data object
    window.addEventListener("wsmessage", () => {
        router.push('pregame');
        // TODO send selected cardset to the server, receive cardset from websocket
        // gamestate.card = cardmap[gamestate.deck[gamestate.playerdata.card]]
    }, { once: true });
}

const leftPlayerColumn = computed(() => {
    return gamestate.playerlist.filter((element, index) => {
        return index % 2 === 0;
    })
})

const rightPlayerColumn = computed(() => {
    return gamestate.playerlist.filter((element, index) => {
        return index % 2 !== 0;
    })
})


</script>

<template>
    <div class="block">
        <h1 class="title is-2">Room Code: <span class="has-text-weight-bold">{{ gamestate.roomcode }}</span></h1>
    </div>

    <div class="block">
        <h2 class="title is-4 is-underlined">Players</h2>
        <div class="columns is-mobile">
            <div class="column">
                <ul class="has-text-centered">
                    <li v-for="player in leftPlayerColumn">{{player}}</li>
                </ul>
            </div>
            <div class="column">
                <ul class="has-text-centered">
                    <li v-for="player in rightPlayerColumn">{{player}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="level">
        <div class="level-item">
            <p class="pr-3 has-text-grey-light has-text-weight-light">Waiting for players to join</p>
            <div class="bulma-loader-mixin"></div>
        </div>
    </div>
    <hr>
    <div class="block" v-if="gamestate.ishost">
        <h2 class="title is-4 is-underlined">Game Options</h2>
        <div class="field">
            <label class="label">select a card set to play with</label>
            <div class="select">
                <select v-model="gamestate.cardset">
                    <option v-for="cardset in Object.keys(cardsets)">{{ cardset }}</option>
                </select>
            </div>
        </div>
        <div class="field">
            <p class="control">
                <button class="button is-link is-large" v-bind:class="{'is-loading':waiting_for_server}"
                    @click="cutoffLobby()">Start Game</button>
            </p>
        </div>
    </div>

</template>
