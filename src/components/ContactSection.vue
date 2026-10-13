<template>
  <section 
    id="contact" 
    ref="sectionRef" 
    class="section-padding relative overflow-hidden"
    aria-labelledby="contact-heading"
  >
    <div class="container-custom">
      <div class="max-w-4xl mx-auto text-center mb-16 contact-header-reveal">
        <h2 id="contact-heading" class="section-title">Get In Touch</h2>
        <div class="w-24 h-1 bg-gradient-to-r from-panda-purple to-panda-gold mx-auto mb-8" aria-hidden="true"></div>
        <p class="text-lg text-theme-muted">
          Let's create something extraordinary together
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <!-- Contact Information -->
        <div class="space-y-8 contact-info-reveal">
          <address class="not-italic">
            <div class="card p-6 flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-panda-purple/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <svg class="w-6 h-6 text-panda-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-theme-primary mb-2">Address</h3>
                <p class="text-theme-muted">{{ companyInfo.address }}</p>
              </div>
            </div>

            <div class="card p-6 flex items-start space-x-4 mt-8">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-panda-purple/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <svg class="w-6 h-6 text-panda-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-theme-primary mb-2">Email</h3>
                <a :href="`mailto:${companyInfo.email}`" class="text-panda-gold hover:text-panda-gold-light transition-colors focus-ring rounded">
                  {{ companyInfo.email }}
                </a>
              </div>
            </div>

            <div class="card p-6 flex items-start space-x-4 mt-8">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-panda-purple/20 rounded-lg flex items-center justify-center" aria-hidden="true">
                  <svg class="w-6 h-6 text-panda-purple" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-theme-primary mb-2">Phone</h3>
                <a :href="`tel:${companyInfo.phone}`" class="text-panda-gold hover:text-panda-gold-light transition-colors focus-ring rounded">
                  {{ companyInfo.phone }}
                </a>
              </div>
            </div>
          </address>
        </div>

        <!-- Contact Form -->
        <div class="contact-form-reveal">
          <form 
            @submit.prevent="handleSubmit" 
            class="space-y-6"
            novalidate
            aria-label="Contact form"
          >
            <div>
              <label for="name" class="block text-sm font-medium text-theme-secondary mb-2">
                Name <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="name"
                v-model.trim="form.name"
                required
                minlength="2"
                maxlength="100"
                autocomplete="name"
                :aria-invalid="errors.name ? 'true' : 'false'"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                class="w-full px-4 py-3 bg-theme-input border rounded-lg focus:outline-none focus:border-panda-purple transition-colors text-theme-primary focus-ring"
                :class="errors.name ? 'border-red-500' : 'border-theme'"
                placeholder="Your name"
                @blur="validateField('name')"
              />
              <p v-if="errors.name" id="name-error" class="mt-1 text-sm text-red-400" role="alert">
                {{ errors.name }}
              </p>
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-theme-secondary mb-2">
                Email <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                type="email"
                id="email"
                v-model.trim="form.email"
                required
                autocomplete="email"
                :aria-invalid="errors.email ? 'true' : 'false'"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                class="w-full px-4 py-3 bg-theme-input border rounded-lg focus:outline-none focus:border-panda-purple transition-colors text-theme-primary focus-ring"
                :class="errors.email ? 'border-red-500' : 'border-theme'"
                placeholder="your@email.com"
                @blur="validateField('email')"
              />
              <p v-if="errors.email" id="email-error" class="mt-1 text-sm text-red-400" role="alert">
                {{ errors.email }}
              </p>
            </div>

            <div>
              <label for="subject" class="block text-sm font-medium text-theme-secondary mb-2">
                Subject <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <input
                type="text"
                id="subject"
                v-model.trim="form.subject"
                required
                minlength="3"
                maxlength="200"
                :aria-invalid="errors.subject ? 'true' : 'false'"
                :aria-describedby="errors.subject ? 'subject-error' : undefined"
                class="w-full px-4 py-3 bg-theme-input border rounded-lg focus:outline-none focus:border-panda-purple transition-colors text-theme-primary focus-ring"
                :class="errors.subject ? 'border-red-500' : 'border-theme'"
                placeholder="What's this about?"
                @blur="validateField('subject')"
              />
              <p v-if="errors.subject" id="subject-error" class="mt-1 text-sm text-red-400" role="alert">
                {{ errors.subject }}
              </p>
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-theme-secondary mb-2">
                Message <span class="text-red-400" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                v-model.trim="form.message"
                required
                minlength="10"
                maxlength="2000"
                rows="5"
                :aria-invalid="errors.message ? 'true' : 'false'"
                :aria-describedby="errors.message ? 'message-error' : 'message-hint'"
                class="w-full px-4 py-3 bg-theme-input border rounded-lg focus:outline-none focus:border-panda-purple transition-colors text-theme-primary resize-none focus-ring"
                :class="errors.message ? 'border-red-500' : 'border-theme'"
                placeholder="Tell us about your project..."
                @blur="validateField('message')"
              ></textarea>
              <p id="message-hint" class="mt-1 text-xs text-theme-dimmed">
                {{ form.message.length }}/2000 characters
              </p>
              <p v-if="errors.message" id="message-error" class="mt-1 text-sm text-red-400" role="alert">
                {{ errors.message }}
              </p>
            </div>

            <button 
              type="submit" 
              class="btn-primary btn-interactive w-full flex items-center justify-center gap-2 focus-ring" 
              :disabled="submitting || !isFormValid"
              :aria-busy="submitting"
            >
              <svg v-if="submitting" class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ submitting ? 'Sending...' : 'Send Message' }}
            </button>
          </form>
          
          <!-- Success Message -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="formSubmitted" class="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg" role="status" aria-live="polite">
              <div class="flex items-center gap-2 text-green-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="font-medium">Thank you! We'll get back to you soon.</span>
              </div>
            </div>
          </Transition>
          
          <!-- Error Message -->
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="errorMessage" class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg" role="alert">
              <div class="flex items-center gap-2 text-red-400">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                <span class="font-medium">{{ errorMessage }}</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSiteStore } from '@/stores/site';
