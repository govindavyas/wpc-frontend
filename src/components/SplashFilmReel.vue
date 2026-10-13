<template>
  <transition name="splash-exit">
    <div v-if="isVisible" class="splash-film" :class="themeClass">
      <!-- Projected Light Background -->
      <div class="projected-light"></div>
      
      <!-- Film Strip Silhouettes -->
      <div class="film-strip film-strip-left">
        <div class="sprocket" v-for="i in 12" :key="`sprocket-l-${i}`"></div>
      </div>
      <div class="film-strip film-strip-right">
        <div class="sprocket" v-for="i in 12" :key="`sprocket-r-${i}`"></div>
      </div>

      <!-- Film Leader Marks -->
      <div class="leader-marks">
        <div class="leader-line leader-h"></div>
        <div class="leader-line leader-v"></div>
        <div class="leader-circle"></div>
      </div>

      <!-- Film Grain -->
      <div class="film-grain"></div>

      <!-- Center Frame -->
      <div class="center-frame">
        <!-- Frame Corners -->
        <div class="frame-corner frame-tl"></div>
        <div class="frame-corner frame-tr"></div>
        <div class="frame-corner frame-bl"></div>
        <div class="frame-corner frame-br"></div>

        <!-- Brand Content -->
        <div class="brand-content">
          <div class="brand-main">
            <span class="brand-prefix">{{ displayPrefix }}</span>
          </div>
          <div class="brand-divider">
            <span class="divider-line"></span>
            <span class="divider-icon">✦</span>
            <span class="divider-line"></span>
          </div>
          <div class="brand-secondary">
            <span class="brand-suffix">{{ displaySuffix }}</span>
          </div>
          <p class="brand-tagline">{{ displayTagline }}</p>
        </div>
      </div>

      <!-- Reel Indicator -->
      <div class="reel-indicator">
        <svg class="reel-svg" viewBox="0 0 60 60">
          <circle class="reel-track" cx="30" cy="30" r="26"></circle>
          <circle class="reel-progress" cx="30" cy="30" r="26"></circle>
        </svg>
        <span class="reel-text">REEL 01</span>
      </div>

      <!-- Subtle Vignette -->
      <div class="vignette"></div>
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

// Parse company name - extract prefix and suffix
const displayPrefix = computed(() => {
  const name = props.companyName.toUpperCase();
  const words = name.split(/\s+/);
  if (words.length > 1) {
    return words.slice(0, -1).join(' ');
  }
  return name;
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
.splash-film {
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
  background: #050508;
}

.theme-light {
  background: #f8f8fa;
}

/* Projected Light */
.projected-light {
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: lightFadeIn 2s ease-out 0.3s forwards;
}

.theme-dark .projected-light {
  background: 
    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(251, 191, 36, 0.04) 0%, transparent 70%),
    radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 60%);
}

.theme-light .projected-light {
  background: 
    radial-gradient(ellipse 80% 60% at 50% 40%, rgba(251, 191, 36, 0.06) 0%, transparent 70%),
    radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 60%);
}

@keyframes lightFadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Film Strips */
.film-strip {
  position: absolute;
  top: 0;
  bottom: 0;
  width: clamp(24px, 5vw, 40px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  opacity: 0;
  animation: stripReveal 1s ease-out 0.5s forwards;
}

.film-strip-left {
  left: clamp(1rem, 4vw, 3rem);
}

.film-strip-right {
  right: clamp(1rem, 4vw, 3rem);
}

.theme-dark .film-strip {
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.theme-light .film-strip {
  border-left: 1px solid rgba(0, 0, 0, 0.04);
  border-right: 1px solid rgba(0, 0, 0, 0.04);
}

.sprocket {
  width: clamp(8px, 2vw, 12px);
  height: clamp(8px, 2vw, 12px);
  border-radius: 2px;
}

.theme-dark .sprocket {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.theme-light .sprocket {
  background: rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

@keyframes stripReveal {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* Leader Marks (vintage film alignment marks) */
.leader-marks {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  animation: leaderFade 1.5s ease-out 0.8s forwards;
}

.leader-line {
  position: absolute;
}

.leader-h {
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  transform: translateY(-50%);
}

.leader-v {
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  transform: translateX(-50%);
}

.theme-dark .leader-line {
  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.03) 70%, transparent 100%);
}

.theme-dark .leader-v {
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0.03) 70%, transparent 100%);
}

.theme-light .leader-line {
  background: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.02) 30%, rgba(0, 0, 0, 0.02) 70%, transparent 100%);
}

.theme-light .leader-v {
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.02) 30%, rgba(0, 0, 0, 0.02) 70%, transparent 100%);
}

.leader-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(200px, 40vmin, 350px);
  height: clamp(200px, 40vmin, 350px);
  transform: translate(-50%, -50%);
  border-radius: 50%;
}

