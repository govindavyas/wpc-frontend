<template>
  <section id="about" ref="sectionRef" class="section-padding bg-theme-gradient">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 about-reveal">
        <h2 class="section-title">About {{ companyInfo.name }}</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
      </div>

      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Company Description -->
        <div class="space-y-6 about-reveal">
          <div class="prose prose-invert max-w-none">
            <p class="text-lg text-theme-secondary leading-relaxed whitespace-pre-line">
              {{ companyInfo.description }}
            </p>
          </div>
        </div>

        <!-- Company Stats/Info Cards -->
        <div class="grid grid-cols-2 gap-6">
          <div class="card p-6 text-center stat-card">
            <div class="text-4xl font-bold gradient-text mb-2">{{ companyInfo.foundedYear }}</div>
            <div class="text-theme-muted">Founded</div>
          </div>
          
          <div class="card p-6 text-center stat-card">
            <div class="text-4xl font-bold gradient-text mb-2">{{ movies.length }}</div>
            <div class="text-theme-muted">Productions</div>
          </div>
          
          <div class="card p-6 text-center col-span-2 stat-card">
            <div class="flex items-center justify-center space-x-2 mb-2">
              <svg class="w-6 h-6 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              <div class="text-lg font-semibold text-theme-primary">{{ companyInfo.location }}</div>
            </div>
            <div class="text-theme-muted text-sm">Based in</div>
          </div>
        </div>
      </div>

      <!-- Vision Statement -->
      <div class="mt-16 text-center max-w-3xl mx-auto">
        <div class="card p-8 border border-panda-purple/30 animate-fade-in" style="animation-delay: 0.4s;">
          <p class="text-xl text-theme-secondary italic">
            "{{ companyInfo.tagline }}"
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteStore } from '@/stores/site';

gsap.registerPlugin(ScrollTrigger);
import { companyInfo as fallbackCompanyInfo } from '@/config/siteConfig';

const siteStore = useSiteStore();
const sectionRef = ref(null);

let ctx;

onMounted(() => {
  siteStore.fetchCompany();
  siteStore.fetchMovies();

  // Allow CSS Grid and varying text lengths to settle securely in the DOM
  setTimeout(() => {
    // GSAP Scroll Animations (Scoped)
    ctx = gsap.context(() => {
    gsap.from('.about-reveal', {
      scrollTrigger: {
        trigger: '#about',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    gsap.from('.stat-card', {
      scrollTrigger: {
        trigger: '#about .grid-cols-2',
        start: 'top 85%',
      },
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(1.7)'
    });
    
    // Force recalculation after setup
    ScrollTrigger.refresh();
  });
}, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

const companyInfo = computed(() => siteStore.company || fallbackCompanyInfo);
const movies = computed(() => siteStore.movies);
</script>

