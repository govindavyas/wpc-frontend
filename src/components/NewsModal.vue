<template>
  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isOpen && newsItem" 
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="closeModal"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm"></div>

        <!-- Modal Content -->
        <div class="relative min-h-screen flex items-center justify-center p-4">
          <div 
            class="relative bg-theme-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-slide-up"
            @click.stop
          >
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-panda-purple rounded-full flex items-center justify-center transition-colors group"
              aria-label="Close"
            >
              <svg class="w-6 h-6 text-white group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            <!-- News Content -->
            <div>
              <!-- Hero Image -->
              <div class="relative h-80 overflow-hidden rounded-t-2xl">
                <LazyImage 
                  :src="newsItem.imageUrl" 
                  :thumbnail-src="newsItem.thumbnailUrl"
                  :alt="newsItem.title"
                  aspect-ratio="16/9"
                  bg-color="#1a1a2e"
                  class="w-full h-full"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-theme-card via-theme-card/50 to-transparent pointer-events-none"></div>
                
                <!-- Category Badge -->
                <div class="absolute top-6 left-6">
                  <span class="px-4 py-2 bg-panda-purple/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                    {{ newsItem.category }}
                  </span>
                </div>
              </div>

              <!-- Article Content -->
              <div class="p-8">
                <!-- Meta Information -->
                <div class="flex flex-wrap items-center gap-4 text-sm text-theme-muted mb-6">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                    {{ formatDate(newsItem.date) }}
                  </div>
                  <span>•</span>
                  <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                    </svg>
                    {{ newsItem.author }}
                  </div>
                </div>

                <!-- Title -->
                <h2 class="text-3xl md:text-4xl font-bold text-theme-primary mb-6">
                  {{ newsItem.title }}
                </h2>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-8">
                  <span 
                    v-for="tag in newsItem.tags" 
                    :key="tag"
                    class="px-3 py-1 bg-theme-input border border-panda-purple/30 text-theme-secondary text-sm rounded-full"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <!-- Full Text Content -->
                <div class="prose prose-invert max-w-none mb-8">
                  <p class="text-lg text-theme-secondary leading-relaxed whitespace-pre-line">
                    {{ newsItem.fullText || newsItem.content || newsItem.summary }}
                  </p>
                </div>

                <!-- External Link (if available) -->
                <div v-if="newsItem.externalLink" class="mt-8 p-6 bg-theme-input/50 border border-panda-purple/30 rounded-xl">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="text-lg font-semibold text-theme-primary mb-2">Read More</h4>
                      <p class="text-theme-muted text-sm">Continue reading on the original source</p>
                    </div>
                    <a 
                      :href="newsItem.externalLink" 
                      target="_blank"
                      rel="noopener noreferrer"
                      class="btn-primary flex items-center space-x-2"
                    >
                      <span>Visit Source</span>
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <!-- Share Section -->
                <div class="mt-8 pt-6 border-t border-theme">
                  <h4 class="text-lg font-semibold text-theme-primary mb-4">Share this news</h4>
                  <div class="flex space-x-4">
                    <button 
                      @click="shareOnTwitter"
                      class="w-10 h-10 bg-theme-input hover:bg-blue-500 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg class="w-5 h-5 text-theme-muted" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </button>
                    
                    <button 
                      @click="shareOnFacebook"
                      class="w-10 h-10 bg-theme-input hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg class="w-5 h-5 text-theme-muted" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </button>
                    
                    <button 
                      @click="shareOnLinkedIn"
                      class="w-10 h-10 bg-theme-input hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg class="w-5 h-5 text-theme-muted" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watch } from 'vue';
import LazyImage from '@/components/LazyImage.vue';

const props = defineProps({
  isOpen: Boolean,
  newsItem: Object
});

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Social sharing functions
const shareOnTwitter = () => {
  if (!props.newsItem) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(props.newsItem.title);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
};

const shareOnFacebook = () => {
  if (!props.newsItem) return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

const shareOnLinkedIn = () => {
  if (!props.newsItem) return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

// Prevent body scroll when modal is open
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(10, 14, 39, 0.5);
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(99, 102, 241, 0.5);
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(99, 102, 241, 0.7);
}
</style>

