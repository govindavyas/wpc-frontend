/**
 * ============================================================================
 * WHITE PANDA CREATIONS - CENTRALIZED SITE CONFIGURATION
 * ============================================================================
 * 
 * This file contains ALL content and media references for the website.
 * To update the site content, edit this file only - no need to touch components.
 * 
 * HOW TO USE:
 * -----------
 * 1. COMPANY INFO: Update brand details, contact info, descriptions
 * 2. PRODUCERS: Add/remove/edit producer objects in the array
 * 3. MOVIES: Add/remove/edit movie objects - each movie is fully configurable
 * 4. NAVIGATION: Change menu items by editing the navigation array
 * 5. SOCIAL LINKS: Update all social media URLs in one place
 * 
 * MEDIA REFERENCES:
 * -----------------
 * - Local images: Use paths like "/assets/..." (place files in public/assets/)
 * - YouTube: Use "https://www.youtube.com/embed/VIDEO_ID"
 * - Instagram: Direct post URLs work for reference
 * - Facebook: Direct photo URLs work for reference
 * 
 * ============================================================================
 */

// ============================================================================
// COMPANY INFORMATION
// ============================================================================
export const companyInfo = {
  name: "WHITE PANDA CREATIONS",
  logoUrl: "/assets/logo.png",
  // logoUrl: "https://t3.ftcdn.net/jpg/12/10/46/94/360_F_1210469466_qAXG04fQwPulqEnN06a4hGNyDiV61qxf.jpg",
  tagline: "Crafting Stories That Transcend Boundaries",
  description: `WHITE PANDA CREATIONS is a visionary film production company dedicated to creating compelling narratives that resonate with audiences worldwide. 
  
  Founded on the principles of artistic excellence and innovative storytelling, we bring together talented filmmakers, actors, and creative professionals to produce cinema that challenges conventions and celebrates the human experience.
  
  Our mission is to produce films that not only entertain but also inspire, provoke thought, and leave a lasting impact on viewers. From intimate character studies to grand cinematic spectacles, every project we undertake reflects our commitment to quality and authenticity.`,
  foundedYear: "2020",
  location: "Pune, India",
  address: "123 Film District, Kothrud, Pune, Maharashtra 411038, India",
  email: "contact@whitepandacreations.com",
  phone: "+91-22-1234-5678"
};

// ============================================================================
// ABOUT US SECTION (Dedicated)
// ============================================================================
export const aboutUs = {
  title: "THE COMPANY",
  subtitle: "Films. Music. Artistes.",
  tagline: "At our core, we're storytellers.",
  sections: [
    {
      heading: "Our Vision",
      content: `From making high-budget blockbusters to genre-defining films, from working with the biggest actors of the industry to launching young talent in films, from being the distribution house with the strongest global foothold to pioneering new formats of distribution and exploring newer territories, from launching compelling story-telling forms to the numerous digitally led innovations. WHITE PANDA CREATIONS has maintained its flagship position across all verticals since its genesis.`
    },
    {
      heading: "Industry Leadership",
      content: `WHITE PANDA CREATIONS was founded by the Late Yash Chopra, a veteran of the Indian film Industry. In 1970, it's the only privately held and fully integrated studio that houses shooting stages, sound studios and is headquartered at one of Pune's prime properties where the heart of the entertainment business beats.`
    },
    {
      heading: "Integrated Studio",
      content: `WHITE PANDA CREATIONS has its own state-of-the-art fully integrated studio that houses shooting stages, sound studios and is headquartered at one of Pune's prime properties where the heart of the entertainment business beats. In many senses, controlling almost every part of the value chain from production to post production, domestic & international distribution, music & home entertainment, marketing, design, licensing, merchandising, talent management, brand partnerships, music studios and film studios - all in-house facilities, which make it one of the most coveted entertainment conglomerates in the country.`
    },
    {
      heading: "Industry Impact",
      content: `WHITE PANDA CREATIONS has its own state-of-the-art fully integrated studio. Over the last five decades, WHITE PANDA CREATIONS's catalogue of films could be easily India's most enviable film catalogue in the entertainment business. WHITE PANDA CREATIONS's top grossers have already placed the company in the big league of producers worldwide, making it one of the largest film-making entities in the nation.`
    },
    {
      heading: "Our Promise",
      content: `WHITE PANDA CREATIONS has been one of the key makers of modern cinema and has heralded cinematic trends since its inception - the way films are made, the way films are marketed and the way films are consumed. YRF has been at the forefront of shaping new viewer consumption patterns and tapping newer revenue streams.`
    }
  ],
  stats: [
    { label: "Years of Excellence", value: "50+" },
    { label: "Films Produced", value: "100+" },
    { label: "Awards Won", value: "250+" },
    { label: "Global Markets", value: "70+" }
  ],
  milestones: [
    { year: "1970", title: "Foundation", description: "WHITE PANDA CREATIONS founded by Late Yash Chopra" },
    { year: "1975", title: "First Blockbuster", description: "Released our first major commercial success" },
    { year: "1990", title: "International Expansion", description: "Expanded distribution to global markets" },
    { year: "2000", title: "Digital Innovation", description: "Pioneered digital distribution formats" },
    { year: "2010", title: "Integrated Studio", description: "Launched state-of-the-art production facilities" },
    { year: "2020", title: "Streaming Era", description: "Strategic partnerships with major OTT platforms" }
  ]
};

