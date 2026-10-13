<template>
  <article 
    class="feed-item group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
    :class="{ 'ring-2 ring-primary-500/30': item.featured }"
  >
    <!-- Badges Header -->
    <div class="flex items-center justify-between p-3 pb-2">
      <!-- Platform Badge -->
      <span :class="['platform-badge', `platform-${item.platform}`]" :title="item.platform" v-html="getPlatformIcon(item.platform)"></span>
      
      <!-- Content Type Badge -->
      <span class="content-type-badge">
        {{ item.contentType === 'video' ? '🎥 Video' : item.contentType === 'image' ? '📷 Image' : '📱 Post' }}
      </span>
    </div>

    <!-- Embed Container -->
    <div 
      class="embed-container relative mt-2"
      :class="item.platform === 'instagram' ? 'aspect-[4/5] max-h-[650px]' : 'aspect-square md:aspect-video'"
    >
      <!-- Thumbnail/Preview -->
      <div 
        v-if="!showEmbed && item.thumbnailUrl" 
        class="w-full h-full relative cursor-pointer"
        @click="showEmbed = true"
      >
        <img 
          :src="item.thumbnailUrl" 
          :alt="item.title || 'Feed content'"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Embed Content -->
      <div 
        v-else-if="(showEmbed || !item.thumbnailUrl) && hasEmbed" 
        ref="embedRef"
        class="w-full h-full embed-wrapper"
        v-html="sanitizedEmbed"
      ></div>

      <!-- Fallback -->
      <div 
        v-else 
        class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
      >
        <span class="text-4xl">{{ getPlatformIcon(item.platform) }}</span>
      </div>
    </div>

    <!-- Content Info -->
    <div class="p-4">
      <!-- Title -->
      <h3 v-if="item.title || item.authorName" class="font-medium text-white mb-2 line-clamp-2">
        {{ item.title || item.authorName }}
      </h3>

      <!-- Author -->
      <p v-if="item.authorName && item.title" class="text-sm text-gray-400 mb-3">
        by {{ item.authorName }}
      </p>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-3 border-t border-white/10">
        <!-- Like Button -->
        <button
          @click="handleLike"
          :disabled="item.isLiking || item.hasLiked"
          :class="[
            'like-btn flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300',
            item.hasLiked 
              ? 'bg-pink-500/20 text-pink-400 cursor-default' 
              : item.isLiking
                ? 'bg-white/5 text-gray-500 cursor-wait'
                : 'bg-white/5 text-gray-400 hover:bg-pink-500/10 hover:text-pink-400'
          ]"
          :title="item.hasLiked ? 'You already liked this' : 'Like this post'"
        >
          <!-- Loading spinner when liking -->
          <svg 
            v-if="item.isLiking"
            class="w-5 h-5 animate-spin" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <!-- Heart icon -->
          <svg 
            v-else
            class="w-5 h-5 transition-transform" 
            :class="{ 'scale-110': item.hasLiked }"
            :fill="item.hasLiked ? 'currentColor' : 'none'" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <span class="text-sm font-medium">
            {{ item.hasLiked ? 'Liked' : 'Like' }}
          </span>
        </button>

        <!-- Share Button -->
        <button
          @click="handleShare"
          class="share-btn flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-gray-400 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span class="text-sm font-medium">Share</span>
        </button>

        <!-- View Original -->
        <a
          :href="item.originalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-gray-400 hover:bg-purple-500/10 hover:text-purple-400 transition-all duration-300"
          :title="`View on ${item.platform}`"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          <span class="text-sm font-medium">Visit</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['like', 'share'])

const showEmbed = ref(false)
const embedRef = ref(null)

// Sanitize embed HTML for security
const sanitizedEmbed = computed(() => {
  let html = props.item.embedHtml || ''
  
  // Add responsive styling to iframes
  html = html.replace(/<iframe/g, '<iframe style="width:100%;height:100%;position:absolute;top:0;left:0;"')
  
  return html
})

const hasEmbed = computed(() => sanitizedEmbed.value.trim().length > 0)

function ensureScript(id, src, forceReload = false) {
  const existing = document.getElementById(id)
  if (existing && !forceReload) return
  if (existing && forceReload) {
    existing.remove()
  }
  const script = document.createElement('script')
  script.id = id
  script.src = src
  script.async = true
  document.body.appendChild(script)
}

