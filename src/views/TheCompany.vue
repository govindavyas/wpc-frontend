<template>
  <div class="page-wrapper">
    <AboutUsPage />
  </div>
</template>

<script setup>
import AboutUsPage from '../components/AboutUsPage.vue';
import { useSeoHead } from '@/composables/useSeoHead';

// Initialize SEO for The Company page
useSeoHead('the-company');
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  padding-top: 80px;
}
</style>