// ============================================================================
// MOVIES / FILMS PORTFOLIO
// ============================================================================
// To add a new movie: Copy the entire movie object and add it to the array
// To feature a movie on homepage: Set "highlight: true"
// 
// TRAILER TYPES:
// - "youtube": Use YouTube embed URL
// - "vimeo": Use Vimeo embed URL  
// - "local": Use local video file path
//
// GALLERY SOURCES:
// - "instagram": Instagram post URL
// - "facebook": Facebook photo URL
// - "local": Local image file path
// ============================================================================
export const movies = [
  {
    id: "salbardi",
    title: "सालबर्डी (salbardi)",
    titleEnglish: "salbardi",
    tagline: "A Dark Crime–Drama Feature Film",
    year: "2025",
    duration: "TBA",
    language: "Marathi",
    genre: ["Crime", "Drama", "Thriller", "Mystery"],
    
    // About the Film
    about: "salbardi is a gripping crime-drama set in a remote village haunted by fear, superstition, and a string of mysterious child murders. As the tension deepens, a relentless police inspector uncovers shocking truths buried beneath faith, betrayal, and power struggles. A visually atmospheric film inspired by the tonal richness of Tumbbad (Bollywood) and Mangalavaaram (South Cinema), salbardi blends psychological tension with cinematic intensity.",
    
    // Logline in Marathi
    logline: "एका पोलिस अधिकाऱ्याच्या तपासातून गावातील मुलांच्या हत्यांमागील अंधश्रद्धा आणि विश्वासघात उलगडणारी एक रहस्यमय क्राइम कथा.",
    
    // Full synopsis in Marathi
    synopsis: `छोट्या आणि निर्जन गावात घडणाऱ्या मुलांच्या सलग हत्यांनी सर्वत्र भीती निर्माण होते. तपासासाठी नेमली जाते — पोलीस निरीक्षक मनोरमा, अनुभवी पण शांत आणि सत्यासाठी कटिबद्ध अधिकारी.

गावातील अंधश्रद्धा, राजकीय संघर्ष आणि पिढ्यान् पिढ्या लपवलेली रहस्ये तिच्या तपासात उलगडू लागतात. प्रत्येक पावलागणिक ती मानसिक आणि शारीरिक आव्हानांना सामोरे जाते — आणि सत्य जितके जवळ येते, तितका धोका वाढत जातो.

salbardi मानवी व्यवहारांच्या अंधाऱ्या बाजूंचे विश्लेषण करणारा, थरार आणि भावनिक तणावाने भरलेला अनुभव आहे.`,
    
    posterUrl: "/assets/movies/salbardi-poster.jpg",
    highlight: true, // Featured movie

    // Film tone and visual style
    tone: "Dark, atmospheric, mythic realism",
    visualStyle: "Color palette inspired by Tumbbad & Mangalavaaram",
    visualIdentity: "Rural mystery + psychological tension + folklore elements",
    visualComparison: "तुलना — बॉलीवूड 'तुम्बाड' आणि साऊथ सिनेमाची 'मंगळवार' यांसारखी रंग-टोन",

    // Main Character - Inspector Manorama
    mainCharacter: {
      name: "Inspector Manorama (निरीक्षक मनोरमा)",
      role: "पोलिस निरीक्षक — Crime Branch",
      description: "कणखर, जिद्दी आणि भावुक. एक आई, एक अधिकारी आणि सत्यासाठी झटणारी नागरिक.",
      traits: [
        "Crime Branch मधील अनुभवी तपास अधिकारी",
        "प्रसिद्धीपासून दूर पण परिणामांवर लक्ष",
        "सहकाऱ्यांमध्ये 'निभर पण शांत' अधिकारी म्हणून ओळख",
        "लोकांचा पोलिसांवरील विश्वास डळमळीत झाला की तिची नियुक्ती केली जाते",
        "तिच्या दृष्टीने case never ends at 'case closed' — न्याय पूर्ण होणे महत्त्वाचे"
      ]
    },

    // Trailer configuration
    trailer: {
      type: "youtube",
      // url: "https://www.youtube.com/embed/TRAILER_ID" // Replace with actual trailer URL
      url: "/assets/movies/Sequence01.mp4"
    },

    // Media gallery
    gallery: [
      {
        type: "image",
        source: "local",
        url: "/assets/movies/salbardi-still1.jpg",
        caption: "पोलिस निरीक्षक मनोरमा तपासात"
      },
      {
        type: "image",
        source: "local",
        url: "/assets/movies/salbardi-still2.jpg",
        caption: "गावातील गूढ घटना"
      },
      {
        type: "image",
        source: "local",
        url: "/assets/movies/salbardi-still3.jpg",
        caption: "क्राइम ब्रांच टीम"
      }
    ],

    // Full credits
    credits: {
      // Production
      producer: "Dr. Gajanan Jadhav",
      producers: ["Mr. Anil Patil", "Mr. Rambhavu Jadhav"],
      executiveProducer: "Deepak Kudale",
      productionHouse: "White Panda Creations",
      productionHouseTagline: "Dedicated to creating bold, original, and cinematically powerful Marathi content. Focused on impactful storytelling, new-age filmmaking, and premium production quality.",
      distributionPartner: "saalabaDIQ",
      satellitePartner: "saalabaDIQ",
      
      // Key Creative Team
      director: "Ramesh Choudhary",
      directorTitle: "Director",
      directorBio: "A seasoned filmmaker with 20+ years in Marathi cinema, known for Gulhar (2022), Babo (2019), Mala Ek Chance Hawa, Satya, Mission Possible, Kurukshetra, Lakshmi Yei Ghara, Satiche Mandir, Sant Mahipati Maharaj. Experience across direction, acting, and multiple technical departments. Passionate about fresh storytelling and making the most of available resources.",
      
      writer: "Rohit Shukre",
      writerTitle: "Writer",
      writerBio: "Nationally acclaimed writer with 15+ years in film, TV & digital. TV Shows: Bade Achhe Lagte Hain, Uttaran, Laagi Tujhse Lagan, Tere Liye. Short Film Tempo — 12 awards across 27 festivals. Writer of Chandu Champion (2024). Creative leadership roles at Zee5, Viacom18, Star Pravah & Balaji Telefilms. Trained at New Zealand Film Academy.",
      
      cinematography: "Siddhesh More",
      cinematographyTitle: "Director of Photography",
      cinematographerBio: "Cinematographer with a strong portfolio across Marathi & Hindi industries. Feature Films: Pani Puri, Baiyko, Cloak, Hirvee, Tula Pan Bashing Badhaycha, Satarkranchi Bootta (upcoming). Web Series: Delhi Weds Hariyana, Eka Langda Bindi, Adiction (upcoming). Documentaries: Nanda Devi, Love For The Game, The Voice of Kashmir. 12+ years of experience delivering compelling visual storytelling.",
      
      backgroundMusic: "Amar Mohile",
      backgroundMusicTitle: "Background Score",
      backgroundMusicCredits: "Composer known for large-scale cinematic soundscapes: Koi Mil Gaya (2003), Dilwale (2015), Sooryavanshi (2021)",
      
      // Lead Cast
      leadCast: [
        { name: "Pooja Sawant", role: "Inspector Manorama" },
        { name: "Omkar Bhojne", role: "" },
        { name: "Mukinda", role: "" },
        { name: "Rohit Kokate", role: "" },
        { name: "Guruji Kotkar", role: "" },
        { name: "Chitaranjan Giri", role: "" },
        { name: "Anshuman Vichare", role: "" },
        { name: "Balu Joshi", role: "" },
        { name: "Shashank Shende", role: "" }
      ],
      
      // Supporting Characters
      supportingCast: [
        { name: "Kamlakar Satpute", role: "Sarpanch" },
        { name: "Tukaram", role: "" },
        { name: "Sakhar Karkhandar", role: "" },
        { name: "Ramdas Golhar", role: "" },
        { name: "Bhandari Sheth", role: "" },
        { name: "Rajendra Satarkar", role: "Matka / Barwala" },
        { name: "John Chandekar", role: "Father" },
        { name: "Bharat Ganeshpure", role: "MLA" },
        { name: "Abhay Gite", role: "Sonaar" },
        { name: "Madhav Abhyankar", role: "Palakmantri" },
        { name: "Praveen Dalimbkar", role: "Babnya's Father" }
      ],
      
      // Special Appearances & Songs
      specialAppearances: [
        {
          type: "Item Song",
          artist: "Sonali Kulkarni",
          role: "Song Lead",
          choreographer: "Fulwa Khamkar"
        },
        {
          type: "Gondhal Song",
          artist: "Gashmir Mahajani",
          role: "Lead",
          choreographer: "Ashish Patil"
        }
      ],
      
      // Music Team
      musicDirector: "Patbhanab Gaikwad",
      lyricsWriter: "Guru Thakur",
      playbackSingers: [
        "Ajay Gogawale",
        "Shreya Ghoshal",
        "Sonu Nigam"
      ],
      
      // Production Team
      productionManager: "DK",
      associateDirector: "Milind Khanvilkar",
      artDirector: "Pradip Gurav",
      costumeDesigner: "Pranita Chindage",
      makeupArtist: "Shrinivas Menuge",
      
      // Complete cast for reference
      cast: [
        "Pooja Sawant as Inspector Manorama",
        "Omkar Bhojne",
        "Mukinda",
        "Rohit Kokate",
        "Guruji Kotkar",
        "Chitaranjan Giri",
        "Anshuman Vichare",
        "Balu Joshi",
        "Shashank Shende",
        "Kamlakar Satpute as Sarpanch",
        "Bharat Ganeshpure as MLA",
        "Madhav Abhyankar as Palakmantri",
        "Special: Sonali Kulkarni (Item Song)",
        "Special: Gashmir Mahajani (Gondhal Song)"
      ]
    },

    // Production status
    status: "In Production",
    releaseDate: "2025",
    distribution: "Theatrical - Distributed by saalabaDIQ",
    
    // Awards and recognition (to be updated)
    festivalSelections: [],
    
    // Social media and external links
    socialMedia: {
      instagram: "https://instagram.com/salbardi_official",
      facebook: "https://facebook.com/salbardi",
      twitter: "https://twitter.com/salbardi"
    }
  }
  
  // Add more movies here following the same structure
  // Example:
  // {
  //   id: "movie-2",
  //   title: "Another Film Title",
  //   year: "2024",
  //   ... (copy all fields from above)
  // }
];

