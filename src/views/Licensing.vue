<template>
  <div class="page-wrapper">
    <LicensingSection />
  </div>
</template>

<script setup>
import LicensingSection from '../components/LicensingSection.vue';
import { useSeoHead } from '@/composables/useSeoHead';

// Initialize SEO for Licensing page
useSeoHead('licensing');
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(to bottom, var(--gradient-from), var(--gradient-to));
}
</style>
