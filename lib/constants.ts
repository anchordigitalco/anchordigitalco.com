export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/start' },
]

export const INDUSTRIES = [
  {
    icon: 'utensils',
    title: 'Restaurants & Cafes',
    description: 'Menus, reservations, and event pages that drive foot traffic.',
  },
  {
    icon: 'shirt',
    title: 'Clothing & Streetwear',
    description: 'E-commerce and brand presence for labels that want to stand out.',
  },
  {
    icon: 'user',
    title: 'Personal Brands & Creators',
    description: 'Portfolios and link-in-bio pages built to grow your audience.',
  },
  {
    icon: 'scissors',
    title: 'Barbershops & Salons',
    description: 'Booking flows and showcases that convert visitors to clients.',
  },
  {
    icon: 'camera',
    title: 'Photographers & Artists',
    description: 'Gallery-forward sites that let your work do the talking.',
  },
  {
    icon: 'building',
    title: 'Startups & Small Business',
    description: 'Launch-ready digital systems to establish your market presence.',
  },
  {
    icon: 'trophy',
    title: 'Athletes & Sports Orgs',
    description: 'Dynamic sites for performance brands and athletic programs.',
  },
  {
    icon: 'map-pin',
    title: 'Local Service Businesses',
    description: 'Local SEO and conversion-optimized sites for brick-and-mortar.',
  },
]

// Projects will be added here once real case studies are ready
export const PROJECTS: {
  slug: string
  name: string
  industry: string
  tagline: string
  description: string
  gradient: string
  accentColor: string
  result: string
  overview: string
  problem: string
  solution: string
  features: string[]
}[] = []

