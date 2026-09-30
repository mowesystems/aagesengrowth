import type { CaseCopy } from '@/i18n/types';

/**
 * Danish, the source dictionary.
 *
 * Every word a visitor reads on the Growth Engine site lives here, so copy is
 * reviewed in one place and the components stay free of prose. Numbers that
 * describe a price are here too; numbers that describe a result are not.
 * Those come from a scan, never from a dictionary.
 *
 * Copy rules for this file: Growth Engine is a process that is adapted to each
 * company, not a finished standard platform. Nothing here promises customers,
 * leads, rankings, revenue or ROI.
 */
const da = {
  // ------------------------------------------------------------------ chrome
  nav: {
    engine: 'Growth Engine',
    how: 'Sådan virker det',
    pricing: 'Pris',
    faq: 'FAQ',
    work: 'Projekter',
    booking: 'Book en afklaring',
  },

  header: {
    home: 'Aagesen Growth, til forsiden',
    menu: 'Menu',
    close: 'Luk',
    skip: 'Spring til indhold',
    nav: 'Hovedmenu',
    language: 'Sprog',
    switchTo: 'Switch to English',
  },

  cta: {
    scan: 'Kør gratis Growth Scan',
    scanShort: 'Gratis Growth Scan',
    scanMobile: 'Growth Scan',
    how: 'Se hvordan det virker',
    fullReview: 'Få den fulde gennemgang',
    bookAfklaring: 'Book en afklaring',
    callback: 'Bliv ringet op',
    seeWebsites: 'Se website-pakker',
    seePricing: 'Se priser',
    allFaq: 'Se alle spørgsmål',
    back: 'Tilbage',
    backToWork: 'Tilbage til projekter',
    viewCase: 'Se hele casen',
    visitSite: 'Besøg websitet',
    toFront: 'Til forsiden',
  },

  // -------------------------------------------------------------------- hero
  hero: {
    eyebrow: 'Growth Engine · Til servicevirksomheder',
    lines: ['Find hvor I taber kunder.', 'Ret det, der betyder mest.'],
    lead: 'Growth Engine finder de steder i jeres digitale kunderejse, hvor potentielle kunder går tabt, og forbedrer først det, der har størst kommerciel betydning.',
    /** Labels on the signal visualisation. Short: they sit on a live diagram. */
    sources: ['Google', 'ChatGPT', 'Google Maps', 'AI-søgning', 'Perplexity'],
    core: 'Growth Engine',
    outputs: ['Henvendelse', 'Opfølgning', 'Kunde'],
    diagramAlt:
      'Søgninger fra Google og AI-platforme løber ind i Growth Engine og videre til henvendelse, opfølgning og kunde.',
  },

  // --------------------------------------------------------------- the scan
  /** Shared by every scanner instance on the site. */
  scan: {
    label: 'Din virksomheds website',
    placeholder: 'https://dinvirksomhed.dk',
    cta: 'Kør gratis Growth Scan',
    micro: 'Gratis · Ingen kortoplysninger · Ca. 30 sek.',
    invalid: 'Skriv en webadresse, fx dinvirksomhed.dk',
    running: 'Scanner',
    talkInstead: 'Book en afklaring',
    /** The sequence. Only stages the scan actually performs. */
    steps: [
      { key: 'connect', label: 'Forbinder til website' },
      { key: 'capture', label: 'Tjekker kontaktveje og lead-indfangning' },
      { key: 'trust', label: 'Tjekker tillidssignaler' },
      { key: 'technical', label: 'Tjekker teknisk fundament' },
      { key: 'website', label: 'Vurderer websitet som helhed' },
      { key: 'opportunities', label: 'Samler vækstmuligheder' },
    ],
    stepStatus: { done: 'Målt', queued: 'Fuld gennemgang', running: 'Kører' },

    result: {
      eyebrow: 'Growth Scan · Foreløbigt resultat',
      scoreLabel: 'Growth Score',
      preliminary: 'Foreløbig',
      /** {n} is replaced with the number of measured signals. */
      basis: 'Baseret på {n} målte signaler fra jeres website.',
      pendingBasis:
        'Google-synlighed og AI-synlighed kræver søgedata. De indgår ikke i den automatiske scanning, men i den fulde gennemgang.',
      dimensions: {
        google: 'Google-synlighed',
        ai: 'AI-synlighed',
        capture: 'Lead-indfangning',
        trust: 'Tillid og anmeldelser',
        website: 'Teknisk fundament',
      },
      clientRendered:
        'Websitet er bygget med JavaScript, så indhold som telefonnummer, formularer og anmeldelser kan ikke måles fra den rå HTML. De måles i den fulde gennemgang.',
      pending: 'Fuld gennemgang',
      measured: 'Målt',
      findingsHeading: 'Vi fandt {n} forbedringsmuligheder',
      severities: { critical: 'Kritisk', opportunity: 'Mulighed', quickwin: 'Quick win' },
      severityPlural: { critical: 'Kritiske', opportunity: 'Muligheder', quickwin: 'Quick wins' },
      lockedHeading: '{n} punkter i den fulde gennemgang',
      lockedBody:
        'Resten af gennemgangen, herunder søgeord, AI-svar, konkurrenter og en prioriteret plan, laves manuelt i den fulde gennemgang.',
      unlockCta: 'Få den fulde gennemgang',
      rescan: 'Scan et andet website',
      /** Shown when the site could not be reached. The lead path stays open. */
      unreachableHeading: 'Vi kunne ikke nå websitet automatisk.',
      unreachableBody:
        'Det sker fx ved bot-beskyttelse eller en langsom server. Send adressen, så kører vi scanningen manuelt og sender resultatet.',
      unreachableCta: 'Send til manuel scanning',
      timestamp: 'Scannet',
      manualRequested: 'Manuel scanning ønsket',
      networkError: 'Scanningen kunne ikke gennemføres.',
    },

    /**
     * The website verdict. Shown only when the scan finds that the site
     * itself materially limits conversion, and only with the reasons it
     * actually observed.
     */
    website: {
      eyebrow: 'Websitet',
      heading: 'Dit website begrænser jeres vækst',
      lead: 'Scanningen fandt flere forhold ved selve websitet, som gør det sværere for besøgende at vælge jer og tage kontakt. Her er det, vi konkret observerede:',
      advice:
        'Når websitet er flaskehalsen, giver det ofte mere mening at bygge et nyt fundament end at lappe på det gamle. Vi har tre website-pakker til fast pris.',
      primary: 'Se website-pakker',
      secondary: 'Bliv ringet op',
    },

    /** The lead capture that turns a scan into a full review. */
    lead: {
      eyebrow: 'Fuld gennemgang',
      heading: 'Hvem skal have den fulde gennemgang?',
      body: 'Vi gennemgår søgeord, AI-svar, konkurrenter og lead-flow manuelt og sender en prioriteret plan. Ingen salgssekvens.',
      name: 'Navn',
      company: 'Virksomhed',
      email: 'E-mail',
      phone: 'Telefon',
      website: 'Website',
      optional: 'valgfri',
      submit: 'Book den fulde gennemgang',
      sending: 'Sender…',
      privacy: 'Oplysningerne bruges kun til at levere gennemgangen.',
      successHeading: 'Tak. Gennemgangen er bestilt.',
      successBody:
        'Jeg vender tilbage hurtigst muligt med et tidspunkt. Gennemgangen tager cirka 30 minutter og kræver ingen forberedelse.',
      errorHeading: 'Det gik galt.',
      errorBody: 'Forespørgslen blev ikke sendt. Prøv igen om et øjeblik.',
      errors: {
        name: 'Skriv dit navn',
        company: 'Skriv virksomhedens navn',
        email: 'Skriv din e-mail',
        emailInvalid: 'E-mailadressen ser ikke rigtig ud',
      },
    },
  },

  // ---------------------------------------------------------- callback form
  callback: {
    eyebrow: 'Bliv ringet op',
    heading: 'Skriv jeres nummer, så ringer jeg.',
    body: 'En kort, uforpligtende samtale om jeres situation. Kun navn, virksomhed og telefonnummer er nødvendige.',
    name: 'Navn',
    company: 'Virksomhed',
    phone: 'Telefonnummer',
    email: 'E-mail',
    message: 'Kort besked',
    messagePlaceholder: 'Fx hvad I gerne vil have hjælp til',
    optional: 'valgfri',
    submit: 'Bliv ringet op',
    sending: 'Sender…',
    privacy: 'Oplysningerne bruges kun til at kontakte jer.',
    successHeading: 'Tak. Jeg vender tilbage hurtigst muligt.',
    errorHeading: 'Det gik galt.',
    errorBody: 'Beskeden blev ikke sendt. Prøv igen om et øjeblik, eller skriv til',
    errors: {
      name: 'Skriv dit navn',
      company: 'Skriv virksomhedens navn',
      phone: 'Skriv et telefonnummer',
      phoneInvalid: 'Telefonnummeret ser ikke rigtigt ud',
      emailInvalid: 'E-mailadressen ser ikke rigtig ud',
    },
  },

  // --------------------------------------------------------------- homepage
  home: {
    problem: {
      eyebrow: 'Problemet',
      heading: 'Du kan miste kunder, før du ved, de findes.',
      items: [
        {
          index: '01',
          title: 'De finder dig ikke',
          body: 'Kunden søger, men ser en konkurrent først.',
          items: ['Google', 'Lokal søgning', 'AI-søgning', 'Konkurrenter'],
        },
        {
          index: '02',
          title: 'Du fanger dem ikke',
          body: 'Kunden henvender sig, men hører ikke fra jer i tide.',
          items: ['Ubesvarede opkald', 'Langsomt svar', 'Ingen opfølgning', 'Svag konvertering'],
        },
      ],
    },
    engine: {
      eyebrow: 'Growth Engine',
      heading: 'Vi finder hullerne. Derefter bygger vi løsningen omkring jeres virksomhed.',
      lead: 'Growth Engine analyserer jeres digitale kunderejse, finder de vigtigste muligheder og prioriterer, hvad der skal forbedres først. Løsningen tilpasses det, vi finder hos jer.',
      examplesLabel: 'Eksempler på forbedringer',
      examples: [
        'Synlighed',
        'Konvertering på websitet',
        'Lead-indfangning',
        'Automatisk svar',
        'Opfølgning',
        'Anmeldelsesflow',
        'AI-synlighed',
        'Integrationer',
      ],
      note: 'Implementeres efter behov. Ikke alle virksomheder har brug for det hele.',
    },
    scan: {
      eyebrow: 'Gratis Growth Scan',
      heading: 'Find ud af, hvor din virksomhed taber potentiale.',
      lead: 'Scanningen læser jeres website og tjekker kontaktveje, tillidssignaler og det tekniske fundament. I får et foreløbigt resultat med det samme.',
    },
    paths: {
      eyebrow: 'Kom i gang',
      heading: 'To veje ind. I vælger selv.',
      scan: {
        label: '01 · Selv først',
        title: 'Gratis Growth Scan',
        body: 'Skriv jeres webadresse og se et foreløbigt resultat med det samme. Ingen binding.',
        cta: 'Kør gratis Growth Scan',
      },
      talk: {
        label: '02 · Tal sammen',
        title: 'Book en afklaring',
        body: 'En direkte samtale om jeres forretning, og om Growth Engine giver mening for jer.',
        cta: 'Book en afklaring',
      },
      reassure: 'Ingen binding. Ingen salgssekvens.',
    },
  },

  // --------------------------------------------------- customer journey (how)
  problem: {
    eyebrow: 'Kunderejsen',
    heading: 'Tre steder, hvor potentielle kunder går tabt.',
    lead: 'Ikke to virksomheder taber kunder de samme steder. Derfor starter Growth Engine med at finde problemet, før vi bygger løsningen.',
    leaks: [
      {
        index: '01',
        title: 'Bliv fundet',
        body: 'Potentielle kunder finder jer måske aldrig, hverken på Google, i Maps eller i AI-søgning.',
        items: ['Google', 'Google Maps', 'AI-søgning'],
      },
      {
        index: '02',
        title: 'Bliv valgt',
        body: 'Besøgende kan forlade websitet igen uden at henvende sig.',
        items: ['Uklart tilbud', 'Svær kontaktvej', 'Intet tydeligt næste skridt'],
      },
      {
        index: '03',
        title: 'Bliv fulgt op',
        body: 'Henvendelser kan miste momentum, før de når at blive kunder.',
        items: ['Ubesvarede opkald', 'Langsomt svar', 'Ingen opfølgning'],
      },
    ],
    diagram: {
      without: 'Før',
      with: 'Efter',
      search: 'Søgning',
      lead: 'Henvendelse',
      customer: 'Kunde',
      lost: 'Tabt',
      leakLabels: ['Ikke fundet', 'Ubesvaret opkald', 'Ingen opfølgning'],
      nodeLabels: ['Fundet', 'Fanget', 'Fulgt op'],
      alt: 'To forløb. Før falder henvendelser ud undervejs. Efter er hullerne lukket, og søgningen kan føres hele vejen til kunde.',
    },
  },

  // ------------------------------------------------------------------ engine
  engine: {
    eyebrow: 'Processen',
    heading: 'Ét system. Fra kunderejse til vækst.',
    lead: 'Samme proces for alle. Det, der bliver bygget, afhænger af, hvad vi finder hos jer.',
    stages: [
      { key: 'scan', label: 'Scan', description: 'Vi kortlægger jeres digitale kunderejse.' },
      { key: 'prioritize', label: 'Prioritér', description: 'Vi vælger de muligheder med størst kommerciel betydning.' },
      { key: 'improve', label: 'Forbedr', description: 'Vi bygger og implementerer de udvalgte forbedringer.' },
      { key: 'measure', label: 'Mål', description: 'Vi følger, hvad ændringerne flytter.' },
      { key: 'repeat', label: 'Gentag', description: 'Nye muligheder prioriteres løbende.' },
    ],
  },

  // ----------------------------------------------------------------- product
  product: {
    caption:
      'Illustration af, hvordan et overblik kan se ud. Eksempeldata, ikke målte resultater. Indholdet afhænger af, hvilke løsninger der er implementeret hos jer.',
    note: 'Illustration',
    period: 'Seneste 30 dage',
    metrics: {
      score: 'Growth Score',
      google: 'Google-synlighed',
      ai: 'AI-synlighed',
      received: 'Henvendelser',
      recovered: 'Fulgt op automatisk',
      appointments: 'Aftaler',
      opportunities: 'Muligheder',
      actions: 'Handlinger udført',
      response: 'Median svartid',
    },
    competitors: {
      heading: 'Synlighed vs. konkurrenter',
      you: 'Jer',
      competitor: 'Konkurrent',
    },
    trendLabel: '12 uger',
    actions: {
      heading: 'Growth Actions',
      status: { done: 'Udført', active: 'I gang', next: 'Næste' },
      items: [
        'Servicesider for de tre vigtigste ydelser',
        'Automatisk svar ved ubesvaret opkald',
        'Anmeldelsesflow efter afsluttet opgave',
      ],
    },
    feed: {
      heading: 'Henvendelser',
      items: [
        { kind: 'lead', text: 'Ny henvendelse via formular', meta: 'svar sendt efter 40 sek.' },
        { kind: 'recovered', text: 'Ubesvaret opkald', meta: 'SMS-opfølgning sendt' },
        { kind: 'booked', text: 'Tilbud fulgt op', meta: 'aftale booket' },
      ],
    },
  },

  // ------------------------------------------------------ how it works page
  how: {
    title: 'Sådan virker Growth Engine',
    description:
      'Growth Scan finder hullerne i jeres digitale kunderejse. Derefter vælger og bygger Aagesen Growth de forbedringer, der passer til jeres virksomhed.',
    eyebrow: 'Sådan virker det',
    heading: 'Først problemet. Så løsningen.',
    lead: 'Growth Scan identificerer mulighederne. Derefter vælger og bygger vi de forbedringer, der giver mening for jeres virksomhed, frem for at presse jer ind i et standardsystem.',
    areas: {
      eyebrow: 'Det kan vi forbedre',
      heading: 'Løsninger efter behov.',
      lead: 'Vi implementerer de løsninger, der giver mening for jeres virksomhed. Her er de områder, vi typisk arbejder med.',
      items: [
        {
          title: 'Synlighed',
          body: 'At I bliver fundet, når kunden søger efter det, I laver.',
          examples: ['Google og lokal søgning', 'Google Business-profil', 'AI-synlighed', 'Struktureret data'],
        },
        {
          title: 'Konvertering',
          body: 'At websitet gør det let at vælge jer og tage kontakt.',
          examples: ['Tydelige kontaktveje', 'Servicesider', 'Tillidssignaler', 'Mobiloplevelse'],
        },
        {
          title: 'Lead-indfangning og svar',
          body: 'At ingen henvendelse forsvinder, heller ikke uden for åbningstid.',
          examples: ['Automatisk svar', 'Besked ved ubesvaret opkald', 'Samlet overblik over henvendelser'],
        },
        {
          title: 'Opfølgning',
          body: 'At tilbud og samtaler ikke løber ud i sandet.',
          examples: ['Opfølgning på tilbud', 'Påmindelser', 'Anmeldelsesflow efter opgaven'],
        },
        {
          title: 'Integrationer',
          body: 'At løsningerne passer ind i de systemer, I allerede bruger.',
          examples: ['CRM', 'Kalender', 'E-mail og SMS', 'Tracking'],
        },
        {
          title: 'Måling',
          body: 'At I kan se, hvad ændringerne flytter.',
          examples: ['Henvendelser pr. kilde', 'Svartid', 'Status på forbedringer'],
        },
      ],
      note: 'Eksempler, ikke en fast pakke. Hvad der bliver bygget, afhænger af jeres Growth Scan og den første gennemgang.',
      modulesHeading: 'Fra skræddersyet til moduler',
      modulesBody:
        'Løsninger, der viser sig at virke på tværs af virksomheder, bliver over tid til faste Growth Engine-moduler. Det gør dem hurtigere at sætte op for de næste, uden at I mister tilpasningen.',
    },
    overview: {
      eyebrow: 'Overblikket',
      heading: 'Sådan kan det se ud.',
      lead: 'Når forbedringerne er i gang, samler vi status og målinger ét sted, så I kan se, hvad der er gjort, og hvad det flytter.',
    },
    faq: { eyebrow: 'Spørgsmål', heading: 'Det spørger folk typisk om.' },
  },

  // ---------------------------------------------------------------- pricing
  pricing: {
    title: 'Pris',
    description:
      'Priser på Growth Engine og på website-pakker fra Aagesen Growth. Growth Engine fra 5.995 kr./md. Websites til fast pris: 9.995, 14.995 og 24.995 kr. Alle priser ekskl. moms.',
    eyebrow: 'Pris',
    heading: 'Tydelige priser. To slags ydelser.',
    lead: 'Growth Engine er et løbende forløb, hvor vi forbedrer jeres kunderejse. Websites er afgrænsede projekter til fast pris. Alle priser er ekskl. moms.',
    jump: { engine: 'Growth Engine', websites: 'Websites' },

    // A: Growth Engine
    name: 'Growth Engine',
    setup: 7500,
    monthly: 5995,
    setupLabel: 'opsætning',
    monthlyLabel: '/ måned',
    vat: 'Priser ekskl. moms',
    exVat: 'ekskl. moms',
    binding: 'Ingen binding ud over løbende måned + 30 dage.',
    engine: {
      eyebrow: 'A · Growth Engine',
      heading: 'Løbende forbedring af jeres kunderejse.',
      lead: 'Prisen er fast. Hvad vi bygger for pengene, afhænger af, hvad Growth Scan og den første gennemgang viser hos jer.',
      processHeading: 'Det faste forløb',
      process: [
        'Analyse af jeres digitale kunderejse',
        'Prioriteret plan over forbedringer',
        'Implementering af de udvalgte forbedringer',
        'Løbende måling og opfølgning',
      ],
      examplesHeading: 'Eksempler på, hvad det kan omfatte',
      examplesNote: 'Eksempler, ikke en garanteret standardpakke. Vi vælger det, der giver mening for jer.',
      examples: [
        'Forbedret synlighed',
        'Lead-indfangning',
        'Automatisk svar',
        'Opfølgning',
        'Anmeldelsesflow',
        'Konverteringsforbedringer',
        'Rapportering',
        'Relevante integrationer',
      ],
    },

    // B: Websites
    websites: {
      eyebrow: 'B · Websites',
      heading: 'Nyt website til fast pris.',
      lead: 'Til virksomheder, hvor websitet selv er flaskehalsen. Growth Scan kan anbefale et nyt website, når det nuværende tydeligt begrænser jeres konvertering.',
      packages: [
        {
          key: 'start',
          name: 'Start',
          price: 9995,
          audience: 'Et professionelt, moderne website til mindre servicevirksomheder, der har brug for et stærkt digitalt fundament.',
          items: [
            'Responsivt website, optimeret til mobil',
            'Kernesider: forside, ydelser, om jer og kontakt',
            'Kontakt- og henvendelsesformular',
            'Grundlæggende SEO-opsætning',
            'Opsætning af analytics',
          ],
        },
        {
          key: 'growth',
          name: 'Growth',
          price: 14995,
          audience: 'Til etablerede virksomheder, der har brug for et website bygget til at konvertere besøgende til henvendelser.',
          items: [
            'Flere sider, herunder en side pr. ydelse',
            'Konverteringsfokuseret sidestruktur',
            'Lead-flows med tydelige kontaktveje',
            'Tracking af henvendelser',
            'SEO- og GEO-struktur til Google og AI-søgning',
            'Integrationer, hvor det er relevant',
          ],
        },
        {
          key: 'custom',
          name: 'Custom',
          price: 24995,
          audience: 'Til virksomheder, der har brug for et mere avanceret website og en mere kompleks kunderejse.',
          items: [
            'Avanceret sidearkitektur',
            'Specialudviklet funktionalitet',
            'Integrationer og automatisering',
            'Avancerede lead-flows',
            'Mere omfattende tracking',
          ],
        },
      ],
      featured: 'growth',
      featuredLabel: 'Bygget til konvertering',
      priceLabel: 'fast pris',
      scopeNote: 'Alle priser ekskl. moms. Det endelige omfang aftales skriftligt, før arbejdet går i gang.',
      cta: 'Bliv ringet op',
    },

    callback: {
      eyebrow: 'Spørgsmål til prisen?',
      heading: 'Bliv ringet op.',
      lead: 'Er I i tvivl om, hvad der passer til jer, så ring ikke rundt. Skriv jeres nummer, så tager vi det over telefonen.',
    },
    faq: { eyebrow: 'Spørgsmål', heading: 'Om pris og binding.' },
  },

  // ------------------------------------------------------- founder program
  founder: {
    eyebrow: 'Founder Program',
    heading: 'Vær med til at forme Growth Engine.',
    lead: 'De første virksomheder arbejder tættere sammen med os om Growth Engine, til en lavere pris.',
    body: 'Founder-virksomheder får den samme kerneproces i Growth Engine, men arbejder tættere sammen med Aagesen Growth under implementeringen. Jeres feedback er med til at afgøre, hvilke løsninger der bliver til faste Growth Engine-moduler. Til gengæld beder vi om løbende feedback og mulighed for at dokumentere resultaterne som case, hvis samarbejdet skaber målbar værdi.',
    setup: 2995,
    monthly: 3995,
    duration: 'i 3 måneder',
    seatsLabel: 'pladser',
    seats: 3,
    conditions: ['Maks. 3 virksomheder', 'Løbende feedback undervejs', 'Herefter normalpris'],
    cta: 'Kør gratis Growth Scan',
    secondaryCta: 'Book en afklaring',
    ariaLabel: 'Founder Program: begrænset lanceringstilbud',
    afterHeading: 'Efter Founder-perioden',
    afterBody: 'Samarbejdet fortsætter til Growth Engines normale pris. Det er aftalt fra start.',
  },

  // -------------------------------------------------------------------- fit
  fit: {
    eyebrow: 'Hvem det er til',
    heading: 'Growth Engine passer til virksomheder, hvor:',
    forItems: [
      'kunderne har en reel ordre- eller livstidsværdi',
      'henvendelser kommer via website og telefon',
      'forretningen allerede fungerer og har efterspørgsel',
      'vækst kan retfærdiggøre en investering',
    ],
    industriesLabel: 'Typisk',
    industries: ['Varmepumper', 'Solceller', 'Tag', 'Vinduer', 'El', 'VVS', 'Renovering'],
    notHeading: 'Ikke det rigtige match, hvis:',
    notItems: [
      'virksomheden er helt ny og uden efterspørgsel',
      'I kun leder efter opslag til sociale medier',
      'I forventer garanterede leads uden selv at svare kunderne',
    ],
  },

  // -------------------------------------------------------------------- faq
  faq: {
    eyebrow: 'FAQ',
    heading: 'Spørgsmål, vi får.',
    items: [
      {
        id: 'what',
        q: 'Hvad er Growth Engine?',
        a: 'Growth Engine er et løbende forløb, hvor vi finder de steder i jeres digitale kunderejse, hvor potentielle kunder går tabt, prioriterer dem efter kommerciel betydning og bygger de forbedringer, der giver mening for jer. Effekten måles løbende, og nye muligheder prioriteres, efterhånden som de dukker op.',
      },
      {
        id: 'seo',
        q: 'Er det SEO?',
        a: 'Delvist. Synlighed på Google og i AI-søgning er ofte en del af det, men Growth Engine ser på hele kunderejsen: om I bliver fundet, om websitet gør det let at henvende sig, og hvad der sker med henvendelsen bagefter. SEO er ét værktøj blandt flere.',
      },
      {
        id: 'website',
        q: 'Skal vi have nyt website?',
        a: 'Ikke nødvendigvis. De fleste forbedringer kan laves på det website, I har. Viser Growth Scan, at websitet selv er den største flaskehals, fx fordi det er svært at bruge på mobil eller mangler tydelige kontaktveje, anbefaler vi en af vores website-pakker. Det er en separat ydelse til fast pris.',
      },
      {
        id: 'automation',
        q: 'Hvad bliver automatiseret?',
        a: 'Det afhænger af, hvor I taber kunder. Typiske eksempler er automatisk svar på nye henvendelser, besked ved ubesvarede opkald, opfølgning på tilbud og anmodning om anmeldelser efter en afsluttet opgave. Vi automatiserer kun det, der giver mening for jer, og intet sættes i drift uden jeres godkendelse.',
      },
      {
        id: 'decided',
        q: 'Hvordan bestemmes løsningen?',
        a: 'Growth Scan og en første gennemgang viser, hvor potentialet er størst. Ud fra det prioriterer vi få, konkrete forbedringer efter forventet kommerciel betydning og den indsats, de kræver. I ser prioriteringen, før noget bliver bygget.',
      },
      {
        id: 'after-scan',
        q: 'Hvad sker der efter Growth Scan?',
        a: 'I får et foreløbigt resultat med det samme. Vil I videre, gennemgår vi resultatet sammen med jer og ser på det, scanningen ikke kan måle automatisk, fx søgeord, AI-svar og konkurrenter. Derefter beslutter I selv, om I vil gå videre. Der kommer ingen automatisk salgssekvens.',
      },
      {
        id: 'binding',
        q: 'Er der binding?',
        a: 'Nej. Opsætningen betales én gang. Abonnementet kan opsiges med løbende måned + 30 dage.',
      },
      {
        id: 'guarantee',
        q: 'Kan I garantere flere kunder?',
        a: 'Nej. Vi garanterer ikke leads, placeringer, omsætning eller nye kunder. Growth Engine forbedrer målbare dele af jeres kunderejse, fx hvor hurtigt henvendelser bliver besvaret, eller hvor let det er at tage kontakt. Hvad det betyder for antallet af kunder, afhænger også af marked, efterspørgsel, konkurrence og af, hvordan forretningen i øvrigt kører.',
      },
      {
        id: 'software',
        q: 'Er Growth Engine et færdigt softwaresystem?',
        a: 'Nej, ikke et standardsystem, hvor alle får de samme funktioner. Growth Engine er en proces: vi finder hullerne, prioriterer dem og bygger de løsninger, der passer til jeres virksomhed. Løsninger, der går igen på tværs af virksomheder, bliver over tid til faste Growth Engine-moduler.',
      },
      {
        id: 'website-vs-engine',
        q: 'Hvad er forskellen på Growth Engine og et website?',
        a: 'Growth Engine er et løbende forløb, hvor vi forbedrer kunderejsen måned for måned. Et website er et afgrænset projekt til fast pris. Nogle virksomheder har brug for det ene, nogle for begge.',
      },
      {
        id: 'founder',
        q: 'Hvad er Founder Programmet?',
        a: 'De første tre virksomheder får Growth Engine til en introduktionspris i tre måneder. De får samme kerneproces, men arbejder tættere sammen med os under implementeringen og giver feedback, der former, hvilke løsninger der bliver til faste moduler. Herefter fortsætter samarbejdet til normalpris. Det er aftalt fra start.',
      },
    ],
  },

  // ---------------------------------------------------------- growth scan page
  scanPage: {
    title: 'Gratis Growth Scan',
    description:
      'Kør en gratis Growth Scan af jeres website. Se med det samme, hvor I kan miste potentielle kunder i kontaktveje, tillid og teknisk fundament.',
    eyebrow: 'Gratis Growth Scan',
    heading: 'Find ud af, hvor I taber potentiale.',
    lead: 'Skriv jeres webadresse. Scanningen er diagnosen: den viser, hvor der er huller, og om websitet selv står i vejen.',
    measuredHeading: 'Måles automatisk',
    measured: [
      { title: 'Lead-indfangning', body: 'Klikbart telefonnummer, formular, kontaktveje og tydelige opfordringer.' },
      { title: 'Tillid', body: 'Anmeldelser, virksomhedsoplysninger, Google-profil og struktureret data.' },
      { title: 'Teknisk fundament', body: 'Mobilvisning, svartid, titler, indeksering og sitemap.' },
      { title: 'Websitet som helhed', body: 'Om websitet selv begrænser konverteringen, og hvorfor.' },
    ],
    reviewHeading: 'I den fulde gennemgang',
    review: ['Google-synlighed og søgeord', 'AI-synlighed', 'Konkurrenter', 'Prioriteret plan'],
    afterHeading: 'Efter scanningen',
    after: [
      { title: 'Foreløbigt resultat', body: 'I ser resultatet med det samme på siden.' },
      { title: 'Fuld gennemgang', body: 'Vil I have mere, gennemgår vi det manuelt sammen med jer.' },
      { title: 'I beslutter', body: 'Growth Engine, et nyt website eller ingenting. Det er jeres valg.' },
    ],
    faq: { eyebrow: 'Spørgsmål', heading: 'Om scanningen.' },
  },

  // ----------------------------------------------------------------- faq page
  faqPage: {
    title: 'FAQ',
    description:
      'Svar på de spørgsmål, vi oftest får om Growth Engine, Growth Scan, websites, automatisering, pris og binding.',
    eyebrow: 'FAQ',
    heading: 'Spørgsmål og svar.',
    lead: 'Det, folk typisk vil vide, før de kører en Growth Scan eller booker en samtale.',
    moreHeading: 'Fandt du ikke svaret?',
    moreBody: 'Skriv jeres nummer, så ringer jeg.',
  },

  // ----------------------------------------------------------------- footer
  footer: {
    description:
      'Growth Engine finder de steder i jeres digitale kunderejse, hvor potentielle kunder går tabt, og forbedrer dem løbende.',
    productHeading: 'Growth Engine',
    companyHeading: 'Virksomhed',
    contactHeading: 'Kontakt',
    privacy: 'Privatlivspolitik',
    cookies: 'Cookiepolitik',
    cvr: 'CVR',
    rights: 'Alle rettigheder forbeholdes.',
  },

  // ------------------------------------------------------------------ pages
  pages: {
    booking: {
      title: 'Book en afklaring',
      description:
        'Book en gratis, uforpligtende afklaring med Aagesen Growth om jeres digitale kunderejse, eller bliv ringet op.',
      heading: 'Book en afklaring',
      lead: 'En direkte samtale om jeres forretning, ikke et salgsopkald. Gratis og uden forpligtelse.',
      agendaHeading: 'Det taler vi om',
      agenda: [
        'Jeres nuværende digitale kunderejse: hvor I findes, og hvordan websitet konverterer',
        'Hvor I potentielt går glip af kunder, og hvad der vil betyde mest at rette først',
        'Om Growth Engine eller et nyt website er relevant for jer lige nu',
        'Hvad et samarbejde konkret vil indebære',
      ],
      noneHeading: 'Det sker ikke',
      none: ['Ingen salgssekvens', 'Ingen automatiske opkald', 'Oplysningerne bruges kun til samtalen'],
      embedNote: 'Vælg et tidspunkt, der passer jer.',
      embedFallbackLink: 'Åbn kalenderen i nyt vindue',
      orCallback: 'Hellere blive ringet op?',
    },
    work: {
      title: 'Projekter',
      description: 'Udvalgte projekter fra Aagesen Growth. Websites og digitale systemer bygget for rigtige virksomheder.',
      heading: 'Projekter',
      lead: 'Udvalgt arbejde fra tiden før Growth Engine. Websites og digitale systemer for rigtige virksomheder.',
      allLabel: 'Alle projekter',
      disciplinesLabel: 'Discipliner',
      deliveredLabel: 'Leveret',
      demonstratesLabel: 'Hvad det viser',
      challengeLabel: 'Udgangspunktet',
      periodLabel: 'Periode',
      nextLabel: 'Næste projekt',
      similarCta: 'Kør en gratis Growth Scan',
    },
    notFound: {
      title: 'Siden findes ikke',
      heading: '404',
      lead: 'Siden her findes ikke, eller den er flyttet. Prøv forsiden.',
      cta: 'Til forsiden',
    },
  },

  meta: {
    homeTitle: 'Growth Engine: find hvor I taber kunder | Aagesen Growth',
    homeDescription:
      'Growth Engine finder de steder i jeres digitale kunderejse, hvor potentielle kunder går tabt, og forbedrer det, der betyder mest. Kør en gratis Growth Scan, eller book en afklaring.',
  },

  // -------------------------------------------------------------------- legal
  /**
   * The privacy and cookie pages. Only the shell (title, eyebrow, lead, the
   * "note" label and the consent-reset controls) lives here. The section
   * headings and body paragraphs are written once, directly in Danish, in
   * Privacy.tsx and CookiePolicy.tsx — a legal text should not be machine-
   * translated, and a bilingual heading over a Danish paragraph would be
   * worse than an honest, clearly-marked single-language document. English
   * readers get a banner (`legalNotice`) saying the Danish text governs.
   */
  legal: {
    eyebrow: 'Juridisk',
    noticeLabel: 'Bemærk',
    governingNotice: '',
    contactFormFallback: 'kontaktformularen',
    privacyTitle: 'Privatlivspolitik',
    privacyDescription:
      'Sådan behandler Aagesen Growth ApS personoplysninger fra kontaktformularen, i overensstemmelse med GDPR.',
    privacyLead: 'Hvilke oplysninger vi modtager, hvad de bruges til, og hvad I kan kræve.',
    cookiesTitle: 'Cookiepolitik',
    cookiesDescription:
      'Hvilke cookies Aagesen Growth ApS bruger, hvad de gør, og hvordan du ændrer eller trækker dit samtykke tilbage.',
    cookiesLead: 'Hvad der sættes, hvornår — og hvordan du ombestemmer dig.',
    templateNotice: 'Denne tekst er en skabelon og skal gennemgås af en jurist inden lancering.',
    changeChoice: 'Ændr dit valg',
    changeChoiceBody:
      'Dit samtykke er gemt lokalt i din browser. Du kan trække det tilbage her, hvorefter banneret vises igen.',
    resetButton: 'Nulstil cookievalg',
    resetDone: 'Dit valg er nulstillet. Banneret vises igen nederst på siden.',
  },

  cookies: {
    heading: 'Cookies',
    body: 'Vi bruger nødvendige cookies for at siden fungerer. Med dit samtykke bruger vi også statistik- og marketingcookies. Du kan ændre dit valg når som helst.',
    accept: 'Accepter alle',
    reject: 'Afvis',
    policy: 'Cookiepolitik',
  },

  work: {
    cases: {
      'plus-eins': {
        kind: 'Boutique · Salumeria · Deli · Rørvig',
        disciplines: ['Website', 'SEO', 'GEO', 'Meta Ads', 'Strategi'],
        summary:
          'Et digitalt fundament for en fysisk boutique, der skulle være lige så tydelig online som i butikken.',
        strapline: 'Fra fysisk koncept til sammenhængende digitalt brand.',
        challenge:
          'Plus Eins havde en stærk fysisk identitet, men den digitale tilstedeværelse fortalte ikke den samme historie. Der manglede ét sted, hvor brandet, sortimentet og butikkens tone hang sammen — og et fundament, der kunne bære den videre udvikling.',
        sections: [
          {
            heading: 'Tilgang',
            body: 'Arbejdet startede med strukturen frem for designet. Hvad skal en besøgende kunne finde ud af, og i hvilken rækkefølge? Først derefter blev det visuelle lagt ovenpå, så designet understøtter indholdet i stedet for at konkurrere med det.',
          },
          {
            heading: 'Det byggede vi',
            body: 'Et website, der samler brandet, sortimentet og butikkens praktiske oplysninger ét sted. Sideopbygningen er lavet, så nye kategorier og koncepter kan komme til uden at strukturen skal laves om — hvilket blev afgørende, da Deli-konceptet kom til.',
          },
          {
            heading: 'Løbende arbejde',
            body: 'Samarbejdet er fortsat efter lancering med indhold, visuel kommunikation, sociale medier og den løbende marketingretning. Prioriteringen justeres efter, hvad butikken har brug for i den enkelte periode.',
          },
        ],
        delivered: [
          'Website med udbygningsvenlig struktur',
          'Digital brandretning',
          'Indhold og visuel kommunikation',
          'Sociale medier og kampagner',
          'SEO og GEO',
          'Forberedelse til webshop',
        ],
        demonstrates:
          'At et website skal bygges til det, der kommer bagefter. Strukturen holdt, da et helt nyt koncept skulle ind.',
        proofLine: 'Website · brandsystem · løbende vækstsamarbejde',
        period: 'Løbende samarbejde',
        disclosure: '',
        media: {
          desktop: {
            alt: 'Forsiden af pluseins.dk på desktop med det fuldbredde hero-billede fra gårdhaven.',
            caption: '',
          },
          mobile: { alt: 'Forsiden af pluseins.dk på mobil med navigation og hero-billede.', caption: '' },
          photoBoutique: {
            alt: 'Plus Eins boutique udefra med parasoller, instruktørstole og kurve på terrassen.',
            caption: 'Boutique',
          },
          photoSalumeria: {
            alt: 'Salumeria-disken hos Plus Eins med spegepølser, oste og delikatesser.',
            caption: 'Salumeria',
          },
          photoExterior: {
            alt: 'Plus Eins-bygningen i Rørvig set udefra i aftenlys med lys i vinduerne.',
            caption: 'Butikken',
          },
          screenBoutique: {
            alt: 'Boutique-siden på pluseins.dk med redaktionel opsætning af billede og tekst.',
            caption: 'Boutique',
          },
          screenSalumeria: {
            alt: 'Salumeria-siden på pluseins.dk med samme sideskabelon som de øvrige koncepter.',
            caption: 'Salumeria',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
      'plus-eins-deli': {
        kind: 'Konceptlancering',
        disciplines: ['Konceptlancering', 'Indhold', 'Meta Ads'],
        summary:
          'Lanceringen af et nyt deli-koncept under et eksisterende brand — uden at fortynde det brand, det voksede ud af.',
        strapline: 'Et nyt koncept inde i et etableret brand.',
        challenge:
          'Deli-konceptet skulle introduceres som noget nyt og selvstændigt, men stadig høre tydeligt til Plus Eins. For meget adskillelse, og det ville føles som en fremmed forretning. For lidt, og det ville forsvinde i det eksisterende.',
        sections: [
          {
            heading: 'Tilgang',
            body: 'Konceptet blev behandlet som en udvidelse af brandet, ikke som et sidespor. Samme visuelle grundtone, men et eget spor i strukturen, så Deli kan kommunikeres selvstændigt uden at bryde helheden.',
          },
          {
            heading: 'Lanceringen',
            body: 'Selve introduktionen blev kørt digitalt gennem website, indhold og sociale medier med en samlet retning frem for spredte opslag. Det digitale fundament var på plads, før kommunikationen gik i luften — ikke omvendt.',
          },
        ],
        delivered: [
          'Digital lancering af konceptet',
          'Indhold og visuel kommunikation',
          'Integration i den eksisterende sidestruktur',
          'Kampagner og løbende synlighed',
        ],
        demonstrates:
          'At en lancering er et struktur- og timingproblem lige så meget som et designproblem.',
        proofLine: 'Konceptside · lanceringsindhold · kampagner',
        period: 'Løbende samarbejde',
        disclosure: 'Del af det løbende samarbejde med Plus Eins.',
        media: {
          desktop: {
            alt: 'Deli-siden på pluseins.dk med overskriften Deli ved siden af et stort billede af en focaccia.',
            caption: '',
          },
          mobile: { alt: 'Deli-siden på pluseins.dk vist på mobil.', caption: '' },
          photoDeli: {
            alt: 'Focaccia med prosciutto di Parma, tomat og rucola fra Plus Eins Deli.',
            caption: 'Deli',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
    } as Record<string, CaseCopy>,
  },
};

export type DictionaryShape = typeof da;

export default da;
