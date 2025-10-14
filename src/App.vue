<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

</script>

<template>
<main class="container-fluid overflow-hidden">
<Header></Header>
<RouterView :key="$route.fullPath" />
<Footer></Footer>
</main>
</template>
