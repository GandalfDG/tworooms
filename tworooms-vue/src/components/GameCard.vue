<script setup>
import {reactive} from 'vue'

const card = reactive({
    title: "president",
    description: "don't get got",
    color: "blue",
    image: "https://fakeimg.pl/480x360"
})

const props = defineProps(["visibility"])
</script>

<template>
    <div class="gamecard">
        <div class="cardface">
            <h1>{{card.title}}</h1>
            <img class="cardimage" :src="card.image" />
            <h3>{{card.description}}</h3>
        </div>
    </div>
</template>

<style>
.gamecard {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    border: 2px solid;
    border-radius: 1.2em;
    height: 40em;
}

.cardface {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

h1 {
    
}

.cardimage {
    width: 100%;
}
</style>