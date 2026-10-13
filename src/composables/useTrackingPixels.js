/**
 * Analytics & Retargeting Pixel Configuration
 * 
 * This module handles:
 * - Google Analytics 4 (GA4) setup
 * - Meta (Facebook) Pixel setup
 * - Event tracking utilities
 * - Consent management integration
 */

// Configuration - Replace with your actual IDs
const CONFIG = {
  // Google Analytics 4
  GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX',
  
  // Meta (Facebook) Pixel
  META_PIXEL_ID: 'XXXXXXXXXXXXXXXXX',
  
  // Google Tag Manager (optional)
  GTM_CONTAINER_ID: '',
  
  // Debug mode
  DEBUG: false
};

// Track if pixels are initialized
let ga4Initialized = false;
let metaPixelInitialized = false;

/**
 * Initialize Google Analytics 4
 */
export function initGA4() {
  if (ga4Initialized || !CONFIG.GA4_MEASUREMENT_ID || CONFIG.GA4_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    if (CONFIG.DEBUG) console.log('GA4: Skipped (no valid ID)');
    return;
  }
  
  // Load gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { 
    window.dataLayer.push(arguments); 
  };
  
  window.gtag('js', new Date());
  window.gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
    // Enhanced measurement
    enhanced_measurement: {
      scroll_tracking: true,
      outbound_click_tracking: true,
      video_tracking: true,
      file_download_tracking: true
    }
  });
  
  ga4Initialized = true;
  if (CONFIG.DEBUG) console.log('GA4: Initialized with ID', CONFIG.GA4_MEASUREMENT_ID);
}

/**
 * Initialize Meta (Facebook) Pixel
 */
export function initMetaPixel() {
  if (metaPixelInitialized || !CONFIG.META_PIXEL_ID || CONFIG.META_PIXEL_ID === 'XXXXXXXXXXXXXXXXX') {
    if (CONFIG.DEBUG) console.log('Meta Pixel: Skipped (no valid ID)');
    return;
  }
  
  // Facebook Pixel base code
  !function(f,b,e,v,n,t,s) {
    if(f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if(!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  
  window.fbq('init', CONFIG.META_PIXEL_ID);
  window.fbq('track', 'PageView');
  
  metaPixelInitialized = true;
  if (CONFIG.DEBUG) console.log('Meta Pixel: Initialized with ID', CONFIG.META_PIXEL_ID);
}

/**
 * Initialize Google Tag Manager
 */
export function initGTM() {
  if (!CONFIG.GTM_CONTAINER_ID) return;
  
  // GTM snippet
  (function(w,d,s,l,i) {
    w[l] = w[l] || [];
    w[l].push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
    var f = d.getElementsByTagName(s)[0];
    var j = d.createElement(s);
    var dl = l !== 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', CONFIG.GTM_CONTAINER_ID);
  
  if (CONFIG.DEBUG) console.log('GTM: Initialized with ID', CONFIG.GTM_CONTAINER_ID);
}

/**
 * Initialize all tracking pixels
 */
export function initAllTracking() {
  // Check for user consent if using a consent management platform
  const hasConsent = checkTrackingConsent();
  
  if (hasConsent) {
    initGA4();
    initMetaPixel();
    initGTM();
  } else {
    if (CONFIG.DEBUG) console.log('Tracking: Waiting for consent');
  }
}

/**
 * Check if user has given tracking consent
 */
function checkTrackingConsent() {
  // Integrate with your consent management platform
  // For now, check localStorage for a consent flag
  const consent = localStorage.getItem('tracking_consent');
  if (consent === 'denied') return false;
  return true; // Default to true for now
}

/**
 * Track page view
 */
export function trackPageView(pagePath, pageTitle) {
  // GA4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle
    });
  }
  
  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
  
  if (CONFIG.DEBUG) console.log('Track: PageView', { pagePath, pageTitle });
}

/**
 * Track custom event
 */
export function trackEvent(eventName, params = {}) {
  // GA4
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
  
  // Meta Pixel - map to standard events if possible
  if (window.fbq) {
    const metaEventMap = {
      'form_submit': 'Lead',
      'video_play': 'ViewContent',
      'contact_click': 'Contact',
      'cta_click': 'InitiateCheckout'
    };
    
    const metaEvent = metaEventMap[eventName];
    if (metaEvent) {
      window.fbq('track', metaEvent, params);
    } else {
      window.fbq('trackCustom', eventName, params);
    }
  }
  
  if (CONFIG.DEBUG) console.log('Track: Event', eventName, params);
}

/**
 * Track form submission (Lead event)
 */
export function trackFormSubmission(formData = {}) {
  // GA4 Lead Event
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: formData.estimatedValue || 0,
      ...formData
    });
  }
  
  // Meta Pixel Lead Event
  if (window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formData.formName || 'Contact Form',
      content_category: formData.inquiryType || 'General',
      ...formData
    });
  }
  
  if (CONFIG.DEBUG) console.log('Track: Form Submission', formData);
}

