<template>
  <div 
    class="lazy-image-container" 
    :class="{ loaded: originalLoaded }"
    role="img"
    :aria-label="alt"
  >
    <!-- Thumbnail image (shows first while original loads in background) -->
    <img
      v-if="thumbnailSrc && !originalLoaded"
      :src="isInView ? thumbnailSrc : ''"
      :alt="''"
      aria-hidden="true"
      class="thumbnail-image"
      :class="{ visible: thumbnailLoaded }"
      @load="onThumbnailLoad"
      loading="lazy"
      decoding="async"
    />
    
    <!-- Shimmer placeholder (shows before thumbnail loads) -->
    <div 
      v-if="!thumbnailLoaded && !originalLoaded" 
      class="thumbnail-placeholder"
      :style="placeholderStyle"
      aria-hidden="true"
    >
      <div class="loading-shimmer"></div>
    </div>
    
    <!-- Full resolution original image (loads in background, replaces thumbnail when ready) -->
    <img
      ref="imageRef"
      :src="isInView ? src : ''"
      :alt="alt"
      class="full-image"
      :class="{ visible: originalLoaded }"
      @load="onOriginalLoad"
      @error="onImageError"
      loading="lazy"
      decoding="async"
      fetchpriority="auto"
    />
    
    <!-- Error state -->
    <div v-if="hasError" class="image-error" role="alert">
      <span class="error-icon" aria-hidden="true">⚠️</span>
      <span class="error-text">Image unavailable</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  thumbnailSrc: {
    type: String,
    default: ''
  },
  aspectRatio: {
    type: String,
    default: '16/9' // Common aspect ratio, can be '1/1', '4/3', '3/2', etc.
  },
  bgColor: {
    type: String,
    default: '#1a1a2e'
  }
});

const emit = defineEmits(['load', 'error']);

const imageRef = ref(null);
const thumbnailLoaded = ref(false);
const originalLoaded = ref(false);
const isInView = ref(false);
const hasError = ref(false);

// Placeholder style with aspect ratio
const placeholderStyle = computed(() => ({
  aspectRatio: props.aspectRatio,
  backgroundColor: props.bgColor
}));

// Intersection Observer for lazy loading
let observer = null;

const onThumbnailLoad = () => {
  thumbnailLoaded.value = true;
};

const onOriginalLoad = () => {
  originalLoaded.value = true;
  hasError.value = false;
  emit('load');
};

const onImageError = () => {
  // Only show error if thumbnail also failed or doesn't exist
  if (!thumbnailLoaded.value && !props.thumbnailSrc) {
    hasError.value = true;
  }
  emit('error');
};

onMounted(() => {
  // Use Intersection Observer to detect when image enters viewport
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true;
          // Once in view, stop observing
          if (observer && imageRef.value) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    {
      rootMargin: '800px', // Load images well before they enter viewport to prevent GSAP flicker
      threshold: 0.01
    }
  );

  if (imageRef.value) {
    observer.observe(imageRef.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: v-bind('props.bgColor');
}

.thumbnail-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.thumbnail-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  filter: blur(5px);
  transform: scale(1.05);
  transition: opacity 0.3s ease;
}

.thumbnail-image.visible {
  opacity: 1;
}

.loading-shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.full-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.full-image.visible {
  opacity: 1;
}

/* Hide thumbnail when original is loaded */
.lazy-image-container.loaded .thumbnail-image,
.lazy-image-container.loaded .thumbnail-placeholder {
  opacity: 0;
  pointer-events: none;
}

.image-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(20, 20, 40, 0.9);
  color: rgba(255, 255, 255, 0.6);
  gap: 0.5rem;
}

.error-icon {
  font-size: 2rem;
}

.error-text {
  font-size: 0.85rem;
}
</style>