const _PLACEHOLDER_PROJECTS = [
  {
    slug: 'nuevo-sabor',
    name: 'Nuevo Sabor',
    industry: 'Restaurant',
    tagline: 'Where bold flavors meet modern digital presence.',
    description:
      'A complete rebrand and digital overhaul for a celebrated Mexican restaurant in Brooklyn — from reservation flows to late-night event pages.',
    gradient: 'from-[#6B1A0A] via-[#3D0E05] to-[#1A0800]',
    accentColor: '#E85D2A',
    result: 'Reservations up 60% in the first month post-launch.',
    overview:
      'Nuevo Sabor came to us with an outdated site built on a free template that didn\'t reflect the restaurant\'s bold, intimate atmosphere. They needed a digital presence as alive as their food.',
    problem:
      'The old site had no online reservation system, slow load times, a menu buried in a PDF, and zero mobile optimization. Walk-ins were their only reliable source of new customers.',
    solution:
      'We designed a full custom site around their brand identity — warm terracotta tones, hand-drawn type accents, and a mobile-first reservation flow integrated with OpenTable. We built a dynamic menu page with seasonal updates the team manages themselves.',
    features: [
      'OpenTable reservation integration',
      'Seasonal menu CMS with photo upload',
      'Event & private dining landing pages',
      'Instagram feed integration',
      'Local SEO & Google Business optimization',
      'SMS reservation reminders',
    ],
  },
  {
    slug: 'apex-cuts',
    name: 'Apex Cuts',
    industry: 'Barbershop',
    tagline: 'Where precision meets elevated style.',
    description:
      'A sleek booking platform and brand identity for a high-end Harlem barbershop known for its expert fades and loyal clientele.',
    gradient: 'from-[#0D1A2E] via-[#0A1020] to-[#050810]',
    accentColor: '#4A90D9',
    result: '85% of appointments now booked online within 6 weeks.',
    overview:
      'Apex Cuts had built a loyal following through word of mouth and Instagram, but lacked a professional digital home. Walk-in-only operations were limiting growth and creating unpredictable wait times.',
    problem:
      'No online booking meant customers couldn\'t plan ahead. The shop\'s Instagram was doing heavy lifting as a de facto website, with DMs for every appointment request — unsustainable at scale.',
    solution:
      'We built a streamlined booking site with real-time stylist availability, a gallery of work showcased with editorial photography, and a system that sends automatic confirmations and reminders. The dark, refined aesthetic matches their premium positioning.',
    features: [
      'Real-time stylist availability calendar',
      'Service menu with pricing and duration',
      'Work gallery with before/after feature',
      'Automated SMS/email confirmations',
      'Gift card and referral flow',
      'Google Maps & review integration',
    ],
  },
  {
    slug: 'maison-noir',
    name: 'Maison Noir',
    industry: 'Clothing Brand',
    tagline: 'Luxury streetwear for those who move in silence.',
    description:
      'An e-commerce platform and editorial brand site for an independent streetwear label bringing luxury aesthetics to limited-drop culture.',
    gradient: 'from-[#1A0A1E] via-[#110816] to-[#08050C]',
    accentColor: '#9B6FBA',
    result: 'Sold out first drop in 4 hours after launch.',
    overview:
      'Maison Noir was operating through Instagram DMs and a basic Shopify template. As they prepared for their first major drop, they needed a site that matched their elevated brand positioning.',
    problem:
      'The existing Shopify template communicated "generic" when the brand demanded "exclusive." Product photography was stellar but the site couldn\'t showcase it. No newsletter capture meant no owned audience for future drops.',
    solution:
      'We built a custom Shopify storefront with a cinematic editorial layout — full-bleed photography, a drop countdown mechanic, and an email waitlist that captured 2,000+ subscribers before launch. The checkout flow was optimized for speed on mobile.',
    features: [
      'Custom Shopify storefront theme',
      'Drop countdown with email waitlist',
      'Editorial lookbook layout',
      'Size guide and care instructions CMS',
      'Loyalty and early access program',
      'Email marketing integration (Klaviyo)',
    ],
  },
  {
    slug: 'vltg-studios',
    name: 'VLTG Studios',
    industry: 'Photography',
    tagline: 'Visual storytelling for brands that move culture.',
    description:
      'A portfolio and client booking platform for a New York-based commercial photography studio working with musicians, athletes, and lifestyle brands.',
    gradient: 'from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]',
    accentColor: '#F5F2ED',
    result: 'Inquiries increased 3x and average project value grew 40%.',
    overview:
      'VLTG Studios was undercharging because clients couldn\'t perceive their true value. The old site showed work in small thumbnails and had no clear path for new clients to engage.',
    problem:
      'The portfolio didn\'t communicate scale. Clients saw small web images instead of the cinematic, high-production work that defined the studio. Inquiry conversion was low because there was no framing of the studio\'s process or credibility signals.',
    solution:
      'We designed a full-screen, editorial portfolio experience where each project feels like entering a world. A client portal for project briefing and asset delivery. Clear service positioning with a booking flow that pre-qualifies leads.',
    features: [
      'Full-screen editorial portfolio viewer',
      'Client portal for briefs and delivery',
      'Service packages and inquiry form',
      'Press and client roster section',
      'Password-protected client galleries',
      'Integrated contract and invoicing links',
    ],
  },
]

