<template>
  <section id="licensing" class="section-padding bg-theme-gradient">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
        <h2 class="section-title">{{ licensing.title }}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
      </div>

      <!-- Description -->
      <div class="max-w-4xl mx-auto mb-16 animate-slide-up">
        <p class="text-lg text-theme-secondary leading-relaxed whitespace-pre-line text-center">
          {{ licensing.description }}
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div 
          v-for="(feature, index) in licensing.features" 
          :key="index"
          class="card p-6 text-center animate-slide-up group hover:border-panda-purple border-2 border-transparent transition-all"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="w-16 h-16 mx-auto mb-4 bg-panda-purple/20 rounded-full flex items-center justify-center group-hover:bg-panda-purple/30 transition-colors">
            <svg v-if="feature.icon === 'globe'" class="w-8 h-8 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/>
            </svg>
            <svg v-else-if="feature.icon === 'streaming'" class="w-8 h-8 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
            </svg>
            <svg v-else-if="feature.icon === 'broadcast'" class="w-8 h-8 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/>
            </svg>
            <svg v-else class="w-8 h-8 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-theme-primary mb-2">{{ feature.title }}</h3>
          <p class="text-theme-muted text-sm">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Documents & Contact Section -->
      <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <!-- Documents -->
        <div class="animate-slide-up" style="animation-delay: 0.2s;">
          <h3 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
            </svg>
            Resources & Documents
          </h3>
          <div class="space-y-4">
            <a
              v-for="(doc, index) in licensing.documents"
              :key="index"
              :href="doc.url"
              target="_blank"
              class="card p-6 flex items-start space-x-4 group hover:border-panda-gold border-2 border-transparent transition-all"
            >
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-panda-purple/20 rounded-lg flex items-center justify-center group-hover:bg-panda-purple/40 transition-colors">
                  <svg class="w-6 h-6 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h4 class="text-lg font-semibold text-theme-primary mb-1 group-hover:text-panda-gold transition-colors">
                  {{ doc.label }}
                </h4>
                <p class="text-theme-muted text-sm">{{ doc.description }}</p>
              </div>
              <svg class="w-5 h-5 text-theme-dimmed group-hover:text-panda-gold transition-colors" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="animate-slide-up" style="animation-delay: 0.3s;">
          <h3 class="text-2xl font-bold text-theme-primary mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
            </svg>
            Contact Licensing Team
          </h3>

          <div class="card p-8 space-y-6">
            <div>
              <p class="text-theme-muted text-sm mb-2">For licensing inquiries, please reach out to our dedicated team:</p>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-panda-purple/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-panda-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-theme-muted mb-1">Email</h4>
                <a :href="`mailto:${licensing.contactEmail}`" class="text-lg text-panda-gold hover:text-panda-gold-light transition-colors">
                  {{ licensing.contactEmail }}
                </a>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-panda-purple/20 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-panda-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h4 class="text-sm font-semibold text-theme-muted mb-1">Phone</h4>
                <a :href="`tel:${licensing.contactPhone}`" class="text-lg text-panda-gold hover:text-panda-gold-light transition-colors">
                  {{ licensing.contactPhone }}
                </a>
              </div>
            </div>

            <div class="pt-4 border-t border-theme">
              <p class="text-theme-muted text-sm">
                Our licensing team typically responds within 24-48 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useSiteStore } from '@/stores/site';
import { licensing as fallbackLicensing } from '@/config/siteConfig';

const siteStore = useSiteStore();

onMounted(() => {
  siteStore.fetchLicensing();
});

const licensing = computed(() => siteStore.licensing || fallbackLicensing);
</script>

