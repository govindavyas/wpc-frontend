<template>
  <div class="home">
    <HeroSection v-if="sections.home" />
    <AboutSection v-if="sections.about" />
    <FilmsSection v-if="sections.films" />
    <NewsSection v-if="sections.news" @open-news="openNewsModal" />
    <ContactSection v-if="sections.contact" />

    <!-- News Modal -->
    <NewsModal 
      :is-open="isNewsModalOpen" 
      :news-item="selectedNews" 
      @close="closeNewsModal" 
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import HeroSection from '../components/HeroSection.vue';
import AboutSection from '../components/AboutSection.vue';
import FilmsSection from '../components/FilmsSection.vue';
import NewsSection from '../components/NewsSection.vue';
import ContactSection from '../components/ContactSection.vue';
import NewsModal from '../components/NewsModal.vue';
import { useSeoHead } from '@/composables/useSeoHead';
import { useSiteStore } from '@/stores/site';

const siteStore = useSiteStore();

// Get section visibility from store
const sections = computed(() => siteStore.sections);

// Initialize SEO for Home page
useSeoHead('home');

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
