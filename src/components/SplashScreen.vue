<template>
  <transition name="fade-out">
    <div v-if="isVisible" class="splash-screen splash-variant galaxy" :class="themeClass">
      <!-- Deep Space Background -->
      <div class="space-bg"></div>
      
      <!-- Background Stars -->
      <div class="bg-stars">
        <div v-for="i in 200" :key="`bg-${i}`" class="bg-star" :style="getBgStarStyle(i)"></div>
      </div>

      <!-- 3D Galaxy Container -->
      <div class="galaxy-scene">
        <div class="galaxy-3d">
          <!-- Outer Glow Halo -->
          <div class="galaxy-halo"></div>
          
          <!-- SVG Spiral Arms - Clear visible spirals -->
          <svg class="spiral-svg" viewBox="0 0 800 800">
            <!-- Spiral arm 1 -->
            <path class="spiral-arm-path arm-1" :d="spiralPath1" />
            <path class="spiral-arm-path arm-1-glow" :d="spiralPath1" />
            <!-- Spiral arm 2 -->
            <path class="spiral-arm-path arm-2" :d="spiralPath2" />
            <path class="spiral-arm-path arm-2-glow" :d="spiralPath2" />
            <!-- Spiral arm 3 -->
            <path class="spiral-arm-path arm-3" :d="spiralPath3" />
            <path class="spiral-arm-path arm-3-glow" :d="spiralPath3" />
            <!-- Spiral arm 4 -->
            <path class="spiral-arm-path arm-4" :d="spiralPath4" />
            <path class="spiral-arm-path arm-4-glow" :d="spiralPath4" />
          </svg>
          
          <!-- Star particles along spiral arms -->
          <div class="spiral-particles">
            <div v-for="(star, idx) in spiralStars" :key="`spiral-${idx}`" 
                 class="spiral-star" 
                 :style="star">
            </div>
          </div>
          
          <!-- Inner disk glow -->
          <div class="inner-glow"></div>
          <div class="inner-glow-2"></div>
          
          <!-- Core -->
          <div class="galaxy-core">
            <div class="core-halo"></div>
            <div class="core-outer"></div>
            <div class="core-middle"></div>
            <div class="core-inner"></div>
            <div class="core-center"></div>
          </div>
          
          <!-- Dense center particles -->
          <div class="center-particles">
            <div v-for="i in 300" :key="`center-${i}`" class="center-particle" :style="getCenterParticleStyle(i)"></div>
          </div>
        </div>
      </div>

      <!-- Company Branding -->
      <div class="branding">
        <h1 class="company-name">
          <span class="panda-text">{{ displayPrefix }}</span>
          <span class="suffix-text">{{ displaySuffix }}</span>
        </h1>
        <div class="tagline">{{ displayTagline }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

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

// Parse company name to display properly - extract prefix and suffix
const displayPrefix = computed(() => {
  const name = props.companyName.toUpperCase();
  // Extract prefix (everything before the last word)
  const words = name.split(/\s+/);
  if (words.length > 1) {
    return words.slice(0, -1).join(' ');
  }
  return name;
});

// Extract suffix (last word: CREATIONS, FILMS, etc.)
const displaySuffix = computed(() => {
  const name = props.companyName.toUpperCase();
  const words = name.split(/\s+/);
  if (words.length > 1) {
    return words[words.length - 1];
  }
  return 'CREATIONS';
});

// Display tagline with fallback
const displayTagline = computed(() => {
  return props.companyTagline || 'Creating Cinematic Universes';
});

// Generate logarithmic spiral SVG path
const generateSpiralPath = (startAngle, turns = 2.5) => {
  const centerX = 400;
  const centerY = 400;
  const a = 8; // Starting radius
  const b = 0.18; // Spiral tightness - controls how fast it expands
  const steps = 150;
  
  let path = '';
  for (let i = 0; i <= steps; i++) {
    const theta = startAngle + (i / steps) * Math.PI * 2 * turns;
    const r = a * Math.exp(b * (theta - startAngle));
    const x = centerX + r * Math.cos(theta);
    const y = centerY + r * Math.sin(theta);
    
    if (i === 0) {
      path = `M ${x} ${y}`;
    } else {
      path += ` L ${x} ${y}`;
    }
  }
  return path;
};

// Four spiral arms, each 90 degrees apart
const spiralPath1 = computed(() => generateSpiralPath(0));
const spiralPath2 = computed(() => generateSpiralPath(Math.PI / 2));
const spiralPath3 = computed(() => generateSpiralPath(Math.PI));
const spiralPath4 = computed(() => generateSpiralPath(Math.PI * 1.5));

// Generate star particles that follow the spiral arms
const spiralStars = computed(() => {
  const stars = [];
  const arms = 4;
  const starsPerArm = 180;
  const centerX = 50; // percentage
  const centerY = 50;
  const a = 2; // Starting radius in percentage
  const b = 0.16;
  const turns = 2.5;
  
  for (let arm = 0; arm < arms; arm++) {
    const startAngle = (arm / arms) * Math.PI * 2;
    
    for (let i = 0; i < starsPerArm; i++) {
      const progress = i / starsPerArm;
      const theta = startAngle + progress * Math.PI * 2 * turns;
      const baseR = a * Math.exp(b * (theta - startAngle));
      
      // Add slight random offset perpendicular to spiral direction
      const perpAngle = theta + Math.PI / 2;
      const offset = (Math.random() - 0.5) * (2 + progress * 3);
      
      const r = baseR + offset * 0.3;
      const x = centerX + r * Math.cos(theta) + Math.cos(perpAngle) * offset * 0.5;
      const y = centerY + r * Math.sin(theta) + Math.sin(perpAngle) * offset * 0.5;
      
      // Size decreases and varies toward outer edge
      const size = 1.5 + Math.random() * 3 * (1 - progress * 0.5);
      
      // Brightness
      const brightness = 0.5 + Math.random() * 0.5;
      
      // Color - blue/purple spectrum, whiter near center
      const hue = 200 + Math.random() * 60;
      const saturation = 40 + progress * 40;
      const lightness = 80 - progress * 30;
      
      stars.push({
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: brightness,
        '--star-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        '--glow-intensity': `${0.8 - progress * 0.3}`,
        animationDelay: `${Math.random() * 3}s`
      });
    }
  }
  return stars;
});

// Background stars
const getBgStarStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${0.5 + Math.random() * 2}px`,
    height: `${0.5 + Math.random() * 2}px`,
    opacity: 0.2 + Math.random() * 0.6,
    animationDelay: `${Math.random() * 5}s`
  };
};

// Dense center particles
const getCenterParticleStyle = (index) => {
  const angle = Math.random() * Math.PI * 2;
  const maxRadius = 12;
  const radius = Math.pow(Math.random(), 0.5) * maxRadius;
  
  const x = 50 + Math.cos(angle) * radius;
  const y = 50 + Math.sin(angle) * radius;
  
  const size = 1 + Math.random() * 2.5;
  const brightness = 0.6 + Math.random() * 0.4;
  const hue = 200 + Math.random() * 40;
  const saturation = 20 + Math.random() * 30;
  const lightness = 75 + Math.random() * 20;
  
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    opacity: brightness,
    '--particle-color': `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    animationDelay: `${Math.random() * 3}s`
  };
};

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
    emit('complete');
  }, props.duration);
});
</script>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
  transition: background 0.3s ease;
}