/**
 * Track video engagement
 */
export function trackVideoEngagement(action, videoData = {}) {
  const eventName = `video_${action}`; // video_play, video_pause, video_complete, etc.
  
  // GA4
  if (window.gtag) {
    window.gtag('event', eventName, {
      video_title: videoData.title,
      video_duration: videoData.duration,
      video_percent: videoData.percent,
      ...videoData
    });
  }
  
  // Meta Pixel
  if (window.fbq) {
    window.fbq('trackCustom', 'VideoEngagement', {
      action,
      ...videoData
    });
  }
  
  if (CONFIG.DEBUG) console.log('Track: Video', action, videoData);
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(percent) {
  if (window.gtag) {
    window.gtag('event', 'scroll', {
      percent_scrolled: percent
    });
  }
  
  if (CONFIG.DEBUG) console.log('Track: Scroll Depth', percent + '%');
}

/**
 * Track outbound link clicks
 */
export function trackOutboundClick(url, linkText) {
  if (window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'outbound',
      event_label: url,
      link_text: linkText,
      transport_type: 'beacon'
    });
  }
  
  if (window.fbq) {
    window.fbq('trackCustom', 'OutboundClick', {
      url,
      linkText
    });
  }
  
  if (CONFIG.DEBUG) console.log('Track: Outbound Click', url);
}

/**
 * Track content view (for movie/portfolio items)
 */
export function trackContentView(contentData = {}) {
  // GA4
  if (window.gtag) {
    window.gtag('event', 'view_item', {
      items: [{
        item_id: contentData.id,
        item_name: contentData.title,
        item_category: contentData.category
      }]
    });
  }
  
  // Meta Pixel
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: contentData.title,
      content_category: contentData.category,
      content_ids: [contentData.id],
      content_type: 'product'
    });
  }
  
  if (CONFIG.DEBUG) console.log('Track: Content View', contentData);
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaName, ctaLocation) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: ctaLocation
  });
}

/**
 * Scroll depth tracking initialization
 */
export function initScrollDepthTracking() {
  const thresholds = [25, 50, 75, 90, 100];
  const tracked = new Set();
  
  function checkScrollDepth() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    
    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !tracked.has(threshold)) {
        tracked.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  }
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Track time on page
 */
export function initTimeOnPageTracking() {
  let startTime = Date.now();
  
  window.addEventListener('beforeunload', () => {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);
    
    if (window.gtag) {
      window.gtag('event', 'time_on_page', {
        value: timeOnPage,
        page_path: window.location.pathname
      });
    }
  });
}

/**
 * Vue composable for analytics
 */
export function useTrackingPixels() {
  return {
    initAllTracking,
    trackPageView,
    trackEvent,
    trackFormSubmission,
    trackVideoEngagement,
    trackScrollDepth,
    trackOutboundClick,
    trackContentView,
    trackCTAClick,
    initScrollDepthTracking,
    initTimeOnPageTracking
  };
}

export default {
  install(app) {
    // Make tracking functions available globally
    app.config.globalProperties.$track = {
      pageView: trackPageView,
      event: trackEvent,
      form: trackFormSubmission,
      video: trackVideoEngagement,
      content: trackContentView,
      cta: trackCTAClick
    };
    
    // Initialize tracking on app mount
    initAllTracking();
    initScrollDepthTracking();
    initTimeOnPageTracking();
  }
};
