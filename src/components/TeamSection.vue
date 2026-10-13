<template>
  <section id="team" ref="sectionRef" class="section-padding bg-theme-secondary">
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 team-header-reveal">
        <h2 class="section-title">Our Teams</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8"></div>
        <p class="text-lg text-theme-muted">
          Meet the talented people behind WHITE PANDA CREATIONS
        </p>
      </div>

      <!-- Role Filter (optional - shows only if multiple roles exist) -->
      <div v-if="uniqueRoles.length > 1" class="flex flex-wrap justify-center gap-2 mb-12">
        <button
          @click="selectedRole = ''"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
            selectedRole === '' 
              ? 'bg-panda-purple text-white' 
              : 'bg-theme-primary/10 text-theme-muted hover:bg-panda-purple/20'
          ]"
        >
          All
        </button>
        <button
          v-for="role in uniqueRoles"
          :key="role"
          @click="selectedRole = role"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
            selectedRole === role 
              ? 'bg-panda-purple text-white' 
              : 'bg-theme-primary/10 text-theme-muted hover:bg-panda-purple/20'
          ]"
        >
          {{ role }}
        </button>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(member, index) in filteredTeam" 
          :key="member._id || member.id || index"
          class="filter-item bg-theme-secondary rounded-2xl overflow-hidden shadow-lg border border-theme animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Member Photo -->
          <div class="relative overflow-hidden aspect-square">
            <LazyImage 
              :src="member.photoUrl" 
              :thumbnail-src="member.thumbnailUrl"
              :alt="member.name"
              aspect-ratio="1/1"
              bg-color="#1a1a2e"
              class="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-panda-darker via-transparent opacity-60 pointer-events-none"></div>
            
            <!-- Role Badge -->
            <div class="absolute bottom-4 left-4 bg-panda-purple/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span class="text-white text-xs font-semibold">{{ member.displayRole || member.role }}</span>
            </div>
          </div>

          <!-- Member Info -->
          <div class="p-6">
            <h3 class="text-2xl font-bold text-theme-primary mb-1">{{ member.name }}</h3>
            <p v-if="member.title" class="text-panda-gold font-semibold mb-2">{{ member.title }}</p>
            <p v-if="member.company" class="text-theme-muted text-sm mb-3">{{ member.company }}</p>
            <p class="text-theme-muted text-sm leading-relaxed mb-6">{{ member.shortBio || member.bio }}</p>

            <!-- Social Links -->
            <div class="flex items-center space-x-4">
              <a 
                v-if="member.social?.instagram"
                :href="member.social.instagram" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-theme-muted hover:text-panda-purple transition-colors"
                aria-label="Instagram"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                v-if="member.social?.twitter"
                :href="member.social.twitter" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-theme-muted hover:text-panda-purple transition-colors"
                aria-label="Twitter"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <a 
                v-if="member.social?.linkedin"
                :href="member.social.linkedin" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-theme-muted hover:text-panda-purple transition-colors"
                aria-label="LinkedIn"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              <a 
                v-if="member.social?.imdb"
                :href="member.social.imdb" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-theme-muted hover:text-panda-gold transition-colors"
                aria-label="IMDB"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.31 9.588v.01c-.278-.014-.495-.127-.495-.127-.227-.093-.2-.275-.2-.275v4.578c0 .13.05.193.05.193.072.139.196.178.196.178.238.103.479.02.479.02l-.01.01c.308.097.508.216.508.216.227.156.277.42.277.569v.322c0 .297-.129.417-.129.417-.153.24-.546.217-.546.217H8.467s-.477.029-.7-.244c0 0-.148-.139-.148-.455V7.638c0-.162.04-.261.04-.261.069-.214.228-.289.228-.289.153-.091.467-.091.467-.091h5.618s.298-.019.523.118c0 0 .164.082.249.297 0 0 .05.118.05.263v1.351c0 .133-.046.211-.046.211-.089.222-.318.351-.318.351l.001.001zm-1.819-1.478H10.13v3.601h2.36v-3.6-001zm2.39 3.601h2.364v-3.6H14.88v3.6h.001zm-7.108-3.6H5.46v3.6h1.804c.308 0 .47-.238.47-.238.108-.166.108-.418.108-.418V9.032s.009-.192-.088-.359c0 0-.095-.162-.401-.162h.001-001zm11.247-3.6H4.989s-.457-.001-.663.216c0 0-.142.133-.142.456v11.234c0 .284.123.42.123.42.154.247.69.255.69.255h13.986s.503.046.695-.21c0 0 .163-.139.163-.497v-11.2c0-.333-.149-.459-.149-.459-.191-.215-.651-.215-.651-.215h.001z"/>
                </svg>
              </a>

              <a 
                v-if="member.social?.website"
                :href="member.social.website" 
                target="_blank"
                rel="noopener noreferrer"
                class="text-theme-muted hover:text-panda-purple transition-colors"
                aria-label="Website"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clip-rule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref, onUnmounted, nextTick } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteStore } from '@/stores/site';
import LazyImage from '@/components/LazyImage.vue';

gsap.registerPlugin(ScrollTrigger);

const siteStore = useSiteStore();
const selectedRole = ref('');
const sectionRef = ref(null);

let ctx;

onMounted(async () => {
  await siteStore.fetchTeam();

  // Allow CSS Grid and image dimensions to settle securely in the DOM
  setTimeout(() => {
    // GSAP Scroll Animations
    ctx = gsap.context(() => {
    gsap.from('.team-header-reveal', {
      scrollTrigger: {
        trigger: '#team',
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    // Force recalculation after setup
    ScrollTrigger.refresh();
  });
}, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

// Get all team members with proper mapping
const teamMembers = computed(() => {
  return siteStore.team.map(m => ({
    ...m,
    photoUrl: m.photoUrl || m.image,
    thumbnailUrl: m.thumbnailUrl,
    social: m.social || m.socialLinks || {},
    // Use custom role if role is 'Other'
    displayRole: m.role === 'Other' && m.customRole ? m.customRole : m.role
  }));
});

// Get unique roles for filtering
const uniqueRoles = computed(() => {
  const roles = new Set();
  teamMembers.value.forEach(m => {
    if (m.displayRole) roles.add(m.displayRole);
  });
  return Array.from(roles).sort();
});

// Filter members by selected role
const filteredMembers = computed(() => {
  if (!selectedRole.value) return teamMembers.value;
  return teamMembers.value.filter(m => m.displayRole === selectedRole.value);
});
</script>