.splash-screen.theme-dark {
  background: #000;
}

.splash-screen.theme-light {
  background: #f0f5ff;
}

/* Deep Space Background */
.space-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.theme-dark .space-bg {
  background: 
    radial-gradient(ellipse at 50% 50%, 
      rgba(10, 20, 50, 0.8) 0%, 
      rgba(5, 10, 30, 0.6) 30%,
      rgba(2, 5, 15, 0.8) 60%, 
      #000 100%);
}

.theme-light .space-bg {
  background: 
    radial-gradient(ellipse at 50% 50%, 
      rgba(220, 230, 255, 1) 0%, 
      rgba(200, 215, 250, 1) 30%,
      rgba(180, 200, 245, 1) 60%, 
      rgba(160, 185, 240, 1) 100%);
}

/* Background Stars */
.bg-stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.bg-star {
  position: absolute;
  border-radius: 50%;
  animation: twinkle 4s ease-in-out infinite;
}

.theme-dark .bg-star {
  background: #fff;
}

.theme-light .bg-star {
  background: rgba(99, 102, 241, 0.6);
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.9; }
}

/* 3D Galaxy Scene */
.galaxy-scene {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

.galaxy-3d {
  position: relative;
  width: 90vmin;
  height: 90vmin;
  max-width: 900px;
  max-height: 900px;
  transform-style: preserve-3d;
  animation: galaxyRotate 25s linear infinite;
}

@keyframes galaxyRotate {
  from {
    transform: rotateX(60deg) rotateZ(0deg);
  }
  to {
    transform: rotateX(60deg) rotateZ(360deg);
  }
}

/* Galaxy Halo */
.galaxy-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  filter: blur(30px);
}

