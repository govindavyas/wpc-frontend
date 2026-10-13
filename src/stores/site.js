/**
 * Site Data Store
 * Fetches and caches data from the backend API
 * Falls back to siteConfig.js if API fails
 */
import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { 
  companyAPI, 
  moviesAPI, 
  newsAPI, 
  teamAPI, 
  licensingAPI, 
  marketingAPI,
  navigationAPI,
  settingsAPI,
  seoAPI
} from '@/services/api'
import { getApiUrl } from '@/utils/imageUrl'

// Import static config as fallback
import * as siteConfig from '@/config/siteConfig'

export const useSiteStore = defineStore('site', () => {
  // State
  const company = ref(null)
  const movies = ref([])
  const featuredMovie = ref(null)
  const news = ref([])
  const dashboardNews = ref([])
  const team = ref([])
  const licensing = ref(null)
  const marketing = ref(null)
  const navigation = ref(null)
  const aboutUs = ref(null)
  const socialLinks = ref(null)
  const settings = ref(null)
  const theme = ref('dark') // Default theme
  const seoData = ref({}) // SEO data cache by page slug
  const sections = ref({
    home: true,
    about: true,
    films: true,
    news: true,
    contact: true,
    theCompany: true,
    team: true,
    licensing: true,
    partners: true,
    allNews: true,
    careers: true,
    feed: true
  })
  
  // Loading states
  const loading = ref({
    company: false,
    movies: false,
    news: false,
    team: false,
    licensing: false,
    marketing: false,
    navigation: false,
    settings: false
  })
  
  // Error states
  const errors = ref({})
  
  // Initialization flag
  const initialized = ref(false)

  // Computed
  const isLoading = computed(() => Object.values(loading.value).some(v => v))

  // Fetch company info
  async function fetchCompany(forceRefresh = false) {
    if (company.value && !forceRefresh) return company.value
    
    loading.value.company = true
    try {
      const response = await companyAPI.getInfo()
      const data = response.data.data || response.data  // Backend returns { success, data }
      // Map backend field names to frontend expected names
      company.value = {
        ...data,
        logoUrl: data.logo || data.logoUrl,  // Backend uses 'logo', frontend expects 'logoUrl'
        logoDarkUrl: data.logoDark || data.logoDarkUrl,
        // Map contact.fullAddress to address for display
        address: data.contact?.fullAddress || data.address || 
          (data.contact?.address ? `${data.contact.address.street || ''}, ${data.contact.address.city || ''}, ${data.contact.address.state || ''} ${data.contact.address.pincode || ''}, ${data.contact.address.country || ''}`.replace(/^[, ]+|[, ]+$/g, '') : ''),
        email: data.contact?.email || data.email,
        phone: data.contact?.phone || data.phone
      }
      socialLinks.value = company.value.socialLinks || siteConfig.socialLinks
      // Map aboutUs sections properly
      aboutUs.value = {
        ...siteConfig.aboutUs,
        ...company.value.aboutUs,
        // Ensure sections array uses correct field names
        sections: (company.value.aboutUs?.sections || []).map(s => ({
          heading: s.heading || s.title,
          content: s.content || s.description
        }))
      }
    } catch (error) {
      console.warn('Using fallback company info:', error.message)
      company.value = siteConfig.companyInfo
      socialLinks.value = siteConfig.socialLinks
      aboutUs.value = siteConfig.aboutUs
    } finally {
      loading.value.company = false
    }
    return company.value
  }

  // Fetch movies
  async function fetchMovies() {
    if (movies.value.length > 0) return movies.value
    
    loading.value.movies = true
    try {
      const response = await moviesAPI.getAll()
      // Handle nested data structure from API: { success, data: [...] }
      const data = response.data?.data || response.data || []
      movies.value = Array.isArray(data) ? data.map(item => ({
        ...item,
        id: item._id || item.id, // Ensure id is mapped from MongoDB _id
        posterUrl: getApiUrl(item.posterUrl),
        bannerUrl: getApiUrl(item.bannerUrl),
        thumbnailUrl: getApiUrl(item.thumbnailUrl)
      })) : []
      
      // Find featured movie
      featuredMovie.value = movies.value.find(m => m.highlight || m.featured) || movies.value[0]
      
      // Fallback if no movies from API
      if (movies.value.length === 0) {
        movies.value = siteConfig.movies
        featuredMovie.value = siteConfig.getFeaturedMovie()
      }
    } catch (error) {
      console.warn('Using fallback movies:', error.message)
      movies.value = siteConfig.movies
      featuredMovie.value = siteConfig.getFeaturedMovie()
    } finally {
      loading.value.movies = false
    }
    return movies.value
  }

  // Fetch featured movie
  async function fetchFeaturedMovie() {
    if (featuredMovie.value) return featuredMovie.value
    
    try {
      const response = await moviesAPI.getFeatured()
      // Handle nested data structure
      const data = response.data?.data || response.data
      featuredMovie.value = data ? {
        ...data,
        id: data._id || data.id,
        posterUrl: getApiUrl(data.posterUrl),
        bannerUrl: getApiUrl(data.bannerUrl),
        thumbnailUrl: getApiUrl(data.thumbnailUrl)
      } : null
      
      if (!featuredMovie.value) {
        featuredMovie.value = siteConfig.getFeaturedMovie()
      }
    } catch (error) {
      console.warn('Using fallback featured movie:', error.message)
      featuredMovie.value = siteConfig.getFeaturedMovie()
    }
    return featuredMovie.value
  }

  // Fetch all news
  async function fetchNews(forceRefresh = false) {
    if (news.value.length > 0 && !forceRefresh) return news.value
    
    loading.value.news = true
    try {
      const response = await newsAPI.getAll()
      console.log('News API response:', response)
      // API interceptor already extracts response.data, so response = { success, data: [...] }
      const data = response?.data || []
      news.value = Array.isArray(data) ? data.map(item => ({
        ...item,
        id: item._id || item.id, // Ensure id is mapped from MongoDB _id
        imageUrl: getApiUrl(item.imageUrl || item.image),
        thumbnailUrl: getApiUrl(item.thumbnailUrl)
      })) : []
      console.log('Processed news:', news.value)
    } catch (error) {
      console.error('News API Error:', error.message)
      // Only fallback to static data on actual API error
      news.value = siteConfig.getNewsByDate()
    } finally {
      loading.value.news = false
    }
    return news.value
  }

  // Fetch dashboard news
  async function fetchDashboardNews(forceRefresh = false) {
    if (dashboardNews.value.length > 0 && !forceRefresh) return dashboardNews.value
    
    loading.value.news = true
    try {
      const response = await newsAPI.getDashboard()
      console.log('Dashboard News API response:', response)
      // API interceptor already extracts response.data, so response = { success, data: [...] }
      const data = response?.data || []
      dashboardNews.value = Array.isArray(data) ? data.map(item => ({
        ...item,
        id: item._id || item.id, // Ensure id is mapped from MongoDB _id
        imageUrl: getApiUrl(item.imageUrl || item.image),
        thumbnailUrl: getApiUrl(item.thumbnailUrl)
      })) : []
      console.log('Processed dashboard news:', dashboardNews.value)
    } catch (error) {
      console.error('Dashboard News API Error:', error.message)
      // Only fallback to static data on actual API error
      dashboardNews.value = siteConfig.getDashboardNews()
    } finally {
      loading.value.news = false
    }
    return dashboardNews.value
  }

  // Fetch team members
  async function fetchTeam() {
    if (team.value.length > 0) return team.value
    
    loading.value.team = true
    try {
      const response = await teamAPI.getAll()
      // Handle nested data structure from API: { success, data: [...] }
      const data = response.data?.data || response.data || []
      team.value = Array.isArray(data) ? data.map(item => ({
        ...item,
        id: item._id || item.id,
        photoUrl: getApiUrl(item.photoUrl),
        thumbnailUrl: getApiUrl(item.thumbnailUrl),
        // Use custom role if role is 'Other'
        displayRole: item.role === 'Other' && item.customRole ? item.customRole : item.role
      })) : []
      
      // Set to empty array if no data from API
      if (team.value.length === 0) {
        team.value = []
      }
    } catch (error) {
      console.warn('Failed to load team data:', error.message)
      team.value = []
    } finally {
      loading.value.team = false
    }
    return team.value
  }

  // Fetch licensing info
  async function fetchLicensing() {
    if (licensing.value) return licensing.value
    
    loading.value.licensing = true
    try {
      const response = await licensingAPI.get()
      // Handle nested data structure
      const data = response.data?.data || response.data
      licensing.value = data || siteConfig.licensing
    } catch (error) {
      console.warn('Using fallback licensing:', error.message)
      licensing.value = siteConfig.licensing
    } finally {
      loading.value.licensing = false
    }
    return licensing.value
  }

  // Fetch marketing info
  async function fetchMarketing() {
    if (marketing.value) return marketing.value
    
    loading.value.marketing = true
    try {
      const response = await marketingAPI.get()
      // Handle nested data structure
      const data = response.data?.data || response.data
      marketing.value = data || siteConfig.marketing
    } catch (error) {
      console.warn('Using fallback marketing:', error.message)
      marketing.value = siteConfig.marketing
    } finally {
      loading.value.marketing = false
    }
    return marketing.value
  }

  // Fetch navigation
  async function fetchNavigation(forceRefresh = false) {
    if (navigation.value && !forceRefresh) return navigation.value
    
    loading.value.navigation = true
    try {
      const response = await navigationAPI.get()
      // Handle nested data structure
      const data = response.data?.data || response.data
      // Map the correct structure from API
      navigation.value = {
        main: data?.mainNavigation || siteConfig.mainNavigation,
        dropdown: data?.dropdownNavigation || siteConfig.dropdownNavigation
      }
      console.log('Navigation loaded:', navigation.value)
    } catch (error) {
      console.warn('Using fallback navigation:', error.message)
      navigation.value = {
        main: siteConfig.mainNavigation,
        dropdown: siteConfig.dropdownNavigation
      }
    } finally {
      loading.value.navigation = false
    }
    return navigation.value
  }

  // Fetch settings (including theme)
  async function fetchSettings(forceRefresh = false) {
    if (settings.value && !forceRefresh) return settings.value
    
    loading.value.settings = true
    try {
      const response = await settingsAPI.get()
      // Extract the actual settings data (handle nested data structure)
      const data = response.data?.data || response.data || response
      settings.value = data
      
      console.log('Loaded settings:', data)
      console.log('Maintenance mode:', data?.maintenanceMode)
      console.log('Sections from API:', data?.sections)
      
      // Apply theme
      if (data?.theme) {
        theme.value = data.theme
        applyTheme(data.theme)
      }
      
      // Load section visibility settings - ensure reactive update
      if (data?.sections) {
        Object.keys(data.sections).forEach(key => {
          sections.value[key] = data.sections[key]
        })
        console.log('Updated sections:', sections.value)
      }
    } catch (error) {
      console.warn('Using default settings:', error.message)
      settings.value = { theme: 'dark' }
    } finally {
      loading.value.settings = false
    }
    return settings.value
  }

  // Fetch SEO data by page slug
  async function fetchSeoBySlug(slug, forceRefresh = false) {
    // Return cached data if available
    if (seoData.value[slug] && !forceRefresh) {
      return seoData.value[slug]
    }
    
    try {
      const response = await seoAPI.getBySlug(slug)
      const data = response.data || response
      seoData.value[slug] = data
      return data
    } catch (error) {
      console.warn(`SEO data not found for ${slug}:`, error.message)
      // Return default SEO data
      return {
        metaTitle: 'WHITE PANDA CREATIONS - Illuminating Stories',
        metaDescription: 'WHITE PANDA CREATIONS is a premiere film production company dedicated to creating compelling cinematic experiences.',
        canonicalUrl: `https://whitepandacreations.com/${slug === 'home' ? '' : slug}`
      }
    }
  }

  // Get cached SEO data
  function getSeoData(slug) {
    return seoData.value[slug] || null
  }

  // Apply theme to document
  function applyTheme(themeName) {
    const root = document.documentElement
    if (themeName === 'light') {
      root.classList.add('light-theme')
      root.classList.remove('dark-theme')
    } else {
      root.classList.remove('light-theme')
      root.classList.add('dark-theme')
    }
    theme.value = themeName
  }

  // Initialize all data
  async function initializeStore() {
    if (initialized.value) return
    
    await Promise.all([
      fetchSettings(),
      fetchCompany(),
      fetchMovies(),
      fetchDashboardNews(),
      fetchTeam()
    ])
    
    initialized.value = true
  }

  // Force refresh data
  async function refreshData() {
    company.value = null
    movies.value = []
    featuredMovie.value = null
    news.value = []
    dashboardNews.value = []
    team.value = []
    licensing.value = null
    marketing.value = null
    navigation.value = null
    initialized.value = false
    
    await initializeStore()
  }

  // Get movie by ID or slug
  function getMovieByIdOrSlug(idOrSlug) {
    return movies.value.find(m => 
      m._id === idOrSlug || 
      m.id === idOrSlug || 
      m.slug === idOrSlug
    )
  }

  // Get news by ID or slug  
  function getNewsById(id) {
    return news.value.find(n => n._id === id || n.id === id || n.slug === id)
  }

  // Get news by category
  function getNewsByCategory(category) {
    return news.value.filter(n => n.category === category)
  }

  return {
    // State
    company,
    movies,
    featuredMovie,
    news,
    dashboardNews,
    team,
    licensing,
    marketing,
    navigation,
    aboutUs,
    socialLinks,
    settings,
    theme,
    sections,
    seoData,
    loading,
    errors,
    initialized,
    
    // Computed
    isLoading,
    
    // Actions
    fetchCompany,
    fetchMovies,
    fetchFeaturedMovie,
    fetchNews,
    fetchDashboardNews,
    fetchTeam,
    fetchLicensing,
    fetchMarketing,
    fetchNavigation,
    fetchSettings,
    fetchSeoBySlug,
    getSeoData,
    applyTheme,
    initializeStore,
    refreshData,
    getMovieByIdOrSlug,
    getNewsById,
    getNewsByCategory
  }
})