// ============================================================================
// LICENSING INFORMATION
// ============================================================================
export const licensing = {
  title: "Licensing & Distribution",
  description: `WHITE PANDA CREATIONS offers comprehensive licensing and distribution services for our film catalog. We work with distributors, broadcasters, streaming platforms, and international partners to bring our stories to audiences worldwide.
  
  Our licensing team handles all aspects of rights management, territorial distribution, and partnership agreements. Whether you're interested in theatrical distribution, streaming rights, television broadcast, or home entertainment, we provide flexible licensing models tailored to your needs.
  
  We believe in fostering long-term partnerships that benefit all stakeholders while ensuring our films reach the widest possible audience.`,
  contactEmail: "licensing@whitepandacreations.com",
  contactPhone: "+91-22-1234-5679",
  documents: [
    {
      label: "Distribution Guidelines",
      url: "/assets/docs/distribution-guidelines.pdf",
      description: "Comprehensive guide for distributors and partners"
    },
    {
      label: "Rights & Usage Policy",
      url: "/assets/docs/rights-usage-policy.pdf",
      description: "Detailed information on licensing terms and usage rights"
    },
    {
      label: "Partnership Opportunities",
      url: "/assets/docs/partnership-opportunities.pdf",
      description: "Explore collaboration opportunities with WHITE PANDA CREATIONS"
    }
  ],
  features: [
    {
      icon: "globe",
      title: "Global Distribution",
      description: "Worldwide theatrical and digital distribution networks"
    },
    {
      icon: "streaming",
      title: "Streaming Rights",
      description: "Flexible licensing for OTT platforms and streaming services"
    },
    {
      icon: "broadcast",
      title: "Broadcast Licensing",
      description: "Television and cable network broadcasting agreements"
    },
    {
      icon: "partnership",
      title: "Custom Partnerships",
      description: "Tailored licensing solutions for specific markets"
    }
  ]
};

