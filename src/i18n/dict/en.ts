import type { Dictionary } from '@/i18n/dictionary';

/** English. Type-checked against the Danish source shape. */
const en: Dictionary = {
  nav: {
    work: 'Work',
    services: 'Services',
    pricing: 'Pricing',
    approach: 'How we work',
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
  },

  header: {
    home: 'Aagesen Growth — back to the homepage',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    language: 'Language',
    languageSwitch: 'Change language',
  },

  cta: {
    startProject: 'Start a project',
    seeWork: 'See our work',
    seePricing: 'See pricing',
    allPricing: 'See all pricing',
    viewCase: 'View the case',
    visitSite: 'Visit the site',
    talk: 'Talk to us about the project',
    writeDirect: 'Email us directly',
    allQuestions: 'See all questions',
    back: 'Back',
    backToWork: 'Back to work',
  },

  hero: {
    eyebrow: 'Websites · SEO · GEO · Google Ads · Meta Ads',
    lines: ['Digital growth.', 'Without the', 'big agency.'],
    lead: 'Websites, SEO, GEO and paid growth for companies that want better digital results without unnecessary agency complexity.',
    primary: 'Start a project',
    secondary: 'See our work',
    scroll: 'Scroll',
    stack: {
      label: 'Selected work',
      desktopAlt: 'The pluseins.dk homepage shown in a browser window.',
      mobileAlt: 'pluseins.dk shown on a phone.',
    },
  },

  ticker: [
    'Website design & development',
    'SEO',
    'GEO / AI visibility',
    'Google Ads',
    'Meta Ads',
    'Growth strategy',
    'Analytics & tracking',
    'Ongoing care',
  ],

  ledger: {
    eyebrow: 'Services & pricing',
    heading: 'Eight disciplines. Five price points.',
    lead: 'Everything can stand alone or come together in one ongoing engagement. The prices below are starting points — the final price depends on scope.',
    fromLabel: 'From',
    perMonth: '/ mo.',
    oneOff: 'one-off',
    partOf: 'Part of Growth Partner',
    note: 'All prices exclude VAT. Ad spend, hosting and licences are billed separately.',
  },

  services: {
    websites: {
      name: 'Websites',
      line: 'Design and development',
      body: 'Custom design and development built around the customer journey — not around a template.',
    },
    seo: {
      name: 'SEO',
      line: 'Visibility in Google',
      body: 'Technical foundation, content structure and search intent, so the people looking find you.',
    },
    geo: {
      name: 'GEO',
      line: 'Visibility in AI search',
      body: 'Structured information, so you are understood and cited by ChatGPT, Perplexity and AI Overviews.',
    },
    googleAds: {
      name: 'Google Ads',
      line: 'Active demand',
      body: 'Campaign structure, conversion tracking and continuous optimisation against the searches that buy.',
    },
    metaAds: {
      name: 'Meta Ads',
      line: 'Demand and retargeting',
      body: 'Audiences, creative testing and retargeting across Facebook and Instagram.',
    },
    strategy: {
      name: 'Growth strategy',
      line: 'Prioritisation',
      body: 'What to do first, why, and what it can realistically be expected to move.',
    },
    analytics: {
      name: 'Analytics',
      line: 'Tracking and measurement',
      body: 'A measurement setup you can make decisions on — consent, events and reporting.',
    },
    care: {
      name: 'Website care',
      line: 'Ongoing maintenance',
      body: 'Updates, backups, security, performance and the small fixes that otherwise pile up.',
    },
  },

  websites: {
    eyebrow: 'Websites',
    lines: ['We build websites', "that don't look", 'like templates.'],
    lead: 'A website is not a brochure. It is where people decide whether they want to get in touch. We design and build it ourselves — structure, design, code, measurement and care.',
    includesLabel: 'A website project can include',
    includes: [
      'Custom design',
      'Responsive development',
      'SEO foundations',
      'GEO / AI visibility',
      'Analytics and tracking',
      'Conversion structure',
      'CMS where it makes sense',
      'Integrations',
      'Ongoing care',
    ],
    priceLabel: 'Website projects from',
    priceNote: 'Final price depends on scope, content and functionality.',
    proofLabel: 'The website you are reading right now',
    proofBody: 'was built by us. Same stack, same standards for speed, accessibility and visibility as the work we do for clients.',
    cta: 'Start a website project',
  },

  featured: {
    eyebrow: 'Selected project',
    kicker: 'Digital platform · website · visibility',
    heading: 'From physical destination to digital brand experience.',
    body: 'Plus Eins is a boutique, salumeria and deli in Rørvig. We built the digital foundation — website, structure and visibility — and have run the ongoing marketing since. When the Deli concept arrived, the structure carried it without being rebuilt.',
    facts: [
      { label: 'One digital universe', body: 'Boutique, Salumeria and Deli under a single coherent identity.' },
      { label: 'Mobile first', body: 'Designed for the part of the customer journey that actually happens on a phone.' },
      { label: 'Search-ready', body: 'Technical structure built for both Google and AI-based search.' },
      { label: 'Built to grow', body: 'New concepts and campaigns can be added without a rebuild.' },
    ],
    ctaCase: 'View the case',
    ctaSimilar: 'Start a project like this',
    moreLabel: 'More work',
  },

  searchVisibility: {
    eyebrow: 'SEO + GEO',
    lines: ['Search is changing.', 'Your visibility', 'should too.'],
    lead: 'People still search in Google. But more and more of them ask an AI assistant instead — and get one answer with a couple of sources, rather than ten blue links. To be one of those sources, your information has to be readable by both.',
    seo: {
      title: 'SEO',
      body: 'Visibility in the search results.',
      points: [
        'Technical foundation and indexing',
        'Content structure and internal linking',
        'Search intent and content',
        'Local search and Google Business',
      ],
    },
    geo: {
      title: 'GEO',
      body: 'Visibility in AI-generated answers.',
      points: [
        'Structured data and schema',
        'Unambiguous, quotable phrasing',
        'Consistency across sources',
        'Monitoring of AI answers',
      ],
    },
    measure: {
      title: 'Measurement',
      body: 'We report on what can be checked: rankings, clicks, enquiries and when you appear as a source. Not on visibility scores nobody can verify.',
    },
    priceLabel: 'SEO + GEO from',
    cta: 'Get a visibility assessment',
  },

  paid: {
    eyebrow: 'Paid growth',
    lines: ['Ad spend', 'you can account for.'],
    lead: 'Google Ads and Meta Ads run as arithmetic, not as a campaign calendar. We set it up, measure it, cut what fails and scale what works.',
    points: [
      { label: 'Setup', body: 'Account, campaign structure and audiences built from scratch — or a clean-up of what is already there.' },
      { label: 'Management', body: 'Continuous adjustment of messaging, budgets and targeting based on what actually converts.' },
      { label: 'Tracking', body: 'Conversion tracking and consent set up properly, so the numbers can be used for something.' },
      { label: 'Reporting', body: 'What you spent, what you got, and what we are changing next. In plain language.' },
    ],
    priceLabel: 'Ad management from',
    adSpendNote: 'Ad spend is paid directly to Google and Meta and is not part of the management fee.',
    cta: 'Talk about advertising',
  },

  pricing: {
    eyebrow: 'Pricing',
    lines: ['No hidden', 'agency pricing.'],
    lead: 'Starting prices, not bait prices. The final price depends on scope — and you get it before we begin.',
    fromLabel: 'From',
    perMonth: 'per month',
    oneOff: 'one-off',
    exVat: 'excl. VAT',
    recommended: 'Most chosen',
    includesLabel: 'Typically includes',
    tiers: {
      websites: {
        name: 'Websites',
        tagline: 'Design and development of a new website',
        body: 'For companies that need a website which actually generates enquiries.',
        includes: [
          'Custom design and development',
          'Responsive on every screen',
          'SEO and GEO foundations',
          'Analytics and conversion tracking',
          'Launch and handover',
        ],
      },
      searchVisibility: {
        name: 'SEO + GEO',
        tagline: 'Visibility in Google and AI search',
        body: 'For companies that want to be found by the people looking — wherever they look.',
        includes: [
          'Technical SEO and content structure',
          'Search intent and content plan',
          'Structured data and schema',
          'AI visibility and source monitoring',
          'Monthly reporting',
        ],
      },
      paid: {
        name: 'Paid growth',
        tagline: 'Google Ads and Meta Ads',
        body: 'For companies that want to buy demand and see what a customer actually costs.',
        includes: [
          'Setup and campaign structure',
          'Ongoing management and optimisation',
          'Creative and messaging tests',
          'Conversion tracking',
          'Monthly reporting',
        ],
      },
      partner: {
        name: 'Growth Partner',
        tagline: 'Ongoing digital partner',
        body: 'For companies that want one partner across the whole digital picture — and a plan that gets executed.',
        includes: [
          'Ongoing website improvements',
          'SEO, GEO and content',
          'Advertising as needed',
          'Analytics and conversion work',
          'Strategy and prioritisation',
          'One fixed contact, one fixed cadence',
        ],
      },
      care: {
        name: 'Website care',
        tagline: 'Care for a website we built',
        body: 'For companies that want the website kept updated, secure and fast.',
        includes: [
          'Updates and backups',
          'Security and monitoring',
          'Performance checks',
          'Minor content edits',
        ],
      },
    },
    disclaimer: 'All prices exclude VAT and are starting points. Ad spend, hosting, licences, photography and external costs are billed separately. Ongoing agreements can be cancelled with one month’s notice.',
    cta: 'Get a price for your project',
  },

  process: {
    eyebrow: 'How we work',
    heading: 'Four steps. No middle layer.',
    lead: 'You talk to the person doing the work. The whole way through.',
    steps: [
      { label: 'Clarity', body: 'We work out what the problem actually is and what is worth doing first. Free, and without a sales pitch dressed up as an analysis.' },
      { label: 'Plan and price', body: 'You get a concrete scope and a fixed price before the work starts. No hours running away.' },
      { label: 'Execution', body: 'We build. You see it along the way and can adjust while adjusting is still cheap.' },
      { label: 'Care and growth', body: 'After launch we measure, fix and improve — or you take it over yourselves. Either is fine.' },
    ],
  },

  about: {
    eyebrow: 'About Aagesen Growth',
    heading: 'Small setup. Senior work.',
    body: [
      'Aagesen Growth is not an agency with 50 employees, and we do not pretend to be. We are a small, modern setup where the person who sells the work is also the person who does it.',
      'That means a shorter path from decision to execution, no account layer between you and the work, and no overhead you pay for without getting anything back. In return we do not take everything on — we say no to work we are not the right people for.',
    ],
    points: [
      { label: 'Direct access', body: 'You write to the person building it. Not to a project coordinator.' },
      { label: 'Fixed scope', body: 'You know what is being delivered before we start.' },
      { label: 'Fast execution', body: 'Short decision paths mean things get done this week, not next quarter.' },
    ],
    disclosure: 'Aagesen Growth ApS is part of MOWE Systems ApS.',
  },

  finalCta: {
    lines: ['Let us work out', 'what would actually', 'move something.'],
    lead: 'Tell us briefly what is not working today. We will tell you what we would prioritise first — including if the answer is that you do not need us.',
    primary: 'Start a project',
    secondary: 'Email us directly',
    reassure: 'No commitment. No sales call.',
  },

  footer: {
    description: 'Websites, visibility and advertising from one accountable partner — for companies that want it done properly.',
    servicesHeading: 'Services',
    companyHeading: 'Company',
    legalHeading: 'Legal',
    privacy: 'Privacy policy',
    cookies: 'Cookie policy',
    cvr: 'VAT no.',
    rights: 'All rights reserved.',
    builtBy: 'Designed and built by Aagesen Growth.',
  },

  pages: {
    pricing: {
      title: 'Pricing',
      description: 'Starting prices for websites, SEO + GEO, paid growth, growth partner and website care. No hidden agency pricing.',
      heading: 'Pricing',
      lead: 'Starting prices for each discipline. The final price depends on scope, and you get it in writing before we begin.',
    },
    work: {
      title: 'Work',
      description: 'Selected projects from Aagesen Growth — websites, digital platforms and ongoing growth engagements.',
      heading: 'Work',
      lead: 'Selected work. Websites, digital platforms and ongoing engagements.',
      allLabel: 'All projects',
      disciplinesLabel: 'Disciplines',
      deliveredLabel: 'Delivered',
      demonstratesLabel: 'What it shows',
      challengeLabel: 'The starting point',
      periodLabel: 'Period',
      nextLabel: 'Next project',
      similarCta: 'Start a project like this',
    },
    contact: {
      title: 'Contact',
      description: 'Write to Aagesen Growth about websites, SEO, GEO or advertising. You get a concrete answer — not a sales sequence.',
      heading: 'Start a project',
      lead: 'Tell us briefly what you need. You get a concrete answer from the person who would do the work.',
      formHeading: 'Write to us',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      website: 'Website',
      help: 'What is it about?',
      helpPlaceholder: 'Choose an area',
      helpOther: 'Not sure yet / other',
      message: 'Message',
      messagePlaceholder: 'What is not working today, and what would you like instead?',
      submit: 'Send enquiry',
      sending: 'Sending…',
      successHeading: 'Thanks — we have it.',
      successBody: 'We will come back to you as soon as we can, usually within one working day.',
      errorHeading: 'Something went wrong.',
      errorBody: 'The message was not sent. Try again, or email us directly.',
      required: 'required',
      optional: 'optional',
      errors: {
        name: 'Enter your name',
        email: 'Enter your email so we can reply',
        emailInvalid: 'That email address does not look right',
        message: 'Briefly describe what you need help with',
      },
      nextHeading: 'What happens now',
      next: [
        'You get an on-screen confirmation straight away.',
        'We read the enquiry and look at your site ourselves, if you gave us the address.',
        'You get a concrete answer — either a couple of clarifying questions or a suggestion for a short conversation.',
      ],
      noneHeading: 'What does not happen',
      none: [
        'No automated email sequences',
        'No follow-up sales calls',
        'Your details are only used to answer you',
      ],
      directHeading: 'Or directly',
    },
    faq: {
      title: 'Frequently asked questions',
      description: 'Answers to the questions we are asked most often about pricing, timelines, websites, SEO, GEO and advertising.',
      heading: 'Frequently asked questions',
      lead: 'The questions we get most often. If one is missing, ask.',
    },
    notFound: {
      title: 'Page not found',
      heading: '404',
      lead: 'This page does not exist — or it has moved. Try the homepage.',
      cta: 'Go to the homepage',
    },
    legalNotice:
      'Our privacy and cookie policies are published in Danish, which is the legally governing version.',
  },

  cookies: {
    heading: 'Cookies',
    body: 'We use necessary cookies to make the site work. With your consent we also use statistics and marketing cookies. You can change your choice at any time.',
    accept: 'Accept all',
    reject: 'Reject',
    customise: 'Customise',
    save: 'Save choice',
    policy: 'Cookie policy',
    necessary: 'Necessary',
    necessaryBody: 'Required for the site to work. Cannot be turned off.',
    statistics: 'Statistics',
    statisticsBody: 'Helps us understand how the site is used.',
    marketing: 'Marketing',
    marketingBody: 'Used to measure and target advertising.',
    always: 'Always on',
  },

  work: {
    cases: {
      'plus-eins': {
        kind: 'Boutique · Salumeria · Deli · Rørvig',
        disciplines: ['Website', 'SEO', 'GEO', 'Meta Ads', 'Strategy'],
        summary:
          'A digital foundation for a physical boutique that needed to be as clear online as it is in the shop.',
        strapline: 'From physical concept to coherent digital brand.',
        challenge:
          'Plus Eins had a strong physical identity, but the digital presence was not telling the same story. There was no single place where the brand, the range and the tone of the shop held together — and no foundation that could carry what came next.',
        sections: [
          {
            heading: 'Approach',
            body: 'The work started with structure rather than design. What should a visitor be able to work out, and in what order? Only then was the visual layer put on top, so that the design supports the content instead of competing with it.',
          },
          {
            heading: 'What we built',
            body: 'A website that brings the brand, the range and the practical details of the shop into one place. The page structure was made so that new categories and concepts can be added without rebuilding it — which turned out to matter when the Deli concept arrived.',
          },
          {
            heading: 'Ongoing work',
            body: 'The engagement has continued past launch with content, visual communication, social media and the ongoing marketing direction. Priorities are adjusted to what the shop needs in a given period.',
          },
        ],
        delivered: [
          'Website with a structure built to extend',
          'Digital brand direction',
          'Content and visual communication',
          'Social media and campaigns',
          'SEO and GEO',
          'Groundwork for an online shop',
        ],
        demonstrates:
          'That a website has to be built for what comes after it. The structure held when an entirely new concept had to fit inside it.',
        proofLine: 'Website · brand system · ongoing growth engagement',
        period: 'Ongoing engagement',
        disclosure: '',
        media: {
          desktop: {
            alt: 'The pluseins.dk homepage on desktop with the full-width hero photograph of the courtyard.',
            caption: '',
          },
          mobile: {
            alt: 'The pluseins.dk homepage on mobile with the navigation and hero image.',
            caption: '',
          },
          photoBoutique: {
            alt: 'The Plus Eins boutique from outside, with parasols, director’s chairs and baskets on the terrace.',
            caption: 'Boutique',
          },
          photoSalumeria: {
            alt: 'The salumeria counter at Plus Eins with cured sausage, cheese and delicatessen.',
            caption: 'Salumeria',
          },
          photoExterior: {
            alt: 'The Plus Eins building in Rørvig seen from outside in evening light, windows lit.',
            caption: 'The shop',
          },
          screenBoutique: {
            alt: 'The boutique page on pluseins.dk with an editorial arrangement of image and text.',
            caption: 'Boutique',
          },
          screenSalumeria: {
            alt: 'The salumeria page on pluseins.dk using the same page template as the other concepts.',
            caption: 'Salumeria',
          },
        },
      },
      'plus-eins-deli': {
        kind: 'Concept launch',
        disciplines: ['Concept launch', 'Content', 'Meta Ads'],
        summary:
          'The launch of a new deli concept inside an existing brand — without diluting the brand it grew out of.',
        strapline: 'A new concept inside an established brand.',
        challenge:
          'The Deli concept had to be introduced as something new and self-contained, while still clearly belonging to Plus Eins. Too much separation and it would read as a different business. Too little and it would disappear into what was already there.',
        sections: [
          {
            heading: 'Approach',
            body: 'The concept was treated as an extension of the brand, not a side project. The same visual register, but its own track in the structure, so Deli can be communicated on its own without breaking the whole.',
          },
          {
            heading: 'The launch',
            body: 'The introduction itself ran digitally through the website, content and social media with one coherent direction rather than scattered posts. The digital foundation was in place before the communication went out — not the other way around.',
          },
        ],
        delivered: [
          'Digital launch of the concept',
          'Content and visual communication',
          'Integration into the existing page structure',
          'Campaigns and ongoing visibility',
        ],
        demonstrates:
          'That a launch is a problem of structure and timing as much as it is a problem of design.',
        proofLine: 'Concept page · launch content · campaigns',
        period: 'Ongoing engagement',
        disclosure: 'Part of the ongoing engagement with Plus Eins.',
        media: {
          desktop: {
            alt: 'The Deli page on pluseins.dk, the heading Deli beside a large photograph of a focaccia.',
            caption: '',
          },
          mobile: { alt: 'The Deli page on pluseins.dk shown on mobile.', caption: '' },
          photoDeli: {
            alt: 'Focaccia with prosciutto di Parma, tomato and rocket from Plus Eins Deli.',
            caption: 'Deli',
          },
        },
      },
      'mowe-systems': {
        kind: 'SaaS · AI visibility',
        disciplines: ['Brand', 'Product', 'Website', 'SEO', 'GEO'],
        summary:
          'From a complex software idea to a product you can understand in thirty seconds — and a platform that can grow.',
        strapline: 'A new category, explained in thirty seconds.',
        challenge:
          'MOWE Systems is an AI visibility platform. That kind of product is hard to sell because the category is new: people first have to understand that the problem exists before they can see the value of the solution. Technical depth had to be conveyed without becoming inaccessible.',
        sections: [
          {
            heading: 'Positioning first',
            body: 'Before a line of code was written for the website, we settled what the product is, who it is for, and what problem it solves in language a decision-maker can use. The positioning became the foundation for both the product structure and the communication.',
          },
          {
            heading: 'Product and website as one',
            body: 'The website and the product’s own structure were developed together, so the way the product is explained matches the way it actually works. That makes both onboarding and selling easier, because there is no gap between promise and reality.',
          },
          {
            heading: 'Visibility in a new category',
            body: 'SEO and GEO were built in from the start. When a category is new there are few established searches to fight over — but there is a real chance of becoming the source that both search engines and AI assistants draw on.',
          },
        ],
        delivered: [
          'Brand and positioning',
          'Website and product communication',
          'Product architecture and conversion structure',
          'SEO and GEO strategy',
          'Technical foundation for the platform',
        ],
        demonstrates:
          'That technical depth and simple communication are not opposites. The hard part is making the complex understandable without making it wrong.',
        proofLine: 'Positioning · product architecture · website · visibility',
        period: '',
        disclosure:
          'MOWE Systems was created and developed by the same person behind Aagesen Growth.',
        media: {
          desktop: {
            alt: 'The mowesystems.com homepage with the heading Get Found Before Your Competitors and the analysis form.',
            caption: '',
          },
          mobile: { alt: 'The mowesystems.com homepage shown on mobile.', caption: '' },
          screenProduct: {
            alt: 'The product section on mowesystems.com contrasting visibility before and after.',
            caption: 'Before and after',
          },
          screenSteps: {
            alt: 'The section on mowesystems.com explaining the product in three steps.',
            caption: 'The product in three steps',
          },
        },
      },
    },
  },

  faq: [
    {
      q: 'What does a website cost?',
      a: 'Website projects start from DKK 12,500 excluding VAT. The price depends on scope: how many pages, how much content has to be produced, whether a CMS or integrations are needed, and how much functionality has to be built. You get a fixed price before the work begins.',
    },
    {
      q: 'How long does a website take?',
      a: 'A typical website takes two to six weeks from start to launch. What usually stretches a project is not the development — it is content, photography and rounds of feedback. We say up front what we need from you and when.',
    },
    {
      q: 'What is the difference between SEO and GEO?',
      a: 'SEO is about being found in the search results — technical foundation, content structure and search intent. GEO is about being understood and cited in AI-generated answers, for example in ChatGPT, Perplexity or Google’s AI Overviews. They draw on many of the same things, but GEO puts sharper demands on structured data and on your information being unambiguous and consistent across sources.',
    },
    {
      q: 'Is ad spend included in the price?',
      a: 'No. The fee covers setup, management, optimisation and reporting. The ad budget itself you pay directly to Google and Meta, so you have full visibility of what is being spent.',
    },
    {
      q: 'Can you improve our current website instead of building a new one?',
      a: 'Often, yes. If the foundation is sound it is usually cheaper and faster to fix structure, speed, content and conversion points than to start over. We will say honestly if we think a new website is the right call — and just as honestly if it is not.',
    },
    {
      q: 'Are we tied into a long agreement?',
      a: 'No. Ongoing agreements run month to month and can be cancelled with one month’s notice. A website project is a one-off piece of work at a fixed price.',
    },
    {
      q: 'Who does the work?',
      a: 'The person you talk to. Aagesen Growth is a small setup — there is no account layer between you and whoever is building. If a task needs skills we do not have, we say so and point you elsewhere.',
    },
    {
      q: 'What if we already have an agency?',
      a: 'Then there are usually two options: we take a defined piece they do not cover, or we look at the numbers with you and say what we would do differently. We are not going to spend your time convincing you to switch if what you have is working.',
    },
  ],

  meta: {
    homeTitle: 'Aagesen Growth — websites, SEO, GEO and paid growth',
    homeDescription:
      'Websites, SEO, GEO and paid growth for companies that want better digital results without unnecessary agency complexity. Websites from DKK 12,500.',
  },
};

export default en;
