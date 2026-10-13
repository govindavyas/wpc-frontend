# WHITE PANDA CREATIONS - Film Production Company Website

A comprehensive full-stack web application for WHITE PANDA CREATIONS featuring a public website, admin portal, and REST API.

![WHITE PANDA CREATIONS](https://img.shields.io/badge/WHITE_PANDA-CREATIONS-6366f1?style=for-the-badge)
![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?style=flat-square&logo=vue.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-8.0-47A248?style=flat-square&logo=mongodb)

## ✨ Features

### Frontend
- 🎬 Responsive, cinema-inspired design with dark/light theme support
- 🖼️ Progressive image loading with thumbnails and lazy loading
- ⚡ Optimized performance with code splitting and caching
- 🎯 SEO-optimized with dynamic meta tags and structured data
- ♿ WCAG 2.1 AA accessible with skip navigation and ARIA labels
- 📱 Mobile-first responsive design
- 🎭 Smooth animations with reduced motion support
- 🔍 Full-text search capabilities

### Backend
- 🔒 Secure JWT authentication with rate limiting
- 🛡️ Helmet security headers and CORS protection
- 📊 Analytics and visitor tracking
- 📧 Contact form with validation
- 🖼️ Image upload with sharp compression
- 📝 Full CMS capabilities

### Admin Panel
- 📊 Dashboard with analytics
- 🎬 Movie management with rich details
- 📰 News and blog management
- 👥 Producer profiles
- 💼 Job postings and applications
- ⚙️ Site settings and SEO configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Installation & Setup

```bash
# 1. Clone and install dependencies
git clone <repository-url>
cd WHITE_PANDA-CREATIONS

# Install all dependencies
npm install
cd admin && npm install && cd ..
cd backend && npm install && cd ..

# 2. Configure backend environment
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and secrets

# 3. Seed database (optional)
npm run seed

# 4. Start development servers
# Option A: Run all servers together (recommended)
npm run dev:all

# Option B: Run servers separately
# Terminal 1 - Backend (Port 5000)
cd backend && npm run dev

# Terminal 2 - Admin (Port 3000)
cd admin && npm run dev

# Terminal 3 - Frontend (Port 5173)
npm run dev
```

### Access Applications
| Application | URL | Credentials |
|------------|-----|-------------|
| Frontend | http://localhost:5173 | - |
| Admin Panel | http://localhost:3000 | admin@whitepandacreations.com / admin123 |
| API | http://localhost:5000/api/v1 | - |

## 🏗️ Production Build

```bash
# Build frontend for production
npm run build

# Build admin panel
cd admin && npm run build

# Start backend in production
cd backend && NODE_ENV=production npm start
```

### Production Deployment Checklist

- [ ] Set `NODE_ENV=production` in backend
- [ ] Configure production MongoDB URI
- [ ] Set strong JWT_SECRET (min 32 characters)
- [ ] Update CORS_ORIGIN with production domains
- [ ] Enable HTTPS
- [ ] Set up reverse proxy (Nginx/Apache)
- [ ] Configure rate limiting for production
- [ ] Enable gzip compression
- [ ] Set up monitoring and error tracking
- [ ] Configure CDN for static assets
- [ ] Set up SSL certificates
- [ ] Configure backup strategy

## 📚 Complete Documentation

**For comprehensive documentation, see [PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md)**

This master document includes:
- Full architecture and tech stack details
- Complete API reference
- Admin portal guide
- SEO system documentation
- Deployment instructions
- Troubleshooting guides
- Database management
- Development workflows

## 🏗️ Tech Stack

- **Frontend**: Vue 3, Vite, Tailwind CSS, Vue Router
- **Admin**: Vue 3, Vite, Tailwind CSS, Pinia
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Features**: JWT Auth, SEO Management, Image Upload, Multi-page Routing

## 📁 Project Structure

```
├── src/              # Frontend website
├── admin/            # Admin portal
├── backend/          # REST API server
└── public/           # Static assets
```

## 🔑 Key Features

- ✅ Complete CMS for movies, news, producers, company info
- ✅ Advanced SEO management with schema markup
- ✅ Image upload and processing
- ✅ Multi-page routing with clean URLs
- ✅ Responsive design (mobile-first)
- ✅ Admin authentication and authorization
- ✅ Safe database seeding (preserves existing data)

## 📄 License

ISC

---

**For detailed information, please refer to [PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md)**
        url: "https://www.instagram.com/p/...",
        caption: "Optional caption"
      }
      // Add more gallery items...
    ],
    
    credits: {
      director: "Director Name",
      writers: ["Writer 1", "Writer 2"],
      cast: ["Actor 1", "Actor 2"],
      music: "Composer Name",
      cinematography: "DOP Name"
    },
    
    status: "Released", // or "Post-Production", "In Production", etc.
    festivalSelections: [
      "Festival Name 1",
      "Festival Name 2"
    ]
  },
  // Add more movies...
];
```

#### 4. Update Navigation
Edit the `navigation` array:
```javascript
export const navigation = [
  { label: "Home", target: "home" },
  { label: "About", target: "about" },
  // Add more nav items...
];
```

#### 5. Update Social Media Links
Edit the `socialLinks` object:
```javascript
export const socialLinks = {
  instagram: "https://instagram.com/...",
  facebook: "https://facebook.com/...",
  youtube: "https://youtube.com/...",
  twitter: "https://twitter.com/...",
  linkedin: "https://linkedin.com/..."
};
```

## 🖼️ Adding Media Assets

### Local Images/Videos
1. Create folders in the `public` directory:
   - `public/assets/logo-placeholder.png`
   - `public/assets/producers/`
   - `public/assets/movies/`

2. Reference them in `siteConfig.js` using `/assets/...` paths

### External Media
- **YouTube**: Use embed URLs: `https://www.youtube.com/embed/VIDEO_ID`
- **Vimeo**: Use embed URLs: `https://player.vimeo.com/video/VIDEO_ID`
- **Instagram/Facebook**: Use direct post/photo URLs

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  panda: {
    dark: '#0a0e27',
    purple: '#6366f1',
    gold: '#fbbf24',
    // Customize colors...
  }
}
```

### Fonts
Fonts are loaded from Google Fonts in `index.html`. Update the link to change fonts.

## 📁 Project Structure

```
WHITE_PANDA-CREATIONS/
├── public/                    # Static assets
│   └── assets/               # Images, videos, etc.
│       ├── logo-placeholder.png
│       ├── producers/
│       └── movies/
├── src/
│   ├── components/           # Vue components
│   │   ├── Navbar.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ProducersSection.vue
│   │   ├── FilmsSection.vue
│   │   ├── ContactSection.vue
│   │   ├── Footer.vue
│   │   └── MovieModal.vue
│   ├── config/
│   │   └── siteConfig.js     # ⭐ MAIN CONTENT FILE
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔑 Key Features Explained

### Centralized Configuration
- All text, media URLs, and data in one place
- No hard-coded content in components
- Easy to scale - just add objects to arrays

### Responsive Design
- Mobile-first approach
- Hamburger menu on mobile
- Adaptive grid layouts
- Touch-friendly interface

### Movie Modal
- Embedded trailer support (YouTube/Vimeo/Local)
- Full movie details and credits
- Image gallery with source labels
- Festival selections and awards

### Smooth UX
- Smooth scrolling between sections
- Hover animations and transitions
- Loading states and feedback
- Accessible navigation

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

The `dist` folder will contain the production-ready files. Deploy to:
- **Netlify**: Drag and drop the `dist` folder
- **Vercel**: Connect your repository
- **GitHub Pages**: Use GitHub Actions
- **Any static hosting**: Upload the `dist` folder

## 📄 License

This project is created for WHITE PANDA CREATIONS.

## 🤝 Support

For questions or issues, contact the development team.

---

**Built with ❤️ using Vue 3 + Vite + Tailwind CSS**

