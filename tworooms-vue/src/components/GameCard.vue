<script setup>
import {reactive} from 'vue'

const card = reactive({
    title: "president",
    description: "don't get got",
    color: "blue",
    image: "https://fakeimg.pl/640x360"
})
</script>

<template>
    <div>
        <h1>{{card.title}}</h1>
        <img :src="card.image"/>
        <h3>{{card.description}}</h3>
    </div>   
</template>
