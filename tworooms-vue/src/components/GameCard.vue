<script setup>
import {reactive} from 'vue'

const card = reactive({
    title: "president",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida quis arcu nec convallis. Nulla non odio nulla. Suspendisse auctor fermentum leo quis fermentum. Aenean non eros viverra, ultrices risus non, gravida augue. Mauris vehicula enim non commodo feugiat. Vestibulum odio lectus, ultricies sed ornare vel, tincidunt sit amet libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Phasellus vitae tincidunt est. Nunc vitae magna ullamcorper, eleifend augue non, convallis lorem. Aliquam fermentum libero eu auctor sagittis. Quisque ornare ullamcorper augue, at tristique sem cursus sit amet.",
    color: "blue",
    image: "https://fakeimg.pl/480x360"
})

const props = defineProps(["visibility"])
</script>

<template>
    <div class="gamecard">
        <div class="cardface">
            <h1 class="cardtitle">{{card.title}}</h1>
            <img class="cardimage" :src="card.image" />
            <h3 class="carddesc">{{card.description}}</h3>
        </div>
    </div>
</template>

<style>
.gamecard {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(196, 196, 196);
    border-radius: 1.2em;
    height: 35em;
    max-width: 25em;
    box-shadow: 1px 2px 5px gray;
}

.cardface {
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: .4em;
    background-color: rgb(89, 89, 199)
}

h1, h3 {
   color: white; 
}

.cardtitle {
    flex: 2;
}

.cardimage {
    width: 98%;
    flex: 4;
}

.carddesc {
    width: 80%;
    flex: 4;
    overflow: auto;
}
</style>