.theme-dark .galaxy-halo {
  background: radial-gradient(circle,
    rgba(100, 150, 255, 0.2) 0%,
    rgba(80, 120, 220, 0.1) 30%,
    rgba(60, 100, 200, 0.05) 50%,
    transparent 70%);
}

.theme-light .galaxy-halo {
  background: radial-gradient(circle,
    rgba(99, 102, 241, 0.3) 0%,
    rgba(79, 82, 221, 0.15) 30%,
    rgba(59, 72, 201, 0.08) 50%,
    transparent 70%);
}

/* SVG Spiral Arms */
.spiral-svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.spiral-arm-path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Main spiral arms - visible blue/purple gradient strokes */
.theme-dark .spiral-arm-path.arm-1 {
  stroke: rgba(120, 160, 255, 0.9);
  stroke-width: 12;
  filter: blur(2px);
}

.theme-light .spiral-arm-path.arm-1 {
  stroke: rgba(99, 102, 241, 0.8);
  stroke-width: 12;
  filter: blur(2px);
}

.theme-dark .spiral-arm-path.arm-2 {
  stroke: rgba(140, 130, 255, 0.85);
  stroke-width: 10;
  filter: blur(2px);
}

.theme-light .spiral-arm-path.arm-2 {
  stroke: rgba(109, 92, 241, 0.75);
  stroke-width: 10;
  filter: blur(2px);
}

.theme-dark .spiral-arm-path.arm-3 {
  stroke: rgba(100, 150, 255, 0.9);
  stroke-width: 11;
  filter: blur(2px);
}

.theme-light .spiral-arm-path.arm-3 {
  stroke: rgba(89, 102, 241, 0.8);
  stroke-width: 11;
  filter: blur(2px);
}

.theme-dark .spiral-arm-path.arm-4 {
  stroke: rgba(130, 140, 255, 0.85);
  stroke-width: 9;
  filter: blur(2px);
}

.theme-light .spiral-arm-path.arm-4 {
  stroke: rgba(99, 112, 241, 0.75);
  stroke-width: 9;
  filter: blur(2px);
}

/* Glow layers for spiral arms */
.spiral-arm-path.arm-1-glow {
  stroke: rgba(100, 140, 255, 0.4);
  stroke-width: 35;
  filter: blur(15px);
}

.spiral-arm-path.arm-2-glow {
  stroke: rgba(120, 110, 255, 0.35);
  stroke-width: 30;
  filter: blur(15px);
}

.spiral-arm-path.arm-3-glow {
  stroke: rgba(80, 130, 255, 0.4);
  stroke-width: 32;
  filter: blur(15px);
}

.spiral-arm-path.arm-4-glow {
  stroke: rgba(110, 120, 255, 0.35);
  stroke-width: 28;
  filter: blur(15px);
}

