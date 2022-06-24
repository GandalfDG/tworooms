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
            <div class="vertcenter"> <h1 class="cardtitle">{{card.title.toUpperCase()}}</h1></div>
            <img class="cardimage" :src="card.image" />
            <h3 class="carddesc">{{card.description}}</h3>
        </div>
    </div>
</template>

<style>
.gamecard {
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
    margin: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: .4em;
    background-color: rgb(89, 89, 199)
}

h1, h3 {
   color: white; 
}

.vertcenter {
    display:flex;
    flex-direction: column;
    align-items: center;
    flex: 2;
    justify-content: center;
}

.cardtitle {
}

.cardimage {
    width: 98%;
    flex: 4;
}

.carddesc {
    width: 90%;
    flex: 4;
    overflow: auto;
}
</style>