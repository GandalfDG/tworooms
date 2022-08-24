<script setup>
import { reactive, computed } from 'vue'
import placeholderImage from '@/assets/cardimages/blue_team.png'

const card = reactive({
    title: "president",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida quis arcu nec convallis. Nulla non odio nulla. Suspendisse auctor fermentum leo quis fermentum. ",
    color: "blue",
    image: placeholderImage
})

const props = defineProps(["visibility"])

const cardColor = computed(() => {
    let bgcolor = "#ffffff";
    switch (card.color) {
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
})

</script>

<template>
    <div class="gamecard box">
        <div class="cardface" :style="{ backgroundColor: cardColor }"
            v-show="props.visibility === 'full' || props.visibility === 'color'">
            <div class="vertcenter" v-show="props.visibility === 'full'">
                <h1 class="cardtitle title">{{ card.title.toUpperCase() }}</h1>
            </div>
            <div class="imagecontainer">
                <figure class="image is-1by2"><img class="cardimage image" v-show="props.visibility === 'full'"
                        :src="card.image" /></figure>
            </div>
            <h3 class="carddesc has-text-left" v-show="props.visibility === 'full'">{{ card.description }}</h3>
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