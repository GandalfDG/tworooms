<script setup>
</script>

<template>
 <p>hello?</p>
    <button @click="$router.push('/create')">host game</button>
    <p>or</p>
    <!-- form input for room code -->
    <button @click="$router.push('/join')">join game</button>
</template>