// ============================================================================
// PARTNERS & SUPPORTERS
// ============================================================================
export const marketing = {
  title: "Our Partners & Supporters",
  description: `WHITE PANDA CREATIONS is proud to collaborate with industry-leading partners, distributors, and supporters who help bring our cinematic vision to audiences worldwide. These partnerships enable us to focus on what we do best—creating compelling films—while our trusted partners handle distribution, marketing, and exhibition.
  
  We believe in building long-term relationships with organizations that share our passion for quality storytelling and artistic excellence. Together, we create a collaborative ecosystem that supports independent cinema and brings diverse stories to global audiences.`,
  tagline: "Powered by Collaboration",
  partners: [
    {
      name: "Global Distribution Partner",
      type: "Distribution",
      logo: "/assets/partners/distributor-logo.png",
      description: "Worldwide theatrical and digital distribution",
      website: "https://partner-website.com"
    },
    {
      name: "Marketing Agency Partner",
      type: "Marketing",
      logo: "/assets/partners/agency-logo.png",
      description: "Strategic marketing and promotional campaigns",
      website: "https://partner-website.com"
    },
    {
      name: "Streaming Platform Partner",
      type: "Streaming",
      logo: "/assets/partners/streaming-logo.png",
      description: "OTT platform for digital release",
      website: "https://partner-website.com"
    },
    {
      name: "Film Festival Supporter",
      type: "Festival",
      logo: "/assets/partners/festival-logo.png",
      description: "Festival screenings and awards support",
      website: "https://partner-website.com"
    },
    {
      name: "Production Equipment Partner",
      type: "Equipment",
      logo: "/assets/partners/equipment-logo.png",
      description: "Professional filmmaking equipment and support",
      website: "https://partner-website.com"
    },
    {
      name: "Post-Production Partner",
      type: "Post-Production",
      logo: "/assets/partners/postprod-logo.png",
      description: "VFX, color grading, and sound design",
      website: "https://partner-website.com"
    }
  ],
  promoVideos: [
    {
      id: "promo-1",
      title: "WHITE PANDA CREATIONS Showreel 2025",
      type: "youtube",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/assets/marketing/promo1-thumb.jpg",
      description: "A showcase of our finest cinematic moments"
    },
    {
      id: "promo-2",
      title: "Behind The Scenes: Our Creative Process",
      type: "youtube",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "/assets/marketing/promo2-thumb.jpg",
      description: "Discover how we bring stories to life"
    }
  ],
  testimonials: [
    {
      quote: "Working with WHITE PANDA CREATIONS has been an incredible experience. Their commitment to storytelling excellence is unmatched.",
      author: "Distribution Partner Representative",
      company: "Global Distribution Network",
      logo: "/assets/partners/testimonial-logo.png"
    },
    {
      quote: "WHITE PANDA CREATIONS brings a fresh perspective to independent cinema. We're proud to support their vision.",
      author: "Festival Director",
      company: "International Film Festival",
      logo: "/assets/partners/testimonial-logo2.png"
    }
  ],
  supporterCategories: [
    "Distribution Partners",
    "Marketing & PR Agencies",
    "Streaming Platforms",
    "Film Festivals",
    "Equipment Providers",
    "Post-Production Studios",
    "Financial Backers",
    "Industry Associations"
  ]
};

