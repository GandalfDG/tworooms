<script setup>
import { RouterView } from 'vue-router'

</script>

<template>

    <div class="container is-fluid">
        <div class="columns has-text-centered">
            <div class="column is-4 is-offset-4" style="height:100vh">
                <RouterView></RouterView>
            </div>
        </div>
    </div>

</template>

<style>
@import "@/assets/bulma_style.css";
</style>
