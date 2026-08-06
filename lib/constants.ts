export const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/start' },
]

export const PROJECTS = [
  {
    slug: 'score-signal',
    name: 'Score Signal',
    category: 'Sports Analytics & AI',
    description:
      'Our most ambitious build to date. We led the full front-end (design, layout, and nearly every interactive feature) and originated the idea for its AI helper, designing both the concept and the interface ourselves.',
    url: 'https://getscoresignal.com',
    tags: ['Web design', 'Dev', 'AI features'],
    // Sends X-Frame-Options: SAMEORIGIN and sits behind a Cloudflare bot
    // challenge, so it can't be embedded live: uses a static screenshot
    // instead, same as FairTest.
    previewImage: '/previews/score-signal-preview.png',
  },
  {
    slug: 'fairtest',
    name: 'FairTest',
    category: 'Education & Advocacy',
    description:
      'A custom page and system built for FairTest, the National Center for Fair & Open Testing. We designed and developed this specific page to clearly communicate research and resources for students, families, and institutions navigating test-optional admissions.',
    url: 'https://fairtest.org/10769-2/',
    tags: ['Education', 'Web design', 'Dev'],
    previewImage: '/previews/fairtest-preview.png',
  },
  {
    slug: 'ray-cuevo',
    name: 'Ray Cuevo Training',
    category: 'Fitness & Coaching',
    description:
      'A high-performance training site for Ray Cuevo, fitness coach and athlete. Built to drive client inquiries, showcase credentials, and establish a strong digital presence in the competitive fitness space.',
    url: 'https://raycuevotraining.com',
    tags: ['Fitness & coaching', 'Web design', 'Dev'],
  },
  {
    slug: 'hide-the-film',
    name: 'Hide the Film',
    category: 'Film & Creative',
    description:
      'A cinematic digital home for Hide the Film, built to showcase their work, establish a distinct creative identity, and connect with collaborators and clients in the film industry.',
    url: 'https://hidethefilm.com',
    tags: ['Film & creative', 'Web design', 'Dev'],
  },
  {
    slug: 'akil-bello',
    name: 'Akil Bello',
    category: 'Personal Brand',
    description:
      'A sleek personal brand site for Akil Bello, educator, test-prep expert, and advocate for equity in education. Built to establish digital authority and drive speaking and consulting inquiries.',
    url: 'https://akilbello.com',
    tags: ['Personal brand', 'Web design', 'Dev'],
  },
  {
    slug: 'marcus-bleecker',
    name: 'Marcus Bleecker',
    category: 'Personal Brand',
    description: 'A modern personal brand site for Marcus Bleecker. Built to establish a strong digital presence and showcase his work and story.',
    url: 'https://marcusbleecker.com',
    tags: ['Personal brand', 'Web design', 'Dev'],
  },
]

// Companies grouped by the state they're based in, for the interactive state map
// on the Work page hero. `href` points at that company's dedicated section on this
// page (`/work#slug`) when one exists in `featured` above, otherwise it's just
// `/work`, same fallback `ClientLogos` already uses for companies without one.
export const STATE_PROJECTS = [
  {
    id: 'ny',
    name: 'New York',
    companies: [
      { name: 'Score Signal', logo: '/logos/score-signal-logo-icon.png', href: '/work#score-signal' },
      { name: 'FairTest', logo: '/logos/fairtest.jpg', href: '/work#fairtest' },
      { name: 'Hide the Film', logo: null, href: '/work' },
      { name: 'Akil Bello', logo: '/logos/akil-bello.png', href: '/work' },
      { name: 'A Better Chance', logo: '/logos/a-better-chance.jpg', href: '/work' },
      { name: 'Bell Curves', logo: '/logos/bell-curves.jpg', href: '/work' },
    ],
  },
  {
    id: 'me',
    name: 'Maine',
    companies: [
      { name: 'Ray Cuevo Training', logo: '/logos/ray-cuevo.png', href: '/work#ray-cuevo' },
    ],
  },
  {
    id: 'nj',
    name: 'New Jersey',
    companies: [
      { name: 'Marcus Bleecker', logo: '/logos/marcus-bleecker.png', href: '/work#marcus-bleecker' },
    ],
  },
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
    icon: 'book-open',
    title: 'Academics & Writers',
    description: 'Professional sites that establish credibility and showcase your body of work.',
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
    icon: 'briefcase',
    title: 'Consultants & Professionals',
    description: 'Clean, authoritative digital presence for independent professionals and firms.',
  },
  {
    icon: 'map-pin',
    title: 'Local Service Businesses',
    description: 'Local SEO and conversion-optimized sites for brick-and-mortar.',
  },
]