import { companyInfo as fallbackCompanyInfo } from '@/config/siteConfig';
import { messagesAPI } from '@/services/api';

gsap.registerPlugin(ScrollTrigger);

const siteStore = useSiteStore();
const sectionRef = ref(null);

let ctx;

onMounted(() => {
  siteStore.fetchCompany();

  // Allow CSS layout to settle securely in the DOM
  setTimeout(() => {
    // GSAP Scroll Animations
    ctx = gsap.context(() => {
    gsap.from('.contact-header-reveal', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 95%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.contact-info-reveal', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%',
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.contact-form-reveal', {
      scrollTrigger: {
        trigger: '#contact',
        start: 'top 85%',
      },
      x: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2
    });
    
    // Force recalculation after setup
    ScrollTrigger.refresh();
  });
}, 100);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});

const companyInfo = computed(() => siteStore.company || fallbackCompanyInfo);

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const formSubmitted = ref(false);
const submitting = ref(false);
const errorMessage = ref('');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate individual field
const validateField = (field) => {
  switch (field) {
    case 'name':
      if (!form.name) {
        errors.name = 'Name is required';
      } else if (form.name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
      } else {
        errors.name = '';
      }
      break;
    case 'email':
      if (!form.email) {
        errors.email = 'Email is required';
      } else if (!emailRegex.test(form.email)) {
        errors.email = 'Please enter a valid email address';
      } else {
        errors.email = '';
      }
      break;
    case 'subject':
      if (!form.subject) {
        errors.subject = 'Subject is required';
      } else if (form.subject.length < 3) {
        errors.subject = 'Subject must be at least 3 characters';
      } else {
        errors.subject = '';
      }
      break;
    case 'message':
      if (!form.message) {
        errors.message = 'Message is required';
      } else if (form.message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
      } else {
        errors.message = '';
      }
      break;
  }
};

// Validate all fields
const validateForm = () => {
  validateField('name');
  validateField('email');
  validateField('subject');
  validateField('message');
  return !errors.name && !errors.email && !errors.subject && !errors.message;
};

// Check if form is valid
const isFormValid = computed(() => {
  return form.name && form.email && form.subject && form.message && 
         emailRegex.test(form.email) && 
         form.name.length >= 2 && 
         form.subject.length >= 3 && 
         form.message.length >= 10;
});

const handleSubmit = async () => {
  // Validate all fields before submission
  if (!validateForm()) {
    return;
  }
  
  submitting.value = true;
  errorMessage.value = '';
  
  try {
    await messagesAPI.send({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message
    });
    formSubmitted.value = true;
    
    // Reset form after success
    setTimeout(() => {
      form.name = '';
      form.email = '';
      form.subject = '';
      form.message = '';
      formSubmitted.value = false;
    }, 5000);
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Failed to send message. Please try again.';
    console.error('Form submission error:', error);
  } finally {
    submitting.value = false;
  }
};
</script>

