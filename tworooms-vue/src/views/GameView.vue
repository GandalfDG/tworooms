<script setup>
import Card from "@/components/GameCard.vue";
import Timer from "@/components/Timer.vue";
import Button from "@/components/Button.vue"

function clickHandler(text) {
    console.log(text)
}

</script>

<template>
    <Timer />
    <Card visibility="full" />
    <div class="buttoncontainer">
        <Button text="hello" @clicked="clickHandler('hello')" />
        <Button text="goodbye" />
    </div>
</template>
