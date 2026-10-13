/**
 * useSeoHead Composable
 * Dynamically injects SEO meta tags into the document head
 * Fetches SEO data from the backend API based on page slug
 */
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useSiteStore } from '@/stores/site'

// Track all meta elements we've added to clean them up later
let addedMetaTags = []
let addedLinkTags = []
let schemaScript = null

/**
 * Remove all meta tags we've added
 */
function cleanupMetaTags() {
  addedMetaTags.forEach(el => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  })
  addedMetaTags = []

  addedLinkTags.forEach(el => {
    if (el && el.parentNode) {
      el.parentNode.removeChild(el)
    }
  })
  addedLinkTags = []

  if (schemaScript && schemaScript.parentNode) {
    schemaScript.parentNode.removeChild(schemaScript)
    schemaScript = null
  }
}

/**
 * Set or update a meta tag
 */
function setMetaTag(name, content, isProperty = false) {
  if (!content) return

  const attr = isProperty ? 'property' : 'name'
  let meta = document.querySelector(`meta[${attr}="${name}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attr, name)
    document.head.appendChild(meta)
    addedMetaTags.push(meta)
  }

  meta.setAttribute('content', content)
}

/**
 * Set canonical link
 */
function setCanonicalLink(url) {
  if (!url) return

  let link = document.querySelector('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
    addedLinkTags.push(link)
  }

  link.setAttribute('href', url)
}

/**
 * Set alternate language links
 */
function setAlternateLinks(alternates) {
  if (!alternates || !Array.isArray(alternates)) return

  alternates.forEach(({ hreflang, href }) => {
    if (!href || !hreflang) return

    let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`)

    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'alternate')
      link.setAttribute('hreflang', hreflang)
      document.head.appendChild(link)
      addedLinkTags.push(link)
    }

    link.setAttribute('href', href)
  })
}

/**
 * Inject schema JSON-LD
 */
function setSchemaJson(schema) {
  if (!schema) return

  // Remove existing schema script
  if (schemaScript && schemaScript.parentNode) {
    schemaScript.parentNode.removeChild(schemaScript)
  }

  // Create new schema script
  schemaScript = document.createElement('script')
  schemaScript.type = 'application/ld+json'

  try {
    const schemaContent = typeof schema === 'string' ? schema : JSON.stringify(schema)
    schemaScript.textContent = schemaContent
    document.head.appendChild(schemaScript)
  } catch (e) {
    console.error('Invalid schema JSON:', e)
  }
}

/**
 * Apply all SEO data to the document
 */
