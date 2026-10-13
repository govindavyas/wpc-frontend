<template>
  <div class="app" :class="{ 'light-theme': theme === 'light' }">
    <!-- Splash Screen - blocks content until complete -->
    <SplashWrapper @ready="onSplashReady" />
    
    <!-- Main content - only visible after splash completes -->
    <template v-if="appReady">
      <!-- Error Boundary - Shows error UI if error occurs -->
      <ErrorBoundary v-if="hasError" :error-message="errorMessage" @retry="handleRetry" />
      
      <template v-else>
        <!-- Scroll Progress Bar -->
        <ScrollProgress />
        
        <Navbar />
        
        <!-- Main content area with accessibility landmark -->
        <main id="main-content" role="main" tabindex="-1">
          <router-view v-slot="{ Component }">
            <transition 
              mode="out-in"
              :css="false"
              @enter="onEnter"
              @leave="onLeave"
              @before-enter="onBeforeEnter"
            >
              <Suspense>
                <template #default>
                  <component :is="Component" :key="$route.fullPath" />
                </template>
                <template #fallback>
                  <PageLoadingSkeleton />
                </template>
              </Suspense>
            </transition>
          </router-view>
        </main>
        
        <Footer />
        
        <!-- Back to top button -->
        <BackToTop />
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onErrorCaptured } from 'vue';
import gsap from 'gsap';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import SplashWrapper from './components/SplashWrapper.vue';
import ScrollProgress from './components/ScrollProgress.vue';
import BackToTop from './components/BackToTop.vue';
import PageLoadingSkeleton from './components/PageLoadingSkeleton.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';
import { useSiteStore } from '@/stores/site';
import { useAnalytics, setupAutoTracking } from '@/composables/useAnalytics';
import { initAllTracking } from '@/composables/useTrackingPixels';

const siteStore = useSiteStore();
const theme = computed(() => siteStore.theme);

// App ready state - content hidden until splash completes
const appReady = ref(false);

// Error state for error boundary
const hasError = ref(false);
const errorMessage = ref('');

const onSplashReady = () => {
  appReady.value = true;
};

// GSAP Page Transition Hooks
const onEnter = (el, done) => {
  // Ensure no conflicting tweens are running on the new route element
  gsap.killTweensOf(el);
  
  gsap.fromTo(el, 
    { opacity: 0, y: 30 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 0.8, 
      ease: 'power3.out',
      onComplete: () => {
        done();
        // Vital fix: Force GSAP to recalculate all DOM triggers now that the page is fully seated
        ScrollTrigger.refresh();
      }
    }
  );
};

const onLeave = (el, done) => {
  // Ensure no conflicting tweens are running on the old route element
  gsap.killTweensOf(el);
  
  gsap.to(el, {
    opacity: 0,
    y: -30,
    duration: 0.5,
    ease: 'power2.in',
    onComplete: () => {
      done();
      // Added a delayed refresh for ScrollTrigger after transition out
      // to ensure any old triggers are fully cleared before new page is completely visible
      ScrollTrigger.refresh();
    }
  });
};

const onBeforeEnter = () => {
  // Scroll to top on page change for better UX
  window.scrollTo({ top: 0, behavior: 'instant' });
};

// Handle retry from error boundary
const handleRetry = () => {
  hasError.value = false;
  errorMessage.value = '';
};

// Error boundary - catch errors from child components
onErrorCaptured((error, instance, info) => {
  console.error('App Error:', error, info);
  hasError.value = true;
  errorMessage.value = error.message || 'An unexpected error occurred';
  // Return false to propagate the error
  return false;
});

// Initialize analytics tracking
useAnalytics();

// Apply theme class to document body for modals teleported to body
watch(theme, (newTheme) => {
  if (newTheme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
}, { immediate: true });

onMounted(() => {
  siteStore.fetchSettings();
  
  // Setup auto-tracking for click events
  setupAutoTracking();
  
  // Initialize GA4 and Meta Pixel tracking
  initAllTracking();
});
</script>

<style>
/* Page transition animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Focus visible outline for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
</style>
