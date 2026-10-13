<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4 scale-95"
    enter-to-class="opacity-100 translate-y-0 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 scale-100"
    leave-to-class="opacity-0 translate-y-4 scale-95"
  >
    <button
      v-show="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 right-6 z-40 p-3 bg-panda-purple hover:bg-panda-purple-dark text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 focus-ring group"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <svg 
        class="w-6 h-6 transform group-hover:-translate-y-0.5 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
      
      <!-- Progress ring -->
      <svg 
        v-if="showProgress"
        class="absolute inset-0 w-full h-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          class="text-white/20"
          stroke-width="2"
          stroke="currentColor"
          fill="transparent"
          r="20"
          cx="24"
          cy="24"
        />
        <circle
          class="text-white transition-all duration-100"
          stroke-width="2"
          stroke="currentColor"
          fill="transparent"
          r="20"
          cx="24"
          cy="24"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference - (scrollProgress * circumference)"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  showProgress: {
    type: Boolean,
    default: false
  },
  threshold: {
    type: Number,
    default: 300
  }
});

const isVisible = ref(false);
const scrollProgress = ref(0);
const circumference = 2 * Math.PI * 20;

const handleScroll = () => {
  // Show button when scrolled past threshold
  isVisible.value = window.scrollY > props.threshold;
  
  // Calculate scroll progress
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.value = scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

let ticking = false;
const throttledScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      handleScroll();
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', throttledScroll, { passive: true });
  handleScroll(); // Check initial state
});

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScroll);
});
</script>

