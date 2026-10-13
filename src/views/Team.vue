<template>
  <div class="page-wrapper">
    <TeamSection />
  </div>
</template>

<script setup>
import TeamSection from '../components/TeamSection.vue';
import { useSeoHead } from '@/composables/useSeoHead';

// Initialize SEO for Team page
useSeoHead('team');
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(to bottom, var(--gradient-from), var(--gradient-to));
}
</style>