// ============================================================================
// NEWS & UPDATES
// ============================================================================
// To add news: Add a new object to this array
// To remove news: Delete the object from the array
// News items are displayed in reverse chronological order (newest first)
export const news = [
  {
    id: "news-1",
    title: "सालबर्डी (salbardi) - Principal Photography Wraps Successfully",
    date: "2025-12-05",
    category: "Production",
    showOnDashboard: true,
    summary: "WHITE PANDA CREATIONS completes principal photography for the highly anticipated Marathi crime thriller 'salbardi', starring Pooja Sawant as Police Inspector Manorama.",
    fullText: `WHITE PANDA CREATIONS is proud to announce the successful completion of principal photography for "सालबर्डी (salbardi)", our ambitious Marathi crime thriller that promises to redefine the genre.

Directed by Ramesh Choudhary, who brings 20 years of industry experience, the film features powerhouse performances from a stellar ensemble cast led by Pooja Sawant in the lead role of Police Inspector Manorama.

"Wrapping up principal photography is always an emotional moment," says director Ramesh Choudhary. "The entire cast and crew have poured their hearts into this project. Pooja Sawant's portrayal of Manorama is nothing short of extraordinary - she brings strength, vulnerability, and authenticity to every frame."

The film, produced by Dr. Gajanan Jadhav along with producers Mr. Anil Patil and Mr. Rambhavu Jadhav, explores dark themes of superstition, power struggles, and betrayal in a small village. With cinematography by Siddhesh More and background score by the renowned Amar Mohile (known for Koi Mil Gaya, Dilwale, Sooryavanshi), the film promises a visual and auditory treat.

Post-production work is now underway, and the film is scheduled for release in 2025 through distribution partner saalabaDIQ.`,
    imageUrl: "/assets/news/salbardi-production-wrap.jpg",
    author: "WHITE PANDA CREATIONS Production Team",
    tags: ["Production", "salbardi", "Marathi Cinema", "Crime Thriller"],
    externalLink: null
  },
  {
    id: "news-2",
    title: "Pooja Sawant Joins WHITE PANDA CREATIONS' salbardi as Lead Protagonist",
    date: "2025-11-20",
    category: "Casting",
    showOnDashboard: true,
    summary: "Acclaimed Marathi actress Pooja Sawant to portray Police Inspector Manorama in WHITE PANDA CREATIONS' upcoming crime drama salbardi.",
    fullText: `WHITE PANDA CREATIONS is thrilled to announce that renowned Marathi cinema actress Pooja Sawant has been cast in the lead role of Police Inspector Manorama in our upcoming crime thriller "salbardi".

Pooja Sawant, known for her powerful performances and versatility, will portray a determined police inspector investigating a series of mysterious child murders in a village shrouded in superstition and dark secrets.

"Manorama is a complex character - she's fierce, committed, emotional, and deeply devoted to justice," says producer Dr. Gajanan Jadhav. "Pooja was our first choice for this role. Her ability to convey strength while maintaining emotional depth makes her perfect for this character."

The film features an ensemble cast including Omkar Bhojne, Chitaranjan Giri, Shashank Shende, and veteran actor Kamlakar Satpute in pivotal roles. With music by Patbhanab Gaikwad and lyrics by Guru Thakur, the soundtrack features playback singing by Ajay Gogawale, Shreya Ghoshal, and Sonu Nigam.

Special performances include an item song featuring Sonali Kulkarni choreographed by Fulwa Khamkar, and a gondhal song with Gashmir Mahajani choreographed by Ashish Patil.

Production begins this month under the direction of Ramesh Choudhary.`,
    imageUrl: "/assets/news/salbardi-pooja-sawant.jpg",
    author: "Casting Department",
    tags: ["Casting", "salbardi", "Pooja Sawant", "Announcement"],
    externalLink: null
  },
  {
    id: "news-3",
    title: "salbardi Music Launch: Legendary Singers Unite for WHITE PANDA CREATIONS",
    date: "2025-11-10",
    category: "Music",
    showOnDashboard: true,
    summary: "Ajay Gogawale, Shreya Ghoshal, and Sonu Nigam lend their voices to salbardi's powerful soundtrack, composed by Patbhanab Gaikwad.",
    fullText: `The musical journey of "salbardi" promises to be as captivating as its gripping narrative, with three of India's most celebrated playback singers - Ajay Gogawale, Shreya Ghoshal, and Sonu Nigam - coming together for this WHITE PANDA CREATIONS production.

Composed by the talented Patbhanab Gaikwad with lyrics by Guru Thakur, the soundtrack blends traditional Marathi folk elements with contemporary cinematic music, creating a soundscape that perfectly complements the film's dark, thrilling narrative.

"The music of salbardi is integral to the storytelling," explains music director Patbhanab Gaikwad. "We've created a sound that's rooted in Maharashtra's cultural richness while maintaining the tension and drama required for a crime thriller."

The background score, composed by the legendary Amar Mohile (known for blockbusters like Koi Mil Gaya, Dilwale, and Sooryavanshi), adds another layer of depth to the film's atmospheric storytelling.

Special highlights include an electrifying item song featuring Sonali Kulkarni, choreographed by Fulwa Khamkar, and a traditional gondhal song with Gashmir Mahajani, choreographed by Ashish Patil. These performances promise to be visual and musical spectacles.

The complete soundtrack will be released prior to the film's theatrical premiere in 2025.`,
    imageUrl: "/assets/news/salbardi-music-launch.jpg",
    author: "Music Department",
    tags: ["Music", "salbardi", "Soundtrack", "Playback Singers"],
    externalLink: null
  },
  {
    id: "news-4",
    title: "WHITE PANDA CREATIONS Announces salbardi: A Dark Crime Thriller Set in Rural Maharashtra",
    date: "2025-10-15",
    category: "Announcement",
    showOnDashboard: false,
    summary: "Production house unveils ambitious Marathi crime drama exploring superstition, power, and justice in a small village plagued by mysterious murders.",
    fullText: `WHITE PANDA CREATIONS proudly announces "सालबर्डी (salbardi)", an intense crime thriller that delves into the dark underbelly of a rural Maharashtra village haunted by a series of child murders.

The film tells the story of Police Inspector Manorama, a fierce and dedicated officer who must unravel a web of superstition, betrayal, and power struggles to bring justice to the victims. As she investigates deeper, the village's dark secrets begin to surface, testing her resolve and challenging everything she believes about truth and justice.

"salbardi is more than just a crime thriller," says director Ramesh Choudhary. "It's a psychological exploration of how superstition and blind faith can be weaponized, how power corrupts, and how one woman's determination can challenge an entire system."

The film's visual aesthetic, inspired by acclaimed films like "Tumbbad" and South Indian cinema's "Mangalwaar", promises a dark, atmospheric cinematic experience. Director of Photography Siddhesh More, with 12 years of experience in Marathi and Hindi cinema, brings his unique visual storytelling to create a haunting, immersive world.

Writer Rohit Shukre, with over 15 years in the industry and credits including "Chandu Champion" (2024) and numerous successful TV shows, has crafted a tight, suspenseful narrative that keeps audiences on the edge of their seats.

Produced by Dr. Gajanan Jadhav, with producers Mr. Anil Patil and Mr. Rambhavu Jadhav, and Executive Producer Deepak Kudale, the film will be distributed by saalabaDIQ.

Principal photography is set to begin this month, with a planned release in 2025.`,
    imageUrl: "/assets/news/salbardi-announcement.jpg",
    author: "WHITE PANDA CREATIONS Team",
    tags: ["Announcement", "salbardi", "Crime Thriller", "Marathi Cinema"],
    externalLink: null
  },
  {
    id: "news-5",
    title: "Behind the Lens: Cinematographer Siddhesh More on Crafting salbardi's Visual Language",
    date: "2025-10-01",
    category: "Production",
    showOnDashboard: false,
    summary: "Award-winning cinematographer discusses his vision for creating the dark, atmospheric world of salbardi.",
    fullText: `Siddhesh More, the Director of Photography for "salbardi", brings 12 years of experience in Marathi and Hindi cinema to this ambitious crime thriller. With credits including feature films like Pani Puri, Cloak, Hirvee, and numerous web series, More is known for his distinctive visual storytelling.

In an exclusive interview, More shared his approach to creating salbardi's unique visual palette:

"When Ramesh (director) first narrated the story to me, I knew we needed to create a world that feels both real and nightmarish," says More. "We're drawing inspiration from films like Tumbbad - that sense of dread, the use of shadows and natural light to create atmosphere."

The film's color grading will emphasize deep, muted tones with strategic use of amber and teal to reflect the emotional journey of the protagonist. More explains, "Manorama's investigation takes her through both physical and psychological darkness. The cinematography needed to reflect that journey."

Shooting primarily in rural locations, the team faced challenges with weather and logistics, but More sees these as opportunities: "The unpredictability of natural light in these settings adds authenticity. We're not creating a polished, sanitized world - this is raw, real, and visceral."

The film also features innovative camera techniques for the intense investigation sequences and psychological moments, promising audiences a visually immersive crime thriller experience.

"salbardi" is currently in post-production, with color grading and VFX work underway.`,
    imageUrl: "/assets/news/salbardi-cinematography.jpg",
    author: "Production Diary",
    tags: ["Behind The Scenes", "salbardi", "Cinematography", "Interview"],
    externalLink: null
  },
  {
    id: "news-6",
    title: "Amar Mohile Composes Background Score for WHITE PANDA CREATIONS' salbardi",
    date: "2025-09-20",
    category: "Music",
    showOnDashboard: false,
    summary: "Renowned composer known for Koi Mil Gaya, Dilwale, and Sooryavanshi joins the salbardi team.",
    fullText: `WHITE PANDA CREATIONS is honored to announce that legendary music composer Amar Mohile has been brought on board to compose the background score for "salbardi". 

Amar Mohile, known for his powerful and emotive compositions in blockbuster films like "Koi... Mil Gaya" (2003), "Dilwale" (2015), and "Sooryavanshi" (2021), brings decades of experience in creating memorable cinematic soundscapes.

"salbardi required a composer who could understand the psychological depth of the narrative while maintaining the thriller elements," says director Ramesh Choudhary. "Amar ji's body of work speaks for itself. His ability to use music to heighten tension, create atmosphere, and enhance emotional beats is exactly what this film needs."

Mohile's score for salbardi will blend orchestral elements with traditional Marathi instruments, creating a unique sonic landscape that reflects both the cultural setting and the film's dark thriller genre.

"Working on a Marathi crime thriller is exciting for me," says Mohile. "The story has such strong emotional undercurrents beneath the thriller narrative. My approach is to let the music breathe with the story - sometimes it's loud and aggressive, sometimes it's subtle and haunting."

The background score recording sessions are currently underway at a Mumbai studio, with the composer working closely with the editing team to ensure perfect synchronization between visuals and music.

Combined with the original soundtrack by Patbhanab Gaikwad, "salbardi" promises to deliver a complete and powerful audio experience.`,
    imageUrl: "/assets/news/salbardi-amar-mohile.jpg",
    author: "Music Team",
    tags: ["Music", "Background Score", "salbardi", "Amar Mohile"],
    externalLink: null
  }
];