export const FLAT_FEE_SERVICES = [
  {
    id: 'web-redesign',
    number: '04',
    title: 'Web Redesign',
    description:
      'Your site should be your strongest sales tool. If it is not converting, not ranking, or not representing your brand the way it should, we rebuild it from the ground up. One-time engagement, no ongoing commitment required.',
    tiers: [
      {
        name: 'Starter Redesign',
        detail: '1 to 3 pages, mobile responsive, contact form, modern design, SEO basics. Best for local businesses, personal brands, and restaurants.',
      },
      {
        name: 'Full Redesign',
        detail: 'Up to 6 pages, animations, booking or e-commerce integrations, CMS, advanced SEO, custom features. Best for startups and brands with multiple offerings.',
      },
    ],
    includes: [
      'Full custom redesign from scratch',
      'Mobile responsive across all devices',
      'On-page SEO foundation',
      'Contact forms and lead capture',
      'Cross-browser QA testing',
      'One round of revisions',
    ],
    cta: 'Get a Quote',
    ctaHref: '/start?service=redesign',
  },
  {
    id: 'digital-brand-elevation',
    number: '05',
    title: 'Digital Brand Elevation',
    description:
      'For businesses not getting the traction they expected. We go beyond the website, auditing your entire digital presence, developing a brand strategy, and rebuilding your site to match. One engagement, complete transformation.',
    price: 'Custom Quote',
    includes: [
      'Strategy consultation call (60 minutes)',
      'Written digital brand assessment',
      'Visual identity and positioning recommendations',
      'Full website redesign (up to 6 pages)',
      'SEO setup and digital roadmap',
      '30 days of post-launch support',
    ],
    cta: 'Get a Quote',
    ctaHref: '/start?service=digital-brand-elevation',
  },
]

export const SERVICES = [
  {
    id: 'design-dev',
    number: '01',
    title: 'Website Design & Development',
    description:
      'We create fully custom, conversion-focused websites from the ground up. No templates, no shortcuts: every pixel is intentional.',
    includes: [
      'Custom visual design and brand direction',
      'Responsive development across all devices',
      'Performance optimization (95+ Lighthouse target)',
      'CMS integration for easy content updates',
      'On-page SEO foundation',
      'Contact forms, booking flows, and lead capture',
      'Cross-browser and device QA testing',
    ],
    startingPrice: 'Reach out for a quote',
  },
  {
    id: 'brand-systems',
    number: '02',
    title: 'Brand Digital Systems',
    description:
      'We build what your brand needs to capture leads, turn them into customers, and grow an audience you actually own.',
    includes: [
      'Email capture and automation setup',
      'Landing pages for campaigns and launches',
      'Booking and scheduling systems',
      'E-commerce store development',
      'Newsletter and CRM integration',
      'Analytics dashboards and conversion tracking',
      'Social media and SEO alignment',
    ],
    startingPrice: 'Reach out for a quote',
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
    startingPrice: '$50/mo',
  },
]

export const CLIENT_PROCESS = [
  {
    label: 'Reaching out',
    heading: 'Reaching out',
    body: 'A message with your business name and what you\'re trying to fix. That\'s all we need to start.',
  },
  {
    label: 'Free consultation',
    heading: 'Free consultation',
    body: 'Fifteen to thirty minutes on the phone. We ask what your business does, who you\'re trying to reach, and what\'s not working. No cost, no obligation.',
  },
  {
    label: 'Identifying the problem',
    heading: 'Identifying the problem',
    body: 'We figure out the right move (sometimes a full rebuild, sometimes a refresh, sometimes just search work) and tell you what we\'d actually do, even when the answer is less than you expected.',
  },
  {
    label: 'Quote and plan',
    heading: 'Quote and plan',
    body: 'A written quote and a plain-language breakdown of exactly what we\'re building and what happens after. You take as long as you need. Questions are free.',
  },
  {
    label: 'Build and support',
    heading: 'Build and support',
    body: 'We build it, launch it, and stay on after: the people you call when something needs to change, not a ticket queue.',
  },
]

