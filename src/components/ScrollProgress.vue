<template>
  <div 
    ref="progressBar"
    class="scroll-progress"
    :style="{ transform: `scaleX(${progress})` }"
    role="progressbar"
    :aria-valuenow="Math.round(progress * 100)"
    aria-valuemin="0"
    aria-valuemax="100"
    aria-label="Page scroll progress"
  ></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const progressBar = ref(null);
const progress = ref(0);
let ticking = false;

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  if (docHeight > 0) {
    progress.value = Math.min(scrollTop / docHeight, 1);
  }
  
  ticking = false;
}

function handleScroll() {
  if (!ticking) {
    requestAnimationFrame(updateProgress);
    ticking = true;
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  updateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9999;
  background: linear-gradient(90deg, #6366f1, #a855f7, #fbbf24);
  transform-origin: left;
  pointer-events: none;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}
</style>
