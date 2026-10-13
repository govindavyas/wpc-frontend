<template>
  <div class="careers-page" :class="{ 'light-theme': theme === 'light' }">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-title">Join Our Team</h1>
        <p class="hero-subtitle">Be Part of Creating Cinematic Excellence</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <!-- Introduction -->
      <section class="intro-section">
        <h2>Careers at White Panda Creations</h2>
        <p>
          At White Panda Creations, we're always looking for passionate and talented individuals who share our vision
          for creating exceptional cinematic experiences. Join us in shaping the future of storytelling.
        </p>
      </section>

      <!-- Job Listings -->
      <section class="jobs-section">
        <h2>Current Openings</h2>
        
        <!-- No Jobs Available -->
        <div v-if="!loading && jobs.length === 0" class="no-jobs">
          <div class="no-jobs-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h3>No Current Openings</h3>
          <p>
            We don't have any open positions at the moment, but we're always interested in hearing from talented individuals.
            Feel free to send us your resume and we'll keep it on file for future opportunities.
          </p>
          <button @click="showGeneralApplication = true" class="btn-primary">
            Submit Your Resume
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="loading">
          <div class="spinner"></div>
          <p>Loading opportunities...</p>
        </div>

        <!-- Job Cards -->
        <div v-if="!loading && jobs.length > 0" class="jobs-grid">
          <div v-for="job in jobs" :key="job._id" class="job-card">
            <div class="job-header">
              <h3>{{ job.title }}</h3>
              <span class="job-type">{{ job.jobType }}</span>
            </div>
            <div class="job-meta">
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
                {{ job.department }}
              </span>
              <span class="meta-item">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {{ job.location }}
              </span>
            </div>
            <p class="job-description">{{ truncateText(job.description, 150) }}</p>
            <button @click="openJobDetails(job)" class="btn-view">
              View Details & Apply
            </button>
          </div>
        </div>
      </section>

      <!-- Culture Section -->
      <section class="culture-section">
        <h2>Why Work With Us?</h2>
        <div class="culture-grid">
          <div class="culture-card">
            <div class="culture-icon">🎬</div>
            <h3>Creative Environment</h3>
            <p>Work on exciting projects with creative freedom and cutting-edge technology.</p>
          </div>
          <div class="culture-card">
            <div class="culture-icon">🌟</div>
            <h3>Growth Opportunities</h3>
            <p>Continuous learning and career development in the film industry.</p>
          </div>
          <div class="culture-card">
            <div class="culture-icon">🤝</div>
            <h3>Collaborative Team</h3>
            <p>Join a passionate team of professionals who support each other.</p>
          </div>
          <div class="culture-card">
            <div class="culture-icon">💡</div>
            <h3>Innovation</h3>
            <p>Be part of innovative storytelling and production techniques.</p>
          </div>
        </div>
      </section>
    </div>

    <!-- Job Details Modal -->
    <div v-if="selectedJob" class="modal-overlay" @click="closeJobDetails">
      <div class="modal-content" @click.stop>
        <button @click="closeJobDetails" class="modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="modal-header">
          <h2>{{ selectedJob.title }}</h2>
          <div class="job-meta">
            <span class="meta-item">{{ selectedJob.department }}</span>
            <span class="meta-item">{{ selectedJob.location }}</span>
            <span class="job-type">{{ selectedJob.jobType }}</span>
          </div>
          <p v-if="selectedJob.salaryRange" class="salary-range">{{ selectedJob.salaryRange }}</p>
        </div>

        <div class="modal-body">
          <div class="job-section">
            <h3>About the Role</h3>
            <p>{{ selectedJob.description }}</p>
          </div>

          <div class="job-section">
            <h3>Responsibilities</h3>
            <div v-html="formatText(selectedJob.responsibilities)"></div>
          </div>

          <div class="job-section">
            <h3>Requirements</h3>
            <div v-html="formatText(selectedJob.requirements)"></div>
          </div>

          <div v-if="selectedJob.qualifications" class="job-section">
            <h3>Qualifications</h3>
            <div v-html="formatText(selectedJob.qualifications)"></div>
          </div>

          <div v-if="selectedJob.applicationDeadline" class="deadline">
            <strong>Application Deadline:</strong> {{ formatDate(selectedJob.applicationDeadline) }}
          </div>

          <!-- Application Form -->
          <div class="application-form">
            <h3>Apply for this Position</h3>
            <form @submit.prevent="submitApplication">
              <div class="form-row">
                <div class="form-group">
                  <label>First Name *</label>
                  <input 
                    v-model="applicationForm.firstName" 
                    type="text" 
                    required 
                    placeholder="Enter your first name"
                  />
                </div>
                <div class="form-group">
                  <label>Last Name *</label>
                  <input 
                    v-model="applicationForm.lastName" 
                    type="text" 
                    required 
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Email *</label>
                  <input 
                    v-model="applicationForm.email" 
                    type="email" 
                    required 
                    placeholder="your.email@example.com"
                  />
                </div>
                <div class="form-group">
                  <label>Phone *</label>
                  <input 
                    v-model="applicationForm.phone" 
                    type="tel" 
                    required 
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div class="form-group">
                <label>LinkedIn Profile</label>
                <input 
                  v-model="applicationForm.linkedinUrl" 
                  type="url" 
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div class="form-group">
                <label>Portfolio URL</label>
                <input 
                  v-model="applicationForm.portfolioUrl" 
                  type="url" 
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div class="form-group">
                <label>Cover Letter</label>
                <textarea 
                  v-model="applicationForm.coverLetter" 
                  rows="5" 
                  placeholder="Tell us why you're interested in this position..."
                ></textarea>
              </div>

              <div class="form-group">
                <label>Resume * (PDF, DOC, or DOCX - Max 15MB)</label>
                <input 
                  @change="handleFileUpload" 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  required 
                  ref="fileInput"
                />
                <p v-if="applicationForm.resumeFile" class="file-name">
                  Selected: {{ applicationForm.resumeFile.name }}
                </p>
              </div>

              <div class="form-actions">
                <button type="button" @click="closeJobDetails" class="btn-secondary">
                  Cancel
                </button>
                <button type="submit" class="btn-primary" :disabled="submitting">
                  {{ submitting ? 'Submitting...' : 'Submit Application' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- General Application Modal -->
    <div v-if="showGeneralApplication" class="modal-overlay" @click="showGeneralApplication = false">
      <div class="modal-content" @click.stop>
        <button @click="showGeneralApplication = false" class="modal-close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="modal-header">
          <h2>General Application</h2>
          <p>Submit your resume for future opportunities</p>
        </div>

        <div class="modal-body">
          <p class="info-text">
            While we don't have any open positions right now, we'd love to keep your information on file
            for future opportunities that match your skills and experience.
          </p>

          <form @submit.prevent="submitGeneralApplication">
            <div class="form-row">
              <div class="form-group">
                <label>First Name *</label>
                <input 
                  v-model="generalForm.firstName" 
                  type="text" 
                  required 
                  placeholder="Enter your first name"
                />
              </div>
              <div class="form-group">
                <label>Last Name *</label>
                <input 
                  v-model="generalForm.lastName" 
                  type="text" 
                  required 
                  placeholder="Enter your last name"
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email *</label>
                <input 
                  v-model="generalForm.email" 
                  type="email" 
                  required 
                  placeholder="your.email@example.com"
                />
              </div>
              <div class="form-group">
                <label>Phone *</label>
                <input 
                  v-model="generalForm.phone" 
                  type="tel" 
                  required 
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <div class="form-group">
              <label>LinkedIn Profile</label>
              <input 
                v-model="generalForm.linkedinUrl" 
                type="url" 
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div class="form-group">
              <label>Portfolio URL</label>
              <input 
                v-model="generalForm.portfolioUrl" 
                type="url" 
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div class="form-group">
              <label>About You</label>
              <textarea 
                v-model="generalForm.coverLetter" 
                rows="5" 
                placeholder="Tell us about your experience and what kind of opportunities you're interested in..."
              ></textarea>
            </div>

            <div class="form-group">
              <label>Resume * (PDF, DOC, or DOCX - Max 15MB)</label>
              <input 
                @change="handleGeneralFileUpload" 
                type="file" 
                accept=".pdf,.doc,.docx" 
                required 
                ref="generalFileInput"
              />
              <p v-if="generalForm.resumeFile" class="file-name">
                Selected: {{ generalForm.resumeFile.name }}
              </p>
            </div>

            <div class="form-actions">
              <button type="button" @click="showGeneralApplication = false" class="btn-secondary">
                Cancel
              </button>
              <button type="submit" class="btn-primary" :disabled="submitting">
                {{ submitting ? 'Submitting...' : 'Submit Resume' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="showSuccess" class="success-overlay" @click="showSuccess = false">
      <div class="success-message" @click.stop>
        <div class="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3>Application Submitted!</h3>
        <p>Thank you for your interest. We'll review your application and get back to you soon.</p>
        <button @click="showSuccess = false" class="btn-primary">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import api from '../services/api';
import { useSiteStore } from '@/stores/site';

const siteStore = useSiteStore();
const theme = computed(() => siteStore.theme);

const jobs = ref([]);
const loading = ref(true);
const selectedJob = ref(null);
const showGeneralApplication = ref(false);
const showSuccess = ref(false);
const submitting = ref(false);
const fileInput = ref(null);
const generalFileInput = ref(null);

const applicationForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  portfolioUrl: '',
  coverLetter: '',
  resumeFile: null
});

const generalForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  linkedinUrl: '',
  portfolioUrl: '',
  coverLetter: '',
  resumeFile: null
});

