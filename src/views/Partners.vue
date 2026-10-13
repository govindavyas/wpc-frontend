<template>
  <div class="page-wrapper">
    <MarketingSection />
  </div>
</template>

<script setup>
import MarketingSection from '../components/MarketingSection.vue';
import { useSeoHead } from '@/composables/useSeoHead';

// Initialize SEO for Partners page
useSeoHead('partners');
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(to bottom, var(--gradient-from), var(--gradient-to));
}
</style>
