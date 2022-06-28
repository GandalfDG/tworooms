<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/GameCard.vue";
import Timer from "./components/Timer.vue";
</script>

<template>

  <div class="wrapper">
    <Timer/>
    <Card visibility="full" />
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


</style>
