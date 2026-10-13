<template>
  <!-- Loading state while fetching settings - shows nothing but blocks content -->
  <div v-if="!settingsLoaded" class="splash-loading"></div>
  
  <!-- Splash screen once settings are loaded -->
  <component
    v-else-if="showSplash"
    :is="currentVariantComponent"
    :theme="effectiveTheme"
    :duration="splashDuration"
    :company-name="companyName"
    :company-tagline="companyTagline"
    :logo-url="logoUrl"
    @complete="onSplashComplete"
  />
</template>

<script setup>
import { ref, computed, onMounted, markRaw } from 'vue';
import { settingsAPI, companyAPI } from '../services/api';

// Import all splash screen variants
import SplashScreen from './SplashScreen.vue'; // Galaxy
import SplashFilmReel from './SplashFilmReel.vue';
import SplashCinematic from './SplashCinematic.vue';
import SplashMinimal from './SplashMinimal.vue';

// Constants for localStorage
const SPLASH_SHOWN_KEY = 'wpc_splash_shown';
const SPLASH_VERSION_KEY = 'wpc_splash_version';

// Emit event when splash is complete so App.vue can show content
const emit = defineEmits(['ready']);

// Settings loading state - prevents flash of default variant
const settingsLoaded = ref(false);
const showSplash = ref(true);
const splashComplete = ref(false);

// Settings from backend - defaults applied only after fetch fails
const variant = ref('galaxy');
const themeMode = ref('auto');
const splashDuration = ref(3000); // Default 3 seconds
const splashShowOnce = ref(false);
const systemTheme = ref('dark');

// Company branding (dynamic from backend)
const companyName = ref('WHITE PANDA CREATIONS');
const companyTagline = ref('Illuminating Stories');
const logoUrl = ref('');

// Map variant names to components
const variantComponents = {
  'galaxy': markRaw(SplashScreen),
  'film-reel': markRaw(SplashFilmReel),
  'cinematic': markRaw(SplashCinematic),
  'minimal': markRaw(SplashMinimal)
};

// Detect system theme preference
const detectSystemTheme = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    systemTheme.value = 'dark';
  } else {
    systemTheme.value = 'light';
  }
};

// Listen for system theme changes
const watchSystemTheme = () => {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      systemTheme.value = e.matches ? 'dark' : 'light';
    });
  }
};

// Determine effective theme (auto mode uses system theme)
const effectiveTheme = computed(() => {
  if (themeMode.value === 'auto') {
    return systemTheme.value;
  }
  return themeMode.value;
});

// Get current variant component
const currentVariantComponent = computed(() => {
  return variantComponents[variant.value] || variantComponents['galaxy'];
});

// Check if splash has been shown before (for "show once" feature)
const hasSeenSplash = () => {
  try {
    return localStorage.getItem(SPLASH_SHOWN_KEY) === 'true';
  } catch {
    // localStorage might be disabled
    return false;
  }
};

// Mark splash as shown
const markSplashAsShown = () => {
  try {
    localStorage.setItem(SPLASH_SHOWN_KEY, 'true');
    // Store a version key to allow resetting if variant changes
    localStorage.setItem(SPLASH_VERSION_KEY, variant.value);
  } catch {
    // localStorage might be disabled - gracefully ignore
  }
};

// Handle splash completion
const onSplashComplete = () => {
  // Mark as shown for "show once" feature
  if (splashShowOnce.value) {
    markSplashAsShown();
  }
  showSplash.value = false;
  splashComplete.value = true;
  emit('ready');
};

// Load company info for dynamic branding
const loadCompanyInfo = async () => {
  try {
    const response = await companyAPI.getInfo();
    const data = response?.data || response;
    
    if (data) {
      if (data.name) companyName.value = data.name;
      if (data.tagline) companyTagline.value = data.tagline;
      if (data.logo) logoUrl.value = data.logo;
    }
  } catch (error) {
    console.error('Error loading company info:', error);
    // Use default values on error
  }
};

// Load settings from backend - MUST complete before showing splash
const loadSettings = async () => {
  try {
    // Load settings and company info in parallel
    const [settingsResponse] = await Promise.all([
      settingsAPI.get(),
      loadCompanyInfo()
    ]);
    
    // Handle nested data structure: response.data.data or response.data
    const data = settingsResponse?.data?.data || settingsResponse?.data || settingsResponse;
    
    if (data) {
      // Check "show once" setting first
      if (data.splashShowOnce === true) {
        splashShowOnce.value = true;
        // If "show once" is enabled and user has seen splash, skip it
        if (hasSeenSplash()) {
          showSplash.value = false;
          setTimeout(() => emit('ready'), 0);
          settingsLoaded.value = true;
          return;
        }
      }
      
      // Check if splash screen should be shown at all
      if (data.showSplashScreen === false) {
        showSplash.value = false;
        // If splash is disabled, emit ready immediately after settings load
        setTimeout(() => emit('ready'), 0);
      }
      
      // Update with values from backend if they exist
      if (data.splashScreenVariant) {
        variant.value = data.splashScreenVariant;
      }
      if (data.splashScreenTheme) {
        themeMode.value = data.splashScreenTheme;
      }
      // Set splash duration from settings (in milliseconds)
      if (data.splashDuration && typeof data.splashDuration === 'number') {
        splashDuration.value = data.splashDuration;
      }
    }
  } catch (error) {
    console.error('Error loading splash screen settings:', error);
    // On error, use default values (galaxy, auto, 3000ms)
  } finally {
    // Mark settings as loaded - this triggers rendering
    settingsLoaded.value = true;
  }
};

onMounted(() => {
  detectSystemTheme();
  watchSystemTheme();
  loadSettings();
});
</script>

<style scoped>
/* Full-screen loading blocker while settings are fetched - prevents layout shift */
.splash-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  background: #000;
  /* Prevent any content flash */
  isolation: isolate;
}

/* Support for safe areas on modern devices */
@supports (padding-top: env(safe-area-inset-top)) {
  .splash-loading {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
  }
}
</style>
