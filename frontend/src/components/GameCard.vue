<script setup>
import { reactive, computed } from 'vue'
import { getBackendUrl } from '../stores/gamestate';
import cardmap from '@/cardmap'
import placeholderImage from '/cardimages/blue_team.png'


const props = defineProps({
    visibility: String,
    cardname: String
})

function cardColorCode(color) {
    let bgcolor = "#ffffff";
    switch (color) {
        case "blue":
            bgcolor = "#3e4ea9";
            break;
        case "red":
            bgcolor = "#4f1519";
            break;
        case "grey":
            bgcolor = "#5b5f5f";
            break;
    }
    return bgcolor;
}

const cardProperties = computed(() => {
    let carddata = cardmap[props.cardname];
    carddata.cardname = props.cardname;
    carddata.colorcode = cardColorCode(carddata.color);
    carddata.imageurl = new URL(`/cardimages/${carddata.image}.png`, `http://${getBackendUrl()}`);
    return carddata;
})

</script>

<template>
    <div class="gamecard box">
        <div class="cardface" :style="{ backgroundColor: cardProperties.colorcode }"
            v-show="props.visibility === 'full' || props.visibility === 'color'">
            <div class="cardgrid">
                <figure class="image is-1by2"><img class="cardimage image" v-show="props.visibility === 'full'"
                        :src="cardProperties.imageurl" /></figure>
                <div class="rotated pt-3 pr-3">
                    <h1 class="cardtitle title has-text-left is-size-1">{{ cardProperties.cardname.toUpperCase() }}</h1>
                    <p class="has-text-left carddesc">summary text</p>
                </div>
                <h3 class="carddesc has-text-left" v-show="props.visibility === 'full'">{{ cardProperties.description }}
                </h3>
            </div>
            <!-- <div class="vertcenter" v-show="props.visibility === 'full'">
                <h1 class="cardtitle title">{{ cardProperties.cardname.toUpperCase() }}</h1>
            </div>
            <div class="imagecontainer">
                <figure class="image is-1by2"><img class="cardimage image" v-show="props.visibility === 'full'"
                        :src="cardProperties.imageurl" /></figure>
            </div>
            <h3 class="carddesc has-text-left" v-show="props.visibility === 'full'">{{ cardProperties.description }}
            </h3> -->
        </div>
    </div>
</template>

<style>
.gamecard {
    box-sizing: border-box;
    height: 35em;
}

.cardface {
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #3e4ea9;
    min-width: 98%;
}

.cardgrid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 4fr 1fr;
}

.cardtitle,
.carddesc {
    color: white;
}

.rotated {
    writing-mode: vertical-rl;
}

.vertcenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.imagecontainer {
    height: 40%;
    width: 60%;
}

.carddesc {
    overflow: auto;
}
</style>