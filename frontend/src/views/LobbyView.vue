<script setup>
import { useGameState } from '@/stores/gamestate'
import router from '@/router'
import { ref, computed } from 'vue';
import { wsEvent } from '@/gamelogic'
import cardsets from '@/cardsets'
import cardmap from '@/cardmap'
import ColumnList from '../components/ColumnList.vue';


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


</script>

<template>
    <div class="is-flex is-flex-direction-column" style="height:100vh">
        <div class="block mt-5">
            <h1 class="title is-3">Room Code: <span class="has-text-weight-bold">{{ gamestate.roomcode }}</span></h1>
        </div>

        <!-- Player List -->
        <h2 class="title is-4 is-underlined">Players</h2>
        <div class="is-flex-shrink-1 is-flex-grow-1" style="overflow:auto">
            <ColumnList :list="gamestate.playerlist" :columns="2"></ColumnList>
            <div class="level mt-3">
                <div class="level-item">
                    <p class="pr-3 has-text-grey-light has-text-weight-light">Waiting for players to join</p>
                    <div class="bulma-loader-mixin"></div>
                </div>
            </div>
        </div>

        <!-- Game Options -->
        <div class="block box mb-6" v-if="gamestate.ishost">
            <h2 class="title is-4 is-underlined">Game Options</h2>
            <div class="field">
                <label class="label">Select number of rounds to play</label>
                <label class="radio">
                    <input type="radio" name="rounds" value="3" v-model="gamestate.num_rounds">
                    3 Rounds
                </label>
                <label class="radio">
                    <input type="radio" name="rounds" value="5" v-model="gamestate.num_rounds">
                    5 Rounds <span class="has-text-weight-light">(10+ Players)</span>
                </label>
            </div>
            <div class="field">
                <label class="label">Select a card set to play with</label>
                <div class="columns is-mobile is-gapless is-vcentered">
                    <div class="column">
                        <div class="select is-medium">
                            <select v-model="gamestate.cardset">
                                <option v-for="cardset in Object.keys(cardsets)">
                                    {{ cardset }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="column has-text-weight-light">
                        <p class="has-text-left">{{ cardsets[gamestate.cardset].description }}</p>
                    </div>
                </div>
                <div class="field">
                    <p class="control">
                        <button class="button is-link is-large" v-bind:class="{ 'is-loading': waiting_for_server }"
                            @click="cutoffLobby()">Start Game</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