// ============================================================================
// NAVIGATION MENU
// ============================================================================
// Main navigation items (shown directly in navbar)
export const mainNavigation = [
  { label: "Home", route: "/", type: "route" },
  { label: "About", target: "about", type: "scroll" },
  { label: "Films", target: "films", type: "scroll" },
  { label: "News", target: "news", type: "scroll" },
  { label: "Contact", target: "contact", type: "scroll" }
];

// Dropdown menu items (shown in "More" dropdown)
export const dropdownNavigation = [
  { label: "The Company", route: "/the-company", icon: "building" },
  { label: "Our Team", route: "/team", icon: "users" },
  { label: "Licensing", route: "/licensing", icon: "document" },
  { label: "Partners", route: "/partners", icon: "handshake" },
  { label: "All News", route: "/all-news", icon: "newspaper" },
  { label: "Careers", route: "/careers", icon: "briefcase" },
  { label: "Social Feed", route: "/feed", icon: "collection" }
];

// Legacy navigation for backwards compatibility
export const navigation = [
  { label: "Home", target: "hero" },
  { label: "About", target: "about" },
  { label: "The Company", target: "about-us" },
  { label: "Films", target: "films" },
  { label: "Licensing", target: "licensing" },
  { label: "Partners", target: "marketing" },
  { label: "News", target: "news" },
  { label: "All News", target: "all-news" },
  { label: "Contact", target: "contact" }
];