function processEmbeds() {
  if (!embedRef.value) return

  switch (props.item.platform) {
    case 'instagram':
      ensureScript('instagram-embed', 'https://www.instagram.com/embed.js', true)
      if (window.instgrm?.Embeds?.process) {
        window.instgrm.Embeds.process()
      }
      break
    case 'twitter':
      ensureScript('twitter-widgets', 'https://platform.twitter.com/widgets.js')
      if (window.twttr?.widgets?.load) {
        window.twttr.widgets.load(embedRef.value)
      }
      break
    case 'tiktok':
      ensureScript('tiktok-embed', 'https://www.tiktok.com/embed.js', true)
      break
    case 'facebook':
      ensureScript('facebook-sdk', 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0', true)
      if (window.FB?.XFBML?.parse) {
        window.FB.XFBML.parse(embedRef.value)
      }
      break
    default:
      break
  }
}

async function initEmbed() {
  if (!hasEmbed.value) return
  await nextTick()
  processEmbeds()
}

onMounted(() => {
  if (showEmbed.value || !props.item.thumbnailUrl) {
    initEmbed()
  }
})

watch(
  () => [showEmbed.value, props.item.embedHtml],
  () => {
    if (showEmbed.value || !props.item.thumbnailUrl) {
      initEmbed()
    }
  }
)

// Platform icons - Returns SVG strings
function getPlatformIcon(platform) {
  const icons = {
    instagram: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>',
    youtube: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" /></svg>',
    facebook: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" /></svg>',
    twitter: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.70,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" /></svg>',
    vimeo: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22,7.42C21.91,9.37 20.55,12.04 17.92,15.44C15.2,19 12.9,20.75 11,20.75C9.85,20.75 8.86,19.67 8.05,17.5C7.5,15.54 7,13.56 6.44,11.58C5.84,9.42 5.2,8.34 4.5,8.34C4.36,8.34 3.84,8.66 2.94,9.29L2,8.07C3,7.2 3.96,6.33 4.92,5.46C6.24,4.32 7.23,3.72 7.88,3.66C9.4,3.5 10.34,4.54 10.72,6.77C11.13,9.17 11.41,10.65 11.58,11.22C12.04,13.2 12.54,14.19 13.1,14.19C13.53,14.19 14.16,13.54 15,12.24C15.81,10.93 16.26,9.94 16.33,9.27C16.46,8.18 16,7.63 14.91,7.63C14.42,7.63 13.91,7.74 13.4,7.96C14.38,4.75 16.18,3.19 18.78,3.27C20.68,3.32 21.56,4.47 22,7.42Z" /></svg>',
    tiktok: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6,5.82s.51.5,0,0A4.278,4.278,0,0,0,15.54,3h-3.09V12.4a2.592,2.592,0,0,1-2.59,2.5c-1.42,0-2.6-1.16-2.6-2.6c0-1.72,1.66-3.01,3.37-2.48V6.66c-3.45-.46-6.47,2.22-6.47,5.64c0,3.33,2.76,5.7,5.69,5.7c3.14,0,5.69-2.55,5.69-5.7V9.01a7.35,7.35,0,0,0,4.3,1.38V7.3s-1.88.09-3.24-1.48Z" /></svg>',
    linkedin: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" /></svg>'
  }
  return icons[platform] || '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" /></svg>'
}

// Handle like action - just emit to parent, no local state management
function handleLike() {
  // Guard: Don't emit if already liked or currently liking
  if (props.item.isLiking || props.item.hasLiked) return
  
  emit('like', props.item)
}

// Handle share action
function handleShare() {
  emit('share', props.item)
}
</script>

<style scoped>
.feed-item {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feed-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5);
}

.platform-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  font-size: 1.25rem;
  cursor: default;
}

.content-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.embed-container {
  position: relative;
  background: #111;
  overflow: auto;
}

.embed-wrapper {
  position: relative;
  width: 100%;
  min-height: 100%;
}

.embed-wrapper :deep(iframe) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.embed-wrapper :deep(blockquote) {
  margin: 0;
  padding: 16px;
  min-height: 100%;
  overflow: visible;
  background: linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8));
}

.embed-wrapper :deep(blockquote.instagram-media) {
  max-width: 100% !important;
  min-width: 100% !important;
}

.like-btn:active {
  transform: scale(0.95);
}

.like-btn svg {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.like-btn:hover svg {
  transform: scale(1.1);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Platform-specific styling */
.platform-instagram { background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
.platform-youtube { background: #ff0000; }
.platform-facebook { background: #1877f2; }
.platform-twitter { background: #1da1f2; }
.platform-tiktok { background: linear-gradient(45deg, #25f4ee, #fe2c55); }
.platform-vimeo { background: #1ab7ea; }
</style>
