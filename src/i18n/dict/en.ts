import type { Dictionary } from '@/i18n/dictionary';

/**
 * English.
 *
 * Written as English, not translated word-for-word from Danish — a literal
 * translation of Danish sentence rhythm reads as stiff English. Same tone as
 * the Danish source: clear, calm, premium, specific, commercial. Typed
 * against `Dictionary` so a key added in Danish and forgotten here fails
 * `npm run typecheck` instead of rendering as `undefined`.
 */
const en: Dictionary = {
  // ------------------------------------------------------------------ chrome
  nav: {
    engine: 'Growth Engine',
    how: 'How it works',
    pricing: 'Pricing',
    faq: 'FAQ',
    work: 'Projects',
    booking: 'Book a discovery call',
  },

  header: {
    home: 'Aagesen Growth — home',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    nav: 'Main menu',
    language: 'Language',
    switchTo: 'Skift til dansk',
  },

  cta: {
    scan: 'Get your free Growth Scan',
    scanShort: 'Free Growth Scan',
    scanMobile: 'Growth Scan',
    how: 'See how it works',
    fullReview: 'Get the full review',
    bookAfklaring: 'Book a discovery call',
    back: 'Back',
    backToWork: 'Back to projects',
    viewCase: 'View the full case',
    visitSite: 'Visit the website',
    toFront: 'Back to the homepage',
  },

  // -------------------------------------------------------------------- hero
  hero: {
    eyebrow: 'Growth Engine · For service businesses',
    lines: ['More customers.', 'Fewer lost leads.'],
    lead: 'Growth Engine identifies where your digital customer journey may be losing potential customers — and helps prioritize and improve those areas continuously.',
    sources: ['Google', 'ChatGPT', 'Google Maps', 'AI search', 'Perplexity'],
    core: 'Growth Engine',
    outputs: ['Lead', 'Follow-up', 'Customer'],
    diagramAlt:
      'Search signals from Google and AI platforms flow into Growth Engine and come out as leads, follow-up and customers.',
  },

  // --------------------------------------------------------------- the scan
  scan: {
    label: 'Your website',
    placeholder: 'https://yourbusiness.com',
    cta: 'Get your free Growth Scan',
    micro: 'Free · No card required · About 60 sec.',
    invalid: 'Enter a web address, e.g. yourbusiness.com',
    running: 'Scanning',
    talkInstead: 'Would you rather talk right away?',
    steps: [
      { key: 'connect', label: 'Connecting to website' },
      { key: 'google', label: 'Analysing Google visibility' },
      { key: 'ai', label: 'Checking AI visibility' },
      { key: 'capture', label: 'Analysing lead capture' },
      { key: 'trust', label: 'Checking reviews and trust' },
      { key: 'competitors', label: 'Comparing with competitors' },
      { key: 'opportunities', label: 'Finding growth opportunities' },
    ],
    stepStatus: { done: 'Measured', queued: 'Full review', running: 'Running' },

    result: {
      eyebrow: 'Growth Scan · Preliminary result',
      scoreLabel: 'Growth Score',
      preliminary: 'Preliminary',
      basis: 'Based on {n} measured signals from your website.',
      pendingBasis:
        'Google visibility, AI visibility and competitors require search data and are measured in the full review.',
      dimensions: {
        google: 'Google visibility',
        ai: 'AI visibility',
        capture: 'Lead capture',
        trust: 'Trust and reviews',
        website: 'Technical foundation',
      },
      clientRendered:
        'This website is built with JavaScript, so content like phone numbers, forms and reviews cannot be measured from the raw HTML. They are measured in the full review.',
      pending: 'Full review',
      measured: 'Measured',
      findingsHeading: 'We found {n} growth opportunities',
      severities: { critical: 'Critical', opportunity: 'Opportunity', quickwin: 'Quick win' },
      severityPlural: { critical: 'Critical', opportunity: 'Opportunities', quickwin: 'Quick wins' },
      lockedHeading: '{n} opportunities are locked',
      lockedBody:
        'The rest of the review — search terms, AI answers, competitors and a prioritized action plan — is delivered in the full Growth Review.',
      unlockCta: 'Get the full review',
      rescan: 'Scan another website',
      unreachableHeading: 'We could not reach the website automatically.',
      unreachableBody:
        'This can happen with bot protection or a slow server. Send us the address and we will run the scan manually and send you the result.',
      unreachableCta: 'Send for a manual scan',
      timestamp: 'Scanned',
      manualRequested: 'Manual scan requested',
      networkError: 'The scan could not be completed.',
    },

    lead: {
      eyebrow: 'Full Growth Review',
      heading: 'Who should get the full review?',
      body: 'We review search terms, AI answers, competitors and lead flow manually and send a prioritized action plan. No sales sequence.',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      website: 'Website',
      optional: 'optional',
      submit: 'Book the full review',
      sending: 'Sending…',
      privacy: 'This information is only used to deliver the review.',
      successHeading: 'Thanks — the review is booked.',
      successBody:
        'You will hear from us within one business day with a time for the review. It takes about 30 minutes and needs no preparation.',
      errorHeading: 'Something went wrong.',
      errorBody: 'The request was not sent. Please try again in a moment.',
      errors: {
        name: 'Enter your name',
        company: "Enter your company's name",
        email: 'Enter your email',
        emailInvalid: "That email address doesn't look right",
      },
    },
  },

  // ----------------------------------------------------------------- problem
  problem: {
    eyebrow: 'The problem',
    heading: 'You can lose the customer before you know they exist.',
    lead: 'Growth leaks in the digital customer journey — often in more than one place at once. Both examples below are invisible in the numbers, because the customer never became an enquiry, or did and then disappeared.',
    leaks: [
      {
        index: '01',
        title: "They don't find you",
        body: 'The customer searches — on Google, in Maps, in ChatGPT. If the answer is a competitor, the choice is made before you were even in the running.',
        items: ['Google', 'ChatGPT', 'AI search', 'Local search', 'Competitors'],
      },
      {
        index: '02',
        title: "You don't capture them",
        body: 'The customer reaches out — and waits. A missed call, an unanswered form, a quote with no follow-up. The lead is lost without anyone noticing.',
        items: ['Missed calls', 'Slow response', 'No follow-up', 'Forgotten quotes', 'Old leads'],
      },
    ],
    diagram: {
      without: 'Without Growth Engine',
      with: 'With Growth Engine',
      search: 'Search',
      lead: 'Lead',
      customer: 'Customer',
      lost: 'Lost',
      leakLabels: ['Not found', 'Missed call', 'No follow-up'],
      nodeLabels: ['Found', 'Captured', 'Followed up'],
      alt: 'Two journeys. Without Growth Engine, leads fall out along the way. With Growth Engine, the search carries all the way through to customer.',
    },
  },

  // ------------------------------------------------------------------ engine
  engine: {
    eyebrow: 'Growth Engine',
    heading: 'One system. From customer journey to growth.',
    lead: 'Growth Engine identifies where your digital customer journey may be losing potential customers — and helps prioritize and improve those areas continuously. We analyse how you get discovered, how potential customers move through your website, and where friction appears between interest and enquiry.',
    stages: [
      { key: 'identify', label: 'Identify', description: 'Find where customers are lost' },
      { key: 'prioritize', label: 'Prioritize', description: 'Prioritize what matters most' },
      { key: 'improve', label: 'Improve', description: 'Improve the right places' },
      { key: 'measure', label: 'Measure', description: 'Measure the real impact' },
      { key: 'repeat', label: 'Repeat', description: 'Repeat, continuously' },
    ],
    modules: [
      {
        key: 'visibility',
        index: '01',
        title: 'Visibility',
        body: 'How you get discovered today — on Google, in local search and in AI answers are examples of what gets examined. One part of the customer journey, not the whole story.',
      },
      {
        key: 'journey',
        index: '02',
        title: 'Customer journey & conversion',
        body: 'Where on your website do interested visitors drop off before they become an enquiry?',
      },
      {
        key: 'actions',
        index: '03',
        title: 'Growth Actions',
        body: 'The most important opportunities are prioritized as concrete actions, so work always stays focused on what matters most.',
      },
      {
        key: 'measurement',
        index: '04',
        title: 'Measurement',
        body: 'Progress is tracked continuously, so you can see whether changes are moving the needle — and adjust when they aren’t.',
      },
    ],
  },

  // ----------------------------------------------------------------- product
  product: {
    eyebrow: 'Growth Engine · Dashboard',
    heading: 'Everything that drives growth. One overview.',
    lead: "This is what the system looks like for you. The numbers here are examples of what the dashboard shows — not measured results.",
    note: 'Example data',
    period: 'Last 30 days',
    metrics: {
      score: 'Growth Score',
      google: 'Google visibility',
      ai: 'AI visibility',
      received: 'Leads received',
      recovered: 'Leads recovered',
      appointments: 'Appointments',
      opportunities: 'Growth opportunities',
      actions: 'Actions completed',
      response: 'Median response time',
    },
    competitors: {
      heading: 'Visibility vs. competitors',
      you: 'You',
      competitor: 'Competitor',
    },
    trendLabel: '12 weeks',
    actions: {
      heading: 'Growth Actions',
      status: { done: 'Done', active: 'In progress', next: 'Next' },
      items: [
        'Service pages for the three most important offerings',
        'Automatic response to missed calls',
        'Review flow after a completed job',
      ],
    },
    feed: {
      heading: 'Lead flow',
      items: [
        { kind: 'lead', text: 'New enquiry via form', meta: 'response sent after 40 sec.' },
        { kind: 'recovered', text: 'Missed call', meta: 'SMS follow-up sent' },
        { kind: 'booked', text: 'Quote followed up', meta: 'appointment booked' },
      ],
    },
  },

  // ------------------------------------------------------------ before/after
  beforeAfter: {
    eyebrow: 'The operating difference',
    heading: 'Same enquiry. Two outcomes.',
    before: {
      label: 'Before',
      flows: [
        ['Lead comes in', 'waits', 'no response', 'forgotten'],
        ['Customer searches', 'competitor shown', 'customer lost'],
      ],
    },
    after: {
      label: 'With Growth Engine',
      flow: [
        'Search',
        'Business found',
        'Lead captured',
        'Immediate response',
        'Follow-up',
        'Appointment',
        'Measurable result',
      ],
    },
  },

  // ------------------------------------------------------------ scan section
  scanSection: {
    eyebrow: 'Free Growth Scan',
    heading: 'Find out where your business is losing growth.',
    lead: 'Enter your web address. The scan measures what can be measured automatically, and flags what needs the full review.',
    analyses: [
      { title: 'Google visibility', body: 'Are you found for the searches that bring in customers?' },
      { title: 'AI visibility', body: 'Do ChatGPT and AI search recommend you — or your competitor?' },
      { title: 'Website conversion', body: 'Does the site make it easy to call, message and book?' },
      { title: 'Lead capture', body: 'What happens when someone reaches out outside business hours?' },
      { title: 'Reviews and trust', body: 'Does your profile give the customer a reason to choose you?' },
      { title: 'Competitive position', body: 'Who shows up where you don’t?' },
    ],
    orTalk: 'Or skip the scan and',
    orTalkCta: 'book a discovery call',
  },

  // -------------------------------------------------------------------- how
  how: {
    eyebrow: 'How it works',
    heading: "You don't become marketers. We run the system.",
    steps: [
      { index: '01', title: 'Scan', body: 'We analyse your current digital customer journey: visibility, conversion, lead flow and competitors.' },
      { index: '02', title: 'Prioritize', body: 'We point to where you may be losing potential customers, and prioritize by expected impact.' },
      { index: '03', title: 'Improve', body: 'The growth opportunities with the greatest value are actioned first. Three prioritized actions a month.' },
      { index: '04', title: 'Measure & repeat', body: 'Progress is tracked continuously, and the next priorities are adjusted based on what is actually working.' },
    ],
  },

  // ---------------------------------------------------------------- pricing
  pricing: {
    eyebrow: 'Pricing',
    heading: 'One price. The whole system.',
    name: 'Growth Engine',
    setup: 7500,
    monthly: 5995,
    setupLabel: 'setup',
    monthlyLabel: '/ month',
    vat: 'Prices exclude VAT',
    binding: 'No commitment beyond the current month + 30 days.',
    includedHeading: "What's included",
    included: [
      'Ongoing identification of growth opportunities',
      'Monthly Growth Scan',
      '3 prioritized Growth Actions a month',
      'Google and AI visibility monitoring',
      'Automatic response to new enquiries',
      'Missed-lead recovery',
      'Follow-up sequences',
      'Review flow',
      'Growth dashboard',
      'Monthly reporting',
    ],
    microcopy: 'Built for businesses where one extra customer can pay for the system.',
    cta: 'Get your free Growth Scan',
    secondaryCta: 'Book a discovery call',
  },

  // ------------------------------------------------------- founder program
  founder: {
    eyebrow: 'Founder Program',
    heading: 'We are selecting the first three businesses for Growth Engine.',
    body: 'Three places for businesses who want to be there from the start and give honest feedback while the system is finished around them.',
    setup: 2995,
    monthly: 3995,
    duration: 'for 3 months',
    seatsLabel: 'seats',
    seats: 3,
    conditions: ['Max. 3 businesses', 'Same system, same operation', 'Standard price afterwards'],
    cta: 'Apply via Growth Scan',
    ariaLabel: 'Founder Program: limited launch offer',
  },

  // ------------------------------------------------------------- choose path
  choose: {
    eyebrow: 'Get started',
    heading: 'Two ways in. You choose.',
    lead: "A Growth Scan shows you where the potential is. A discovery call is a direct conversation about your business. Neither commits you to anything.",
    scan: {
      title: 'Free Growth Scan',
      body: 'Enter your website and see where the biggest potential is in under a minute — no conversation required first.',
      cta: 'Get your free Growth Scan',
    },
    talk: {
      title: 'Book a discovery call',
      body: "Talk directly with us about your business, and whether Growth Engine makes sense for you. No sales sequence.",
      cta: 'Book a discovery call',
    },
  },

  // -------------------------------------------------------------------- fit
  fit: {
    eyebrow: "Who it's for",
    heading: 'Growth Engine is built for businesses where:',
    forItems: [
      'customers have a meaningful order or lifetime value',
      'enquiries come in via website and phone',
      'local search matters for sales',
      'the business is already running and has demand',
      'growth can justify the investment',
    ],
    industriesLabel: 'Typically',
    industries: ['Heat pumps', 'Solar', 'Roofing', 'Windows', 'Electrical', 'Plumbing', 'Renovation'],
    notHeading: 'Not the right match if:',
    notItems: [
      'the business is brand new with no existing demand',
      "you're only looking for social media posts",
      'you expect guaranteed leads without answering customers yourselves',
    ],
  },

  // -------------------------------------------------------------------- faq
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions we get.',
    items: [
      {
        q: 'What exactly is Growth Engine?',
        a: 'Growth Engine identifies where your digital customer journey may be losing potential customers, and helps prioritize and improve those areas continuously. We analyse how you get discovered, how visitors move through your website, and where friction appears between interest and enquiry — and prioritize the most important opportunities as concrete Growth Actions.',
      },
      {
        q: 'Is this SEO?',
        a: "Google visibility is one of the things we can analyse and improve, but Growth Engine isn't an SEO package. It's an ongoing system that looks at the whole customer journey — from visibility to website conversion to follow-up — and prioritizes what matters most.",
      },
      {
        q: 'Is Google Ads included?',
        a: "No. Growth Engine works with the visibility and leads you have and can get without an ad budget. Advertising can be added on top if an analysis shows it makes sense.",
      },
      {
        q: 'Does it work with our current website?',
        a: 'Yes. Growth Engine connects to the website you already have. Changes with a large expected impact are included in the monthly Growth Actions.',
      },
      {
        q: 'Do we need a new CRM?',
        a: 'No. Lead capture and follow-up run inside Growth Engine. If you already use a system, leads can be forwarded there.',
      },
      {
        q: 'What is AI visibility?',
        a: 'Whether ChatGPT, Google AI Overviews and similar mention and recommend you when someone asks for a provider in your area. It is one of the areas Growth Engine can monitor and improve — not the whole product.',
      },
      {
        q: 'How quickly can it be installed?',
        a: 'Typically within two weeks of agreement. The scan and the first prioritized plan are ready before anything is connected.',
      },
      {
        q: 'Can you guarantee more customers?',
        a: "No, and no one should. We sell the process and the implementation — not a guaranteed outcome. We can guarantee that the most important opportunities in your customer journey are identified, prioritized and improved continuously, and that you can see it in the numbers.",
      },
      {
        q: 'What happens after the Growth Scan?',
        a: 'You get the preliminary result immediately. If you request the full review, you get a 30-minute Growth Review with search terms, AI answers, competitors and a prioritized plan — with no obligation.',
      },
      {
        q: 'Can I talk to you without doing a Growth Scan first?',
        a: "Yes. Book a discovery call, and we'll talk directly about your business and whether Growth Engine is relevant for you. A Growth Scan helps you understand the potential — it isn't a requirement for getting in touch.",
      },
      {
        q: 'Is there a minimum term?',
        a: 'No. Setup is a one-time payment. The subscription can be cancelled with the current month + 30 days.',
      },
    ],
  },

  // ------------------------------------------------------------- final cta
  final: {
    eyebrow: 'Get started',
    heading: 'Ready to see where your business has room to grow?',
    lead: 'Enter your web address and get your preliminary result right away — or book a call directly.',
    primary: 'Get your free Growth Scan',
    secondary: 'Book a discovery call',
    reassure: 'No commitment. No sales sequence.',
  },

  // ----------------------------------------------------------------- footer
  footer: {
    description:
      'Growth Engine identifies where you may be losing potential customers in your digital customer journey — and helps prioritize and improve those areas continuously.',
    productHeading: 'Growth Engine',
    companyHeading: 'Company',
    contactHeading: 'Contact',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    cvr: 'CVR',
    rights: 'All rights reserved.',
  },

  // ------------------------------------------------------------------ pages
  pages: {
    booking: {
      title: 'Book a discovery call',
      description:
        'Book a free, no-obligation discovery call with Aagesen Growth about your digital customer journey, and whether Growth Engine makes sense for you.',
      heading: 'Book a discovery call',
      lead: 'A direct conversation about your business — not a sales call. Free and no obligation.',
      agendaHeading: "What we'll cover",
      agenda: [
        'Your current digital customer journey — where you show up, and how the site converts',
        'Where you may be losing potential customers, and what would matter most to fix first',
        'Whether Growth Engine is relevant for you right now',
        'What working together would actually involve',
      ],
      noneHeading: "What doesn't happen",
      none: ['No sales sequence', 'No automated calls', 'Your information is only used for this call'],
      embedNote: 'Choose a time that works for you.',
      embedFallbackLink: 'Open the calendar in a new tab',
      fallbackHeading: 'Calendar booking is on its way.',
      fallbackBody:
        "Leave your details and we'll find a time together. You'll hear from us within one business day.",
    },
    work: {
      title: 'Projects',
      description: 'Selected projects from Aagesen Growth — websites and digital systems built for real businesses.',
      heading: 'Projects',
      lead: 'Selected work from before Growth Engine. Websites and digital systems for real businesses.',
      allLabel: 'All projects',
      disciplinesLabel: 'Disciplines',
      deliveredLabel: 'Delivered',
      demonstratesLabel: 'What it shows',
      challengeLabel: 'Starting point',
      periodLabel: 'Period',
      nextLabel: 'Next project',
      similarCta: 'Get a free Growth Scan',
    },
    notFound: {
      title: 'Page not found',
      heading: '404',
      lead: "This page doesn't exist — or it has moved. Try the homepage.",
      cta: 'Go to homepage',
    },
  },

  // -------------------------------------------------------------------- legal
  legal: {
    eyebrow: 'Legal',
    noticeLabel: 'Note',
    governingNotice: 'This page is shown in English for convenience. The Danish version below is the legally governing text.',
    contactFormFallback: 'the contact form',
    privacyTitle: 'Privacy Policy',
    privacyDescription:
      "How Aagesen Growth ApS processes personal data from the contact form, in line with GDPR.",
    privacyLead: 'What information we receive, what it is used for, and what you can require.',
    cookiesTitle: 'Cookie Policy',
    cookiesDescription:
      'Which cookies Aagesen Growth ApS uses, what they do, and how to change or withdraw your consent.',
    cookiesLead: "What gets set, when — and how to change your mind.",
    templateNotice: 'This text is a template and should be reviewed by a lawyer before launch.',
    changeChoice: 'Change your choice',
    changeChoiceBody:
      'Your consent is stored locally in your browser. You can withdraw it here, after which the banner is shown again.',
    resetButton: 'Reset cookie choice',
    resetDone: 'Your choice has been reset. The banner will show again at the bottom of the page.',
  },

  cookies: {
    heading: 'Cookies',
    body: 'We use essential cookies so the site works. With your consent, we also use statistics and marketing cookies. You can change your choice at any time.',
    accept: 'Accept all',
    reject: 'Decline',
    policy: 'Cookie Policy',
  },

  meta: {
    homeTitle: 'Growth Engine — more customers, fewer lost leads | Aagesen Growth',
    homeDescription:
      'Growth Engine identifies where your digital customer journey may be losing potential customers — and helps prioritize and improve those areas continuously. Get a free Growth Scan, or book a discovery call.',
  },

  // ------------------------------------------------------------------- work
  /**
   * Only the two real cases stay — MOWE Systems was removed from the public
   * site (see the master cleanup task). The Danish version is the source of
   * record for `id`/`slug`/media keys; this only supplies the English prose.
   */
  work: {
    cases: {
      'plus-eins': {
        kind: 'Boutique · Salumeria · Deli · Rørvig, Denmark',
        disciplines: ['Website', 'SEO', 'GEO', 'Meta Ads', 'Strategy'],
        summary:
          'A digital foundation for a physical boutique that needed to be as clear online as it is in the store.',
        strapline: 'From a physical concept to a coherent digital brand.',
        challenge:
          'Plus Eins had a strong physical identity, but its digital presence told a different story. There was no single place where the brand, the range and the store’s tone came together — and no foundation that could carry future growth.',
        sections: [
          {
            heading: 'Approach',
            body: 'The work started with structure rather than design. What does a visitor need to be able to find out, and in what order? Only then was the visual layer added, so the design supports the content instead of competing with it.',
          },
          {
            heading: 'What we built',
            body: 'A website that brings the brand, the range and the store’s practical information together in one place. The page structure was built so new categories and concepts could be added without reworking it — which mattered when the Deli concept arrived.',
          },
          {
            heading: 'Ongoing work',
            body: 'The collaboration has continued past launch with content, visual communication, social media and ongoing marketing direction. Priorities are adjusted to what the store needs in a given period.',
          },
        ],
        delivered: [
          'Website with an extensible structure',
          'Digital brand direction',
          'Content and visual communication',
          'Social media and campaigns',
          'SEO and GEO',
          'Webshop preparation',
        ],
        demonstrates:
          'That a website should be built for what comes next. The structure held up when an entirely new concept needed to be added.',
        proofLine: 'Website · brand system · ongoing growth partnership',
        period: 'Ongoing partnership',
        disclosure: '',
        media: {
          desktop: {
            alt: 'The pluseins.dk homepage on desktop with the full-width hero image from the courtyard.',
            caption: '',
          },
          mobile: { alt: 'The pluseins.dk homepage on mobile with navigation and hero image.', caption: '' },
          photoBoutique: {
            alt: 'Plus Eins boutique exterior with parasols, director’s chairs and baskets on the terrace.',
            caption: 'Boutique',
          },
          photoSalumeria: {
            alt: 'The salumeria counter at Plus Eins with cured meats, cheeses and delicatessen goods.',
            caption: 'Salumeria',
          },
          photoExterior: {
            alt: 'The Plus Eins building in Rørvig seen from outside in evening light with lit windows.',
            caption: 'The store',
          },
          screenBoutique: {
            alt: 'The Boutique page on pluseins.dk with an editorial layout of image and text.',
            caption: 'Boutique',
          },
          screenSalumeria: {
            alt: 'The Salumeria page on pluseins.dk using the same page template as the other concepts.',
            caption: 'Salumeria',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
      'plus-eins-deli': {
        kind: 'Concept launch',
        disciplines: ['Concept launch', 'Content', 'Meta Ads'],
        summary:
          'Launching a new deli concept under an existing brand — without diluting the brand it grew out of.',
        strapline: 'A new concept inside an established brand.',
        challenge:
          'The Deli concept needed to be introduced as something new and distinct, while still clearly belonging to Plus Eins. Too much separation and it would feel like an unrelated business; too little and it would disappear into the existing one.',
        sections: [
          {
            heading: 'Approach',
            body: 'The concept was treated as an extension of the brand, not a side project. Same visual foundation, but its own track within the structure, so Deli could be communicated on its own terms without breaking the whole.',
          },
          {
            heading: 'The launch',
            body: 'The introduction itself ran digitally through the website, content and social media with one coordinated direction rather than scattered posts. The digital foundation was in place before the communication went live — not the other way around.',
          },
        ],
        delivered: [
          'Digital launch of the concept',
          'Content and visual communication',
          'Integration into the existing page structure',
          'Campaigns and ongoing visibility',
        ],
        demonstrates:
          'That a launch is a structure and timing problem just as much as a design problem.',
        proofLine: 'Concept page · launch content · campaigns',
        period: 'Ongoing partnership',
        disclosure: 'Part of the ongoing partnership with Plus Eins.',
        media: {
          desktop: {
            alt: 'The Deli page on pluseins.dk with the heading Deli next to a large image of a focaccia.',
            caption: '',
          },
          mobile: { alt: 'The Deli page on pluseins.dk shown on mobile.', caption: '' },
          photoDeli: {
            alt: 'Focaccia with prosciutto di Parma, tomato and rocket from Plus Eins Deli.',
            caption: 'Deli',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
    },
  },
};

export default en;