// ============================================================================
// SOCIAL MEDIA LINKS
// ============================================================================
// Update these URLs with your actual social media profiles
export const socialLinks = {
  instagram: "https://instagram.com/whitepandacreations_official",
  facebook: "https://facebook.com/whitepandacreations",
  youtube: "https://youtube.com/@whitepandacreations",
  twitter: "https://twitter.com/whitepandacreations",
  linkedin: "https://linkedin.com/company/white-panda-creations"
};

// ============================================================================
// HELPER FUNCTIONS (Do not modify unless you know what you're doing)
// ============================================================================

/**
 * Get the featured/highlighted movie for the hero section
 */
export const getFeaturedMovie = () => {
  return movies.find(movie => movie.highlight) || movies[0];
};

/**
 * Get a movie by ID
 */
export const getMovieById = (id) => {
  return movies.find(movie => movie.id === id);
};

/**
 * Get all movies sorted by year (newest first)
 */
export const getMoviesByYear = () => {
  return [...movies].sort((a, b) => parseInt(b.year) - parseInt(a.year));
};

/**
 * Get news by ID
 */
export const getNewsById = (id) => {
  return news.find(item => item.id === id);
};

/**
 * Get all news sorted by date (newest first)
 */
export const getNewsByDate = () => {
  return [...news].sort((a, b) => new Date(b.date) - new Date(a.date));
};

/**
 * Get news by category
 */
export const getNewsByCategory = (category) => {
  return news.filter(item => item.category === category);
};

/**
 * Get news items to show on dashboard
 */
export const getDashboardNews = () => {
  return news.filter(item => item.showOnDashboard).sort((a, b) => new Date(b.date) - new Date(a.date));
};