export const SERVICES = [
  {
    id: 'design-dev',
    number: '01',
    title: 'Website Design & Development',
    description:
      'We create fully custom, conversion-focused websites from the ground up. No templates, no shortcuts — every pixel is intentional.',
    includes: [
      'Custom visual design and brand direction',
      'Responsive development across all devices',
      'Performance optimization (95+ Lighthouse target)',
      'CMS integration for easy content updates',
      'On-page SEO foundation',
      'Contact forms, booking flows, and lead capture',
      'Cross-browser and device QA testing',
    ],
    startingPrice: 'From $150/mo',
  },
  {
    id: 'brand-systems',
    number: '02',
    title: 'Brand Digital Systems',
    description:
      'Beyond the homepage — we build the full digital ecosystem your brand needs to capture leads, drive conversions, and grow an owned audience.',
    includes: [
      'Email capture and automation setup',
      'Landing pages for campaigns and launches',
      'Booking and scheduling systems',
      'E-commerce store development',
      'Newsletter and CRM integration',
      'Analytics dashboards and conversion tracking',
      'Social media and SEO alignment',
    ],
    startingPrice: 'From $150/mo',
  },
  {
    id: 'maintenance',
    number: '03',
    title: 'Ongoing Maintenance & Consulting',
    description:
      'We stay in your corner after launch. Monthly care plans keep your site fast, secure, and evolving with your business.',
    includes: [
      'Monthly content updates and edits',
      'Security patches and performance monitoring',
      'SEO reporting and ongoing optimization',
      'Analytics review and insights calls',
      'New page additions as your business grows',
      'Emergency support and uptime monitoring',
      'Quarterly redesign check-ins',
    ],
    startingPrice: 'Included in all plans',
  },
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We spend 30–45 minutes learning your business, your goals, what\'s not working, and what success looks like. No decks, no sales scripts — just a real conversation.',
  },
  {
    number: '02',
    title: 'Design Mockups',
    description:
      'We deliver a custom homepage concept tailored to your brand — before any code is written. You approve the direction, we refine until it\'s exactly right.',
  },
  {
    number: '03',
    title: 'Development',
    description:
      'We build your site with clean code, fast load times, and pixel-perfect execution of every design detail. Full responsiveness across desktop, tablet, and mobile.',
  },
  {
    number: '04',
    title: 'Launch',
    description:
      'We deploy your site, run cross-device QA, connect your domain, set up analytics, and make sure everything performs exactly as expected on day one.',
  },
  {
    number: '05',
    title: 'Ongoing Support',
    description:
      'After launch, we\'re still in your corner. Monthly updates, SEO monitoring, performance reporting, and consulting as your business evolves.',
  },
]

export const PRICING_TIERS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$50',
    period: '/mo',
    tagline: 'For personal brands, portfolios, and creators.',
    features: [
      '1–3 page website',
      'Mobile responsive design',
      'Contact form',
      'Modern custom design',
      'SEO basics',
      'Social media links',
      'Monthly content edits',
      'SSL & hosting included',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$150',
    period: '/mo',
    tagline: 'For restaurants, service businesses, and startups.',
    features: [
      'Up to 5 custom pages',
      'Email capture & automation',
      'Booking or reservation system',
      'Blog or CMS included',
      'Advanced animations',
      'Analytics dashboard',
      'Advanced SEO setup',
      'Priority support',
    ],
    cta: 'Get Started',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$300',
    period: '/mo',
    tagline: 'For e-commerce, larger brands, and memberships.',
    features: [
      'Unlimited pages',
      'E-commerce & cart/checkout',
      'User accounts & memberships',
      'Custom API integrations',
      'Advanced animations & interactions',
      'Dedicated account manager',
      'Monthly consulting calls',
      'Same-day support response',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
]

export const PRICING_FAQ = [
  {
    question: 'Do you require a long-term contract?',
    answer:
      'No long-term commitment required. Our plans are month-to-month after the initial site build. You can cancel with 30 days notice at any time.',
  },
  {
    question: 'How long does a site take to build?',
    answer:
      'Most projects launch in 7–14 days from the start of development. Rush builds can be completed in as few as 5 business days — ask about our "Website in 7 Days" offer.',
  },
  {
    question: 'Do you work with businesses outside New York?',
    answer:
      'Yes. We work with clients nationwide and have delivered projects for businesses in 12+ states. Location doesn\'t limit what we can build for you.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer:
      'Absolutely. You can move between plans at any time. Upgrades take effect immediately; we\'ll prorate any billing accordingly.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Just a discovery call. We\'ll gather everything we need from there — brand assets, content, and goals. If you don\'t have a logo or copy yet, we can help with that too.',
  },
  {
    question: 'Will I be able to update the site myself?',
    answer:
      'Yes. All Growth and Elite sites include a CMS so you can update text, images, and content without touching code. We also provide a walkthrough after launch.',
  },
]
