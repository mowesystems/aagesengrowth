import type { Dictionary } from '@/i18n/dictionary';

/**
 * English.
 *
 * Written as English, not translated word for word from Danish. Same tone as
 * the Danish source: clear, calm, specific, commercial. Typed against
 * `Dictionary` so a key added in Danish and forgotten here fails
 * `npm run typecheck` instead of rendering as `undefined`.
 */
const en: Dictionary = {
  // ------------------------------------------------------------------ chrome
  nav: {
    engine: 'Growth Engine',
    websites: 'Websites',
    how: 'How it works',
    pricing: 'Pricing',
    faq: 'FAQ',
    work: 'Projects',
    booking: 'Book a discovery call',
  },

  header: {
    home: 'Aagesen Growth, go to homepage',
    menu: 'Menu',
    close: 'Close',
    skip: 'Skip to content',
    nav: 'Main menu',
    language: 'Language',
    switchTo: 'Skift til dansk',
  },

  cta: {
    scan: 'Run a free Growth Scan',
    scanShort: 'Free Growth Scan',
    scanMobile: 'Growth Scan',
    how: 'See how it works',
    fullReview: 'Get the full review',
    bookAfklaring: 'Book a discovery call',
    callback: 'Request a callback',
    seeWebsites: 'See website packages',
    seeWebsitesPage: 'See websites and prices',
    seeCase: 'See the case',
    seePricing: 'See pricing',
    allFaq: 'See all questions',
    back: 'Back',
    backToWork: 'Back to projects',
    viewCase: 'View the full case',
    visitSite: 'Visit the website',
    toFront: 'Go to homepage',
  },

  // -------------------------------------------------------------------- hero
  hero: {
    eyebrow: 'Growth Engine · For service businesses',
    lines: ['More customers.', 'Fewer lost leads.'],
    lead: 'Growth Engine finds the places in your digital customer journey where you may be missing out on customers, and helps you prioritise and improve them continuously.',
    sources: ['Google', 'ChatGPT', 'Google Maps', 'AI search', 'Perplexity'],
    core: 'Growth Engine',
    outputs: ['Enquiry', 'Follow-up', 'Customer'],
    diagramAlt:
      'Searches from Google and AI platforms flow into Growth Engine and on to enquiry, follow-up and customer.',
  },

  // --------------------------------------------------------------- the scan
  scan: {
    label: 'Your website',
    placeholder: 'https://yourbusiness.com',
    cta: 'Run free Growth Scan',
    micro: 'Free · No card required · About 30 sec.',
    invalid: 'Enter a web address, e.g. yourbusiness.com',
    running: 'Scanning',
    talkInstead: 'Book a discovery call',
    steps: [
      { key: 'open', label: 'Opening the website in a browser' },
      { key: 'pages', label: 'Reviewing subpages' },
      { key: 'contact', label: 'Contact and booking' },
      { key: 'google', label: 'Google visibility' },
      { key: 'gbp', label: 'Reviews and Google profile' },
      { key: 'followup', label: 'Follow-up' },
      { key: 'report', label: 'Putting the report together' },
    ],
    stepStatus: { done: 'Reviewed', running: 'In progress' },

    result: {
      eyebrow: 'Growth Scan',
      areas: {
        website: 'Website',
        google: 'Google',
        gbp: 'Reviews & Google profile',
        contact: 'Contact & booking',
        followup: 'Follow-up',
      },
      recommendation: 'Our recommendation',
      cta: 'Book a conversation about Growth Engine',
      websiteCta: 'See website packages',
      notSeen: "What we can't see from the outside",
      save: 'Save the report',
      savePdf: 'Save as PDF',
      saveImage: 'Save as image',
      preparing: 'Preparing …',
      privacyNote: "The report is for you only. It's based on publicly available information and isn't shared with anyone else.",
      rescan: 'Scan another website',
      unreachableHeading: "We couldn't see the website properly on our own.",
      unreachableBody:
        "This can happen with bot protection, a login page or a slow server. Rather than guess, we'll run the scan by hand and send you the result.",
      unreachableCta: 'Send for a manual scan',
      timestamp: 'Scanned',
      manualRequested: 'Manual scan requested',
      networkError: 'The scan could not be completed.',
    },

    lead: {
      eyebrow: 'Full review',
      heading: 'Who should receive the full review?',
      body: 'We review keywords, AI answers, competitors and lead flow manually and send a prioritised plan. No sales sequence.',
      name: 'Name',
      company: 'Company',
      email: 'Email',
      phone: 'Phone',
      website: 'Website',
      optional: 'optional',
      submit: 'Book the full review',
      sending: 'Sending…',
      privacy: 'Your details are only used to deliver the review.',
      successHeading: 'Thank you. The review is booked.',
      successBody:
        'I will get back to you as soon as possible with a time. The review takes about 30 minutes and needs no preparation.',
      errorHeading: 'Something went wrong.',
      errorBody: 'The request was not sent. Please try again in a moment.',
      errors: {
        name: 'Enter your name',
        company: 'Enter the company name',
        email: 'Enter your email',
        emailInvalid: "That email address doesn't look right",
      },
    },
  },

  // ---------------------------------------------------------- callback form
  callback: {
    eyebrow: 'Request a callback',
    heading: 'Leave your number and I will call you.',
    body: 'A short, no-obligation conversation about your situation. Only name, company and phone number are required.',
    name: 'Name',
    company: 'Company',
    phone: 'Phone number',
    email: 'Email',
    message: 'Short message',
    messagePlaceholder: 'E.g. what you would like help with',
    optional: 'optional',
    submit: 'Request a callback',
    sending: 'Sending…',
    privacy: 'Your details are only used to contact you.',
    successHeading: 'Thank you. I will get back to you as soon as possible.',
    errorHeading: 'Something went wrong.',
    errorBody: 'The message was not sent. Please try again in a moment, or write to',
    errors: {
      name: 'Enter your name',
      company: 'Enter the company name',
      phone: 'Enter a phone number',
      phoneInvalid: "That phone number doesn't look right",
      emailInvalid: "That email address doesn't look right",
    },
  },

  // --------------------------------------------------------------- homepage
  home: {
    problem: {
      eyebrow: 'The problem',
      heading: 'You can lose customers before you know they exist.',
      items: [
        {
          index: '01',
          title: "They don't find you",
          body: 'The customer searches, but sees a competitor first.',
          items: ['Google', 'Local search', 'AI search', 'Competitors'],
        },
        {
          index: '02',
          title: "You don't catch them",
          body: "The customer gets in touch, but doesn't hear back in time.",
          items: ['Missed calls', 'Slow response', 'No follow-up', 'Weak conversion'],
        },
      ],
    },
    engine: {
      eyebrow: 'Growth Engine',
      heading: 'We find the gaps. Then we build the solution around your business.',
      lead: 'Growth Engine analyses your digital customer journey, identifies the most important opportunities and prioritises what to improve first. The solution is adapted to what we find in your business.',
      examplesLabel: 'Examples of improvements',
      examples: [
        'Visibility',
        'Website conversion',
        'Lead capture',
        'Automated response',
        'Follow-up',
        'Review flows',
        'AI visibility',
        'Integrations',
      ],
      note: 'Implemented as needed. Not every business needs all of it.',
    },
    scan: {
      eyebrow: 'Free Growth Scan',
      heading: 'Find out where your business is losing potential.',
      lead: 'The scan opens your website in a real browser and shows the most important opportunities for more enquiries. You get the report straight away.',
    },
    paths: {
      eyebrow: 'Get started',
      heading: 'Two ways in. Your choice.',
      scan: {
        label: '01 · On your own',
        title: 'Free Growth Scan',
        body: 'Enter your web address and get a short report with the most important opportunities straight away. No commitment.',
        cta: 'Run a free Growth Scan',
      },
      talk: {
        label: '02 · Talk it through',
        title: 'Book a discovery call',
        body: 'A direct conversation about your business, and whether Growth Engine makes sense for you.',
        cta: 'Book a discovery call',
      },
      reassure: 'No commitment. No sales sequence.',
    },
  },

  // --------------------------------------------------- customer journey (how)
  problem: {
    eyebrow: 'The customer journey',
    heading: 'Three places where potential customers are lost.',
    lead: 'No two businesses lose customers in the same places. That is why Growth Engine starts by finding the problem before we build the solution.',
    leaks: [
      {
        index: '01',
        title: 'Get found',
        body: 'Potential customers may never find you, on Google, in Maps or in AI search.',
        items: ['Google', 'Google Maps', 'AI search'],
      },
      {
        index: '02',
        title: 'Get chosen',
        body: 'Visitors can leave the website again without getting in touch.',
        items: ['Unclear offer', 'Hard to contact', 'No clear next step'],
      },
      {
        index: '03',
        title: 'Get followed up',
        body: 'Enquiries can lose momentum before they become customers.',
        items: ['Missed calls', 'Slow response', 'No follow-up'],
      },
    ],
    diagram: {
      without: 'Before',
      with: 'After',
      search: 'Search',
      lead: 'Enquiry',
      customer: 'Customer',
      lost: 'Lost',
      leakLabels: ['Not found', 'Missed call', 'No follow-up'],
      nodeLabels: ['Found', 'Captured', 'Followed up'],
      alt: 'Two journeys. Before, enquiries drop out along the way. After, the gaps are closed and a search can be carried all the way to a customer.',
    },
  },

  // ------------------------------------------------------------------ engine
  engine: {
    eyebrow: 'The process',
    heading: 'One system. From customer journey to growth.',
    lead: 'The same process for everyone. What gets built depends on what we find in your business.',
    stages: [
      { key: 'scan', label: 'Scan', description: 'We map your digital customer journey.' },
      { key: 'prioritize', label: 'Prioritise', description: 'We pick the opportunities with the greatest commercial impact.' },
      { key: 'improve', label: 'Improve', description: 'We build and implement the selected improvements.' },
      { key: 'measure', label: 'Measure', description: 'We track what the changes move.' },
      { key: 'repeat', label: 'Repeat', description: 'New opportunities are prioritised continuously.' },
    ],
  },

  // ----------------------------------------------------------------- product
  product: {
    caption:
      'An illustration of what an overview can look like. Sample data, not measured results. The content depends on which solutions are implemented for you.',
    note: 'Illustration',
    period: 'Last 30 days',
    metrics: {
      score: 'Growth Score',
      google: 'Google visibility',
      ai: 'AI visibility',
      received: 'Enquiries',
      recovered: 'Followed up automatically',
      appointments: 'Appointments',
      opportunities: 'Opportunities',
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
        'Service pages for the three key services',
        'Automatic reply on missed calls',
        'Review flow after a completed job',
      ],
    },
    feed: {
      heading: 'Enquiries',
      items: [
        { kind: 'lead', text: 'New enquiry via form', meta: 'reply sent after 40 sec.' },
        { kind: 'recovered', text: 'Missed call', meta: 'SMS follow-up sent' },
        { kind: 'booked', text: 'Quote followed up', meta: 'appointment booked' },
      ],
    },
  },

  // ------------------------------------------------------ how it works page
  how: {
    title: 'How Growth Engine works',
    description:
      'Growth Scan finds the gaps in your digital customer journey. Aagesen Growth then selects and builds the improvements that fit your business.',
    eyebrow: 'How it works',
    heading: 'The problem first. Then the solution.',
    lead: 'Growth Scan identifies the opportunities. We then select and build the improvements that make sense for your business, rather than forcing you into a standard system.',
    areas: {
      eyebrow: 'What we can improve',
      heading: 'Solutions as needed.',
      lead: 'We implement the solutions that make sense for your business. These are the areas we typically work on.',
      items: [
        {
          title: 'Visibility',
          body: 'Being found when customers search for what you do.',
          examples: ['Google and local search', 'Google Business Profile', 'AI visibility', 'Structured data'],
        },
        {
          title: 'Conversion',
          body: 'A website that makes it easy to choose you and get in touch.',
          examples: ['Clear contact paths', 'Service pages', 'Trust signals', 'Mobile experience'],
        },
        {
          title: 'Lead capture and response',
          body: 'No enquiry goes missing, also outside opening hours.',
          examples: ['Automated reply', 'Message on missed calls', 'One overview of enquiries'],
        },
        {
          title: 'Follow-up',
          body: "Quotes and conversations don't fizzle out.",
          examples: ['Quote follow-up', 'Reminders', 'Review flow after the job'],
        },
        {
          title: 'Integrations',
          body: 'Solutions that fit the systems you already use.',
          examples: ['CRM', 'Calendar', 'Email and SMS', 'Tracking'],
        },
        {
          title: 'Measurement',
          body: 'Seeing what the changes move.',
          examples: ['Enquiries by source', 'Response time', 'Status of improvements'],
        },
      ],
      note: 'Examples, not a fixed package. What gets built depends on your Growth Scan and the initial review.',
      modulesHeading: 'From tailored to modules',
      modulesBody:
        'Solutions that prove themselves across businesses become standard Growth Engine modules over time. That makes them faster to set up for the next company, without losing the tailoring.',
    },
    overview: {
      eyebrow: 'The overview',
      heading: 'What it can look like.',
      lead: 'Once improvements are under way, we bring status and measurements into one place, so you can see what has been done and what it moves.',
    },
    faq: { eyebrow: 'Questions', heading: 'What people usually ask.' },
  },

  // ---------------------------------------------------------------- pricing
  pricing: {
    title: 'Pricing',
    description:
      'Pricing for Growth Engine and website packages from Aagesen Growth. Growth Engine from DKK 5,995/month. Fixed-price websites: DKK 9,995, 14,995 and 24,995. All prices excl. VAT.',
    eyebrow: 'Pricing',
    heading: 'Clear prices. Two kinds of service.',
    lead: 'Growth Engine is an ongoing process where we improve your customer journey. Websites are defined projects at a fixed price. All prices exclude VAT.',
    jump: { engine: 'Growth Engine', websites: 'Websites' },

    name: 'Growth Engine',
    setup: 7500,
    monthly: 5995,
    setupLabel: 'setup',
    monthlyLabel: '/ month',
    vat: 'Prices excl. VAT',
    exVat: 'excl. VAT',
    binding: 'No commitment beyond the current month + 30 days.',
    engine: {
      eyebrow: 'A · Growth Engine',
      heading: 'Ongoing improvement of your customer journey.',
      lead: 'The price is fixed. What we build for it depends on what the Growth Scan and the initial review show for your business.',
      processHeading: 'The fixed process',
      process: [
        'Analysis of your digital customer journey',
        'A prioritised plan of improvements',
        'Implementation of the selected improvements',
        'Ongoing measurement and follow-up',
      ],
      examplesHeading: 'Examples of what it can include',
      examplesNote: 'Examples, not a guaranteed standard package. We choose what makes sense for you.',
      examples: [
        'Improved visibility',
        'Lead capture',
        'Automated response',
        'Follow-up',
        'Review flows',
        'Conversion improvements',
        'Reporting',
        'Relevant integrations',
      ],
    },

    websites: {
      eyebrow: 'B · Websites',
      heading: 'A new website at a fixed price.',
      lead: 'For businesses where the website itself is the bottleneck. Growth Scan can recommend a new website when the current one clearly limits your conversion.',
      packages: [
        {
          key: 'start',
          name: 'Start',
          price: 9995,
          audience: 'A professional, modern website for smaller service businesses that need a strong digital foundation.',
          items: [
            'Responsive website, optimised for mobile',
            'Core pages: home, services, about and contact',
            'Contact and enquiry form',
            'Basic SEO setup',
            'Analytics setup',
          ],
        },
        {
          key: 'growth',
          name: 'Growth',
          price: 14995,
          audience: 'For established businesses that need a website built to turn visitors into enquiries.',
          items: [
            'More pages, including one page per service',
            'Conversion-focused page structure',
            'Lead flows with clear contact paths',
            'Enquiry tracking',
            'SEO and GEO structure for Google and AI search',
            'Integrations where relevant',
          ],
        },
        {
          key: 'custom',
          name: 'Custom',
          price: 24995,
          audience: 'For businesses that need a more advanced website and a more complex customer journey.',
          items: [
            'Advanced page architecture',
            'Custom functionality',
            'Integrations and automation',
            'Advanced lead flows',
            'More extensive tracking',
          ],
        },
      ],
      featured: 'growth',
      featuredLabel: 'Built for conversion',
      priceLabel: 'fixed price',
      scopeNote: 'All prices excl. VAT. The final scope is agreed in writing before work begins.',
      cta: 'Request a callback',
    },

    callback: {
      eyebrow: 'Questions about pricing?',
      heading: 'Request a callback.',
      lead: 'Not sure what fits you? Leave your number and we will talk it through on the phone.',
    },
    faq: { eyebrow: 'Questions', heading: 'About pricing and commitment.' },
  },

  // ------------------------------------------------------- founder program
  founder: {
    eyebrow: 'Founder Program',
    heading: 'Help shape Growth Engine.',
    lead: 'The first businesses work more closely with us on Growth Engine, at a lower price.',
    body: 'Founder companies receive the same core Growth Engine process but work more closely with Aagesen Growth during implementation. Your feedback helps decide which solutions become standard Growth Engine modules. In return we ask for ongoing feedback and permission to document the results as a case study, if the collaboration creates measurable value.',
    setup: 2995,
    monthly: 3995,
    duration: 'for 3 months',
    seatsLabel: 'places',
    seats: 3,
    conditions: ['Max. 3 companies', 'Ongoing feedback', 'Standard price afterwards'],
    cta: 'Run a free Growth Scan',
    secondaryCta: 'Book a discovery call',
    ariaLabel: 'Founder Program: limited launch offer',
    afterHeading: 'After the Founder period',
    afterBody: "The collaboration continues at Growth Engine's standard price. That is agreed from the start.",
  },

  // -------------------------------------------------------------------- fit
  fit: {
    eyebrow: "Who it's for",
    heading: 'Growth Engine fits businesses where:',
    forItems: [
      'customers have a real order or lifetime value',
      'enquiries come through the website and by phone',
      'the business already works and has demand',
      'growth can justify an investment',
    ],
    industriesLabel: 'Typically',
    industries: ['Carpentry', 'Roofing', 'Windows and doors', 'Plumbing', 'Masonry', 'Painting', 'Renovation'],
    notHeading: 'Not the right match if:',
    notItems: [
      'the business is brand new with no demand',
      "you're only looking for social media posts",
      'you expect guaranteed leads without answering customers yourself',
    ],
  },

  // -------------------------------------------------------------------- faq
  faq: {
    eyebrow: 'FAQ',
    heading: 'Questions we get.',
    items: [
      {
        id: 'what',
        q: 'What is Growth Engine?',
        a: 'Growth Engine is an ongoing process where we find the places in your digital customer journey where potential customers are lost, prioritise them by commercial impact and build the improvements that make sense for you. The effect is measured continuously, and new opportunities are prioritised as they appear.',
      },
      {
        id: 'seo',
        q: 'Is it SEO?',
        a: 'Partly. Visibility on Google and in AI search is often part of it, but Growth Engine looks at the whole customer journey: whether you are found, whether the website makes it easy to get in touch, and what happens to the enquiry afterwards. SEO is one tool among several.',
      },
      {
        id: 'website',
        q: 'Do we need a new website?',
        a: 'Not necessarily. Most improvements can be made on the website you have. If the Growth Scan shows that the website itself is in the way, for example because it is not built for phones, we recommend one of our website packages. Smaller improvements we make on the website you already have. That is a separate, fixed-price service.',
      },
      {
        id: 'automation',
        q: 'What gets automated?',
        a: 'It depends on where you lose customers. Typical examples are automatic replies to new enquiries, a message on missed calls, quote follow-up and review requests after a completed job. We only automate what makes sense for you, and nothing goes live without your approval.',
      },
      {
        id: 'decided',
        q: 'How is the solution decided?',
        a: 'The Growth Scan and an initial review show where the potential is greatest. Based on that, we prioritise a few concrete improvements by expected commercial impact and the effort they take. You see the prioritisation before anything is built.',
      },
      {
        id: 'after-scan',
        q: 'What happens after the Growth Scan?',
        a: 'You get a short report straight away, which you can save as a PDF or an image. If you want to go further, we go through it with you and look at what the scan cannot see from the outside: Google rankings, your Google profile and what happens after an enquiry. Then you decide whether to continue. There is no automated sales sequence.',
      },
      {
        id: 'binding',
        q: 'Is there a commitment period?',
        a: 'No. Setup is paid once. The subscription can be cancelled with the current month + 30 days notice.',
      },
      {
        id: 'guarantee',
        q: 'Can you guarantee more customers?',
        a: 'No. We do not guarantee leads, rankings, revenue or new customers. Growth Engine improves measurable parts of your customer journey, such as how quickly enquiries are answered or how easy it is to get in touch. What that means for the number of customers also depends on market, demand, competition and how the rest of the business performs.',
      },
      {
        id: 'software',
        q: 'Is Growth Engine finished software?',
        a: 'No, it is not a standard system where everyone gets the same features. Growth Engine is a process: we find the gaps, prioritise them and build the solutions that fit your business. Solutions that recur across businesses become standard Growth Engine modules over time.',
      },
      {
        id: 'website-vs-engine',
        q: 'What is the difference between Growth Engine and a website?',
        a: 'Growth Engine is an ongoing process where we improve the customer journey month by month. A website is a defined project at a fixed price. Some businesses need one, some need both.',
      },
      {
        id: 'website-price',
        q: 'How much does a new website cost?',
        a: 'At Aagesen Growth a new website costs DKK 9,995 (Start), DKK 14,995 (Growth) or DKK 24,995 (Custom), all excluding VAT. The price depends on the number of pages, the features and how much content needs to be created. It is fixed and agreed in writing before work starts.',
      },
      {
        id: 'website-time',
        q: 'How long does a new website take?',
        a: 'It depends on the scope, and on how quickly copy and images are ready. We agree the timeline together with the quote, so you know when the site goes live.',
      },
      {
        id: 'website-google',
        q: 'Will the new website be found on Google?',
        a: 'Every website is set up with its own title and description per page, a sitemap and a structure Google can read. We cannot guarantee rankings, but the site is built to be found. For more visibility, the website can be combined with Growth Engine.',
      },
      {
        id: 'website-content',
        q: 'Do we have to write the copy ourselves?',
        a: 'Not necessarily. If you have copy and images ready, we use them. Otherwise we write the copy with you, based on a conversation about your business and your customers.',
      },
      {
        id: 'founder',
        q: 'What is the Founder Program?',
        a: 'The first three businesses get Growth Engine at an introductory price for three months. They get the same core process, but work more closely with us during implementation and give feedback that shapes which solutions become standard modules. After that the collaboration continues at the standard price, agreed from the start.',
      },
    ],
  },

  // ---------------------------------------------------------- growth scan page
  scanPage: {
    title: 'Free Growth Scan',
    description:
      'Run a free Growth Scan of your website. We open it in a real browser and show the most important opportunities for more enquiries, in plain language.',
    eyebrow: 'Free Growth Scan',
    heading: 'Find out where you are losing enquiries.',
    lead: 'Enter your web address. In under a minute you get a short report with the most important opportunities and one concrete next step.',
    measuredHeading: 'What the scan reviews',
    measured: [
      { title: 'The website as a customer sees it', body: 'The homepage and up to five subpages, opened in a real browser on mobile and desktop.' },
      { title: 'Contact and booking', body: 'How easy it is to call, write or book, and what a customer sees on the first screen.' },
      { title: 'Google visibility', body: 'Whether the pages are set up to be found: titles, local keywords and indexing.' },
      { title: 'Reviews and Google profile', body: 'Whether the website shows reviews and points to your Google profile.' },
      { title: 'Follow-up', body: 'What customers are told about when they will hear back.' },
    ],
    reviewHeading: 'Needs access',
    review: ['Rankings in Google searches', 'Your Google Business Profile', 'What happens after an enquiry'],
    afterHeading: 'After the scan',
    after: [
      { title: 'A short report', body: 'You see the result straight away and can save it as a PDF or an image.' },
      { title: 'A conversation, if you want one', body: "We go through the report, and what the scan can't see, with you." },
      { title: 'You decide', body: 'Growth Engine, a new website or nothing. Your call.' },
    ],
    faq: { eyebrow: 'Questions', heading: 'About the scan.' },
  },

  // ----------------------------------------------------------------- faq page
  faqPage: {
    title: 'FAQ',
    description:
      'Answers to the questions we get most often about Growth Engine, Growth Scan, websites, automation, pricing and commitment.',
    eyebrow: 'FAQ',
    heading: 'Questions and answers.',
    lead: 'What people usually want to know before running a Growth Scan or booking a call.',
    moreHeading: "Didn't find the answer?",
    moreBody: 'Leave your number and I will call you.',
  },

  // ----------------------------------------------------------------- footer
  footer: {
    description:
      'Growth Engine finds the places in your digital customer journey where potential customers are lost, and improves them continuously. We also build new websites at a fixed price.',
    productHeading: 'Growth Engine',
    companyHeading: 'Company',
    contactHeading: 'Contact',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    cvr: 'CVR',
    rights: 'All rights reserved.',
  },

  // ----------------------------------------------------------- websites page
  websitesPage: {
    title: 'New website at a fixed price from DKK 9,995 | Aagesen Growth',
    description:
      'Get a new website at a fixed price: DKK 9,995, 14,995 or 24,995 excl. VAT. Mobile friendly, fast and built for Google and enquiries. See The Jivers case.',
    eyebrow: 'Websites',
    heading: 'A new website at a fixed price.',
    lead: 'We design and build websites for small and medium-sized businesses. Fast, mobile friendly and set up so you can be found on Google and get enquiries. You know the price before we start.',
    priceFromLabel: 'From',
    priceFromNote: 'fixed price · excl. VAT',
    heroCta: 'Get a call back',
    heroSecondary: 'See the prices',
    caseSection: {
      eyebrow: 'Latest website',
      heading: 'The Jivers. A website with the same energy as the band.',
      body: 'The swing band The Jivers got a new website with a booking form, audio clips that play as spinning vinyl records, live video and an English version. Built so event organisers can hear the band quickly and send an enquiry.',
      points: ['Booking form with spam filter', 'Audio clips and live video', 'Danish and English version', 'Technical SEO and hosting'],
      cta: 'See the full case',
      visit: 'Visit jivers.dk',
    },
    cost: {
      eyebrow: 'Price',
      heading: 'How much does a new website cost?',
      lead: 'A new website with us costs DKK 9,995, 14,995 or 24,995 excl. VAT. Which package fits depends mainly on three things.',
      factors: [
        { title: 'Number of pages', body: 'A website with a front page, services, about and contact is quicker to build than one with a page for every service.' },
        { title: 'Features', body: 'Booking, payments, integrations and automation take more time than a standard contact form.' },
        { title: 'Content', body: 'If your copy and images are ready, it goes faster. Otherwise we write the copy with you.' },
      ],
    },
    packages: {
      eyebrow: 'Packages',
      heading: 'Three packages. Fixed price.',
    },
    included: {
      eyebrow: 'Always included',
      heading: 'What every package includes.',
      items: [
        'A design that fits your business',
        'Mobile friendly, fast website',
        'Contact or booking form',
        'Its own title and description on every page',
        'Sitemap and Google setup',
        'Analytics setup',
        'Secure connection (https)',
        'Help going live',
      ],
    },
    process: {
      eyebrow: 'The process',
      heading: 'How you get a new website.',
      steps: [
        { title: 'Discovery', body: 'A short conversation about your business, your customers and what the website needs to do. Free and without obligation.' },
        { title: 'Fixed-price quote', body: 'You get a written quote with price, scope and timeline before work starts.' },
        { title: 'Design and build', body: 'We design and build the site and show it to you along the way, so you can change direction in time.' },
        { title: 'Launch', body: 'The site goes live with titles, sitemap and analytics set up, so Google can find it from day one.' },
      ],
    },
    callback: {
      eyebrow: 'New website?',
      heading: 'Get a call back.',
      lead: 'Leave your number and we will call you to talk about what you need and which package fits. Or book a discovery call.',
    },
    faq: { eyebrow: 'Questions', heading: 'About new websites.' },
    teaser: {
      eyebrow: 'Websites',
      heading: 'Need a new website?',
      body: 'We also build new websites at a fixed price from DKK 9,995 excl. VAT. Fast, mobile friendly and set up for Google. See for example the new website for the swing band The Jivers.',
      cta: 'See websites and prices',
      caseCta: 'See The Jivers case',
    },
  },

  // ------------------------------------------------------------------ pages
  pages: {
    booking: {
      title: 'Book a discovery call',
      description:
        'Book a free, no-obligation discovery call with Aagesen Growth about your digital customer journey, or request a callback.',
      heading: 'Book a discovery call',
      lead: 'A direct conversation about your business, not a sales call. Free and without obligation.',
      agendaHeading: "What we'll cover",
      agenda: [
        'Your current digital customer journey: where you are found, and how the website converts',
        'Where you may be missing customers, and what would matter most to fix first',
        'Whether Growth Engine or a new website is relevant for you right now',
        'What working together would actually involve',
      ],
      noneHeading: "What won't happen",
      none: ['No sales sequence', 'No automated calls', 'Your details are only used for the call'],
      embedNote: 'Choose a time that suits you.',
      embedFallbackLink: 'Open the calendar in a new window',
      orCallback: 'Rather get a call?',
    },
    work: {
      title: 'Projects',
      description: 'Websites built by Aagesen Growth. See the new website for the swing band The Jivers, with booking, audio clips and video.',
      heading: 'Projects',
      lead: 'Websites and digital solutions we have designed and built for real clients.',
      allLabel: 'All projects',
      disciplinesLabel: 'Disciplines',
      deliveredLabel: 'Delivered',
      demonstratesLabel: 'What it shows',
      challengeLabel: 'The starting point',
      periodLabel: 'Period',
      nextLabel: 'Next project',
      similarCta: 'Run a free Growth Scan',
    },
    notFound: {
      title: 'Page not found',
      heading: '404',
      lead: "This page doesn't exist, or it has moved. Try the homepage.",
      cta: 'Go to homepage',
    },
  },

  meta: {
    homeTitle: 'Growth Engine and new websites at a fixed price | Aagesen Growth',
    homeDescription:
      'Aagesen Growth finds where you lose customers and builds new websites at a fixed price from DKK 9,995. Run a free Growth Scan, or book a discovery call.',
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

  // ------------------------------------------------------------------- work
  /**
   * The Danish version is the source of record for `id`/`slug`/media keys;
   * this only supplies the English prose.
   */
  work: {
    cases: {
      jivers: {
        kind: 'Swing band · Website · Booking',
        disciplines: ['Website', 'Design', 'Booking', 'SEO', 'Hosting'],
        summary:
          'A new website for a seven-piece swing band, built so event organisers can hear the band quickly and book it for parties and company events.',
        strapline: 'A website with the same energy as the band.',
        challenge:
          'The Jivers play jump ’n’ jive and swing at parties across Denmark. The band needed one place where an organiser can quickly hear, see and feel what they get, and send a booking enquiry without phoning around.',
        sections: [
          {
            heading: 'Design',
            body: 'The look comes from the band’s own world: posters from the 1940s and 50s, sepia photos and a logo coloured in the site’s palette. The site should feel like the band, not like a template.',
          },
          {
            heading: 'Audio and video',
            body: 'Organisers want to hear a band before they book it. So audio clips play right on the page as vinyl records that spin while the song plays, and the band can be seen live on video.',
          },
          {
            heading: 'Booking',
            body: 'The booking form only requires a name and an email. The rest is optional, so sending an enquiry is easy. Enquiries go straight to the two band members who reply, and are protected against spam.',
          },
          {
            heading: 'Tech and Google',
            body: 'The site is built without heavy frameworks, so it loads fast, also on mobile. Images are served in modern formats, and every page has its own title and description, a sitemap and an English version, so it can be found on Google.',
          },
        ],
        delivered: [
          'Design and build of the whole website',
          'Seven indexable pages, including an English version',
          'Booking form with spam filter',
          'Audio player shaped as vinyl records',
          'Live video and photo gallery',
          'Technical SEO: titles, sitemap and language versions',
          'Hosting and maintenance',
        ],
        demonstrates:
          'That a website can have plenty of personality and still be fast, easy to find on Google and built to generate enquiries.',
        proofLine: 'Website · booking · audio and video',
        period: '',
        disclosure: '',
        media: {
          desktop: {
            alt: 'The jivers.dk front page on desktop with The Jivers logo, the headline about a swing band for parties and a photo of the band on a harbour pier.',
            caption: '',
          },
          mobile: { alt: 'The jivers.dk front page on mobile with band photo and headline.', caption: '' },
          screenRecords: {
            alt: 'Audio clips on jivers.dk shown as four vinyl records with tonearms and song titles.',
            caption: 'Audio clips as vinyl records',
          },
          screenBooking: {
            alt: 'The booking page on jivers.dk with the booking enquiry form.',
            caption: 'Booking form',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
    },
  },
};

export default en;
