<template>
  <div class="min-h-screen bg-theme-gradient animate-pulse">
    <!-- Hero Skeleton -->
    <div class="relative h-[60vh] bg-theme-secondary">
      <div class="absolute inset-0 bg-gradient-to-t from-panda-darker to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-8 md:p-16">
        <div class="container-custom space-y-4">
          <div class="skeleton h-12 w-3/4 max-w-md rounded-lg"></div>
          <div class="skeleton h-6 w-1/2 max-w-xs rounded-lg"></div>
          <div class="flex gap-4 mt-6">
            <div class="skeleton h-12 w-32 rounded-lg"></div>
            <div class="skeleton h-12 w-32 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Content Skeleton -->
    <div class="container-custom px-6 py-16 space-y-16">
      <!-- Section 1 -->
      <div class="space-y-6">
        <div class="text-center space-y-4">
          <div class="skeleton h-10 w-64 mx-auto rounded-lg"></div>
          <div class="skeleton h-1 w-24 mx-auto rounded-full"></div>
          <div class="skeleton h-5 w-96 mx-auto rounded-lg"></div>
        </div>
        
        <!-- Card Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div v-for="i in 3" :key="i" class="card p-0 overflow-hidden">
            <div class="skeleton aspect-[2/3] w-full"></div>
            <div class="p-6 space-y-3">
              <div class="skeleton h-6 w-3/4 rounded-lg"></div>
              <div class="skeleton h-4 w-1/2 rounded-lg"></div>
              <div class="flex gap-2">
                <div class="skeleton h-6 w-16 rounded-full"></div>
                <div class="skeleton h-6 w-16 rounded-full"></div>
              </div>
              <div class="skeleton h-4 w-full rounded-lg"></div>
              <div class="skeleton h-4 w-5/6 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Section 2 -->
      <div class="space-y-6">
        <div class="text-center space-y-4">
          <div class="skeleton h-10 w-48 mx-auto rounded-lg"></div>
          <div class="skeleton h-1 w-24 mx-auto rounded-full"></div>
        </div>
        
        <div class="grid md:grid-cols-2 gap-12 mt-12">
          <div class="space-y-4">
            <div class="skeleton h-5 w-full rounded-lg"></div>
            <div class="skeleton h-5 w-5/6 rounded-lg"></div>
            <div class="skeleton h-5 w-4/5 rounded-lg"></div>
            <div class="skeleton h-5 w-full rounded-lg"></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="i in 4" :key="i" class="card p-6">
              <div class="skeleton h-10 w-20 mx-auto rounded-lg mb-2"></div>
              <div class="skeleton h-4 w-16 mx-auto rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Page loading skeleton component
// Displays while page components are being loaded via Suspense
</script>

<style scoped>
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-bg-input) 25%,
    var(--color-bg-card) 50%,
    var(--color-bg-input) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

