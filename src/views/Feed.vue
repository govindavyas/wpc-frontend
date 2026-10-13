<template>
  <div class="feed-page">
    <!-- Hero Section -->
    <section class="relative py-20 md:py-28 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-theme-bg/80 via-theme-bg/50 to-transparent"></div>
      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Social Feed
          </h1>
          <p class="text-lg md:text-xl text-gray-300">
            Follow our journey across social media. Catch the latest updates, behind-the-scenes moments, and exclusive content.
          </p>
        </div>
      </div>
    </section>

    <!-- Platform Filter -->
    <section class="py-6 border-b border-white/10">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="platform in platforms"
            :key="platform.value"
            @click="selectedPlatform = platform.value; loadFeed()"
            :class="[
              'px-4 py-2 rounded-full transition-all duration-300',
              selectedPlatform === platform.value
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            ]"
          >
            <span class="flex items-center gap-2">
              <span>{{ platform.icon }}</span>
              <span>{{ platform.label }}</span>
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Feed Grid -->
    <section class="py-12 md:py-20">
      <div class="container mx-auto px-4">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center py-20">
          <div class="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="feedItems.length === 0" class="text-center py-20">
          <div class="w-20 h-20 mx-auto mb-6 bg-white/5 rounded-full flex items-center justify-center">
            <svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">No posts yet</h3>
          <p class="text-gray-400">Check back soon for updates from our social channels.</p>
        </div>

        <!-- Feed Items Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeedItem
            v-for="item in feedItems"
            :key="item._id"
            :item="item"
            @like="handleLike"
            @share="handleShare"
          />
        </div>

        <!-- Load More -->
        <div v-if="hasMore && !loading" class="text-center mt-12">
          <button
            @click="loadMore"
            :disabled="loadingMore"
            class="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all duration-300 disabled:opacity-50"
          >
            {{ loadingMore ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import FeedItem from '@/components/FeedItem.vue'
import { useSeoHead } from '@/composables/useSeoHead'
import { getApiUrl } from '@/utils/imageUrl'

// Initialize SEO
useSeoHead('feed')

const API_URL = import.meta.env.VITE_API_URL

console.log('Feed page initialized with API URL:', API_URL)

// ==============================================
// DEVICE ID MANAGEMENT
// Generates a persistent UUID v4 stored in localStorage
// This is the authoritative identifier for like tracking
// ==============================================

const DEVICE_ID_KEY = 'wp_device_id'
const LIKED_POSTS_KEY = 'wp_liked_posts'

/**
 * Generate a UUID v4
 * Uses crypto.randomUUID if available, otherwise falls back to manual generation
 */
function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * Get or create the persistent device ID
 * This ID survives page refreshes, browser restarts, etc.
 */
function getDeviceId() {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY)
  if (!deviceId) {
    deviceId = generateUUID()
    localStorage.setItem(DEVICE_ID_KEY, deviceId)
  }
  return deviceId
}

/**
 * Get liked posts from localStorage
 * Returns a Set of post IDs that this device has liked
 */
function getLikedPosts() {
  try {
    const liked = localStorage.getItem(LIKED_POSTS_KEY)
    return liked ? new Set(JSON.parse(liked)) : new Set()
  } catch (error) {
    console.error('Error reading liked posts from localStorage:', error)
    return new Set()
  }
}

/**
 * Save a post ID to liked posts in localStorage
 */
function saveLikedPost(postId) {
  try {
    const likedPosts = getLikedPosts()
    likedPosts.add(postId)
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify([...likedPosts]))
  } catch (error) {
    console.error('Error saving liked post to localStorage:', error)
  }
}

/**
 * Check if a post is liked
 */
function isPostLiked(postId) {
  return getLikedPosts().has(postId)
}

// Initialize device ID immediately
const deviceId = getDeviceId()
console.log('Device ID initialized:', deviceId)

// ==============================================
// STATE
// ==============================================

const feedItems = ref([])
const loading = ref(true)
const loadingMore = ref(false)
const page = ref(1)
const hasMore = ref(true)
const selectedPlatform = ref('all')
const platformCounts = ref({})

// Platform filter options
const allPlatforms = [
  { value: 'all', label: 'All', icon: '🌐' },
  { value: 'instagram', label: 'Instagram', icon: '📸' },
  { value: 'youtube', label: 'YouTube', icon: '▶️' },
  { value: 'facebook', label: 'Facebook', icon: '👍' },
  { value: 'twitter', label: 'X/Twitter', icon: '🐦' },
  { value: 'tiktok', label: 'TikTok', icon: '🎵' }
]

// Filter platforms to only show those with available content
const platforms = computed(() => {
  const filtered = [allPlatforms[0]]
  
  for (let i = 1; i < allPlatforms.length; i++) {
    const platform = allPlatforms[i]
    if (platformCounts.value[platform.value] > 0) {
      filtered.push({
        ...platform,
        count: platformCounts.value[platform.value]
      })
    }
  }
  
  return filtered
})

// ==============================================
// API FUNCTIONS
// ==============================================

