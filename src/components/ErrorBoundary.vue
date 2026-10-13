<template>
  <div v-if="showError" class="min-h-screen bg-theme-gradient flex items-center justify-center px-6">
    <div class="text-center max-w-xl">
      <div class="relative mb-8">
        <svg class="w-24 h-24 mx-auto text-red-400 motion-safe:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
        Something went wrong
      </h1>
      
      <p class="text-lg text-theme-muted mb-6">
        We encountered an unexpected error. Our team has been notified and is working to fix this.
      </p>
      
      <div v-if="showDetails && displayErrorMessage" class="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-left">
        <p class="text-red-400 text-sm font-mono">{{ displayErrorMessage }}</p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          @click="retry"
          class="btn-primary btn-interactive flex items-center justify-center gap-2 focus-ring"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          <span>Try Again</span>
        </button>
        
        <router-link 
          to="/" 
          class="btn-secondary flex items-center justify-center gap-2 focus-ring"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>Go Home</span>
        </router-link>
      </div>
    </div>
  </div>
  
  <slot v-else></slot>
</template>

<script setup>
import { ref, computed, onErrorCaptured } from 'vue';

const props = defineProps({
  showDetails: {
    type: Boolean,
    default: false // Only show in development
  },
  // External error message (for when used from App.vue)
  errorMessage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['retry']);

// Internal error state (for when used as wrapper)
const internalError = ref(false);
const internalErrorMessage = ref('');

// Show error if either internal or external error exists
const showError = computed(() => internalError.value || props.errorMessage);
const displayErrorMessage = computed(() => props.errorMessage || internalErrorMessage.value);

const retry = () => {
  internalError.value = false;
  internalErrorMessage.value = '';
  emit('retry');
  // Reload the page
  window.location.reload();
};

onErrorCaptured((error, instance, info) => {
  console.error('ErrorBoundary caught:', error, info);
  internalError.value = true;
  internalErrorMessage.value = error.message || 'An unexpected error occurred';
  
  // Report error to analytics/monitoring service
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error.message,
      fatal: true
    });
  }
  
  return false; // Stop propagation
});
</script>
