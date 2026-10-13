<template>
  <!-- Skip to main content for accessibility -->
  <a 
    href="#main-content" 
    class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-panda-purple focus:text-white focus:rounded-lg focus:outline-none"
  >
    Skip to main content
  </a>
  
  <nav 
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="navClasses"
    role="navigation"
    aria-label="Main navigation"
  >
    <div class="container-custom">
      <div class="flex items-center justify-between py-4 px-6">
        <!-- Logo -->
        <router-link 
          to="/" 
          class="flex items-center space-x-3 group focus-ring rounded-lg"
          aria-label="Go to homepage"
        >
          <img 
            v-if="companyInfo.logoUrl" 
            :src="companyInfo.logoUrl" 
            alt="WHITE PANDA CREATIONS Logo"
            aria-hidden="true"
            class="h-12 w-12 object-contain transition-transform group-hover:scale-110"
            loading="eager"
            width="48"
            height="48"
          />
          <span class="text-2xl font-bold gradient-text" style="font-family: 'Times New Roman'">{{ companyInfo.name }}</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <!-- Main Nav Items -->
          <template v-for="item in mainNavigation" :key="item.label">
            <router-link
              v-if="item.type === 'route'"
              :to="item.route"
              class="text-theme-secondary hover:text-panda-gold transition-colors duration-300 font-medium"
            >
              {{ item.label }}
            </router-link>
            <a
              v-else
              :href="`#${item.target}`"
              class="text-theme-secondary hover:text-panda-gold transition-colors duration-300 font-medium"
              @click.prevent="scrollToSection(item.target)"
            >
              {{ item.label }}
            </a>
          </template>

          <!-- More Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="text-theme-secondary hover:text-panda-gold transition-colors duration-300 font-medium flex items-center space-x-1"
            >
              <span>More</span>
              <svg 
                class="w-4 h-4 transition-transform duration-200"
                :class="dropdownOpen ? 'rotate-180' : ''"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <div
                v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-56 rounded-lg shadow-xl bg-theme-card border border-theme overflow-hidden"
              >
                <router-link
                  v-for="item in dropdownNavigation"
                  :key="item.route"
                  :to="item.route"
                  @click="dropdownOpen = false"
                  class="flex items-center space-x-3 px-4 py-3 text-theme-secondary hover:text-panda-gold hover:bg-panda-purple/10 transition-all group"
                >
                  <svg class="w-5 h-5 text-panda-gold group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="item.icon === 'building'" fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
                    <path v-else-if="item.icon === 'users'" d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    <path v-else-if="item.icon === 'document'" fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                    <path v-else-if="item.icon === 'handshake'" d="M3.707 7.707a1 1 0 00-1.414 1.414l6 6a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414L10 12.586 5.707 8.293a1 1 0 00-1.414 0z"/>
                    <path v-else-if="item.icon === 'newspaper'" fill-rule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clip-rule="evenodd"/>
                    <path v-else-if="item.icon === 'briefcase'" fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
                    <path v-else-if="item.icon === 'collection'" fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clip-rule="evenodd"/>
                    <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
                  </svg>
                  <span class="font-medium">{{ item.label }}</span>
                </router-link>
              </div>
            </transition>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="md:hidden text-theme-primary p-2 hover:text-panda-gold transition-colors focus-ring rounded-lg"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="mobileMenuOpen"
          id="mobile-menu"
          class="md:hidden bg-theme-card border-t border-theme"
          role="menu"
        >
        <div class="flex flex-col space-y-2 py-6 px-6">
          <!-- Main Nav Items -->
          <template v-for="item in mainNavigation" :key="item.label">
            <router-link
              v-if="item.type === 'route'"
              :to="item.route"
              @click="mobileMenuOpen = false"
              class="text-theme-secondary hover:text-panda-gold transition-colors duration-300 font-medium text-lg py-2"
            >
              {{ item.label }}
            </router-link>
            <a
              v-else
              :href="`#${item.target}`"
              @click.prevent="mobileMenuOpen = false; scrollToSection(item.target)"
              class="text-theme-secondary hover:text-panda-gold transition-colors duration-300 font-medium text-lg py-2"
            >
              {{ item.label }}
            </a>
          </template>

          <!-- Separator -->
          <div class="border-t border-theme my-2"></div>
          
          <!-- More Section -->
          <div class="text-theme-dimmed text-sm font-semibold px-2 py-1">MORE</div>
          
          <!-- Dropdown Items -->
          <router-link
            v-for="item in dropdownNavigation"
            :key="item.route"
            :to="item.route"
            @click="mobileMenuOpen = false"
            class="text-theme-secondary hover:text-panda-gold transition-colors duration-300 font-medium text-lg py-2 pl-4 focus-ring rounded-lg"
            role="menuitem"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
      </transition>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSiteStore } from '@/stores/site';
