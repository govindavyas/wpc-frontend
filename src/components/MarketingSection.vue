<template>
  <section id="marketing" class="section-padding bg-theme-secondary">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 animate-slide-up">
        <h2 class="section-title">{{ marketing.title }}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
        <p class="text-xl text-panda-gold font-semibold">{{ marketing.tagline }}</p>
      </div>

      <!-- Description -->
      <div class="max-w-4xl mx-auto mb-16 animate-slide-up">
        <p class="text-lg text-theme-secondary leading-relaxed whitespace-pre-line text-center">
          {{ marketing.description }}
        </p>
      </div>

      <!-- Partners Grid -->
      <div v-if="marketing.partners?.length" class="mb-16">
        <h3 class="text-3xl font-bold text-theme-primary mb-8 text-center">Our Trusted Partners</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div 
            v-for="(partner, index) in marketing.partners" 
            :key="index"
            class="card p-6 animate-slide-up hover:border-panda-purple border-2 border-transparent transition-all group"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <!-- Partner Logo -->
            <div class="h-24 flex items-center justify-center mb-4 bg-white/5 rounded-lg p-4">
              <img 
                :src="partner.logo" 
                :alt="partner.name"
                class="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            
            <!-- Partner Info -->
            <div class="text-center">
              <span class="inline-block px-3 py-1 bg-panda-purple/20 text-panda-gold text-xs font-semibold rounded-full mb-3">
                {{ partner.type }}
              </span>
              <h4 class="text-lg font-bold text-theme-primary mb-2">{{ partner.name }}</h4>
              <p class="text-theme-muted text-sm mb-4">{{ partner.description }}</p>
              
              <a 
                v-if="partner.website"
                :href="partner.website" 
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-panda-gold hover:text-panda-gold-light text-sm font-semibold transition-colors"
              >
                Visit Website
                <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"/>
                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Supporter Categories -->
      <div v-if="marketing.supporterCategories?.length" class="mb-16">
        <h3 class="text-3xl font-bold text-theme-primary mb-8 text-center">Partner Categories</h3>
        <div class="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          <div 
            v-for="(category, index) in marketing.supporterCategories" 
            :key="index"
            class="px-6 py-3 bg-theme-secondary border-2 border-panda-purple/30 rounded-lg text-theme-secondary hover:border-panda-purple hover:text-theme-primary transition-all animate-slide-up"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            {{ category }}
          </div>
        </div>
      </div>

      <!-- Promotional Videos -->
      <div v-if="marketing.promoVideos?.length" class="mb-16">
        <h3 class="text-3xl font-bold text-theme-primary mb-8 text-center">Showreels & Videos</h3>
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(video, index) in marketing.promoVideos" 
            :key="video.id"
            class="animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="card overflow-hidden group">
              <!-- Video Embed -->
              <div class="relative aspect-video bg-black">
                <iframe
                  v-if="video.type === 'youtube' || video.type === 'vimeo'"
                  :src="getEmbedUrl(video.url)"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                  loading="lazy"
                  referrerpolicy="strict-origin-when-cross-origin"
                ></iframe>
                <video
                  v-else-if="video.type === 'local'"
                  :src="getApiUrl(video.url)"
                  controls
                  class="w-full h-full"
                  preload="metadata"
                ></video>
              </div>
              
              <!-- Video Info -->
              <div class="p-6">
                <h4 class="text-xl font-bold text-theme-primary mb-2">{{ video.title }}</h4>
                <p class="text-theme-muted text-sm">{{ video.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div v-if="marketing.testimonials?.length" class="mb-16">
        <h3 class="text-3xl font-bold text-theme-primary mb-8 text-center">What Partners Say</h3>
        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div 
            v-for="(testimonial, index) in marketing.testimonials" 
            :key="index"
            class="card p-8 animate-slide-up"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <!-- Quote Icon -->
            <svg class="w-10 h-10 text-panda-purple/30 mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            
            <!-- Quote -->
            <p class="text-theme-secondary text-lg mb-6 italic leading-relaxed">
              "{{ testimonial.quote }}"
            </p>
            
            <!-- Author -->
            <div class="flex items-center space-x-4">
              <img 
                v-if="testimonial.logo"
                :src="testimonial.logo" 
                :alt="testimonial.company"
                class="h-12 w-12 object-contain rounded"
              />
              <div>
                <p class="text-theme-primary font-semibold">{{ testimonial.author }}</p>
                <p class="text-theme-muted text-sm">{{ testimonial.company }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="mt-16 text-center">
        <div class="card p-8 max-w-3xl mx-auto bg-gradient-to-r from-panda-purple/10 to-panda-gold/10 border-2 border-panda-purple/30">
          <h3 class="text-2xl font-bold text-theme-primary mb-4">Interested in Partnering?</h3>
          <p class="text-theme-secondary mb-6">
            We're always looking to collaborate with organizations that share our passion for quality cinema. Let's discuss partnership opportunities.
          </p>
          <a href="#contact" class="btn-primary inline-flex items-center space-x-2">
            <span>Get In Touch</span>
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useSiteStore } from '@/stores/site';
import { marketing as fallbackMarketing } from '@/config/siteConfig';
import { getApiUrl } from '@/utils/imageUrl';

const siteStore = useSiteStore();

onMounted(() => {
  siteStore.fetchMarketing();
});

const marketing = computed(() => siteStore.marketing || fallbackMarketing);

// Convert YouTube/Vimeo URLs to embeddable format with performance optimizations
const getEmbedUrl = (url) => {
  if (!url) return '';
  
  // YouTube URL patterns
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&playsinline=1&enablejsapi=0`;
  }
  
  // Vimeo URL patterns
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1&playsinline=1`;
  }
  
  return url;
};
</script>

