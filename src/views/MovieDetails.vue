<template>
  <div ref="pageRef" class="min-h-screen bg-theme text-theme-secondary pb-20">
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="w-12 h-12 border-4 border-panda-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-theme-muted">Loading movie details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h2 class="text-2xl font-bold text-theme-primary mb-2">Movie Not Found</h2>
        <p class="text-theme-muted mb-6">{{ error }}</p>
        <router-link to="/" class="btn-primary">Back to Home</router-link>
      </div>
    </div>

    <!-- Movie Content -->
    <div v-else-if="movieData" class="pt-16">
      <!-- Hero Section with Poster -->
      <div class="relative h-[40vh] sm:h-[50vh] md:h-[60vh] overflow-hidden">
        <LazyImage 
          :src="movieData.bannerUrl || movieData.posterUrl" 
          :thumbnail-src="movieData.thumbnailUrl"
          :alt="movieData.title"
          aspect-ratio="16/9"
          bg-color="#1a1a2e"
          class="w-full h-full"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-panda-darker via-panda-darker/60 to-transparent pointer-events-none"></div>
        
        <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16 movie-hero-content">
          <div class="container-custom">
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">{{ movieData.title }}</h1>
            <p v-if="movieData.tagline" class="text-panda-gold text-lg sm:text-xl md:text-2xl mb-4">{{ movieData.tagline }}</p>
            <div class="flex flex-wrap items-center gap-3 sm:gap-4 text-gray-300 text-sm sm:text-base">
              <span class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                </svg>
                {{ movieData.year }}
              </span>
              <span v-if="movieData.duration || movieData.runtime">•</span>
              <span v-if="movieData.duration || movieData.runtime">{{ movieData.duration || movieData.runtime }}</span>
              <span v-if="movieData.language">•</span>
              <span v-if="movieData.language">{{ movieData.language }}</span>
            </div>
            <!-- Genres -->
            <div v-if="movieGenres.length" class="flex flex-wrap gap-2 mt-4">
              <span 
                v-for="genre in movieGenres" 
                :key="genre"
                class="px-3 py-1 bg-panda-purple/30 rounded-full text-sm text-gray-300"
              >
                {{ genre }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Details Section -->
      <div class="container-custom px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
        <!-- Back to Films Link -->
        <div class="movie-section-reveal">
          <button 
            @click="goBack"
            class="inline-flex items-center gap-2 text-theme-muted hover:text-panda-gold transition-colors group"
          >
            <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            <span class="font-medium">Back to Films</span>
          </button>
        </div>

        <!-- Trailer -->
        <div v-if="movieData.trailer && movieData.trailer.url" class="movie-section-reveal">
          <h3 class="text-2xl sm:text-3xl font-bold text-theme-primary mb-4 sm:mb-6 flex items-center">
            <svg class="w-6 h-6 sm:w-7 sm:h-7 mr-3 text-panda-gold" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
            Trailer
          </h3>
          <div class="relative aspect-video rounded-xl overflow-hidden bg-black max-w-5xl">
            <!-- YouTube/Vimeo iframe with lazy loading -->
            <iframe
              v-if="movieData.trailer.type === 'youtube' || movieData.trailer.type === 'vimeo'"
              :src="trailerEmbedUrl"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            ></iframe>
            <!-- Local/Uploaded video -->
            <video
              v-else-if="movieData.trailer.type === 'local' || movieData.trailer.url?.startsWith('/uploads/')"
              :src="getApiUrl(movieData.trailer.url)"
              controls
              class="w-full h-full"
              preload="metadata"
              :poster="getApiUrl(movieData.trailer.thumbnail)"
            >
              <source :src="getApiUrl(movieData.trailer.url)" type="video/mp4">
              <source :src="getApiUrl(movieData.trailer.url)" type="video/webm">
              Your browser does not support the video tag.
            </video>
            <!-- Fallback for other video types -->
            <video
              v-else
              :src="getApiUrl(movieData.trailer.url)"
              controls
              class="w-full h-full"
              preload="metadata"
            ></video>
          </div>
        </div>

        <!-- Synopsis / About -->
        <div v-if="movieData.synopsis || movieData.about || movieData.description" class="movie-section-reveal">
          <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Synopsis</h3>
          <div class="relative max-w-4xl tracking-wide">
            <p 
              class="text-theme-secondary leading-relaxed whitespace-pre-line text-base sm:text-lg transition-all duration-300"
              :class="isSynopsisExpanded ? 'line-clamp-none' : 'line-clamp-3 overflow-hidden'"
            >
              {{ movieData.synopsis || movieData.about || movieData.description }}
            </p>
            <button 
              @click="isSynopsisExpanded = !isSynopsisExpanded"
              class="mt-3 text-panda-gold hover:text-panda-gold-light font-semibold text-sm sm:text-base flex items-center transition-colors focus:outline-none"
            >
              {{ isSynopsisExpanded ? 'Read Less' : 'Read More' }}
              <svg 
                class="w-4 h-4 ml-1 transition-transform duration-300" 
                :class="{ 'rotate-180': isSynopsisExpanded }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Logline -->
        <div v-if="movieData.logline" class="movie-section-reveal">
          <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Logline</h3>
          <p class="text-theme-muted italic text-lg sm:text-xl max-w-4xl">{{ movieData.logline }}</p>
        </div>

        <!-- Main Character -->
        <div v-if="movieData.mainCharacter && movieData.mainCharacter.name" class="movie-section-reveal">
          <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Main Character</h3>
          <div class="card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 max-w-3xl">
            <div v-if="movieData.mainCharacter.imageUrl || movieData.mainCharacter.image" class="flex-shrink-0 mx-auto sm:mx-0">
              <img 
                :src="getApiUrl(movieData.mainCharacter.imageUrl || movieData.mainCharacter.image)" 
                :alt="movieData.mainCharacter.name"
                class="w-32 h-32 sm:w-40 sm:h-40 rounded-xl object-cover"
              />
            </div>
            <div class="text-center sm:text-left">
              <h4 class="text-xl sm:text-2xl font-bold text-theme-primary">{{ movieData.mainCharacter.name }}</h4>
              <p v-if="movieData.mainCharacter.actor" class="text-panda-gold mb-3 text-base sm:text-lg">Played by: {{ movieData.mainCharacter.actor }}</p>
              <p v-if="movieData.mainCharacter.description" class="text-theme-muted">{{ movieData.mainCharacter.description }}</p>
              <p v-if="movieData.mainCharacter.traits" class="text-theme-muted mt-3">
                <span v-for="trait in movieData.mainCharacter.traits" :key="trait" class="block">• {{ trait }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Status & Release -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 movie-section-reveal">
          <div class="card p-6">
            <h4 class="text-lg font-semibold text-theme-primary mb-2">Status</h4>
            <p class="text-panda-gold capitalize text-lg">{{ movieData.status }}</p>
            <p v-if="movieData.releaseDate" class="text-theme-muted text-sm mt-2">
              Release: {{ movieData.releaseDate }}
            </p>
          </div>
          <div v-if="movieData.distribution" class="card p-6">
            <h4 class="text-lg font-semibold text-theme-primary mb-2">Distribution</h4>
            <p class="text-theme-secondary">{{ typeof movieData.distribution === 'string' ? movieData.distribution : movieData.distribution.distributor }}</p>
          </div>
          <div v-if="movieData.language" class="card p-6">
            <h4 class="text-lg font-semibold text-theme-primary mb-2">Language</h4>
            <p class="text-theme-secondary">{{ movieData.language }}</p>
          </div>
        </div>

        <!-- Dynamic Sections - Rendered in order based on displayOrder settings -->
        <template v-for="section in orderedSections" :key="section.id">
          <!-- Production Credits -->
          <div v-if="section.id === 'production' && showProductionSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Production</h3>
            
            <!-- Producers with Photos -->
            <div v-if="getProducersList.length" class="mb-6">
              <h4 class="text-sm font-semibold text-panda-gold mb-3">Producers</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="(producer, idx) in getProducersList" :key="idx" class="card p-3 text-center">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-panda-gold/20 to-purple-600/20">
                    <img v-if="producer.photoUrl" :src="getApiUrl(producer.photoUrl)" :alt="producer.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-2xl font-bold text-panda-gold">{{ producer.name?.charAt(0) }}</div>
                  </div>
                  <p class="text-theme-primary text-sm font-medium">{{ producer.name }}</p>
                  <p v-if="producer.role" class="text-theme-muted text-xs">{{ producer.role }}</p>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="movieData.credits?.executiveProducer?.length" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Executive Producer</h4>
                <p class="text-theme-primary">{{ formatArrayOrString(movieData.credits?.executiveProducer) }}</p>
              </div>
              <div v-if="movieData.credits?.productionHouse" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Production House</h4>
                <p class="text-theme-primary">{{ movieData.credits?.productionHouse }}</p>
              </div>
            </div>
          </div>

          <!-- Creative Credits -->
          <div v-if="section.id === 'creative' && showCreativeSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Creative Team</h3>
            
            <!-- Directors with Photos -->
            <div v-if="getDirectorsList.length" class="mb-6">
              <h4 class="text-sm font-semibold text-panda-gold mb-3">Directors</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="(director, idx) in getDirectorsList" :key="idx" class="card p-3 text-center">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-panda-gold/20 to-purple-600/20">
                    <img v-if="director.photoUrl" :src="getApiUrl(director.photoUrl)" :alt="director.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-2xl font-bold text-panda-gold">{{ director.name?.charAt(0) }}</div>
                  </div>
                  <p class="text-theme-primary text-sm font-medium">{{ director.name }}</p>
                  <p v-if="director.role" class="text-theme-muted text-xs">{{ director.role }}</p>
                </div>
              </div>
            </div>
            
            <!-- Writers with Photos -->
            <div v-if="getWritersList.length" class="mb-6">
              <h4 class="text-sm font-semibold text-panda-gold mb-3">Writers</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div v-for="(writer, idx) in getWritersList" :key="idx" class="card p-3 text-center">
                  <div class="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full overflow-hidden bg-gradient-to-br from-panda-gold/20 to-purple-600/20">
                    <img v-if="writer.photoUrl" :src="getApiUrl(writer.photoUrl)" :alt="writer.name" class="w-full h-full object-cover" />
                    <div v-else class="w-full h-full flex items-center justify-center text-2xl font-bold text-panda-gold">{{ writer.name?.charAt(0) }}</div>
                  </div>
                  <p class="text-theme-primary text-sm font-medium">{{ writer.name }}</p>
                  <p v-if="writer.role" class="text-theme-muted text-xs">{{ writer.role }}</p>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="movieData.credits?.cinematography || movieData.credits?.cinematographer" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Cinematography</h4>
                <p class="text-theme-primary">{{ movieData.credits?.cinematography || movieData.credits?.cinematographer }}</p>
              </div>
              <div v-if="movieData.credits?.musicDirector" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Music Director</h4>
                <p class="text-theme-primary">{{ movieData.credits.musicDirector }}</p>
              </div>
              <div v-if="movieData.credits?.backgroundMusic || movieData.credits?.backgroundScore" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Background Score</h4>
                <p class="text-theme-primary">{{ movieData.credits?.backgroundMusic || movieData.credits?.backgroundScore }}</p>
              </div>
              <div v-if="movieData.credits?.editor" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Editor</h4>
                <p class="text-theme-primary">{{ movieData.credits.editor }}</p>
              </div>
              <div v-if="getPlaybackSingers" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Playback Singers</h4>
                <p class="text-theme-primary">{{ getPlaybackSingers }}</p>
              </div>
              <div v-if="getLyricist" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Lyricist</h4>
                <p class="text-theme-primary">{{ getLyricist }}</p>
              </div>
              <div v-if="getChoreographer" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Choreographer</h4>
                <p class="text-theme-primary">{{ getChoreographer }}</p>
              </div>
            </div>
          </div>

          <!-- Production Team -->
          <div v-if="section.id === 'productionTeam' && showProductionTeamSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Production Team</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="movieData.credits?.productionManager" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Production Manager</h4>
                <p class="text-theme-primary">{{ movieData.credits.productionManager }}</p>
              </div>
              <div v-if="movieData.credits?.associateDirector" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Associate Director</h4>
                <p class="text-theme-primary">{{ movieData.credits.associateDirector }}</p>
              </div>
              <div v-if="movieData.credits?.artDirector" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Art Director</h4>
                <p class="text-theme-primary">{{ movieData.credits.artDirector }}</p>
              </div>
              <div v-if="movieData.credits?.costumeDesigner" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Costume Designer</h4>
                <p class="text-theme-primary">{{ movieData.credits.costumeDesigner }}</p>
              </div>
              <div v-if="movieData.credits?.makeupArtist" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Makeup & Hair</h4>
                <p class="text-theme-primary">{{ movieData.credits.makeupArtist }}</p>
              </div>
            </div>
          </div>

          <!-- Cast Section -->
          <div v-if="section.id === 'cast' && showCastSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Cast</h3>
            
            <!-- Lead Cast -->
            <div v-if="leadCast.length" class="mb-6 sm:mb-8">
              <h4 class="text-lg sm:text-xl font-semibold text-theme-primary mb-3 sm:mb-4">Lead Cast</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div v-for="(actor, index) in leadCast" :key="'lead-' + index" class="card p-4 flex items-center gap-4">
                  <div v-if="actor.photoUrl" class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img :src="getApiUrl(actor.photoUrl)" :alt="actor.name" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-14 h-14 rounded-full bg-panda-purple/30 flex items-center justify-center flex-shrink-0">
                    <span class="text-theme-primary font-bold text-lg">{{ actor.name?.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="text-theme-primary font-medium">{{ actor.name }}</p>
                    <p v-if="actor.role" class="text-theme-muted text-sm">{{ actor.role }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Supporting Cast -->
            <div v-if="supportingCast.length" class="mb-6 sm:mb-8">
              <h4 class="text-lg sm:text-xl font-semibold text-theme-primary mb-3 sm:mb-4">Supporting Cast</h4>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div v-for="(actor, index) in supportingCast" :key="'support-' + index" class="card p-3 flex items-center gap-3">
                  <div v-if="actor.photoUrl" class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img :src="getApiUrl(actor.photoUrl)" :alt="actor.name" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-10 h-10 rounded-full bg-panda-purple/30 flex items-center justify-center flex-shrink-0">
                    <span class="text-theme-primary text-sm font-bold">{{ actor.name?.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="text-theme-primary text-sm">{{ actor.name }}</p>
                    <p v-if="actor.role" class="text-theme-muted text-xs">{{ actor.role }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Special Appearances -->
            <div v-if="specialAppearances.length">
              <h4 class="text-lg sm:text-xl font-semibold text-theme-primary mb-3 sm:mb-4">Special Appearances</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div v-for="(appearance, index) in specialAppearances" :key="'special-' + index" class="card p-4 flex items-center gap-4">
                  <div v-if="appearance.photoUrl" class="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img :src="getApiUrl(appearance.photoUrl)" :alt="appearance.name" class="w-full h-full object-cover" />
                  </div>
                  <div v-else class="w-14 h-14 rounded-full bg-panda-gold/30 flex items-center justify-center flex-shrink-0">
                    <span class="text-theme-primary font-bold">{{ (appearance.artist || appearance.name)?.charAt(0) }}</span>
                  </div>
                  <div>
                    <p class="text-panda-gold text-sm">{{ appearance.type || 'Special Appearance' }}</p>
                    <p class="text-theme-primary font-medium">{{ appearance.artist || appearance.name }}</p>
                    <p v-if="appearance.role" class="text-theme-muted text-sm">{{ appearance.role }}</p>
                    <p v-if="appearance.choreographer" class="text-theme-dimmed text-xs">Choreography: {{ appearance.choreographer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Gallery -->
          <div v-if="section.id === 'gallery' && showGallerySection" class="movie-section-reveal">
            <div class="flex items-center justify-between mb-4 sm:mb-6">
              <h3 class="text-2xl sm:text-3xl font-bold gradient-text">Gallery</h3>
              <span class="text-theme-muted">{{ movieData.gallery.length }} images</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <div 
                v-for="(item, index) in displayedGalleryImages" 
                :key="index"
                class="relative group card overflow-hidden aspect-square cursor-pointer bg-theme-input"
                @click="openLightbox(index)"
              >
                <img 
                  :src="getApiUrl(item.url)" 
                  :alt="item.caption || `Gallery image ${index + 1}`"
                  class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-panda-darker via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div class="absolute bottom-0 left-0 right-0 p-4">
                    <p v-if="item.caption" class="text-white text-sm">{{ item.caption }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- View Full Gallery Button -->
            <div v-if="hasMoreGalleryImages" class="mt-4 sm:mt-6 text-center">
              <button 
                @click="showFullGallery = true" 
                class="px-6 py-3 bg-panda-purple/30 hover:bg-panda-purple/50 text-white rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                View All {{ movieData.gallery.length }} Images
              </button>
            </div>
          </div>

          <!-- Distribution -->
          <div v-if="section.id === 'distribution' && showDistributionSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Distribution</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="movieData.distribution?.distributor" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Distributor</h4>
                <div class="flex items-center gap-3">
                  <img v-if="movieData.distribution?.distributorLogo" :src="getApiUrl(movieData.distribution.distributorLogo)" alt="Distributor Logo" class="w-12 h-12 object-contain" />
                  <p class="text-theme-primary">{{ movieData.distribution.distributor }}</p>
                </div>
              </div>
              <div v-if="movieData.distribution?.platforms?.length" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Platforms</h4>
                <p class="text-theme-primary">{{ formatArrayOrString(movieData.distribution.platforms) }}</p>
              </div>
              <div v-if="movieData.distribution?.territories?.length" class="card p-4 sm:p-5">
                <h4 class="text-sm font-semibold text-panda-gold mb-2">Territories</h4>
                <p class="text-theme-primary">{{ formatArrayOrString(movieData.distribution.territories) }}</p>
              </div>
            </div>
          </div>

          <!-- Awards & Recognition -->
          <div v-if="section.id === 'awards' && showAwardsSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Awards & Recognition</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="(award, idx) in movieData.awards" :key="'award-' + idx" class="card p-4 sm:p-5">
                <div class="flex items-start gap-3">
                  <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', award.result === 'won' ? 'bg-yellow-500/20' : 'bg-gray-500/20']">
                    <svg v-if="award.result === 'won'" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 3h14l-1.5 2H6.5L5 3zm14.5 4H4.5l1 9h13l1-9zM12 18c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2z"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-theme-primary font-medium">{{ award.name }}</p>
                    <p v-if="award.category" class="text-theme-muted text-sm">{{ award.category }}</p>
                    <p class="text-xs mt-1">
                      <span :class="award.result === 'won' ? 'text-yellow-400' : 'text-gray-400'">
                        {{ award.result === 'won' ? 'Winner' : 'Nominated' }}
                      </span>
                      <span v-if="award.year" class="text-theme-muted"> • {{ award.year }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media -->
          <div v-if="section.id === 'socialMedia' && showSocialMediaSection" class="movie-section-reveal">
            <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Follow</h3>
            <div class="flex flex-wrap gap-4">
              <a v-if="movieData.socialMedia.instagram" :href="movieData.socialMedia.instagram" target="_blank" class="card p-4 hover:bg-panda-purple/20 transition-colors">
                <span class="text-pink-400">Instagram</span>
              </a>
              <a v-if="movieData.socialMedia.facebook" :href="movieData.socialMedia.facebook" target="_blank" class="card p-4 hover:bg-panda-purple/20 transition-colors">
                <span class="text-blue-400">Facebook</span>
              </a>
              <a v-if="movieData.socialMedia.youtube" :href="movieData.socialMedia.youtube" target="_blank" class="card p-4 hover:bg-panda-purple/20 transition-colors">
                <span class="text-red-400">YouTube</span>
              </a>
              <a v-if="movieData.socialMedia.twitter" :href="movieData.socialMedia.twitter" target="_blank" class="card p-4 hover:bg-panda-purple/20 transition-colors">
                <span class="text-blue-300">Twitter</span>
              </a>
            </div>
          </div>
        </template>

        <!-- Festival Selections (not part of orderable sections) -->
        <div v-if="movieData.festivalSelections?.length" class="movie-section-reveal">
          <h3 class="text-2xl sm:text-3xl font-bold gradient-text mb-4 sm:mb-6">Festival Selections & Awards</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              v-for="(festival, index) in movieData.festivalSelections" 
              :key="index"
              class="flex items-center space-x-3 card p-4"
            >
              <svg class="w-6 h-6 text-panda-gold flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span class="text-theme-secondary">{{ festival }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Gallery Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="showFullGallery" 
          class="fixed inset-0 z-[60] bg-black overflow-y-auto"
          @click.self="showFullGallery = false"
        >
          <div class="min-h-screen p-3 md:p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-4 sticky top-0 bg-black/90 backdrop-blur-sm py-3 -mt-3 -mx-3 px-3 md:-mx-6 md:px-6 z-10">
              <h3 class="text-xl font-bold text-white">{{ movieData.title }} - Gallery ({{ movieData.gallery.length }})</h3>
              <button 
                @click="showFullGallery = false" 
                class="p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors"
              >
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <!-- Gallery Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
              <div 
                v-for="(item, index) in movieData.gallery" 
                :key="'full-' + index"
                class="relative group aspect-square cursor-pointer rounded overflow-hidden bg-gray-900"
                @click="openLightbox(index)"
              >
                <img 
                  :src="getApiUrl(item.url)" 
                  :alt="item.caption || `Gallery image ${index + 1}`"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Image Lightbox -->
    <Teleport to="body">
      <Transition name="fade">
        <div 
          v-if="lightboxOpen" 
          class="fixed inset-0 z-[70] bg-black flex items-center justify-center"
          @click.self="closeLightbox"
        >
          <!-- Close Button -->
          <button 
            @click="closeLightbox" 
            class="absolute top-4 right-4 p-3 bg-white/30 hover:bg-white/50 rounded-full transition-colors z-20"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Previous Button -->
          <button 
            v-if="movieData?.gallery?.length > 1"
            @click="prevImage" 
            class="absolute left-4 p-3 bg-white/30 hover:bg-white/50 rounded-full transition-colors z-20"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Next Button -->
          <button 
            v-if="movieData?.gallery?.length > 1"
            @click="nextImage" 
            class="absolute right-4 p-3 bg-white/30 hover:bg-white/50 rounded-full transition-colors z-20"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Image Container -->
          <div class="max-w-[90vw] max-h-[85vh] flex flex-col items-center">
            <img 
              :src="getApiUrl(currentLightboxImage?.url)" 
              :alt="currentLightboxImage?.caption || 'Gallery image'"
              class="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <!-- Caption & Counter -->
            <div class="mt-4 text-center">
              <p v-if="currentLightboxImage?.caption" class="text-white text-lg mb-2">{{ currentLightboxImage.caption }}</p>
              <p class="text-gray-400 text-sm">{{ lightboxIndex + 1 }} / {{ movieData?.gallery?.length }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSiteStore } from '@/stores/site';
import LazyImage from '@/components/LazyImage.vue';
import { useSeoHead, setSeoHead } from '@/composables/useSeoHead';
import { getApiUrl } from '@/utils/imageUrl';

const pageRef = ref(null);
const isSynopsisExpanded = ref(false);

const route = useRoute();
const router = useRouter();
const siteStore = useSiteStore();

// Initialize SEO composable (will update dynamically)
const { updateSeo } = useSeoHead();

const loading = ref(true);
const error = ref(null);
const movieData = ref(null);

// Gallery state
const showFullGallery = ref(false);
const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

// Fetch movie data
onMounted(async () => {
  try {
    await siteStore.fetchMovies();
    const slug = route.params.slug;
    const movie = siteStore.movies.find(m => m.slug === slug);
    
    if (movie) {
      movieData.value = movie;
      
      // Try to fetch page-specific SEO first
      const pageSeo = await siteStore.fetchSeoBySlug(`movie-${slug}`);
      
      // If no specific SEO found, generate dynamic SEO from movie data
      if (!pageSeo || !pageSeo.metaTitle) {
        const dynamicSeo = {
          metaTitle: `${movie.title} | ${movie.year || ''} | WHITE PANDA CREATIONS`,
          metaDescription: movie.synopsis || movie.description || `Watch ${movie.title} - A WHITE PANDA CREATIONS production`,
          metaKeywords: [movie.title, ...(movie.genres || []), 'WHITE PANDA CREATIONS', movie.language || 'Marathi', 'movie'],
          ogTitle: movie.title,
          ogDescription: movie.tagline || movie.synopsis?.substring(0, 200) || movie.description?.substring(0, 200),
          ogImage: movie.posterUrl || movie.bannerUrl,
          ogType: 'video.movie',
          twitterCard: 'summary_large_image',
          canonicalUrl: `https://whitepandacreations.com/movie/${slug}`,
          schemaJson: {
            '@context': 'https://schema.org',
            '@type': 'Movie',
            'name': movie.title,
            'description': movie.synopsis || movie.description,
            'datePublished': movie.year,
            'genre': movie.genres || [],
            'inLanguage': movie.language || 'mr',
            'image': movie.posterUrl,
            'director': movie.credits?.director ? { '@type': 'Person', 'name': movie.credits.director } : undefined,
            'productionCompany': { '@type': 'Organization', 'name': 'WHITE PANDA CREATIONS' }
          }
        };
        updateSeo(dynamicSeo);
      } else {
        updateSeo(pageSeo);
      }

      // Animation classes handled via CSS in template
    } else {
      error.value = 'The movie you are looking for does not exist.';
    }
  } catch (err) {
    error.value = 'Failed to load movie details.';
  } finally {
    loading.value = false;
  }
});

// Convert YouTube/Vimeo URLs to embeddable format
const getEmbedUrl = (url) => {
  if (!url) return '';
  
  // Don't process local/uploaded videos - resolve to full API URL
  if (url.startsWith('/uploads/')) {
    return getApiUrl(url);
  }
  
  const youtubeRegex = /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const youtubeMatch = url.match(youtubeRegex);
  if (youtubeMatch) {
    return `https://www.youtube-nocookie.com/embed/${youtubeMatch[1]}?rel=0&modestbranding=1&playsinline=1&enablejsapi=0`;
  }
  
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = url.match(vimeoRegex);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?dnt=1&playsinline=1`;
  }
  
  return url;
};

// Computed embed URL for trailer
const trailerEmbedUrl = computed(() => {
  if (!movieData.value?.trailer?.url) return '';
  // For local videos, return the URL as-is (don't try to embed)
  if (movieData.value.trailer.type === 'local' || movieData.value.trailer.url.startsWith('/uploads/')) {
    return movieData.value.trailer.url;
  }
  return getEmbedUrl(movieData.value.trailer.url);
});

// Display only featured images in the main view (max 6)
const displayedGalleryImages = computed(() => {
  if (!movieData.value?.gallery) return [];
  const gallery = movieData.value.gallery;
  
  const featured = gallery.filter(img => img.featured);
  // Show only featured images (max 6), if no featured images show nothing
  return featured.slice(0, 6);
});

// Check if there are more images than featured ones
const hasMoreGalleryImages = computed(() => {
  if (!movieData.value?.gallery) return false;
  const totalImages = movieData.value.gallery.length;
  const featuredCount = displayedGalleryImages.value.length;
  return totalImages > featuredCount;
});

// Current lightbox image
const currentLightboxImage = computed(() => {
  if (!movieData.value?.gallery || lightboxIndex.value < 0) return null;
  return movieData.value.gallery[lightboxIndex.value];
});

// Parse genres from string or array
const movieGenres = computed(() => {
  if (!movieData.value) return [];
  const genres = movieData.value.genre || movieData.value.genres;
  if (!genres) return [];
  if (Array.isArray(genres)) return genres;
  if (typeof genres === 'string') return genres.split(',').map(g => g.trim());
  return [];
});

// Cast helpers
const leadCast = computed(() => movieData.value?.credits?.leadCast || []);
const supportingCast = computed(() => movieData.value?.credits?.supportingCast || []);
const specialAppearances = computed(() => movieData.value?.credits?.specialAppearances || []);

// Crew helpers - combine old string format with new object format
const getProducersList = computed(() => {
  if (!movieData.value?.credits) return [];
  const c = movieData.value.credits;
  const result = [];
  
  // New format (objects with name, role, photoUrl)
  if (c.producers?.length) {
    result.push(...c.producers.map(p => ({
      name: typeof p === 'string' ? p : p.name,
      role: p.role || '',
      photoUrl: p.photoUrl || ''
    })));
  }
  
  // Old format (string array)
  if (c.producer?.length && !c.producers?.length) {
    result.push(...c.producer.map(name => ({
      name: typeof name === 'string' ? name : name.name,
      role: '',
      photoUrl: ''
    })));
  }
  
  return result;
});

const getDirectorsList = computed(() => {
  if (!movieData.value?.credits) return [];
  const c = movieData.value.credits;
  const result = [];
  
  // New format (objects)
  if (c.directors?.length) {
    result.push(...c.directors.map(d => ({
      name: typeof d === 'string' ? d : d.name,
      role: d.role || '',
      photoUrl: d.photoUrl || ''
    })));
  }
  
  // Old format (single string)
  if (c.director && !c.directors?.length) {
    result.push({
      name: c.director,
      role: '',
      photoUrl: ''
    });
  }
  
  return result;
});

const getWritersList = computed(() => {
  if (!movieData.value?.credits) return [];
  const c = movieData.value.credits;
  const result = [];
  
  // New format (objects)
  if (c.writers?.length) {
    result.push(...c.writers.map(w => ({
      name: typeof w === 'string' ? w : w.name,
      role: w.role || '',
      photoUrl: w.photoUrl || ''
    })));
  }
  
  // Old format (string array)
  if (c.writer?.length && !c.writers?.length) {
    result.push(...c.writer.map(name => ({
      name: typeof name === 'string' ? name : name.name,
      role: '',
      photoUrl: ''
    })));
  }
  
  return result;
});

const hasCast = computed(() => {
  return leadCast.value.length > 0 || supportingCast.value.length > 0 || specialAppearances.value.length > 0;
});

const hasProductionCredits = computed(() => {
  if (!movieData.value?.credits) return false;
  const c = movieData.value.credits;
  return c.producer?.length || c.producers?.length || c.executiveProducer?.length || c.productionHouse;
});

const hasCreativeCredits = computed(() => {
  if (!movieData.value?.credits) return false;
  const c = movieData.value.credits;
  return c.director || c.directors?.length || c.writer?.length || c.writers?.length || c.cinematography || c.cinematographer || c.musicDirector || c.backgroundMusic || c.backgroundScore || c.editor;
});

const hasProductionTeam = computed(() => {
  if (!movieData.value?.credits) return false;
  const c = movieData.value.credits;
  return c.productionManager || c.associateDirector || c.artDirector || c.costumeDesigner || c.makeupArtist;
});

const hasDistribution = computed(() => {
  if (!movieData.value?.distribution) return false;
  const d = movieData.value.distribution;
  return d.distributor || d.platforms?.length || d.territories?.length;
});

// Helper computed for array fields
const getPlaybackSingers = computed(() => {
  const singers = movieData.value?.credits?.playbackSingers;
  if (!singers) return '';
  return Array.isArray(singers) ? singers.join(', ') : singers;
});

const getLyricist = computed(() => {
  const lyricist = movieData.value?.credits?.lyricist;
  if (!lyricist) return '';
  return Array.isArray(lyricist) ? lyricist.join(', ') : lyricist;
});

const getChoreographer = computed(() => {
  const choreographer = movieData.value?.credits?.choreographer;
  if (!choreographer) return '';
  return Array.isArray(choreographer) ? choreographer.join(', ') : choreographer;
});

// Section visibility helpers based on displayOrder
const isSectionVisible = (sectionId) => {
  const sections = movieData.value?.displayOrder?.sections;
  if (!sections || !sections.length) return true; // Show all if no displayOrder set
  const section = sections.find(s => s.id === sectionId);
  return section ? section.visible !== false : true;
};

// Computed section visibility flags
const showProductionSection = computed(() => hasProductionCredits.value && isSectionVisible('production'));
const showCreativeSection = computed(() => hasCreativeCredits.value && isSectionVisible('creative'));
const showProductionTeamSection = computed(() => hasProductionTeam.value && isSectionVisible('productionTeam'));
const showCastSection = computed(() => hasCast.value && isSectionVisible('cast'));
const showGallerySection = computed(() => movieData.value?.gallery?.length && isSectionVisible('gallery'));
const showDistributionSection = computed(() => hasDistribution.value && isSectionVisible('distribution'));
const showAwardsSection = computed(() => movieData.value?.awards?.length && isSectionVisible('awards'));
const showSocialMediaSection = computed(() => hasSocialMedia.value && isSectionVisible('socialMedia'));

// Default section order
const defaultSectionOrder = [
  { id: 'production', order: 0 },
  { id: 'creative', order: 1 },
  { id: 'productionTeam', order: 2 },
  { id: 'cast', order: 3 },
  { id: 'gallery', order: 4 },
  { id: 'distribution', order: 5 },
  { id: 'awards', order: 6 },
  { id: 'socialMedia', order: 7 }
];

// Ordered sections computed - respects saved order from displayOrder
const awardsSectionTitle = computed(() => {
  const hasSelections = movieData.value?.festivalSelections?.length > 0;
  return hasSelections ? 'Awards, Recognition & Selections' : 'Awards & Recognition';
});

const orderedSections = computed(() => {
  const savedSections = movieData.value?.displayOrder?.sections;
  
  if (savedSections && savedSections.length) {
    // Use saved order - sort by order field
    return [...savedSections].sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  
  // Return default order if no saved order
  return defaultSectionOrder;
});

const hasSocialMedia = computed(() => {
  if (!movieData.value?.socialMedia) return false;
  const s = movieData.value.socialMedia;
  return s.instagram || s.facebook || s.youtube || s.twitter;
});

// Format array or string to display
const formatArrayOrString = (value) => {
  if (!value) return '';
  if (Array.isArray(value)) {
    if (value.length > 0 && typeof value[0] === 'object' && value[0].name) {
      return value.map(v => v.name).join(', ');
    }
    return value.join(', ');
  }
  return value;
};

const goBack = () => {
  if (window.history.length > 2) {
    router.back();
  } else {
    router.push('/');
  }
};

// Lightbox functions
const openLightbox = (index) => {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
};

const closeLightbox = () => {
  lightboxOpen.value = false;
};

const nextImage = () => {
  if (!movieData.value?.gallery) return;
  lightboxIndex.value = (lightboxIndex.value + 1) % movieData.value.gallery.length;
};

const prevImage = () => {
  if (!movieData.value?.gallery) return;
  lightboxIndex.value = lightboxIndex.value === 0 
    ? movieData.value.gallery.length - 1 
    : lightboxIndex.value - 1;
};

// Keyboard navigation for lightbox
const handleKeydown = (e) => {
  if (lightboxOpen.value) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  } else if (showFullGallery.value && e.key === 'Escape') {
    showFullGallery.value = false;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
  // Ensure scroll trigger and event listeners are cleaned up properly when the route changes or component is unmounted
  window.removeEventListener('keydown', handleKeydown);
});

// Prevent body scroll when gallery/lightbox is open
watch([showFullGallery, lightboxOpen], ([gallery, lightbox]) => {
  if (gallery || lightbox) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

