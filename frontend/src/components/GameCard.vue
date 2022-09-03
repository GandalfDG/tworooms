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
    carddata.cardname = props.cardname.replace("_", " ");
    carddata.colorcode = cardColorCode(carddata.color);
    carddata.imageurl = new URL(`/cardimages/${carddata.image}.png`, `http://${getBackendUrl()}`);
    return carddata;
})

</script>

<template>
    <div class="gamecard box">
        <div class="cardface" :style="{ backgroundColor: cardProperties.colorcode }"
            v-show="props.visibility === 'full' || props.visibility === 'color'">
            <div class="cardgrid" v-show="props.visibility === 'full'">

                <img class="cardimage" v-show="props.visibility === 'full'" :src="cardProperties.imageurl" />

                <div class="rotated mt-3 mr-3">
                    <h1 class="cardtitle title has-text-left is-size-1">{{ cardProperties.cardname.toUpperCase() }}</h1>
                    <p class="has-text-left carddesc mt-1">{{cardProperties.summary}}</p>
                </div>
                <h3 class="carddesc has-text-left mx-2 mt-2" v-show="props.visibility === 'full'">{{ cardProperties.description }}
                </h3>
            </div>
        </div>
    </div>
</template>

<style>
.gamecard {
    box-sizing: border-box;
    width: 100%;
    aspect-ratio: 5/7;
}

.cardface {
    height: 100%;
    flex-direction: column;
    align-items: center;
    background-color: #3e4ea9;
}

.cardgrid {
    display: grid;
    height: 100%;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 3fr 1fr;
}

.cardimage {
    width: 100%;
    height: 100%;
    object-position: left top;
    object-fit: contain;
}

.cardtitle,
.carddesc {
    color: white;
}

.carddesc {
    grid-column: 1/3;
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
    height: 100%;
    width: 100%;
}

.carddesc {
    overflow: auto;
}
</style>