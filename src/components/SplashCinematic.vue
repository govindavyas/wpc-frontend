<template>
  <transition name="splash-exit">
    <div v-if="isVisible" class="splash-cinematic" :class="themeClass">
      <!-- Theatre Curtains -->
      <div class="curtain curtain-left"></div>
      <div class="curtain curtain-right"></div>

      <!-- Spotlights -->
      <div class="spotlights">
        <div class="spotlight spotlight-1"></div>
        <div class="spotlight spotlight-2"></div>
        <div class="spotlight spotlight-3"></div>
      </div>

      <!-- Stage Floor Reflection -->
      <div class="stage-floor"></div>

      <!-- Film Grain -->
      <div class="film-grain"></div>

      <!-- Golden Frame Border -->
      <div class="golden-frame">
        <div class="frame-corner frame-tl"></div>
        <div class="frame-corner frame-tr"></div>
        <div class="frame-corner frame-bl"></div>
        <div class="frame-corner frame-br"></div>
        <div class="frame-line frame-top"></div>
        <div class="frame-line frame-bottom"></div>
        <div class="frame-line frame-left"></div>
        <div class="frame-line frame-right"></div>
      </div>

      <!-- Main Content -->
      <div class="stage-content">
        <!-- Clapperboard -->
        <div class="clapperboard">
          <div class="clapper-top">
            <div class="clapper-stripes">
              <span class="stripe"></span>
              <span class="stripe"></span>
              <span class="stripe"></span>
              <span class="stripe"></span>
              <span class="stripe"></span>
            </div>
          </div>
          <div class="clapper-body">
            <span class="clapper-text">{{ displayPrefix }}</span>
          </div>
        </div>

        <!-- Brand Container -->
        <div class="brand-container">
          <h1 class="brand-name">
            <span class="brand-prefix">{{ displayPrefix }}</span>
          </h1>
          <div class="brand-line"></div>
          <span class="brand-suffix">{{ displaySuffix }}</span>
          <p class="brand-tagline">{{ displayTagline }}</p>
        </div>
      </div>

      <!-- Vignette -->
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
.splash-cinematic {
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
  background: linear-gradient(180deg, #0a0a12 0%, #12121f 50%, #0a0a12 100%);
}

.theme-light {
  background: linear-gradient(180deg, #1a1a2e 0%, #2a2a4e 50%, #1a1a2e 100%);
}

/* Theatre Curtains */
.curtain {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  z-index: 20;
  animation: curtainOpen 1.8s cubic-bezier(0.7, 0, 0.3, 1) forwards;
}

.curtain-left {
  left: 0;
  transform-origin: left center;
  background: linear-gradient(90deg, #6b0f1a 0%, #8b1a2a 40%, #5a0d15 100%);
  box-shadow: inset -30px 0 60px rgba(0, 0, 0, 0.6);
}

.curtain-right {
  right: 0;
  transform-origin: right center;
  background: linear-gradient(-90deg, #6b0f1a 0%, #8b1a2a 40%, #5a0d15 100%);
  box-shadow: inset 30px 0 60px rgba(0, 0, 0, 0.6);
}

/* Curtain folds */
.curtain::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent 0px,
    rgba(0, 0, 0, 0.15) 20px,
    transparent 40px
  );
}

@keyframes curtainOpen {
  0% { transform: scaleX(1); }
  100% { transform: scaleX(0); }
}

/* Spotlights */
.spotlights {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
}

.spotlight {
  position: absolute;
  top: -20%;
  width: clamp(150px, 25vw, 300px);
  height: 140%;
  opacity: 0;
  filter: blur(40px);
  animation: spotlightOn 1s ease-out forwards, spotlightSway 6s ease-in-out infinite;
}

.spotlight-1 {
  left: 20%;
  background: linear-gradient(180deg, rgba(255, 248, 220, 0.25) 0%, transparent 70%);
  animation-delay: 1.5s, 2.5s;
}

.spotlight-2 {
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 60%);
  animation-delay: 1.7s, 2.7s;
}

.spotlight-3 {
  right: 20%;
  background: linear-gradient(180deg, rgba(255, 248, 220, 0.25) 0%, transparent 70%);
  animation-delay: 1.9s, 2.9s;
}

@keyframes spotlightOn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes spotlightSway {
  0%, 100% { transform: translateX(-5%); }
  50% { transform: translateX(5%); }
}

.spotlight-2 {
  animation: spotlightOn 1s ease-out 1.7s forwards;
}

/* Stage Floor */
.stage-floor {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35%;
  background: linear-gradient(180deg, 
    transparent 0%, 
    rgba(139, 92, 50, 0.1) 30%,
    rgba(139, 92, 50, 0.15) 100%
  );
  pointer-events: none;
}

.stage-floor::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 10%, rgba(251, 191, 36, 0.3) 50%, transparent 90%);
}

/* Film Grain */
.film-grain {
  position: absolute;
  inset: 0;
  opacity: 0.04;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 256px 256px;
  z-index: 15;
}

/* Golden Frame */
.golden-frame {
  position: absolute;
  inset: clamp(20px, 4vw, 50px);
  pointer-events: none;
  opacity: 0;
  animation: frameReveal 1s ease-out 2s forwards;
  z-index: 10;
}

