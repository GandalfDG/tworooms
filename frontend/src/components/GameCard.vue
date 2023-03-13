<script setup>
import { computed } from 'vue'
import { getBackendProtocol, getBackendUrl } from '../stores/gamestate'
import cardmap from '@/cardmap'

const props = defineProps({
  visibility: String,
  cardname: String
})

function cardColorCode (color) {
  let bgcolor = '#ffffff'
  switch (color) {
    case 'blue':
      bgcolor = '#3e4ea9'
      break
    case 'red':
      bgcolor = '#4f1519'
      break
    case 'grey':
      bgcolor = '#5b5f5f'
      break
  }
  return bgcolor
}

function imageBgColor (color) {
  let imgcolor = '#ffffff'
  switch (color) {
    case 'blue':
      imgcolor = '#719EDA'
      break
    case 'red':
      imgcolor = '#ED1C2A'
      break
    case 'grey':
      imgcolor = '#8F908F'
      break
  }
  return imgcolor
}

const cardProperties = computed(() => {
  const carddata = cardmap[props.cardname]
  carddata.cardname = props.cardname.replace('_', ' ') // saves manually adding the card name minus _ to the map
  carddata.colorcode = cardColorCode(carddata.color)
  carddata.imagebgcolorcode = imageBgColor(carddata.color)
  carddata.imageurl = new URL(`/cardimages/${carddata.image}.png`, `${getBackendProtocol()}://${getBackendUrl()}`)
  return carddata
})

</script>

<template>
  <div class="gamecard box">
    <div class="cardface" :style="{ backgroundColor: cardProperties.colorcode }"
      v-show="props.visibility === 'full' || props.visibility === 'color'">
      <div class="cardgrid">
        <div class="imagebackground" :style="{ backgroundColor: cardProperties.imagebgcolorcode }">
          <div class="cardimage" :style="{ backgroundImage: `url(${cardProperties.imageurl})` }"
            v-show="props.visibility === 'full'"></div>
        </div>
        <div class="rotated mt-3 mr-2" v-show="props.visibility === 'full'">
          <h1 class="cardtitle title has-text-left is-size-1">{{ cardProperties.cardname.toUpperCase() }}</h1>
          <p class="has-text-left carddesc mt-1">{{cardProperties.summary}}</p>
        </div>
        <h3 class="carddesc has-text-left ml-2 mr-1 mt-1" v-show="props.visibility === 'full'">{{
        cardProperties.description }}
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
  background-size: cover;
}

.imagebackground {
  width: 100%;
  height: 100%;
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
