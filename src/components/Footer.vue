<template>
  <footer class="bg-theme-secondary border-t border-theme py-8 sm:py-12" role="contentinfo">
    <div class="container-custom px-4 sm:px-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <!-- Company Info -->
        <div class="text-center sm:text-left">
          <h2 class="text-xl sm:text-2xl font-bold gradient-text mb-3 sm:mb-4">{{ companyInfo.name }}</h2>
          <p class="text-theme-muted text-sm mb-3 sm:mb-4">{{ companyInfo.tagline }}</p>
          <p class="text-theme-dimmed text-xs">
            Founded {{ companyInfo.foundedYear }} • {{ companyInfo.location }}
          </p>
        </div>

        <!-- Navigation Sections -->
        <div class="flex flex-row sm:flex-row gap-6 sm:gap-8">
          <!-- Quick Links - Scroll Sections -->
          <nav aria-label="Page sections" class="text-center sm:text-left flex-1">
            <h3 class="text-base sm:text-lg font-semibold text-theme-primary mb-3 sm:mb-4">Navigate</h3>
            <ul class="space-y-1.5 sm:space-y-2" role="list">
              <li v-for="item in scrollNavigation" :key="item.target">
                <a 
                  :href="`/#${item.target}`"
                  @click.prevent="scrollToSection(item.target)"
                  class="text-theme-muted hover:text-panda-gold transition-colors text-sm cursor-pointer focus-ring rounded inline-block"
                >
                  {{ item.label }}
                </a>
              </li>
            </ul>
          </nav>

          <!-- Pages Links - Route Pages -->
          <nav aria-label="Site pages" class="text-center sm:text-left flex-1">
            <h3 class="text-base sm:text-lg font-semibold text-theme-primary mb-3 sm:mb-4">Explore</h3>
            <ul class="space-y-1.5 sm:space-y-2" role="list">
              <li v-for="item in pageNavigation" :key="item.route">
                <router-link 
                  :to="item.route"
                  class="text-theme-muted hover:text-panda-gold transition-colors text-sm focus-ring rounded inline-block"
                >
                  {{ item.label }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Social Media -->
        <div class="text-center sm:text-left">
          <h3 class="text-base sm:text-lg font-semibold text-theme-primary mb-3 sm:mb-4">Follow Us</h3>
          <div class="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4" role="list" aria-label="Social media links">
            <a 
              v-if="socialLinks.instagram"
              :href="socialLinks.instagram" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-theme-card hover:bg-panda-purple rounded-lg flex items-center justify-center transition-colors group border border-theme"
              aria-label="Instagram"
            >
              <svg class="w-5 h-5 text-theme-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              v-if="socialLinks.facebook"
              :href="socialLinks.facebook" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-theme-card hover:bg-panda-purple rounded-lg flex items-center justify-center transition-colors group border border-theme"
              aria-label="Facebook"
            >
              <svg class="w-5 h-5 text-theme-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a 
              v-if="socialLinks.youtube"
              :href="socialLinks.youtube" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-theme-card hover:bg-panda-purple rounded-lg flex items-center justify-center transition-colors group border border-theme"
              aria-label="YouTube"
            >
              <svg class="w-5 h-5 text-theme-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            <a 
              v-if="socialLinks.twitter"
              :href="socialLinks.twitter" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-theme-card hover:bg-panda-purple rounded-lg flex items-center justify-center transition-colors group border border-theme"
              aria-label="Twitter"
            >
              <svg class="w-5 h-5 text-theme-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>

            <a 
              v-if="socialLinks.linkedin"
              :href="socialLinks.linkedin" 
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-theme-card hover:bg-panda-purple rounded-lg flex items-center justify-center transition-colors group border border-theme"
              aria-label="LinkedIn"
            >
              <svg class="w-5 h-5 text-theme-muted group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          <!-- Contact Info -->
          <div class="mt-5 sm:mt-6 space-y-2 text-sm text-theme-muted">
            <p v-if="companyInfo.email">
              <a :href="`mailto:${companyInfo.email}`" class="hover:text-panda-gold transition-colors break-all">
                {{ companyInfo.email }}
              </a>
            </p>
            <p v-if="companyInfo.phone">
              <a :href="`tel:${companyInfo.phone}`" class="hover:text-panda-gold transition-colors">
                {{ companyInfo.phone }}
              </a>
            </p>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-theme pt-6 sm:pt-8 text-center">
        <p class="text-theme-dimmed text-xs sm:text-sm">
          &copy; {{ currentYear }} {{ companyInfo.name }}. All rights reserved.
        </p>
        <p class="text-theme-dimmed text-xs mt-2 flex items-center justify-center flex-wrap gap-x-2">
          <a href="/privacy" class="hover:text-panda-gold transition-colors">Privacy Policy</a>
          <span class="hidden sm:inline">•</span>
          <a href="/terms" class="hover:text-panda-gold transition-colors">Terms of Service</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSiteStore } from '@/stores/site';
import { 
  companyInfo as fallbackCompanyInfo, 
  socialLinks as fallbackSocialLinks 
} from '@/config/siteConfig';

const router = useRouter();
const route = useRoute();
const siteStore = useSiteStore();

// Compute current year once
const currentYear = new Date().getFullYear();

onMounted(() => {
  siteStore.fetchCompany();
});

const companyInfo = computed(() => siteStore.company || fallbackCompanyInfo);
const socialLinks = computed(() => siteStore.socialLinks || fallbackSocialLinks);

// Navigation items for scroll sections (on home page)
const scrollNavigation = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  { label: "Films", target: "films" },
  { label: "News", target: "news" },
  { label: "Contact", target: "contact" }
];

// Navigation items for separate pages (routes)
const pageNavigation = [
  { label: "The Company", route: "/the-company" },
  { label: "Our Team", route: "/team" },
  { label: "Licensing", route: "/licensing" },
  { label: "Partners", route: "/partners" },
  { label: "All News", route: "/all-news" }
];

// Scroll to section handler
const scrollToSection = (target) => {
  if (route.path !== '/') {
    // Navigate to home first, then scroll
    router.push('/').then(() => {
      setTimeout(() => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    });
  } else {
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

