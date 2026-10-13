import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import TheCompany from '../views/TheCompany.vue';
import Team from '../views/Team.vue';
import Licensing from '../views/Licensing.vue';
import Partners from '../views/Partners.vue';
import AllNews from '../views/AllNews.vue';
import MovieDetails from '../views/MovieDetails.vue';
import CareersPage from '../components/CareersPage.vue';
import Feed from '../views/Feed.vue';
import Maintenance from '../views/Maintenance.vue';
import NotFound from '../views/NotFound.vue';
import { useSiteStore } from '../stores/site';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { 
      title: 'WHITE PANDA CREATIONS - Home',
      description: 'Welcome to WHITE PANDA CREATIONS - Crafting Stories That Transcend Boundaries'
    }
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: Maintenance,
    meta: { 
      allowInMaintenance: true,
      title: 'Site Under Maintenance'
    }
  },
  {
    path: '/the-company',
    name: 'TheCompany',
    component: TheCompany,
    meta: { 
      requiresSection: 'theCompany',
      title: 'About Us - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/team',
    name: 'Team',
    component: Team,
    meta: { 
      requiresSection: 'team',
      title: 'Our Team - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/licensing',
    name: 'Licensing',
    component: Licensing,
    meta: { 
      requiresSection: 'licensing',
      title: 'Licensing - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/partners',
    name: 'Partners',
    component: Partners,
    meta: { 
      requiresSection: 'partners',
      title: 'Our Partners - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/all-news',
    name: 'AllNews',
    component: AllNews,
    meta: { 
      requiresSection: 'allNews',
      title: 'News & Updates - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/movie/:slug',
    name: 'MovieDetails',
    component: MovieDetails,
    meta: {
      title: 'Movie Details - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/careers',
    name: 'Careers',
    component: CareersPage,
    meta: { 
      requiresSection: 'careers',
      title: 'Careers - WHITE PANDA CREATIONS'
    }
  },
  {
    path: '/feed',
    name: 'Feed',
    component: Feed,
    meta: { 
      requiresSection: 'feed',
      title: 'Social Feed - WHITE PANDA CREATIONS'
    }
  },
  // Catch-all 404 route - must be last
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found - WHITE PANDA CREATIONS'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
});

// Navigation guard to check maintenance mode and section visibility
router.beforeEach(async (to, from, next) => {
  const siteStore = useSiteStore();
  
  // Ensure settings are loaded before checking
  if (!siteStore.settings) {
    await siteStore.fetchSettings();
  }
  
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  
  console.log('Router guard - Settings:', siteStore.settings);
  console.log('Router guard - Maintenance mode:', siteStore.settings?.maintenanceMode);
  console.log('Router guard - Target route:', to.name);
  
  // Check if site is in maintenance mode
  if (siteStore.settings?.maintenanceMode) {
    // Allow access to maintenance page itself
    if (to.name === 'Maintenance') {
      next();
      return;
    }
    
    // Redirect all other pages to maintenance
    console.log('Site is in maintenance mode - redirecting to maintenance page');
    next({ name: 'Maintenance' });
    return;
  }
  
  // If trying to access maintenance page when not in maintenance mode, redirect to home
  if (to.name === 'Maintenance' && !siteStore.settings?.maintenanceMode) {
    next({ name: 'Home' });
    return;
  }
  
  // Check if route requires a specific section to be visible
  if (to.meta.requiresSection) {
    const sectionKey = to.meta.requiresSection;
    const isVisible = siteStore.sections[sectionKey];
    
    if (!isVisible) {
      // Redirect to home if section is inactive
      console.log(`Access denied: ${sectionKey} section is inactive`);
      next({ name: 'Home' });
      return;
    }
  }
  
  next();
});

export default router;