import { 
  companyInfo as fallbackCompanyInfo, 
  mainNavigation as fallbackMainNav, 
  dropdownNavigation as fallbackDropdownNav 
} from '@/config/siteConfig';

const router = useRouter();
const route = useRoute();
const siteStore = useSiteStore();
const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const dropdownOpen = ref(false);
const dropdownRef = ref(null);

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false
  }
}

// Close dropdown when route changes
watch(() => route.path, () => {
  dropdownOpen.value = false
  mobileMenuOpen.value = false
})

onMounted(async () => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('keydown', handleKeyDown);
  document.addEventListener('click', handleClickOutside);
  // Load settings first to ensure section visibility is available
  await siteStore.fetchSettings();
  siteStore.fetchCompany();
  // Force refresh navigation to get latest from backend
  await siteStore.fetchNavigation(true);
});

const companyInfo = computed(() => siteStore.company || fallbackCompanyInfo);

// Filter navigation based on section visibility
const mainNavigation = computed(() => {
  const navItems = siteStore.navigation?.main || fallbackMainNav;
  const filtered = navItems.filter(item => {
    // Map navigation targets to section keys
    const sectionMap = {
      'about': 'about',
      'films': 'films',
      'news': 'news',
      'contact': 'contact'
    };
    
    // If item has a target (scroll type), check section visibility
    if (item.target && sectionMap[item.target]) {
      const sectionKey = sectionMap[item.target];
      if (siteStore.sections && siteStore.sections[sectionKey] === false) {
        return false;
      }
      return true;
    }
    
    // For route type items (like Home), check if home section is visible
    if (item.route === '/' && item.type === 'route') {
      if (siteStore.sections && siteStore.sections.home === false) {
        return false;
      }
      return true;
    }
    
    // Show other items by default
    return true;
  });
  
  return filtered;
});

const dropdownNavigation = computed(() => {
  const navItems = siteStore.navigation?.dropdown || fallbackDropdownNav;
  
  // Filter dropdown items based on individual visibility settings
  const filtered = navItems.filter(item => {
    // Map dropdown routes to section keys
    const routeMap = {
      '/the-company': 'theCompany',
      '/team': 'team',
      '/licensing': 'licensing',
      '/partners': 'partners',
      '/all-news': 'allNews',
      '/careers': 'careers',
      '/feed': 'feed'
    };
    
    // Check if this route has a visibility setting
    if (item.route && routeMap[item.route]) {
      const sectionKey = routeMap[item.route];
      if (siteStore.sections && siteStore.sections[sectionKey] === false) {
        return false;
      }
      return true;
    }
    
    // Show other items by default
    return true;
  });
  
  return filtered;
});

const handleScroll = () => {
  scrolled.value = window.scrollY > 50;
};

// Toggle mobile menu with keyboard support
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

// Close mobile menu on escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (mobileMenuOpen.value) {
      mobileMenuOpen.value = false
    }
    if (dropdownOpen.value) {
      dropdownOpen.value = false
    }
  }
};

// Check if current route is an inner page (not home)
const isInnerPage = computed(() => {
  return route.path !== '/';
});

// Navbar classes based on scroll and route
const navClasses = computed(() => {
  // Always solid on inner pages or when scrolled
  if (isInnerPage.value || scrolled.value) {
    return 'bg-theme-secondary/95 backdrop-blur-md shadow-lg border-b border-theme';
  }
  return 'bg-transparent';
});

const scrollToSection = (target) => {
  if (route.path !== '/') {
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

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

