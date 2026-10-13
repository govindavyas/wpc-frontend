<template>
  <div 
    class="min-h-screen flex items-center justify-center px-4 transition-colors duration-300"
    :class="theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-black'"
  >
    <div class="max-w-2xl w-full text-center">
      <!-- Logo/Icon -->
      <div class="mb-8 flex justify-center">
        <div class="relative">
          <div class="absolute inset-0 bg-panda-gold/20 blur-3xl rounded-full"></div>
          <div class="relative bg-gradient-to-br from-panda-gold to-amber-600 p-8 rounded-full">
            <svg 
              class="w-16 h-16 transition-colors"
              :class="theme === 'light' ? 'text-gray-900' : 'text-gray-900'"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Title -->
      <h1 
        class="text-5xl md:text-6xl font-bold mb-4 tracking-tight transition-colors"
        :class="theme === 'light' ? 'text-gray-900' : 'text-white'"
      >
        Under Maintenance
      </h1>

      <!-- Message -->
      <div class="mb-8">
        <p 
          class="text-xl mb-4 transition-colors"
          :class="theme === 'light' ? 'text-gray-700' : 'text-gray-300'"
        >
          {{ maintenanceMessage || 'We\'re currently performing scheduled maintenance to improve your experience.' }}
        </p>
        <p 
          class="transition-colors"
          :class="theme === 'light' ? 'text-gray-600' : 'text-gray-400'"
        >
          We'll be back online shortly. Thank you for your patience.
        </p>
      </div>

      <!-- Animated Progress -->
      <div class="mb-8">
        <div class="flex justify-center space-x-2">
          <div class="w-3 h-3 bg-panda-gold rounded-full animate-bounce" style="animation-delay: 0ms"></div>
          <div class="w-3 h-3 bg-panda-gold rounded-full animate-bounce" style="animation-delay: 150ms"></div>
          <div class="w-3 h-3 bg-panda-gold rounded-full animate-bounce" style="animation-delay: 300ms"></div>
        </div>
      </div>

      <!-- Contact Info -->
      <div 
        class="text-sm transition-colors"
        :class="theme === 'light' ? 'text-gray-600' : 'text-gray-500'"
      >
        <p>Need immediate assistance?</p>
        <p class="mt-2">
          Contact us at 
          <a :href="`mailto:${contactEmail}`" class="text-panda-gold hover:underline">
            {{ contactEmail }}
          </a>
        </p>
      </div>

      <!-- Footer -->
      <div 
        class="mt-12 pt-8 border-t transition-colors"
        :class="theme === 'light' ? 'border-gray-300' : 'border-gray-700'"
      >
        <p 
          class="text-sm transition-colors"
          :class="theme === 'light' ? 'text-gray-500' : 'text-gray-600'"
        >
          &copy; {{ new Date().getFullYear() }} {{ siteName }}. All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useSiteStore } from '@/stores/site';

const siteStore = useSiteStore();
const maintenanceMessage = ref('');
const siteName = ref('WHITE PANDA CREATIONS');
const contactEmail = ref('info@whitepandacreations.com');

// Get theme from store
const theme = computed(() => siteStore.theme || 'dark');

onMounted(async () => {
  await siteStore.fetchSettings();
  await siteStore.fetchCompany();
  
  // Get maintenance message from settings
  if (siteStore.settings?.maintenanceMessage) {
    maintenanceMessage.value = siteStore.settings.maintenanceMessage;
  }
  
  // Get site name and contact email from company info
  if (siteStore.company) {
    siteName.value = siteStore.company.name || 'WHITE PANDA CREATIONS';
    contactEmail.value = siteStore.company.email || 'info@whitepandacreations.com';
  }
});
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>