.theme-dark .leader-circle {
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.theme-light .leader-circle {
  border: 1px solid rgba(0, 0, 0, 0.03);
}

@keyframes leaderFade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Film Grain */
.film-grain {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* Center Frame */
.center-frame {
  position: relative;
  z-index: 10;
  padding: clamp(2rem, 6vw, 4rem);
  opacity: 0;
  animation: frameReveal 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.6s forwards;
}

@keyframes frameReveal {
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Frame Corners */
.frame-corner {
  position: absolute;
  width: clamp(30px, 8vw, 60px);
  height: clamp(30px, 8vw, 60px);
  opacity: 0;
  animation: cornerReveal 0.8s ease-out 1.2s forwards;
}

.frame-tl {
  top: 0;
  left: 0;
  border-top: 2px solid;
  border-left: 2px solid;
}

.frame-tr {
  top: 0;
  right: 0;
  border-top: 2px solid;
  border-right: 2px solid;
}

.frame-bl {
  bottom: 0;
  left: 0;
  border-bottom: 2px solid;
  border-left: 2px solid;
}

.frame-br {
  bottom: 0;
  right: 0;
  border-bottom: 2px solid;
  border-right: 2px solid;
}

.theme-dark .frame-corner {
  border-color: rgba(251, 191, 36, 0.4);
}

.theme-light .frame-corner {
  border-color: rgba(251, 191, 36, 0.5);
}

@keyframes cornerReveal {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Brand Content */
.brand-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.75rem, 2vh, 1.25rem);
  text-align: center;
}

.brand-main {
  overflow: hidden;
}

.brand-prefix {
  display: block;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(2rem, 9vw, 5rem);
  font-weight: 200;
  letter-spacing: clamp(0.1em, 2vw, 0.25em);
  line-height: 1;
  opacity: 0;
  transform: translateY(100%);
  animation: textSlideUp 1s cubic-bezier(0.4, 0, 0.2, 1) 1s forwards;
}

.theme-dark .brand-prefix {
  color: #ffffff;
}

.theme-light .brand-prefix {
  color: #1a1a1a;
}

@keyframes textSlideUp {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Divider */
.brand-divider {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 1rem);
  opacity: 0;
  animation: fadeIn 0.8s ease-out 1.4s forwards;
}

.divider-line {
  width: clamp(25px, 8vw, 50px);
  height: 1px;
}

.theme-dark .divider-line {
  background: rgba(255, 255, 255, 0.2);
}

.theme-light .divider-line {
  background: rgba(0, 0, 0, 0.15);
}

.divider-icon {
  font-size: clamp(0.5rem, 1.5vw, 0.75rem);
}

.theme-dark .divider-icon {
  color: rgba(251, 191, 36, 0.8);
}

.theme-light .divider-icon {
  color: rgba(251, 191, 36, 0.9);
}

/* Brand Secondary */
.brand-secondary {
  overflow: hidden;
}

.brand-suffix {
  display: block;
  font-size: clamp(0.75rem, 3vw, 1.25rem);
  font-weight: 500;
  letter-spacing: clamp(0.3em, 2vw, 0.5em);
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(100%);
  animation: textSlideUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) 1.6s forwards;
}

.theme-dark .brand-suffix {
  color: rgba(251, 191, 36, 0.9);
}

.theme-light .brand-suffix {
  color: #d97706;
}

/* Tagline */
.brand-tagline {
  margin: 0;
  margin-top: clamp(0.5rem, 2vh, 1rem);
  font-size: clamp(0.6rem, 1.8vw, 0.75rem);
  font-weight: 300;
  letter-spacing: clamp(0.15em, 1vw, 0.25em);
  text-transform: uppercase;
  opacity: 0;
  animation: fadeIn 1s ease-out 2s forwards;
}

.theme-dark .brand-tagline {
  color: rgba(255, 255, 255, 0.4);
}

.theme-light .brand-tagline {
  color: rgba(0, 0, 0, 0.35);
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Reel Indicator */
.reel-indicator {
  position: absolute;
  bottom: clamp(1.5rem, 6vh, 3rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: fadeIn 1s ease-out 1.8s forwards;
}

.reel-svg {
  width: clamp(40px, 10vw, 60px);
  height: clamp(40px, 10vw, 60px);
  transform: rotate(-90deg);
}

.reel-track {
  fill: none;
  stroke-width: 1;
}

.theme-dark .reel-track {
  stroke: rgba(255, 255, 255, 0.1);
}

.theme-light .reel-track {
  stroke: rgba(0, 0, 0, 0.08);
}

.reel-progress {
  fill: none;
  stroke-width: 1.5;
  stroke-dasharray: 163.36;
  stroke-dashoffset: 163.36;
  stroke-linecap: round;
  animation: progressDraw 2.5s ease-out 0.5s forwards;
}

.theme-dark .reel-progress {
  stroke: rgba(251, 191, 36, 0.6);
}

.theme-light .reel-progress {
  stroke: rgba(251, 191, 36, 0.7);
}

@keyframes progressDraw {
  0% { stroke-dashoffset: 163.36; }
  100% { stroke-dashoffset: 0; }
}

.reel-text {
  font-size: clamp(0.5rem, 1.5vw, 0.625rem);
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.theme-dark .reel-text {
  color: rgba(255, 255, 255, 0.3);
}

.theme-light .reel-text {
  color: rgba(0, 0, 0, 0.25);
}

/* Vignette */
.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, 0.4) 100%);
}

.theme-light .vignette {
  background: radial-gradient(ellipse at center, transparent 60%, rgba(255, 255, 255, 0.3) 100%);
}

/* Exit Transition */
.splash-exit-leave-active {
  transition: opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-exit-leave-to {
  opacity: 0;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .film-strip,
  .leader-marks,
  .center-frame,
  .frame-corner,
  .brand-prefix,
  .brand-divider,
  .brand-suffix,
  .brand-tagline,
  .reel-indicator,
  .reel-progress,
  .projected-light {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  
  .reel-progress {
    stroke-dashoffset: 0;
  }
}

/* Safe Area Support */
@supports (padding-top: env(safe-area-inset-top)) {
  .splash-film {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}
</style>
