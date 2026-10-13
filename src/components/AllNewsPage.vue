<template>
  <section class="section-padding bg-theme-gradient min-h-screen">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
        <h2 class="section-title">News & Updates</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
        <p class="text-lg text-theme-muted">
          Stay informed with all our latest announcements, achievements, and industry news
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-panda-purple"></div>
      </div>

      <!-- Content when loaded -->
      <template v-else>
        <!-- Category Filter -->
        <div class="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up sticky top-20 z-10 bg-theme-secondary/95 backdrop-blur-sm py-4 rounded-full px-4 border border-theme">
          <button
            @click="selectedCategory = null"
            class="px-6 py-2 rounded-full text-sm font-semibold transition-all"
            :class="selectedCategory === null 
              ? 'bg-panda-purple text-white' 
              : 'bg-theme-input text-theme-muted hover:text-theme-primary hover:bg-theme-card'"
          >
            All News ({{ allNews.length }})
          </button>
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="px-6 py-2 rounded-full text-sm font-semibold transition-all"
            :class="selectedCategory === category 
              ? 'bg-panda-purple text-white' 
              : 'bg-theme-input text-theme-muted hover:text-theme-primary hover:bg-theme-card'"
          >
            {{ category }} ({{ getCategoryCount(category) }})
          </button>
        </div>

        <!-- Empty State -->
        <div v-if="allNews.length === 0" class="text-center py-20">
          <svg class="w-16 h-16 mx-auto text-theme-dimmed mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p class="text-theme-muted text-lg">No news articles available at the moment.</p>
          <p class="text-theme-dimmed mt-2">Check back later for updates!</p>
        </div>

        <!-- News Grid - Scrollable -->
        <div v-else class="max-h-[800px] overflow-y-auto custom-scrollbar pr-2">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article 
              v-for="(item, index) in filteredNews" 
              :key="item.id || index"
              class="card group cursor-pointer animate-slide-up overflow-hidden"
              :style="{ animationDelay: `${index * 0.05}s` }"
              @click="openNewsModal(item)"
            >
            <!-- Image -->
            <div class="relative aspect-video overflow-hidden">
              <LazyImage 
                :src="item.imageUrl" 
                :thumbnail-src="item.thumbnailUrl"
                :alt="item.title"
                aspect-ratio="16/9"
                bg-color="#1a1a2e"
                class="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-panda-darker via-transparent to-transparent opacity-60 pointer-events-none"></div>
              
              <!-- Category Badge -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 bg-panda-purple/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  {{ item.category }}
                </span>
              </div>

              <!-- Dashboard Indicator -->
              <div v-if="item.showOnDashboard" class="absolute top-4 right-4">
                <span class="px-2 py-1 bg-panda-gold/90 backdrop-blur-sm text-panda-darker text-xs font-bold rounded-full flex items-center">
                  <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  Featured
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <!-- Date -->
              <div class="flex items-center text-sm text-theme-dimmed mb-3">
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                {{ formatDate(item.date) }}
              </div>

              <!-- Title -->
              <h3 class="text-xl font-bold text-theme-primary mb-3 group-hover:text-panda-gold transition-colors line-clamp-2">
                {{ item.title }}
              </h3>

              <!-- Summary -->
              <p class="text-theme-muted text-sm mb-4 line-clamp-3">
                {{ item.summary }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tag in item.tags?.slice(0, 3)" 
                  :key="tag"
                  class="px-2 py-1 bg-theme-input text-theme-muted text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Read More -->
              <button class="flex items-center text-panda-gold hover:text-panda-gold-light font-semibold text-sm group-hover:translate-x-2 transition-transform">
                Read Full Article
                <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </div>
          </article>
        </div>

        <!-- No News Message -->
        <div v-if="filteredNews.length === 0 && allNews.length > 0" class="text-center py-20">
          <svg class="w-16 h-16 text-theme-dimmed mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
          </svg>
          <p class="text-theme-muted text-lg">No news items found in this category.</p>
        </div>
      </div>
      </template>

      <!-- Back to Home -->
      <div class="mt-12 text-center">
        <router-link to="/" class="inline-flex items-center text-panda-gold hover:text-panda-gold-light font-semibold transition-colors">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
          </svg>
          Back to Home
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSiteStore } from '@/stores/site';
import LazyImage from '@/components/LazyImage.vue';
import { getApiUrl } from '@/utils/imageUrl';

const emit = defineEmits(['open-news']);
const siteStore = useSiteStore();
const selectedCategory = ref(null);

// Loading state
const isLoading = computed(() => siteStore.loading.news);

onMounted(async () => {
  // Force refresh to always get latest data from API
  await siteStore.fetchNews(true);
});

// Map news to handle field naming from backend
const allNews = computed(() => {
  const mapped = siteStore.news.map(item => ({
    ...item,
    // Map backend fields to component expected fields
    // Original image for full quality display (convert to full URL)
    imageUrl: getApiUrl(item.imageUrl || item.image),
    // Thumbnail for fast initial loading (convert to full URL)
    thumbnailUrl: getApiUrl(item.thumbnailUrl),
    summary: item.summary || item.excerpt,
    date: item.date || item.createdAt,
    showOnDashboard: item.showOnDashboard || item.featured
  })).sort((a, b) => new Date(b.date) - new Date(a.date));
  return mapped;
});

// Get unique categories
const categories = computed(() => {
  const cats = [...new Set(allNews.value.map(item => item.category))];
  return cats.sort();
});

// Filter news by category
const filteredNews = computed(() => {
  const newsItems = allNews.value;
  if (!selectedCategory.value) return newsItems;
  return newsItems.filter(item => item.category === selectedCategory.value);
});

// Get category count
const getCategoryCount = (category) => {
  return allNews.value.filter(item => item.category === category).length;
};

// Format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Open news modal
const openNewsModal = (newsItem) => {
  emit('open-news', newsItem);
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom Scrollbar */
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(10, 14, 39, 0.5);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #fbbf24);
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #818cf8, #fcd34d);
}
</style>