/* Spiral Particles Container */
.spiral-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Individual star particles along spirals */
.spiral-star {
  position: absolute;
  background: var(--star-color, #aaccff);
  border-radius: 50%;
  box-shadow: 
    0 0 3px var(--star-color, rgba(150, 180, 255, 1)),
    0 0 8px var(--star-color, rgba(150, 180, 255, 0.8)),
    0 0 15px var(--star-color, rgba(150, 180, 255, 0.5));
  animation: starPulse 3s ease-in-out infinite;
}

@keyframes starPulse {
  0%, 100% { 
    transform: scale(1); 
    opacity: var(--glow-intensity, 0.7);
  }
  50% { 
    transform: scale(1.3); 
    opacity: 1;
  }
}

/* Inner Glows */
.inner-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 45%;
  height: 45%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    rgba(150, 180, 255, 0.35) 0%,
    rgba(120, 160, 255, 0.2) 40%,
    transparent 70%);
  border-radius: 50%;
  filter: blur(25px);
  animation: innerGlowPulse 5s ease-in-out infinite;
}

.inner-glow-2 {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  height: 30%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    rgba(180, 200, 255, 0.5) 0%,
    rgba(150, 180, 255, 0.3) 50%,
    transparent 100%);
  border-radius: 50%;
  filter: blur(20px);
  animation: innerGlowPulse 4s ease-in-out infinite 1s;
}

@keyframes innerGlowPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
  50% { transform: translate(-50%, -50%) scale(1.1); opacity: 1; }
}

/* Center particles */
.center-particles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.center-particle {
  position: absolute;
  background: var(--particle-color, #ddeeff);
  border-radius: 50%;
  box-shadow: 
    0 0 4px var(--particle-color, rgba(220, 230, 255, 0.9)),
    0 0 8px var(--particle-color, rgba(200, 220, 255, 0.6));
  animation: centerParticlePulse 2.5s ease-in-out infinite;
}

@keyframes centerParticlePulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

/* Galaxy Core */
.galaxy-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%) translateZ(10px);
}

.core-halo {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 160px;
  height: 160px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    rgba(180, 200, 255, 0.5) 0%,
    rgba(150, 180, 255, 0.25) 40%,
    transparent 70%);
  border-radius: 50%;
  filter: blur(20px);
  animation: coreHaloPulse 4s ease-in-out infinite;
}

.core-outer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 110px;
  height: 110px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    rgba(200, 215, 255, 0.6) 0%,
    rgba(170, 195, 255, 0.35) 50%,
    transparent 100%);
  border-radius: 50%;
  filter: blur(12px);
  animation: coreGlow 3.5s ease-in-out infinite;
}

.core-middle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70px;
  height: 70px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    rgba(230, 240, 255, 0.85) 0%,
    rgba(200, 220, 255, 0.55) 50%,
    transparent 100%);
  border-radius: 50%;
  filter: blur(6px);
  animation: coreGlow 3s ease-in-out infinite 0.5s;
}

.core-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(240, 248, 255, 0.9) 40%,
    rgba(210, 230, 255, 0.55) 80%,
    transparent 100%);
  border-radius: 50%;
  filter: blur(1px);
  animation: corePulse 2.5s ease-in-out infinite;
}

.core-center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 22px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, #fff 0%, #f0f8ff 50%, #c0d8ff 100%);
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(255, 255, 255, 1),
    0 0 40px rgba(200, 220, 255, 0.95),
    0 0 70px rgba(150, 190, 255, 0.85),
    0 0 100px rgba(120, 160, 255, 0.6);
  animation: centerPulseCore 2.5s ease-in-out infinite;
}

@keyframes coreHaloPulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.75; }
  50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.95; }
}

@keyframes coreGlow {
  0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.85; }
  50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
}

@keyframes corePulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes centerPulseCore {
  0%, 100% { 
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 20px #fff, 0 0 40px rgba(200, 220, 255, 0.95), 0 0 70px rgba(150, 190, 255, 0.85);
  }
  50% { 
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow: 0 0 35px #fff, 0 0 70px rgba(200, 220, 255, 1), 0 0 110px rgba(150, 190, 255, 0.95);
  }
}

/* Company Branding - Mobile First */
.branding {
  position: absolute;
  bottom: max(env(safe-area-inset-bottom, 0px) + 6%, 8%);
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  z-index: 100;
  width: 100%;
  padding: 0 1.5rem;
  box-sizing: border-box;
}