onMounted(async () => {
  await fetchJobs();
});

const fetchJobs = async () => {
  try {
    loading.value = true;
    const careers = await api.get('/careers/public');
    jobs.value = careers;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    jobs.value = [];
  } finally {
    loading.value = false;
  }
};

const openJobDetails = (job) => {
  selectedJob.value = job;
  resetApplicationForm();
};

const closeJobDetails = () => {
  selectedJob.value = null;
  resetApplicationForm();
};

const resetApplicationForm = () => {
  applicationForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    coverLetter: '',
    resumeFile: null
  };
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const resetGeneralForm = () => {
  generalForm.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    portfolioUrl: '',
    coverLetter: '',
    resumeFile: null
  };
  if (generalFileInput.value) {
    generalFileInput.value.value = '';
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 15 * 1024 * 1024) {
      alert('File size must be less than 15MB');
      event.target.value = '';
      return;
    }
    applicationForm.value.resumeFile = file;
  }
};

const handleGeneralFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    if (file.size > 15 * 1024 * 1024) {
      alert('File size must be less than 15MB');
      event.target.value = '';
      return;
    }
    generalForm.value.resumeFile = file;
  }
};

const submitApplication = async () => {
  try {
    submitting.value = true;
    
    const formData = new FormData();
    formData.append('careerId', selectedJob.value._id);
    formData.append('firstName', applicationForm.value.firstName);
    formData.append('lastName', applicationForm.value.lastName);
    formData.append('email', applicationForm.value.email);
    formData.append('phone', applicationForm.value.phone);
    formData.append('resume', applicationForm.value.resumeFile);
    
    if (applicationForm.value.linkedinUrl) {
      formData.append('linkedinUrl', applicationForm.value.linkedinUrl);
    }
    if (applicationForm.value.portfolioUrl) {
      formData.append('portfolioUrl', applicationForm.value.portfolioUrl);
    }
    if (applicationForm.value.coverLetter) {
      formData.append('coverLetter', applicationForm.value.coverLetter);
    }

    await api.post('/job-applications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    closeJobDetails();
    showSuccess.value = true;
  } catch (error) {
    console.error('Error submitting application:', error);
    alert('Failed to submit application. Please try again.');
  } finally {
    submitting.value = false;
  }
};

const submitGeneralApplication = async () => {
  try {
    submitting.value = true;
    
    const formData = new FormData();
    // General applications don't have a careerId
    formData.append('firstName', generalForm.value.firstName);
    formData.append('lastName', generalForm.value.lastName);
    formData.append('email', generalForm.value.email);
    formData.append('phone', generalForm.value.phone);
    formData.append('resume', generalForm.value.resumeFile);
    
    if (generalForm.value.linkedinUrl) {
      formData.append('linkedinUrl', generalForm.value.linkedinUrl);
    }
    if (generalForm.value.portfolioUrl) {
      formData.append('portfolioUrl', generalForm.value.portfolioUrl);
    }
    if (generalForm.value.coverLetter) {
      formData.append('coverLetter', generalForm.value.coverLetter);
    }

    await api.post('/job-applications', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    showGeneralApplication.value = false;
    resetGeneralForm();
    showSuccess.value = true;
  } catch (error) {
    console.error('Error submitting application:', error);
    alert('Failed to submit application. Please try again.');
  } finally {
    submitting.value = false;
  }
};

const truncateText = (text, length) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

const formatText = (text) => {
  if (!text) return '';
  // Convert line breaks to HTML
  return text.split('\n').map(line => {
    if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
      return `<li>${line.trim().substring(1).trim()}</li>`;
    }
    return `<p>${line}</p>`;
  }).join('');
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.careers-page {
  min-height: 100vh;
  background: #000;
  color: #fff;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to bottom, var(--gradient-from), var(--gradient-to));
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600"><rect fill="%23000" width="1200" height="600"/><g fill-opacity="0.05"><circle fill="%23fff" cx="300" cy="150" r="200"/><circle fill="%23fff" cx="900" cy="400" r="250"/></g></svg>');
  background-size: cover;
  opacity: 0.3;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%);
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #888 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  color: #aaa;
  font-weight: 300;
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

/* Intro Section */
.intro-section {
  text-align: center;
  margin-bottom: 4rem;
}

.intro-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.intro-section p {
  font-size: 1.2rem;
  color: #aaa;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Jobs Section */
.jobs-section {
  margin-bottom: 5rem;
}

.jobs-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

/* No Jobs */
.no-jobs {
  text-align: center;
  padding: 4rem 2rem;
  background: #111;
  border-radius: 12px;
  border: 1px solid #222;
}

.no-jobs-icon {
  margin: 0 auto 2rem;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
  border-radius: 50%;
}

.no-jobs-icon svg {
  width: 50px;
  height: 50px;
  color: #666;
}

.no-jobs h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
}

.no-jobs p {
  color: #888;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

/* Loading */
.loading {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #222;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.job-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.job-card:hover {
  border-color: #444;
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.job-header h3 {
  font-size: 1.5rem;
  color: #fff;
  flex: 1;
}

.job-type {
  background: #222;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  color: #aaa;
  white-space: nowrap;
  margin-left: 1rem;
}

.job-meta {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #888;
  font-size: 0.95rem;
}

.meta-item svg {
  width: 18px;
  height: 18px;
}

.job-description {
  color: #aaa;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.btn-view {
  width: 100%;
  padding: 0.75rem;
  background: #fff;
  color: #000;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-view:hover {
  background: #e0e0e0;
  transform: translateY(-2px);
}

/* Culture Section */
.culture-section {
  margin-bottom: 4rem;
}

.culture-section h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.culture-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.culture-card:hover {
  border-color: #444;
  transform: translateY(-4px);
}

.culture-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.culture-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #fff;
}

.culture-card p {
  color: #888;
  line-height: 1.6;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
}

.modal-content {
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  margin: auto;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #222;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
}

.modal-close:hover {
  background: #333;
}

.modal-close svg {
  width: 24px;
  height: 24px;
  color: #fff;
}

.modal-header {
  padding: 2rem;
  border-bottom: 1px solid #222;
}

.modal-header h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
  padding-right: 3rem;
}

.salary-range {
  color: #4ade80;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.modal-body {
  padding: 2rem;
}

.job-section {
  margin-bottom: 2rem;
}

.job-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #fff;
}

.job-section p, .job-section li {
  color: #aaa;
  line-height: 1.8;
  margin-bottom: 0.5rem;
}

.job-section ul {
  padding-left: 0;
  list-style: none;
}

.job-section li::before {
  content: "• ";
  color: #666;
  margin-right: 0.5rem;
}

.deadline {
  padding: 1rem;
  background: #1a1a1a;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
  margin-bottom: 2rem;
  color: #f59e0b;
}

/* Application Form */
.application-form {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #222;
}

.application-form h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #aaa;
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background: #111;
  border: 1px solid #222;
  border-radius: 6px;
  color: #fff;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #444;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.file-name {
  margin-top: 0.5rem;
  color: #4ade80;
  font-size: 0.9rem;
}