.frame-corner {
  position: absolute;
  width: clamp(40px, 10vw, 80px);
  height: clamp(40px, 10vw, 80px);
}

.frame-tl {
  top: 0; left: 0;
  border-top: 2px solid rgba(251, 191, 36, 0.6);
  border-left: 2px solid rgba(251, 191, 36, 0.6);
}

.frame-tr {
  top: 0; right: 0;
  border-top: 2px solid rgba(251, 191, 36, 0.6);
  border-right: 2px solid rgba(251, 191, 36, 0.6);
}

.frame-bl {
  bottom: 0; left: 0;
  border-bottom: 2px solid rgba(251, 191, 36, 0.6);
  border-left: 2px solid rgba(251, 191, 36, 0.6);
}

.frame-br {
  bottom: 0; right: 0;
  border-bottom: 2px solid rgba(251, 191, 36, 0.6);
  border-right: 2px solid rgba(251, 191, 36, 0.6);
}

.frame-line {
  position: absolute;
  background: rgba(251, 191, 36, 0.2);
}

.frame-top, .frame-bottom {
  height: 1px;
  left: clamp(50px, 12vw, 100px);
  right: clamp(50px, 12vw, 100px);
}

.frame-top { top: 0; }
.frame-bottom { bottom: 0; }

.frame-left, .frame-right {
  width: 1px;
  top: clamp(50px, 12vw, 100px);
  bottom: clamp(50px, 12vw, 100px);
}

.frame-left { left: 0; }
.frame-right { right: 0; }

@keyframes frameReveal {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* Stage Content */
.stage-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
}

/* Clapperboard */
.clapperboard {
  position: absolute;
  top: clamp(-120px, -15vh, -80px);
  left: 50%;
  transform: translateX(-50%);
  width: clamp(100px, 25vw, 160px);
  opacity: 0;
  animation: clapperDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.5s forwards;
}

.clapper-top {
  height: clamp(25px, 5vh, 35px);
  background: #1a1a1a;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  transform-origin: bottom center;
  animation: clapperClap 0.4s ease-in-out 1.3s;
}

.clapper-stripes {
  display: flex;
  height: 100%;
}

.stripe {
  flex: 1;
  background: #fff;
}

.stripe:nth-child(odd) {
  background: #1a1a1a;
}

.clapper-body {
  background: #1a1a1a;
  border: 2px solid #333;
  border-top: none;
  padding: clamp(8px, 2vh, 15px);
  border-radius: 0 0 4px 4px;
}

.clapper-text {
  font-size: clamp(0.5rem, 1.5vw, 0.75rem);
  font-weight: 700;
  color: #fbbf24;
  letter-spacing: 0.05em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

@keyframes clapperDrop {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px) rotate(-15deg);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) rotate(0);
  }
}

@keyframes clapperClap {
  0%, 100% { transform: rotateX(0deg); }
  50% { transform: rotateX(-30deg); }
}

/* Brand Container */
.brand-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(0.5rem, 1.5vh, 1rem);
  opacity: 0;
  animation: brandReveal 1.2s ease-out 1.8s forwards;
}

@keyframes brandReveal {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.brand-name {
  margin: 0;
}

.brand-prefix {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(2.5rem, 10vw, 5rem);
  font-weight: 800;
  letter-spacing: clamp(0.08em, 1vw, 0.15em);
  line-height: 1;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.5));
  animation: theatreGlow 3s ease-in-out infinite alternate;
}

@keyframes theatreGlow {
  0% { filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.4)); }
  100% { filter: drop-shadow(0 0 50px rgba(99, 102, 241, 0.7)); }
}

.brand-line {
  width: clamp(60px, 20vw, 120px);
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.8), transparent);
  margin: clamp(0.25rem, 1vh, 0.5rem) 0;
}

.brand-suffix {
  font-size: clamp(1rem, 4vw, 1.75rem);
  font-weight: 500;
  letter-spacing: clamp(0.25em, 2vw, 0.5em);
  color: rgba(251, 191, 36, 0.9);
  text-transform: uppercase;
}

.brand-tagline {
  margin: 0;
  margin-top: clamp(0.75rem, 2vh, 1.5rem);
  font-size: clamp(0.65rem, 2vw, 0.875rem);
  font-weight: 300;
  letter-spacing: clamp(0.15em, 1vw, 0.3em);
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

/* Vignette */
.vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 8;
}

/* Exit Transition */
.splash-exit-leave-active {
  transition: opacity 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-exit-leave-to {
  opacity: 0;
}

/* Light Theme Adjustments */
.theme-light .brand-tagline {
  color: rgba(255, 255, 255, 0.6);
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .curtain,
  .spotlight,
  .golden-frame,
  .clapperboard,
  .clapper-top,
  .brand-container,
  .brand-prefix {
    animation: none !important;
    opacity: 1 !important;
    transform: translateX(-50%) !important;
  }
  
  .curtain {
    transform: scaleX(0) !important;
  }
  
  .clapperboard {
    transform: translateX(-50%) translateY(0) !important;
  }
}

/* Safe Area Support */
@supports (padding-top: env(safe-area-inset-top)) {
  .splash-cinematic {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
}
</style>

