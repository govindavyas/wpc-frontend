<template>
  <div class="min-h-screen bg-theme-gradient flex items-center justify-center px-6">
    <div class="text-center max-w-2xl">
      <!-- Animated 404 -->
      <div class="relative mb-8">
        <h1 class="text-9xl font-bold gradient-text motion-safe:animate-pulse">404</h1>
        <div class="absolute inset-0 bg-gradient-to-r from-panda-purple to-panda-gold blur-3xl opacity-20" aria-hidden="true"></div>
      </div>
      
      <!-- Film reel decoration -->
      <div class="flex justify-center gap-4 mb-8" aria-hidden="true">
        <div class="w-16 h-16 rounded-full border-4 border-panda-purple/50 flex items-center justify-center">
          <div class="w-8 h-8 rounded-full border-4 border-panda-gold/50"></div>
        </div>
        <div class="w-16 h-16 rounded-full border-4 border-panda-gold/50 flex items-center justify-center">
          <div class="w-8 h-8 rounded-full border-4 border-panda-purple/50"></div>
        </div>
      </div>
      
      <h2 class="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
        Scene Not Found
      </h2>
      
      <p class="text-lg text-theme-muted mb-8">
        The page you're looking for seems to have missed its cue. 
        It might have been moved, deleted, or never existed in this production.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link 
          to="/" 
          class="btn-primary btn-interactive flex items-center justify-center gap-2 focus-ring"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>Back to Home</span>
        </router-link>
        
        <button 
          @click="goBack"
          class="btn-secondary flex items-center justify-center gap-2 focus-ring"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Go Back</span>
        </button>
      </div>
      
      <!-- Search suggestion -->
      <div class="mt-12 p-6 card max-w-md mx-auto">
        <p class="text-theme-muted text-sm mb-4">Looking for something specific?</p>
        <div class="flex gap-3 flex-wrap justify-center">
          <router-link to="/#films" class="text-panda-gold hover:text-panda-gold-light text-sm focus-ring rounded px-2 py-1">
            Our Films
          </router-link>
          <router-link to="/#about" class="text-panda-gold hover:text-panda-gold-light text-sm focus-ring rounded px-2 py-1">
            About Us
          </router-link>
          <router-link to="/#contact" class="text-panda-gold hover:text-panda-gold-light text-sm focus-ring rounded px-2 py-1">
            Contact
          </router-link>
          <router-link to="/all-news" class="text-panda-gold hover:text-panda-gold-light text-sm focus-ring rounded px-2 py-1">
            News
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useSeoHead } from '@/composables/useSeoHead';

const router = useRouter();

// Set SEO for 404 page
useSeoHead('404');

const goBack = () => {
  if (window.history.length > 2) {
    router.go(-1);
  } else {
    router.push('/');
  }
};
</script>