// Fetch platform counts
async function fetchPlatformCounts() {
  try {
    const response = await fetch(`${API_URL}/api/v1/feed?limit=1000`)
    const data = await response.json()
    
    if (data.success) {
      const counts = {}
      data.data.forEach(item => {
        counts[item.platform] = (counts[item.platform] || 0) + 1
      })
      platformCounts.value = counts
    }
  } catch (error) {
    console.error('Failed to fetch platform counts:', error)
  }
}

// Fetch feed items
async function loadFeed() {
  loading.value = true
  page.value = 1
  
  try {
    const params = new URLSearchParams({
      page: '1',
      limit: '12',
      platform: selectedPlatform.value === 'all' ? '' : selectedPlatform.value
    })
    
    const response = await fetch(`${API_URL}/api/v1/feed?${params}`)
    const data = await response.json()
    
    if (data.success) {
      feedItems.value = data.data.map(item => ({
        ...item,
        thumbnailUrl: getApiUrl(item.thumbnailUrl),
        hasLiked: isPostLiked(item._id),
        isLiking: false
      }))
      hasMore.value = data.currentPage < data.totalPages
    }
  } catch (error) {
    console.error('Failed to load feed:', error)
  } finally {
    loading.value = false
  }
}

// Load more items
async function loadMore() {
  loadingMore.value = true
  page.value++
  
  try {
    const params = new URLSearchParams({
      page: page.value.toString(),
      limit: '12',
      platform: selectedPlatform.value === 'all' ? '' : selectedPlatform.value
    })
    
    const response = await fetch(`${API_URL}/api/v1/feed?${params}`)
    const data = await response.json()
    
    if (data.success) {
      const newItems = data.data.map(item => ({
        ...item,
        thumbnailUrl: getApiUrl(item.thumbnailUrl),
        hasLiked: isPostLiked(item._id),
        isLiking: false
      }))
      feedItems.value.push(...newItems)
      hasMore.value = data.currentPage < data.totalPages
    }
  } catch (error) {
    console.error('Failed to load more:', error)
  } finally {
    loadingMore.value = false
  }
}

/**
 * Handle like action
 * - Saves to localStorage immediately for instant UI update
 * - Sends deviceId to backend to update admin counts
 * - Prevents double-clicks with isLiking flag
 */
async function handleLike(item) {
  // Prevent double-clicks and re-liking
  if (item.isLiking || item.hasLiked) {
    console.log('❌ Like blocked - already liked or currently liking')
    showToast('You already liked this! 💗')
    return
  }
  
  console.log('▶️ Starting like process for item:', item._id)
  console.log('   Device ID:', deviceId)
  
  // Save to localStorage FIRST for instant UI update
  saveLikedPost(item._id)
  
  // Update UI immediately
  item.hasLiked = true
  const index = feedItems.value.findIndex(feedItem => feedItem._id === item._id)
  if (index !== -1) {
    feedItems.value[index] = { 
      ...feedItems.value[index], 
      hasLiked: true
    }
  }
  
  // Show immediate feedback
  showToast('Liked! 💗')
  
  // Then update backend asynchronously (for admin counts)
  item.isLiking = true
  
  try {
    console.log('   📡 Sending like to backend...')
    const response = await fetch(`${API_URL}/api/v1/feed/${item._id}/like`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ deviceId })
    })
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('   ❌ Backend like update failed:', response.status, errorText)
    } else {
      const data = await response.json()
      console.log('   ✅ Backend response:', {
        alreadyLiked: data.alreadyLiked,
        likeCount: data.likeCount,
        message: data.message
      })
      
      if (data.alreadyLiked) {
        console.log('   ⚠️ Backend says: Already liked (duplicate blocked)')
      } else {
        console.log('   🎉 New like recorded! Count is now:', data.likeCount)
      }
    }
  } catch (error) {
    console.error('   ❌ Backend like update failed:', error)
    // Don't show error to user - localStorage already updated UI
  } finally {
    item.isLiking = false
  }
}

/**
 * Handle share action
 */
async function handleShare(item) {
  try {
    // Record share with backend
    await fetch(`${API_URL}/api/v1/feed/${item._id}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId })
    })
    
    // Try native share API first
    if (navigator.share) {
      await navigator.share({
        title: item.title || 'Check out this post!',
        url: item.originalUrl
      })
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(item.originalUrl)
      showToast('Link copied to clipboard!')
    }
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Share failed:', error)
    }
  }
}

// Simple toast notification
function showToast(message) {
  const toast = document.createElement('div')
  toast.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-lg rounded-full text-white text-sm z-50 animate-fade-in'
  toast.textContent = message
  document.body.appendChild(toast)
  setTimeout(() => {
    toast.classList.add('opacity-0', 'transition-opacity')
    setTimeout(() => toast.remove(), 300)
  }, 2000)
}

// ==============================================
// LIFECYCLE
// ==============================================

onMounted(async () => {
  await fetchPlatformCounts()
  await loadFeed()
})
</script>

<style scoped>
.feed-page {
  min-height: 100vh;
  padding-top: 80px;
  background: linear-gradient(to bottom, var(--gradient-from), var(--gradient-to));
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
