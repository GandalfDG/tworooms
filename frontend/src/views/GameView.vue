<script setup>
import Card from "@/components/GameCard.vue";
import Timer from "@/components/Timer.vue";

function clickHandler(text) {
    console.log(text)
}

</script>

<template>
    <Timer />
    <Card visibility="full" />
    <div class="buttoncontainer">
        <button @click="clickHandler('hello')">hi</button>
        <button />
    </div>
</template>
