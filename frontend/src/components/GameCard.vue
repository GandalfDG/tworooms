<script setup>
import {reactive} from 'vue'
import placeholderImage from '@/assets/placeholder.png'

const card = reactive({
    title: "president",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi gravida quis arcu nec convallis. Nulla non odio nulla. Suspendisse auctor fermentum leo quis fermentum. Aenean non eros viverra, ultrices risus non, gravida augue. Mauris vehicula enim non commodo feugiat. Vestibulum odio lectus, ultricies sed ornare vel, tincidunt sit amet libero. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
    color: "blue",
    image: placeholderImage
})

const props = defineProps(["visibility"])
</script>

<template>
    <div class="gamecard">
        <div class="cardface" v-show="props.visibility==='full' || props.visibility==='color'">
            <div class="vertcenter" v-show="props.visibility==='full'"> <h1 class="cardtitle">{{card.title.toUpperCase()}}</h1></div>
            <div class="imagecontainer"><img class="cardimage" v-show="props.visibility==='full'" :src="card.image" /></div>
            <h3 class="carddesc" v-show="props.visibility==='full'">{{card.description}}</h3>
        </div>
    </div>
</template>

<style>

.gamecard {
    box-sizing: border-box;
    border: 1px solid #c4c4c4;
    border-radius: 1.2em;
    height: 35em;
    max-width: 25em;
    width:25em;
    box-shadow: 0px 1px 4px gray;
    padding:1em;
}

.cardface {
    height: 100%;
    flex-direction: column;
    align-items: center;
    border-radius: .4em;
    background-color: hsl(240, 50%, 56%);
    min-width: 98%;
}

h1.cardtitle,
h3 {
    color: white;
    height: 10%;
}

.vertcenter {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.imagecontainer {
    height:40%;
}

.cardimage {
    width:100%;
    height: 100%;
}

.carddesc {
    padding: 2%;
    height: 50%;
    overflow: auto;
}
</style>