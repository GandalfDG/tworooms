<script setup>
import { RouterLink, RouterView } from "vue-router";

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