function applySeoData(seo) {
  if (!seo) return

  const fallbackDesc = "WHITE PANDA CREATIONS - Crafting Stories That Transcend Boundaries. A visionary film production company."
  const fallbackKw = "film production, movies, cinema, WHITE PANDA CREATIONS, independent films, Marathi cinema, salbardi, salbardi movie"
  const defaultTitle = "WHITE PANDA CREATIONS"

  // Set document title
  if (seo.metaTitle) {
    document.title = seo.metaTitle
  }

  // Basic meta tags
  setMetaTag('description', seo.metaDescription || fallbackDesc)

  let keywordsStr = fallbackKw;
  if (Array.isArray(seo.metaKeywords) && seo.metaKeywords.length > 0) {
    keywordsStr = seo.metaKeywords.join(', ')
  } else if (typeof seo.metaKeywords === 'string' && seo.metaKeywords.trim().length > 0) {
    keywordsStr = seo.metaKeywords
  }
  setMetaTag('keywords', keywordsStr)

  setMetaTag('author', seo.author || 'WHITE PANDA CREATIONS')
  setMetaTag('robots', seo.robotsMeta || 'index, follow')
  setMetaTag('googlebot', seo.googlebot || 'index, follow')

  // Open Graph tags
  setMetaTag('og:title', seo.ogTitle || seo.metaTitle || defaultTitle, true)
  setMetaTag('og:description', seo.ogDescription || seo.metaDescription || fallbackDesc, true)
  setMetaTag('og:image', seo.ogImage || 'https://whitepandacreations.com/og-image.jpg', true)
  setMetaTag('og:type', seo.ogType || 'website', true)
  setMetaTag('og:locale', seo.ogLocale || 'en_US', true)
  setMetaTag('og:site_name', seo.ogSiteName || 'WHITE PANDA CREATIONS', true)
  setMetaTag('og:url', seo.canonicalUrl || 'https://whitepandacreations.com/', true)

  // Twitter Card tags
  setMetaTag('twitter:card', seo.twitterCard || 'summary_large_image')
  setMetaTag('twitter:title', seo.twitterTitle || seo.ogTitle || seo.metaTitle || defaultTitle)
  setMetaTag('twitter:description', seo.twitterDescription || seo.ogDescription || seo.metaDescription || fallbackDesc)
  setMetaTag('twitter:image', seo.twitterImage || seo.ogImage || 'https://whitepandacreations.com/og-image.jpg')
  setMetaTag('twitter:site', seo.twitterSite || '@whitepandacreations')
  setMetaTag('twitter:creator', seo.twitterCreator || '@whitepandacreations')

  // Canonical & alternate links
  setCanonicalLink(seo.canonicalUrl || window.location.href)
  setAlternateLinks(seo.alternateUrls)

  // Schema JSON-LD
  setSchemaJson(seo.schemaJson)
}

/**
 * Get page slug from route
 */
function getPageSlugFromRoute(route) {
  // Map route names to page slugs
  const routeSlugMap = {
    'Home': 'home',
    'TheCompany': 'the-company',
    'Team': 'team',
    'Licensing': 'licensing',
    'Partners': 'partners',
    'AllNews': 'all-news',
    'MovieDetails': 'movie-' // Will append movie slug
  }

  // Check for movie detail page
  if (route.name === 'MovieDetails' && route.params.slug) {
    return `movie-${route.params.slug}`
  }

  // Return mapped slug or fallback to route path
  return routeSlugMap[route.name] || route.path.replace(/^\//, '') || 'home'
}

/**
 * Main composable function
 */
export function useSeoHead(customSlug = null) {
  const route = useRoute()
  const siteStore = useSiteStore()
  const loading = ref(false)
  const seoLoaded = ref(false)
  const currentSeo = ref(null)

  /**
   * Load and apply SEO for current page
   */
  async function loadSeo(slug = null) {
    loading.value = true

    try {
      // Determine page slug
      const pageSlug = slug || customSlug || getPageSlugFromRoute(route)

      // Fetch SEO data from store (which caches it)
      const seo = await siteStore.fetchSeoBySlug(pageSlug)

      if (seo) {
        currentSeo.value = seo
        applySeoData(seo)
        seoLoaded.value = true
      }
    } catch (error) {
      console.error('Failed to load SEO data:', error)
    } finally {
      loading.value = false
    }
  }

  /**
   * Manually update SEO with custom data
   */
  function updateSeo(seoData) {
    if (seoData) {
      currentSeo.value = seoData
      applySeoData(seoData)
    }
  }

  // Watch for route changes
  watch(
    () => route.fullPath,
    () => {
      if (!customSlug) {
        loadSeo()
      }
    }
  )

  // Load SEO on mount
  onMounted(() => {
    loadSeo()
  })

  // Cleanup on unmount
  onUnmounted(() => {
    // Note: We don't cleanup here because it would remove SEO tags
    // when navigating between pages. The cleanup happens when new SEO is applied.
  })

  return {
    loading,
    seoLoaded,
    currentSeo,
    loadSeo,
    updateSeo
  }
}

/**
 * Static utility for setting SEO without reactivity
 */
export function setSeoHead(seo) {
  applySeoData(seo)
}

/**
 * Set document title only
 */
export function setPageTitle(title) {
  if (title) {
    document.title = title
  }
}

export default useSeoHead