.company-name {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Cinzel', serif;
  animation: brandFadeIn 1.5s ease-out 0.5s both;
}

/* Mobile-first text sizing */
.panda-text {
  font-size: clamp(1.8rem, 10vw, 4.5rem);
  font-weight: 700;
  letter-spacing: clamp(0.1rem, 1vw, 0.5rem);
  color: #ffffff;
  text-shadow: 
    0 0 10px rgba(160, 196, 255, 0.8),
    0 0 20px rgba(160, 196, 255, 0.6),
    0 0 30px rgba(160, 196, 255, 0.4),
    0 0 40px rgba(100, 150, 255, 0.3);
  animation: textGlow 3s ease-in-out infinite alternate;
  line-height: 1.1;
  word-spacing: 0.2em;
}

@keyframes textGlow {
  from {
    text-shadow: 
      0 0 10px rgba(160, 196, 255, 0.8),
      0 0 20px rgba(160, 196, 255, 0.6),
      0 0 30px rgba(160, 196, 255, 0.4);
  }
  to {
    text-shadow: 
      0 0 20px rgba(160, 196, 255, 1),
      0 0 30px rgba(160, 196, 255, 0.8),
      0 0 40px rgba(160, 196, 255, 0.6),
      0 0 50px rgba(100, 150, 255, 0.4);
  }
}

.theme-dark .panda-text {
  color: #ffffff;
  text-shadow: 
    0 0 10px rgba(160, 196, 255, 0.8),
    0 0 20px rgba(160, 196, 255, 0.6),
    0 0 30px rgba(160, 196, 255, 0.4),
    0 0 40px rgba(100, 150, 255, 0.3);
}

.theme-light .panda-text {
  color: #4f46e5;
  text-shadow: 
    0 0 10px rgba(99, 102, 241, 0.6),
    0 0 20px rgba(99, 102, 241, 0.4),
    0 0 30px rgba(99, 102, 241, 0.2);
}

.suffix-text {
  font-size: clamp(0.7rem, 3vw, 1.4rem);
  font-weight: 300;
  letter-spacing: clamp(0.2rem, 1vw, 0.4rem);
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 20px rgba(150, 180, 255, 0.5);
}

.theme-dark .suffix-text {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 0 20px rgba(150, 180, 255, 0.5);
}

.theme-light .suffix-text {
  color: rgba(79, 70, 229, 0.9);
  text-shadow: 0 0 10px rgba(99, 102, 241, 0.3);
}

.tagline {
  margin-top: 1rem;
  font-size: clamp(0.6rem, 2.5vw, 0.9rem);
  letter-spacing: clamp(0.15rem, 0.8vw, 0.3rem);
  text-transform: uppercase;
  color: rgba(200, 215, 255, 0.7);
  animation: taglineFade 2s ease-out 1.5s both;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.theme-dark .tagline {
  color: rgba(200, 215, 255, 0.7);
}

.theme-light .tagline {
  color: rgba(99, 102, 241, 0.7);
}

@keyframes brandFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes taglineFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Fade Out Transition */
.fade-out-leave-active {
  transition: opacity 1s ease-out;
}

.fade-out-leave-to {
  opacity: 0;
}

/* Responsive - Mobile First approach */
@media (min-width: 600px) {
  .galaxy-3d {
    width: 85vmin;
    height: 85vmin;
  }
  
  .branding {
    bottom: 8%;
    padding: 0 2rem;
  }
}

@media (min-width: 900px) {
  .galaxy-3d {
    width: 90vmin;
    height: 90vmin;
  }
}

/* Dynamic Island / Notch Support */
@supports (padding-top: env(safe-area-inset-top)) {
  .splash-screen {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  }
}

/* Reduce motion preference */
@media (prefers-reduced-motion: reduce) {
  .galaxy-3d {
    animation: none;
  }
  
  .spiral-star,
  .center-particle,
  .bg-star {
    animation: none;
  }
  
  .panda-text {
    animation: none;
  }
}
</style>