export const SERVICES_FAQ = [
  {
    question: 'How much does a website cost?',
    answer: 'It depends on what you need, so we don\'t publish prices. What we do instead is give you a real number fast, usually within a day or two of the first call. That call is free and there\'s no obligation attached to the quote.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'Most projects go live seven to fourteen days after you approve the quote. Timelines stretch when we\'re also doing branding, copywriting, or photography.',
  },
  {
    question: 'Can you work on my existing website instead of building a new one?',
    answer: 'Yes. If what you have is fundamentally sound, we\'ll rebuild and modernize it rather than start over. If it\'s holding you back, we\'ll say so.',
  },
  {
    question: 'Who owns the domain and hosting?',
    answer: 'You do. We register the domain in your name, then pay for and manage it along with hosting, so you never have to deal with renewals, certificates, or downtime. If you\'d rather hold and pay for it yourself, that\'s fine too. We\'ll set it up and hand you the keys. Either way, it\'s your name on it and it stays yours.',
  },
  {
    question: 'What happens after my website launches?',
    answer: 'Ongoing maintenance runs as a monthly subscription: updates, fixes, security, monitoring, and improvements. You get a direct line to the person who built it, not a ticket queue.',
  },
  {
    question: 'Where are you based, and do you work with businesses outside your area?',
    answer: 'We\'re in Maine and New York, and we work with clients anywhere. Everything runs over calls, email, and shared links, so you never need to be in a room with us for this to go well.',
  },
]

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discovery Call',
    description:
      'We spend 30–45 minutes learning your business, your goals, what\'s not working, and what success looks like. No decks, no sales scripts, just a real conversation.',
  },
  {
    number: '02',
    title: 'Design Mockups',
    description:
      'We deliver a custom homepage concept built around your brand, before any code is written. You approve the direction, we refine until it\'s exactly right.',
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
    price: '$100',
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
    price: '$225',
    period: '/mo',
    tagline: 'For restaurants, service businesses, and startups.',
    features: [
      'Up to 5 custom pages',
      'Email capture & automation',
      'Booking or reservation system',
      'CMS included',
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
    price: '$350',
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
      'Most projects launch in 7–14 days from the start of development. Rush builds can be completed in as few as 5 business days. Ask about our "Website in 7 Days" offer.',
  },
  {
    question: 'Do you work with businesses outside New York?',
    answer:
      'Yes. We work with clients nationwide. Location doesn\'t limit what we can build for you.',
  },
  {
    question: 'Can I upgrade my plan later?',
    answer:
      'Absolutely. You can move between plans at any time. Upgrades take effect immediately; we\'ll prorate any billing accordingly.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'Just a discovery call. We\'ll gather everything we need from there: brand assets, content, and goals. If you don\'t have a logo or copy yet, we can help with that too.',
  },
  {
    question: 'Will I be able to update the site myself?',
    answer:
      'Yes. All Growth and Elite sites include a CMS so you can update text, images, and content without touching code. We also provide a walkthrough after launch.',
  },
  {
    question: 'What is the difference between a subscription plan and a flat fee service?',
    answer:
      'Subscription plans include ongoing support, monthly updates, and SEO monitoring as part of the monthly fee. Flat fee services are one-time engagements: you pay once, we deliver the project, and there is no ongoing commitment unless you choose to add a plan later.',
  },
  {
    question: 'Can I move to a subscription plan after a flat fee project?',
    answer:
      'Yes. Many clients start with a Web Redesign or Digital Brand Elevation and then add a maintenance plan once their site is live. Setting that up takes one conversation, nothing complicated.',
  },
]
