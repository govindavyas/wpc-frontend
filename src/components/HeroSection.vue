<template>
  <section id="hero" ref="sectionRef" class="relative min-h-screen py-24 flex items-center justify-center overflow-hidden">
    aria-label="Welcome to White Panda Creations"
  >
    <!-- Background with gradient overlay -->
    <div class="absolute inset-0 bg-theme-gradient" aria-hidden="true"></div>
    
    <!-- Animated background elements (reduced motion aware) -->
    <div class="absolute inset-0 opacity-20 motion-safe:animate-pulse" aria-hidden="true">
      <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-panda-purple rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-panda-gold rounded-full filter blur-3xl" style="animation-delay: 1s;"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container-custom px-6 py-20">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Left: Text Content -->
        <div class="text-center md:text-left motion-safe:animate-slide-up">
          <h1 class="hidden md:block text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span class="block text-theme-primary hero-title-text">{{ companyInfo.name }}</span>
            <span class="block gradient-text mt-2 hero-title-text">{{ companyInfo.tagline }}</span>
          </h1>
          
          <div v-if="featuredMovie" class="mt-8">
            <p class="text-xl text-theme-secondary mb-2 featured-tag">Featured Film:</p>
            <h2 class="text-3xl md:text-4xl font-bold text-theme-primary mb-4 featured-tag">{{ featuredMovie.title }}</h2>
            <p class="text-lg text-theme-muted mb-6 max-w-xl featured-tag">{{ featuredMovie.logline }}</p>
            
            <div class="flex flex-wrap gap-4 justify-center md:justify-start">
              <router-link 
                :to="`/movie/${featuredMovie.slug}`"
                class="btn-primary btn-interactive flex items-center space-x-2 focus-ring"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
                <span>Watch Trailer</span>
              </router-link>
              
              <a href="#films" class="btn-secondary focus-ring">
                Explore Films
              </a>
            </div>
          </div>
          
          <!-- Loading state -->
          <div v-else-if="isLoading" class="mt-8 space-y-4">
            <div class="skeleton h-6 w-32 rounded-lg"></div>
            <div class="skeleton h-10 w-64 rounded-lg"></div>
            <div class="skeleton h-5 w-80 rounded-lg"></div>
          </div>
        </div>

        <!-- Right: Featured Movie Poster with Progressive Loading -->
        <div v-if="featuredMovie" class="motion-safe:animate-fade-in movie-poster-card" style="animation-delay: 0.3s;">
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-panda-purple to-panda-gold rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" aria-hidden="true"></div>
            
            <!-- Progressive Image: Show thumbnail first, then original -->
            <div class="relative rounded-2xl shadow-2xl w-full overflow-hidden" style="aspect-ratio: 2/3;">
              <!-- Thumbnail (shown initially, blurred slightly) -->
              <img 
                v-if="!originalLoaded && featuredMovie.thumbnailUrl"
                :src="featuredMovie.thumbnailUrl" 
                :alt="featuredMovie.title"
                class="absolute inset-0 w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-500"
                loading="eager"
              />
              
              <!-- Original high-quality image -->
              <img 
                :src="featuredMovie.originalPosterUrl"
                :alt="`Movie poster for ${featuredMovie.title}`"
                @load="onOriginalLoaded"
                :class="[
                  'absolute inset-0 w-full h-full object-cover rounded-2xl transform group-hover:scale-105 transition-all duration-700',
                  originalLoaded ? 'opacity-100' : 'opacity-0'
                ]"
                loading="eager"
                fetchpriority="high"
              />
              
              <!-- Loading shimmer overlay -->
              <div 
                v-if="!originalLoaded && featuredMovie.thumbnailUrl"
                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer rounded-2xl"
                aria-hidden="true"
              ></div>
            </div>
            
            <!-- Movie Info Overlay -->
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-panda-darker via-panda-darker/80 to-transparent p-6 rounded-b-2xl">
              <div class="flex items-center space-x-4 text-sm text-theme-secondary">
                <span>{{ featuredMovie.year }}</span>
                <span v-if="featuredMovie.duration">•</span>
                <span v-if="featuredMovie.duration">{{ featuredMovie.duration }}</span>
                <span v-if="featuredMovie.genre?.length">•</span>
                <span v-if="featuredMovie.genre?.length">{{ featuredMovie.genre.join(', ') }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Skeleton (prevents CLS) -->
        <div v-else-if="isLoading" class="motion-safe:animate-fade-in">
          <div class="relative group">
            <div class="relative rounded-2xl w-full overflow-hidden skeleton shadow-2xl" style="aspect-ratio: 2/3;"></div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-1 left-1/2 right-1/2 whitespace-nowrap transform -translate-x-1/2 motion-safe:animate-bounce">
        <a 
          href="#about" 
          class="flex flex-col items-center text-theme-muted hover:text-panda-gold transition-colors focus-ring rounded-lg p-2"
          aria-label="Scroll down to learn more about us"
        >
          <span class="text-sm mb-2">Scroll to explore</span>
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted } from 'vue';
import gsap from 'gsap';
import { useSiteStore } from '@/stores/site';
import { companyInfo as fallbackCompanyInfo } from '@/config/siteConfig';
import LazyImage from '@/components/LazyImage.vue';

const siteStore = useSiteStore();

// Track if original high-quality image has loaded
const originalLoaded = ref(false);
const isLoading = ref(true);
const sectionRef = ref(null);

let ctx;

onMounted(async () => {
  await Promise.all([
    siteStore.fetchCompany(),
    siteStore.fetchFeaturedMovie()
  ]);
  isLoading.value = false;

  // Wait a small tick for the DOM to update after isLoading becomes false
  setTimeout(() => {
    // GSAP Premium Entrance Animation (Scoped)
    ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      
      tl.from('.hero-title-text', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        delay: 0.5
      })
      .from('.featured-tag', {
        opacity: 0,
        x: -30,
      }, "-=0.5")
      .from('.movie-poster-card', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out'
      }, "-=1");
    });
  }, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert(); // Cleanup GSAP animations to prevent memory leaks
});

const companyInfo = computed(() => siteStore.company || fallbackCompanyInfo);

const featuredMovie = computed(() => {
  const movie = siteStore.featuredMovie;
  if (!movie) return null;
  
  // Parse genres from string or array
  let genres = movie.genre || movie.genres || [];
  if (typeof genres === 'string') {
    genres = genres.split(',').map(g => g.trim());
  }
  
  // Reset loading state when movie changes
  originalLoaded.value = false;
  
  return {
    ...movie,
    // Thumbnail for immediate display (blurry but fast)
    thumbnailUrl: movie.thumbnailUrl,
    // Original high-quality image (loads in background)
    originalPosterUrl: movie.posterUrl || movie.poster,
    logline: movie.logline || movie.tagline || movie.description,
    duration: movie.duration || movie.runtime,
    genre: genres
  };
});

// Called when original image finishes loading
const onOriginalLoaded = () => {
  originalLoaded.value = true;
};
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 1.5s infinite;
}

/* Skeleton loading for hero */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-input) 25%,
    var(--color-bg-card) 50%,
    var(--color-bg-input) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .motion-safe\:animate-pulse,
  .motion-safe\:animate-slide-up,
  .motion-safe\:animate-fade-in,
  .motion-safe\:animate-bounce {
    animation: none !important;
  }
}
</style>

