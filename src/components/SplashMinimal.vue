<template>
  <transition name="splash-exit">
    <div v-if="isVisible" class="splash-minimal" :class="themeClass">
      <!-- Pure Background -->
      <div class="pure-bg"></div>

      <!-- Main Content -->
      <div class="content-wrapper">
        <!-- Breath Circle -->
        <div class="breath-ring"></div>

        <!-- Brand Text -->
        <div class="brand-block">
          <h1 class="brand-text">
            <span 
              v-for="(char, index) in displayChars" 
              :key="index" 
              class="char"
              :style="{ animationDelay: `${0.8 + index * 0.05}s` }"
            >{{ char === ' ' ? '\u00A0' : char }}</span>
          </h1>
          
          <div class="suffix-line">
            <span class="suffix-text">{{ displaySuffix }}</span>
          </div>
        </div>

        <!-- Minimal Tagline -->
        <p class="tagline">{{ displayTagline }}</p>
      </div>

      <!-- Corner Marks -->
      <div class="corner-mark corner-tl"></div>
      <div class="corner-mark corner-br"></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  theme: {
    type: String,
    default: 'dark'
  },
  duration: {
    type: Number,
    default: 3000
  },
  companyName: {
    type: String,
    default: 'WHITE PANDA CREATIONS'
  },
  companyTagline: {
    type: String,
    default: 'Illuminating Stories'
  },
  logoUrl: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['complete']);

const isVisible = ref(true);
const themeClass = computed(() => `theme-${props.theme}`);

// Extract prefix for character animation
const displayPrefix = computed(() => {
  const name = props.companyName.toUpperCase();
  const words = name.split(/\s+/);
  if (words.length > 1) {
    return words.slice(0, -1).join(' ');
  }
  return name;
});

// Get individual characters for animation
const displayChars = computed(() => {
  return displayPrefix.value.split('');
});

const displaySuffix = computed(() => {
  const name = props.companyName.toUpperCase();
  const words = name.split(/\s+/);
  if (words.length > 1) {
    return words[words.length - 1];
  }
  return 'CREATIONS';
});

const displayTagline = computed(() => {
  return props.companyTagline || 'Illuminating Stories';
});

let timer = null;

onMounted(() => {
  timer = setTimeout(() => {
    isVisible.value = false;
    emit('complete');
  }, props.duration);
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
});
</script>

<style scoped>
/* Base Container */
.splash-minimal {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 9999;
  padding: env(safe-area-inset-top, 0) env(safe-area-inset-right, 0) 
            env(safe-area-inset-bottom, 0) env(safe-area-inset-left, 0);
}

/* Theme Backgrounds */
.theme-dark {
  background: #0c0c0c;
}

.theme-light {
  background: #fafafa;
}

/* Pure Background (subtle gradient) */
.pure-bg {
  position: absolute;
  inset: 0;
}

.theme-dark .pure-bg {
  background: radial-gradient(ellipse at center, #121212 0%, #0a0a0a 100%);
}

.theme-light .pure-bg {
  background: radial-gradient(ellipse at center, #ffffff 0%, #f5f5f5 100%);
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
}

/* Breathing Ring */
.breath-ring {
  position: absolute;
  width: clamp(250px, 60vmin, 400px);
  height: clamp(250px, 60vmin, 400px);
  border-radius: 50%;
  pointer-events: none;
  opacity: 0;
  animation: breathIn 3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.theme-dark .breath-ring {
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 
    inset 0 0 60px rgba(99, 102, 241, 0.03),
    0 0 80px rgba(99, 102, 241, 0.02);
}

.theme-light .breath-ring {
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: 
    inset 0 0 60px rgba(99, 102, 241, 0.02),
    0 0 80px rgba(99, 102, 241, 0.01);
}

@keyframes breathIn {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0.6;
    transform: scale(1.05);
  }
}

/* Brand Block */
.brand-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 2vh, 1.25rem);
}

/* Brand Text with Character Animation */
.brand-text {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(2rem, 9vw, 4.5rem);
  font-weight: 200;
  letter-spacing: clamp(0.08em, 1.5vw, 0.15em);
  line-height: 1.1;
}

.theme-dark .brand-text {
  color: #ffffff;
}

.theme-light .brand-text {
  color: #1a1a1a;
}

/* Individual Characters */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px);
  animation: charReveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes charReveal {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Suffix Line */
.suffix-line {
  overflow: hidden;
}

.suffix-text {
  display: inline-block;
  font-size: clamp(0.75rem, 3vw, 1.125rem);
  font-weight: 500;
  letter-spacing: clamp(0.3em, 2vw, 0.5em);
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(100%);
  animation: slideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.8s forwards;
}

.theme-dark .suffix-text {
  color: rgba(251, 191, 36, 0.9);
}

.theme-light .suffix-text {
  color: #d97706;
}

@keyframes slideUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tagline */
.tagline {
  margin: 0;
  margin-top: clamp(1.5rem, 5vh, 3rem);
  font-size: clamp(0.6rem, 1.8vw, 0.75rem);
  font-weight: 300;
  letter-spacing: clamp(0.15em, 1vw, 0.25em);
  text-transform: uppercase;
  opacity: 0;
  animation: fadeIn 1s ease-out 2.2s forwards;
}

.theme-dark .tagline {
  color: rgba(255, 255, 255, 0.4);
}

.theme-light .tagline {
  color: rgba(0, 0, 0, 0.35);
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Corner Marks */
.corner-mark {
  position: absolute;
  width: clamp(30px, 8vw, 50px);
  height: clamp(30px, 8vw, 50px);
  opacity: 0;
  animation: cornerFade 1s ease-out 0.5s forwards;
}

.corner-tl {
  top: clamp(1.5rem, 6vh, 3rem);
  left: clamp(1.5rem, 6vw, 3rem);
  border-top: 1px solid;
  border-left: 1px solid;
}

.corner-br {
  bottom: clamp(1.5rem, 6vh, 3rem);
  right: clamp(1.5rem, 6vw, 3rem);
  border-bottom: 1px solid;
  border-right: 1px solid;
}

.theme-dark .corner-mark {
  border-color: rgba(255, 255, 255, 0.1);
}

.theme-light .corner-mark {
  border-color: rgba(0, 0, 0, 0.08);
}

@keyframes cornerFade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Exit Transition */
.splash-exit-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-exit-leave-to {
  opacity: 0;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .char,
  .suffix-text,
  .tagline,
  .corner-mark,
  .breath-ring {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}

/* Safe Area Support */
@supports (padding-top: env(safe-area-inset-top)) {
  .splash-minimal {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}
</style>

