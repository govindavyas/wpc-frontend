// Analytics Tracking Composable
// This composable provides methods for tracking user interactions on the website

import { onMounted, onUnmounted, watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const API_BASE = `${import.meta.env.VITE_API_URL}/api/v1`

// Track if analytics is enabled (fetched from settings)
const isAnalyticsEnabled = ref(true)
let analyticsChecked = false

// Check if analytics is enabled from backend
async function checkAnalyticsEnabled() {
  if (analyticsChecked) return isAnalyticsEnabled.value
  
  try {
    const response = await fetch(`${API_BASE}/settings`)
    const data = await response.json()
    isAnalyticsEnabled.value = data.data?.enableAnalytics !== false
    analyticsChecked = true
  } catch (error) {
    console.warn('Analytics: Failed to check if enabled, defaulting to true', error)
    isAnalyticsEnabled.value = true
    analyticsChecked = true
  }
  
  return isAnalyticsEnabled.value
}

// Generate unique IDs
function generateId() {
  return 'xxxx-xxxx-xxxx-xxxx'.replace(/[x]/g, () => {
    return Math.floor(Math.random() * 16).toString(16)
  })
}

// Get or create visitor ID (stored in localStorage)
function getVisitorId() {
  let visitorId = localStorage.getItem('panda_visitor_id')
  if (!visitorId) {
    visitorId = 'v_' + generateId() + '_' + Date.now()
    localStorage.setItem('panda_visitor_id', visitorId)
  }
  return visitorId
}

// Get or create session ID (stored in sessionStorage)
function getSessionId() {
  let sessionId = sessionStorage.getItem('panda_session_id')
  if (!sessionId) {
    sessionId = 's_' + generateId() + '_' + Date.now()
    sessionStorage.setItem('panda_session_id', sessionId)
  }
  return sessionId
}

// Track page view
async function trackPageView(page, path, title) {
  // Check if analytics is enabled
  const enabled = await checkAnalyticsEnabled()
  if (!enabled) {
    console.log('Analytics: Tracking disabled')
    return
  }
  
  try {
    const data = {
      page,
      path,
      title: title || document.title,
      referrer: document.referrer,
      sessionId: getSessionId(),
      visitorId: getVisitorId()
    }

    await fetch(`${API_BASE}/analytics/track/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.warn('Analytics: Failed to track pageview', error)
  }
}

// Track event
async function trackEvent(eventType, eventCategory, eventAction, eventLabel = '', eventValue = null, metadata = {}) {
  // Check if analytics is enabled
  const enabled = await checkAnalyticsEnabled()
  if (!enabled) return
  
  try {
    const data = {
      eventType,
      eventCategory,
      eventAction,
      eventLabel,
      eventValue,
      page: document.title,
      path: window.location.pathname,
      sessionId: getSessionId(),
      visitorId: getVisitorId(),
      metadata
    }

    await fetch(`${API_BASE}/analytics/track/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.warn('Analytics: Failed to track event', error)
  }
}

// Track click events
function trackClick(category, action, label = '', value = null) {
  trackEvent('click', category, action, label, value)
}

// Track video events
function trackVideoPlay(videoId, videoTitle) {
  trackEvent('video_play', 'video', 'play', videoTitle, null, { videoId })
}

function trackVideoPause(videoId, videoTitle, currentTime) {
  trackEvent('video_pause', 'video', 'pause', videoTitle, currentTime, { videoId })
}

// Track form submissions
function trackFormSubmit(formName, formData = {}) {
  trackEvent('form_submit', 'form', 'submit', formName, null, formData)
}

// Track modal events
function trackModalOpen(modalName, contentId = '') {
  trackEvent('modal_open', 'modal', 'open', modalName, null, { contentId })
}

function trackModalClose(modalName, contentId = '') {
  trackEvent('modal_close', 'modal', 'close', modalName, null, { contentId })
}

// Track navigation events
function trackNavigation(from, to) {
  trackEvent('navigation', 'navigation', 'navigate', `${from} -> ${to}`)
}

// Track download events
function trackDownload(fileName, fileType) {
  trackEvent('download', 'file', 'download', fileName, null, { fileType })
}

// Track share events
function trackShare(platform, contentType, contentId) {
  trackEvent('share', 'social', 'share', platform, null, { contentType, contentId })
}

// Track search events
function trackSearch(searchTerm, resultsCount) {
  trackEvent('search', 'search', 'search', searchTerm, resultsCount)
}

// Track scroll depth
let maxScrollDepth = 0
function trackScrollDepth() {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  const depth = Math.round((scrolled / scrollHeight) * 100)
  
  if (depth > maxScrollDepth) {
    maxScrollDepth = depth
    
    // Track at 25%, 50%, 75%, 100% milestones
    const milestones = [25, 50, 75, 100]
    milestones.forEach(milestone => {
      if (depth >= milestone && maxScrollDepth < milestone + 5) {
        trackEvent('scroll', 'engagement', 'scroll_depth', `${milestone}%`, milestone)
      }
    })
  }
}

// Session end tracking
let sessionStartTime = Date.now()

function trackSessionEnd() {
  const duration = Math.round((Date.now() - sessionStartTime) / 1000)
  
  navigator.sendBeacon(`${API_BASE}/analytics/track/session-end`, JSON.stringify({
    sessionId: getSessionId(),
    duration
  }))
}

// Composable for Vue components
export function useAnalytics() {
  const route = useRoute()
  let scrollListener = null

  onMounted(async () => {
    // Check analytics status first
    await checkAnalyticsEnabled()
    
    if (!isAnalyticsEnabled.value) {
      console.log('Analytics: Tracking is disabled in settings')
      return
    }
    
    // Track initial page view
    trackPageView(route.name, route.fullPath, document.title)
    
    // Set up scroll tracking
    maxScrollDepth = 0
    scrollListener = () => trackScrollDepth()
    window.addEventListener('scroll', scrollListener, { passive: true })
    
    // Track session end on page unload
    window.addEventListener('beforeunload', trackSessionEnd)
  })

  onUnmounted(() => {
    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener)
    }
    window.removeEventListener('beforeunload', trackSessionEnd)
  })

  // Watch for route changes
  watch(() => route.fullPath, (newPath, oldPath) => {
    if (newPath !== oldPath) {
      maxScrollDepth = 0 // Reset scroll depth
      trackNavigation(oldPath, newPath)
      trackPageView(route.name, newPath, document.title)
    }
  })

  return {
    trackEvent,
    trackClick,
    trackVideoPlay,
    trackVideoPause,
    trackFormSubmit,
    trackModalOpen,
    trackModalClose,
    trackDownload,
    trackShare,
    trackSearch,
    trackPageView
  }
}

// Auto-track click events on elements with data-track attribute
export function setupAutoTracking() {
  document.addEventListener('click', (e) => {
    const trackElement = e.target.closest('[data-track]')
    if (trackElement) {
      const category = trackElement.dataset.trackCategory || 'interaction'
      const action = trackElement.dataset.trackAction || 'click'
      const label = trackElement.dataset.trackLabel || trackElement.textContent?.trim().slice(0, 50) || ''
      const value = trackElement.dataset.trackValue || null
      
      trackClick(category, action, label, value)
    }
  })

  // Auto-track outbound links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]')
    if (link && !link.href.includes(window.location.hostname)) {
      trackClick('outbound', 'click', link.href)
    }
  })
}

// Export individual functions for direct use
export {
  trackPageView,
  trackEvent,
  trackClick,
  trackVideoPlay,
  trackVideoPause,
  trackFormSubmit,
  trackModalOpen,
  trackModalClose,
  trackDownload,
  trackShare,
  trackSearch
}
