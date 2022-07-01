<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/GameCard.vue";
import Timer from "@/components/Timer.vue";
import Button from "@/components/Button.vue"


</script>

<template>

    <div class="wrapper">
        <RouterView></RouterView>
    </div>

</template>

<style>
@import "@/assets/base.css";

.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.buttoncontainer {
    display: flex;
}


</style>
