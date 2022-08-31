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
            <div class="vertcenter" v-show="props.visibility === 'full'">
                <h1 class="cardtitle title">{{ cardProperties.cardname.toUpperCase() }}</h1>
            </div>
            <div class="imagecontainer">
                <figure class="image is-1by2"><img class="cardimage image" v-show="props.visibility === 'full'"
                        :src="cardProperties.imageurl" /></figure>
            </div>
            <h3 class="carddesc has-text-left" v-show="props.visibility === 'full'">{{ cardProperties.description }}</h3>
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

.cardtitle,
.carddesc {
    color: white;
}

.cardtitle {
    rotate: 90deg;
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