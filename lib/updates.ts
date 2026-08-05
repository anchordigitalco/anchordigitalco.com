export interface Update {
  slug: string
  status: 'live' | 'in-development'
  logo: string
  logoAlt: string
  /** Most logo source files are already solid-color branded tiles, so
   * `cover` just fills the card. A Better Chance's mark sits on a mostly
   * white, unevenly padded file, so it gets `contain` on a plain ground
   * tile instead of an awkward crop. */
  fit: 'cover' | 'contain'
  /** Short kicker label shown above the title on both the card and the
   * article page — what kind of thing this is, not a status. */
  category: string
  date: string
  title: string
  excerpt: string
  body: string[]
  externalUrl?: string
  /** Real before/after screenshots of the redesign, shown as draggable
   * comparison sliders in the left photo column when present — one slot
   * per pair, instead of the plain logo tile. Takes priority over `images`. */
  beforeAfterSlides?: { before: string; after: string }[]
  /** Plain real screenshots (no comparison), stacked in the left photo
   * column instead of the flat logo tile. Each carries its own aspect
   * ratio since these are raw, uncropped captures. */
  images?: { src: string; aspect: string }[]
}

export const UPDATES: Update[] = [
  {
    slug: 'score-signal',
    status: 'live',
    logo: '/logos/score-signal-whole-logo.png',
    logoAlt: 'Score Signal logo',
    fit: 'contain',
    category: 'AI-Powered Tool',
    date: '7/31/2026',
    title: 'Score Signal, an AI-powered SAT and ACT tool, launches in partnership with Anchor Digital',
    excerpt: 'Our most ambitious build yet, a college admissions analytics platform with an AI helper we designed from the ground up.',
    body: [
      'Score Signal was our most ambitious project to date. This was an idea-to-implementation build that took a conversation with a test prep company founder and turned it into a beautifully designed, scalable digital solution. Leveraging our frustrations with the college search process and knowledge of public databases, we conceived and created a unique data integration and recommendation engine.',
      'Score Signal takes a user\'s SAT or ACT score and other relevant data, processes it against a sophisticated custom-designed algo to report the strength of the "signal" that the score provides about the user\'s admissibility, turning a confusing admissions question into a clear, specific answer in seconds.',
      'We led the full front-end (design, layout, and nearly every interactive feature), scoped the backend specifications, and defined the reporting parameters, delivering to the client a refined product ready for final commercialization and integration.',
      'The AI helper woven through the experience wasn\'t handed to us as a spec. We originated the idea ourselves, designed the concept, and built the interface, then implemented it end to end.',
      'Score Signal is live now, and we\'re still involved as it grows.',
    ],
    externalUrl: 'https://getscoresignal.com',
    images: [
      { src: '/updates/score-signal-1.png', aspect: '3018 / 1896' },
      { src: '/updates/score-signal-3.png', aspect: '3018 / 1896' },
    ],
  },
  {
    slug: 'fairtest',
    status: 'in-development',
    logo: '/logos/fairtest-alt.png',
    logoAlt: 'FairTest logo',
    fit: 'contain',
    category: 'Non-Profit',
    date: '7/19/2026',
    title: 'Anchor Digital partners with FairTest to redesign its test-optional research page',
    excerpt: 'A redesigned research page for the National Center for Fair & Open Testing.',
    body: [
      'FairTest, the National Center for Fair & Open Testing, has spent decades pushing back on the idea that a single test score should decide who gets in. Their test-optional college list, which tracks admissions policy at over 2,000 four-year schools, sees half a million visitors per year and is the go-to reference for students and counselors navigating test-optional admissions nationwide.',
      'Our analysis of the previous page found that while it provided a searchable resource for students and their supporters, it missed the opportunity to drive its mission by providing insight into policies across colleges. We rebuilt the page to serve this dual policy and practical function by making more clear the trends and patterns across institutions.',
      'The dynamic filterable database itself (state, region, school type, system) is still front and center, now paired with a chart that makes the overall split (test-optional, test-free, still requiring scores) legible at a glance instead of a wall of numbers.',
      'This isn\'t a full site rebuild. It\'s a single page reimagined to more effectively use data to deliver its message. Done quickly and built to hold up as the underlying research keeps growing.',
      'Currently in development. We\'ll share it here the day it ships.',
    ],
    beforeAfterSlides: [
      { before: '/updates/fairtest-before-1.png', after: '/updates/fairtest-after-1.png' },
      { before: '/updates/fairtest-before-2.png', after: '/updates/fairtest-after-2.png' },
    ],
  },
  {
    slug: 'a-better-chance',
    status: 'in-development',
    logo: '/logos/a-better-chance.jpg',
    logoAlt: 'A Better Chance logo',
    fit: 'contain',
    category: 'Non-Profit',
    date: '8/4/2026',
    title: 'Anchor Digital partners with A Better Chance on a new site for its college-access mission',
    excerpt: 'A refreshed digital presence for the nonprofit connecting talented students of color with leading schools.',
    body: [
      'A Better Chance, a national non-profit organization, has spent more than sixty years placing talented young people of color at leading independent and boarding schools across the country.',
      'ABC typically secures opportunities for their members and shares them via PDFs or spreadsheets of programs and partner opportunities.',
      'Opportunity only counts if the right student can find it. So we are designing the experience around the people using it, not the org chart behind it. A student should be able to arrive, understand what is possible, and see their next step without having to hunt for it. Clear paths for students. Clear paths for families. Clear paths for the partner schools that make the network run.',
      'We identified the inefficiency and proposed an advanced scalable digital solution that would not only serve their primary needs but would also expand their capabilities.',
      'Help the organization stand apart and make it easier for students and families to find the programs and opportunities waiting for them.',
      'We are building it to meet students where they are. Fast. Accessible. Designed for whatever device a student already has, not the one we wish they had. The kind of experience that feels effortless to use and hard to walk away from.',
      'This is where strategy and build come together. We are not handing over a shell and calling it done. We shape the message, the structure, and the experience as one, so the presence feels as serious, and as warm, as the organization behind it, and so every page moves a student one step closer.',
      'We took this on because it is work worth doing. A Better Chance is already changing lives. We are just making it easier for the next student to find their way in. That is the kind of project we want our name on.',
      'It is currently in development. We will post the finished product here once it is live.',
    ],
    images: [{ src: '/updates/a-better-chance-1.png', aspect: '3018 / 1796' }],
  },
]

export function getUpdate(slug: string) {
  return UPDATES.find((u) => u.slug === slug)
}
