<template>
  <section id="news" ref="sectionRef" class="section-padding bg-theme-gradient-reverse">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 news-header-reveal">
        <h2 class="section-title">Latest News & Updates</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
        <p class="text-lg text-theme-muted">
          Stay up to date with our latest announcements, awards, and industry news
        </p>
      </div>

      <!-- Featured News Grid (Dashboard Only) -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="(item, index) in dashboardNews" 
          :key="item._id || item.id || index"
          class="bg-theme-secondary rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group border border-theme cursor-pointer animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="$emit('open-news', item)"
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

            <!-- Featured Badge -->
            <div class="absolute top-4 right-4">
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
              Read More
              <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </article>
      </div>

      <!-- View All News Button -->
      <div class="mt-12 text-center animate-fade-in" style="animation-delay: 0.4s;">
        <router-link to="/all-news" class="btn-primary inline-flex items-center space-x-2">
          <span>View All News</span>
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </router-link>
      </div>

      <!-- No News Message -->
      <div v-if="dashboardNews.length === 0" class="text-center py-20">
        <p class="text-theme-muted text-lg">No featured news items available at the moment.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, nextTick, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteStore } from '@/stores/site';
import LazyImage from '@/components/LazyImage.vue';
import { getApiUrl } from '@/utils/imageUrl';

gsap.registerPlugin(ScrollTrigger);

const emit = defineEmits(['open-news']);
const siteStore = useSiteStore();
const sectionRef = ref(null);

let ctx;

onMounted(async () => {
  // Force refresh to always get latest data from API
  await siteStore.fetchDashboardNews(true);

  // Allow CSS Grid and image dimensions to settle securely in the DOM
  setTimeout(() => {
    // GSAP Scroll Animations
    ctx = gsap.context(() => {
    gsap.from('.news-header-reveal', {
      scrollTrigger: {
        trigger: '#news',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Force recalculation after setup
    ScrollTrigger.refresh();
  });
}, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

// Get only dashboard/featured news with field mapping
const dashboardNews = computed(() => {
  return siteStore.dashboardNews.map(item => ({
    ...item,
    // Map backend fields to component expected fields
    // Original image for full quality display (convert to full URL)
    imageUrl: getApiUrl(item.imageUrl || item.image),
    // Thumbnail for fast initial loading (convert to full URL)
    thumbnailUrl: getApiUrl(item.thumbnailUrl),
    summary: item.summary || item.excerpt,
    date: item.date || item.createdAt
  }));
});

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
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

