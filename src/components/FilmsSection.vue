<template>
  <section id="films" ref="sectionRef" class="section-padding bg-theme-gradient-reverse">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 films-header-reveal">
        <h2 class="section-title">Our Films</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
        <p class="text-lg text-theme-muted">
          Explore our collection of compelling stories
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <router-link 
          v-for="(movie, index) in movies" 
          :key="movie._id || movie.id || index" 
          :to="`/movie/${movie.slug || movie.id}`"
          class="block bg-theme-secondary rounded-2xl overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group border border-theme animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Movie Poster -->
          <div class="relative overflow-hidden aspect-[2/3]">
            <LazyImage 
              :src="movie.posterUrl" 
              :thumbnail-src="movie.thumbnailUrl"
              :alt="movie.title"
              aspect-ratio="2/3"
              bg-color="#1a1a2e"
              class="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            />
            
            <!-- Overlay on hover -->
            <div class="absolute inset-0 bg-gradient-to-t from-panda-darker via-panda-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
              <div class="p-6 w-full">
                <button class="btn-primary w-full">
                  View Details
                </button>
              </div>
            </div>

            <!-- Status Badge -->
            <div class="absolute top-4 right-4">
              <span 
                class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                :class="getStatusClass(movie.status)"
              >
                {{ movie.status }}
              </span>
            </div>
          </div>

          <!-- Movie Info -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-theme-primary mb-2 group-hover:text-panda-gold transition-colors">
              {{ movie.title }}
            </h3>
            
            <div class="flex items-center space-x-2 text-sm text-theme-muted mb-3">
              <span>{{ movie.year }}</span>
              <span>•</span>
              <span>{{ movie.duration }}</span>
            </div>

            <!-- Genre Tags -->
            <div class="flex flex-wrap gap-2 mb-4">
              <span 
                v-for="genre in movie.genre" 
                :key="genre"
                class="px-3 py-1 bg-theme-input border border-theme rounded-full text-xs text-theme-secondary"
              >
                {{ genre }}
              </span>
            </div>

            <p class="text-theme-muted text-sm line-clamp-2">
              {{ movie.logline }}
            </p>
          </div>
        </router-link>
      </div>

      <!-- Add more films CTA (if needed) -->
      <div v-if="movies.length === 0" class="text-center py-20">
        <p class="text-theme-muted text-lg">More films coming soon...</p>
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

gsap.registerPlugin(ScrollTrigger);

const siteStore = useSiteStore();
const sectionRef = ref(null);

let ctx;

onMounted(async () => {
  await siteStore.fetchMovies();

  // Allow CSS Grid and image dimensions to settle securely in the DOM
  setTimeout(() => {
    ctx = gsap.context(() => {
    gsap.from('.films-header-reveal', {
      scrollTrigger: {
        trigger: '#films',
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

// Map movies to handle both API and fallback field names
const movies = computed(() => {
  return siteStore.movies.map(m => ({
    ...m,
    // Original poster for full quality display
    posterUrl: m.posterUrl || m.poster,
    // Thumbnail for fast initial loading
    thumbnailUrl: m.thumbnailUrl,
    // Parse genre from string or array
    genre: parseGenres(m.genre || m.genres),
    // Map other common field differences
    duration: m.duration || m.runtime,
    logline: m.logline || m.tagline || m.description
  }));
});

// Helper to parse genres
const parseGenres = (genres) => {
  if (!genres) return [];
  if (Array.isArray(genres)) return genres;
  if (typeof genres === 'string') return genres.split(',').map(g => g.trim());
  return [];
};

const getStatusClass = (status) => {
  const classes = {
    'Released': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'released': 'bg-green-500/20 text-green-400 border border-green-500/30',
    'Post-Production': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'post-production': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
    'In Production': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'production': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    'Festival Circuit': 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    'announced': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    'pre-production': 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    'completed': 'bg-green-500/20 text-green-400 border border-green-500/30',
  };
  return classes[status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
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
</style>

