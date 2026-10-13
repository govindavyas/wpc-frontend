<template>
  <div class="page-wrapper">
    <AllNewsPage @open-news="openNewsModal" />

    <!-- News Modal -->
    <NewsModal 
      :is-open="isNewsModalOpen" 
      :news-item="selectedNews" 
      @close="closeNewsModal" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AllNewsPage from '../components/AllNewsPage.vue';
import NewsModal from '../components/NewsModal.vue';
import { useSeoHead } from '@/composables/useSeoHead';

// Initialize SEO for All News page
useSeoHead('all-news');

// News Modal State
const isNewsModalOpen = ref(false);
const selectedNews = ref(null);

const openNewsModal = (newsItem) => {
  selectedNews.value = newsItem;
  isNewsModalOpen.value = true;
};

const closeNewsModal = () => {
  isNewsModalOpen.value = false;
  setTimeout(() => {
    selectedNews.value = null;
  }, 300);
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(to bottom, var(--gradient-from), var(--gradient-to));
}
</style>
