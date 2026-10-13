<template>
  <section class="section-padding bg-theme-gradient min-h-screen">
    <div class="container-custom">
      <!-- Header -->
      <div class="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
        <h2 class="section-title">{{ aboutUs.title }}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
        <p class="text-2xl text-panda-gold font-semibold mb-4">{{ aboutUs.subtitle }}</p>
        <p class="text-xl text-theme-secondary italic">{{ aboutUs.tagline }}</p>
      </div>

      <!-- Stats Section -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20 animate-fade-in">
        <div 
          v-for="(stat, index) in aboutUs.stats" 
          :key="index"
          class="card p-6 text-center"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">{{ stat.value }}</div>
          <div class="text-theme-muted text-sm">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Content Sections -->
      <div class="max-w-5xl mx-auto space-y-12 mb-20">
        <div 
          v-for="(section, index) in aboutUs.sections" 
          :key="index"
          class="animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="card p-8 md:p-12">
            <h3 class="text-2xl md:text-3xl font-bold text-theme-primary mb-6 flex items-center">
              <span class="w-2 h-8 bg-gradient-to-b from-panda-purple to-panda-gold mr-4 rounded"></span>
              {{ section.heading }}
            </h3>
            <p class="text-lg text-theme-secondary leading-relaxed">
              {{ section.content }}
            </p>
          </div>
        </div>
      </div>

      <!-- Timeline/Milestones -->
      <div class="max-w-6xl mx-auto">
        <h3 class="text-3xl font-bold text-theme-primary text-center mb-12">Our Journey Through Time</h3>
        <div class="relative">
          <!-- Timeline Line -->
          <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-panda-purple to-panda-gold opacity-30"></div>
          
          <!-- Milestones -->
          <div class="space-y-8">
            <div 
              v-for="(milestone, index) in aboutUs.milestones" 
              :key="index"
              class="relative animate-slide-up"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <div class="md:grid md:grid-cols-2 md:gap-8 items-center">
                <!-- Year (Left on desktop) -->
                <div 
                  class="md:text-right mb-4 md:mb-0"
                  :class="index % 2 === 0 ? 'md:order-1' : 'md:order-2'"
                >
                  <div class="inline-block md:block">
                    <span class="text-5xl font-bold gradient-text">{{ milestone.year }}</span>
                  </div>
                </div>

                <!-- Content Card (Right on desktop) -->
                <div 
                  :class="index % 2 === 0 ? 'md:order-2' : 'md:order-1'"
                >
                  <div class="card p-6 md:p-8 relative">
                    <!-- Timeline Dot -->
                    <div class="hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-panda-gold rounded-full"
                         :class="index % 2 === 0 ? '-left-[33px]' : '-right-[33px]'">
                      <div class="absolute inset-0 bg-panda-gold rounded-full animate-ping opacity-75"></div>
                    </div>
                    
                    <h4 class="text-xl font-bold text-theme-primary mb-2">{{ milestone.title }}</h4>
                    <p class="text-theme-muted">{{ milestone.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Company Info Footer -->
      <div class="mt-20 text-center max-w-3xl mx-auto">
        <div class="card p-8 bg-gradient-to-r from-panda-purple/10 to-panda-gold/10 border-2 border-panda-purple/30">
          <div class="flex items-center justify-center space-x-2 mb-4">
            <svg class="w-6 h-6 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            <h3 class="text-2xl font-bold text-theme-primary">{{ companyInfo.location }}</h3>
          </div>
          <p class="text-theme-secondary mb-6">{{ companyInfo.address }}</p>
          <router-link to="/" class="btn-primary inline-flex items-center space-x-2">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
            </svg>
            <span>Back to Home</span>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useSiteStore } from '@/stores/site';
import { aboutUs as fallbackAboutUs, companyInfo as fallbackCompanyInfo } from '@/config/siteConfig';

const siteStore = useSiteStore();

onMounted(() => {
  siteStore.fetchCompany();
});

const aboutUs = computed(() => siteStore.aboutUs || fallbackAboutUs);
const companyInfo = computed(() => siteStore.company || fallbackCompanyInfo);
</script>