.info-text {
  color: #aaa;
  line-height: 1.8;
  margin-bottom: 2rem;
  padding: 1rem;
  background: #111;
  border-radius: 6px;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
}

.btn-primary {
  background: #fff;
  color: #000;
}

.btn-primary:hover:not(:disabled) {
  background: #e0e0e0;
  transform: translateY(-2px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: #222;
  color: #fff;
}

.btn-secondary:hover {
  background: #333;
}

/* Success Overlay */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.success-message {
  background: #0a0a0a;
  border: 1px solid #222;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: #065f46;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon svg {
  width: 50px;
  height: 50px;
  color: #4ade80;
}

.success-message h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #fff;
}

.success-message p {
  color: #aaa;
  margin-bottom: 2rem;
  line-height: 1.6;
}

/* Light Theme Support */
.careers-page.light-theme {
  background: #f5f5f5;
  color: #1a1a1a;
}

.light-theme .hero-section {
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
}

.light-theme .hero-title {
  background: linear-gradient(135deg, #1a1a1a 0%, #666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.light-theme .hero-subtitle {
  color: #555;
}

.light-theme .intro-section h2,
.light-theme .jobs-section h2,
.light-theme .culture-section h2 {
  color: #1a1a1a;
}

.light-theme .intro-section p {
  color: #555;
}

.light-theme .no-jobs {
  background: #fff;
  border: 1px solid #ddd;
}

.light-theme .no-jobs-icon {
  background: #f0f0f0;
}

.light-theme .no-jobs-icon svg {
  color: #999;
}

.light-theme .no-jobs h3 {
  color: #1a1a1a;
}

.light-theme .no-jobs p {
  color: #666;
}

.light-theme .spinner {
  border-color: #ddd;
  border-top-color: #1a1a1a;
}

.light-theme .loading p {
  color: #555;
}

.light-theme .job-card {
  background: #fff;
  border: 1px solid #ddd;
}

.light-theme .job-card:hover {
  border-color: #bbb;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.light-theme .job-header h3 {
  color: #1a1a1a;
}

.light-theme .job-type {
  background: #f0f0f0;
  color: #555;
}

.light-theme .meta-item {
  color: #666;
}

.light-theme .job-description {
  color: #555;
}

.light-theme .btn-view {
  background: #1a1a1a;
  color: #fff;
}

.light-theme .btn-view:hover {
  background: #333;
}

.light-theme .culture-card {
  background: #fff;
  border: 1px solid #ddd;
}

.light-theme .culture-card:hover {
  border-color: #bbb;
}

.light-theme .culture-card h3 {
  color: #1a1a1a;
}

.light-theme .culture-card p {
  color: #666;
}

.light-theme .modal-overlay {
  background: rgba(0,0,0,0.7);
}

.light-theme .modal-content {
  background: #fff;
  border: 1px solid #ddd;
}

.light-theme .modal-close {
  background: #f0f0f0;
}

.light-theme .modal-close:hover {
  background: #e0e0e0;
}

.light-theme .modal-close svg {
  color: #1a1a1a;
}

.light-theme .modal-header {
  border-bottom: 1px solid #ddd;
}

.light-theme .modal-header h2 {
  color: #1a1a1a;
}

.light-theme .job-section h3 {
  color: #1a1a1a;
}

.light-theme .job-section p,
.light-theme .job-section li {
  color: #555;
}

.light-theme .job-section li::before {
  color: #999;
}

.light-theme .deadline {
  background: #fff3e0;
  border-left: 3px solid #f59e0b;
}

.light-theme .application-form {
  border-top: 1px solid #ddd;
}

.light-theme .application-form h3 {
  color: #1a1a1a;
}

.light-theme .form-group label {
  color: #555;
}

.light-theme .form-group input,
.light-theme .form-group textarea {
  background: #fff;
  border: 1px solid #ddd;
  color: #1a1a1a;
}

.light-theme .form-group input:focus,
.light-theme .form-group textarea:focus {
  border-color: #999;
}

.light-theme .info-text {
  color: #555;
  background: #f9f9f9;
}

.light-theme .btn-primary {
  background: #1a1a1a;
  color: #fff;
}

.light-theme .btn-primary:hover:not(:disabled) {
  background: #333;
}

.light-theme .btn-secondary {
  background: #f0f0f0;
  color: #1a1a1a;
}

.light-theme .btn-secondary:hover {
  background: #e0e0e0;
}

.light-theme .success-message {
  background: #fff;
  border: 1px solid #ddd;
}

.light-theme .success-icon {
  background: #d1fae5;
}

.light-theme .success-icon svg {
  color: #059669;
}

.light-theme .success-message h3 {
  color: #1a1a1a;
}

.light-theme .success-message p {
  color: #555;
}

/* Responsive */
@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .culture-grid {
    grid-template-columns: 1fr;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-header,
  .modal-body {
    padding: 1.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style>
