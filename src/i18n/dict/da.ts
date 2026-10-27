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
    websites: 'Hjemmesider',
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
    seeWebsitesPage: 'Se hjemmesider og priser',
    seeCase: 'Se casen',
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
    lines: ['Flere kunder.', 'Færre tabte leads.'],
    lead: 'Growth Engine finder de steder i jeres digitale kunderejse, hvor I potentielt går glip af kunder, og hjælper med at prioritere og forbedre dem løbende.',
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
    /** The sequence. Only what the scan actually does. */
    steps: [
      { key: 'open', label: 'Åbner websitet i en browser' },
      { key: 'pages', label: 'Gennemgår undersider' },
      { key: 'contact', label: 'Kontakt og booking' },
      { key: 'google', label: 'Google-synlighed' },
      { key: 'gbp', label: 'Anmeldelser og Google-profil' },
      { key: 'followup', label: 'Opfølgning' },
      { key: 'report', label: 'Samler rapporten' },
    ],
    stepStatus: { done: 'Gennemgået', running: 'I gang' },

    result: {
      eyebrow: 'Growth Scan',
      areas: {
        website: 'Website',
        google: 'Google',
        gbp: 'Anmeldelser og Google-profil',
        contact: 'Kontakt og booking',
        followup: 'Opfølgning',
      },
      recommendation: 'Vores anbefaling',
      cta: 'Book en samtale om Growth Engine',
      websiteCta: 'Se website-pakker',
      notSeen: 'Det kan vi ikke se udefra',
      save: 'Gem rapporten',
      savePdf: 'Gem som PDF',
      saveImage: 'Gem som billede',
      preparing: 'Gør klar …',
      privacyNote: 'Rapporten er kun til jer. Den bygger på offentligt tilgængelige oplysninger og bliver ikke delt med andre.',
      rescan: 'Scan et andet website',
      /** Shown when the site could not be seen properly. The lead path stays open. */
      unreachableHeading: 'Vi kunne ikke se websitet ordentligt automatisk.',
      unreachableBody:
        'Det sker fx ved bot-beskyttelse, en login-side eller en langsom server. I stedet for at gætte kører vi scanningen manuelt og sender jer resultatet.',
      unreachableCta: 'Send til manuel scanning',
      timestamp: 'Scannet',
      manualRequested: 'Manuel scanning ønsket',
      networkError: 'Scanningen kunne ikke gennemføres.',
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
      lead: 'Scanningen åbner jeres website i en rigtig browser og viser de vigtigste muligheder for flere henvendelser. Rapporten får I med det samme.',
    },
    paths: {
      eyebrow: 'Kom i gang',
      heading: 'To veje ind. I vælger selv.',
      scan: {
        label: '01 · Selv først',
        title: 'Gratis Growth Scan',
        body: 'Skriv jeres webadresse og få en kort rapport med de vigtigste muligheder med det samme. Ingen binding.',
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
    industries: ['Tømrer', 'Tag', 'Vinduer og døre', 'VVS', 'Murer', 'Maler', 'Renovering'],
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
        a: 'Ikke nødvendigvis. De fleste forbedringer kan laves på det website, I har. Viser Growth Scan, at websitet selv står i vejen, fx fordi det ikke er tilpasset mobiltelefoner, anbefaler vi en af vores website-pakker. Små forbedringer løser vi på det website, I har. Det er en separat ydelse til fast pris.',
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
        a: 'I får en kort rapport med det samme, som I kan gemme som PDF eller billede. Vil I videre, gennemgår vi den sammen med jer og ser på det, scanningen ikke kan se udefra: placeringer på Google, jeres Google-profil og hvad der sker efter en henvendelse. Derefter beslutter I selv, om I vil gå videre. Der kommer ingen automatisk salgssekvens.',
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
        id: 'website-price',
        q: 'Hvad koster en ny hjemmeside?',
        a: 'Hos Aagesen Growth koster en ny hjemmeside 9.995 kr. (Start), 14.995 kr. (Growth) eller 24.995 kr. (Custom), alle ekskl. moms. Prisen afhænger af antal sider, funktioner og hvor meget indhold, der skal laves. Prisen er fast og aftales skriftligt, før arbejdet går i gang.',
      },
      {
        id: 'website-time',
        q: 'Hvor lang tid tager det at få en ny hjemmeside?',
        a: 'Det afhænger af omfanget, og af hvor hurtigt tekster og billeder er klar. Vi aftaler tidsplanen sammen med tilbuddet, så I ved, hvornår siden går live.',
      },
      {
        id: 'website-google',
        q: 'Bliver den nye hjemmeside fundet på Google?',
        a: 'Alle hjemmesider bliver sat op med egne titler og beskrivelser pr. side, sitemap og en struktur, Google kan læse. Vi kan ikke garantere placeringer, men siden er bygget til at kunne findes. Vil I mere synlighed, kan hjemmesiden kombineres med Growth Engine.',
      },
      {
        id: 'website-content',
        q: 'Skal vi selv skrive teksterne?',
        a: 'Nej, ikke nødvendigvis. Har I tekster og billeder klar, bruger vi dem. Ellers skriver vi teksterne sammen med jer ud fra en samtale om jeres virksomhed og jeres kunder.',
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
      'Kør en gratis Growth Scan af jeres website. Vi åbner det i en rigtig browser og viser de vigtigste muligheder for flere henvendelser, på almindeligt dansk.',
    eyebrow: 'Gratis Growth Scan',
    heading: 'Find ud af, hvor I taber henvendelser.',
    lead: 'Skriv jeres webadresse. På under et minut får I en kort rapport med de vigtigste muligheder og ét konkret næste skridt.',
    measuredHeading: 'Det gennemgår scanningen',
    measured: [
      { title: 'Websitet, som kunden ser det', body: 'Forsiden og op til fem undersider, åbnet i en rigtig browser på mobil og computer.' },
      { title: 'Kontakt og booking', body: 'Hvor let det er at ringe, skrive eller booke, og hvad kunden ser på den første skærm.' },
      { title: 'Google-synlighed', body: 'Om siderne er sat op til at blive fundet: titler, lokale søgeord og indeksering.' },
      { title: 'Anmeldelser og Google-profil', body: 'Om websitet viser anmeldelser og viser vej til jeres Google-profil.' },
      { title: 'Opfølgning', body: 'Hvad kunden får at vide om, hvornår de hører fra jer.' },
    ],
    reviewHeading: 'Kræver adgang',
    review: ['Placeringer i Google-søgninger', 'Jeres Google Business-profil', 'Hvad der sker efter en henvendelse'],
    afterHeading: 'Efter scanningen',
    after: [
      { title: 'En kort rapport', body: 'I ser resultatet med det samme og kan gemme det som PDF eller billede.' },
      { title: 'En samtale, hvis I vil', body: 'Vi gennemgår rapporten og det, scanningen ikke kan se, sammen med jer.' },
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
      'Growth Engine finder de steder i jeres digitale kunderejse, hvor potentielle kunder går tabt, og forbedrer dem løbende. Vi bygger også nye hjemmesider til fast pris.',
    productHeading: 'Growth Engine',
    companyHeading: 'Virksomhed',
    contactHeading: 'Kontakt',
    privacy: 'Privatlivspolitik',
    cookies: 'Cookiepolitik',
    cvr: 'CVR',
    rights: 'Alle rettigheder forbeholdes.',
  },

  // ----------------------------------------------------------- websites page
  websitesPage: {
    title: 'Ny hjemmeside til fast pris fra 9.995 kr. | Aagesen Growth',
    description:
      'Få en ny hjemmeside til fast pris: 9.995, 14.995 eller 24.995 kr. ekskl. moms. Mobilvenlig, hurtig og bygget til Google og henvendelser. Se The Jivers-casen.',
    eyebrow: 'Hjemmesider',
    heading: 'Ny hjemmeside til fast pris.',
    lead: 'Vi designer og bygger hjemmesider til små og mellemstore virksomheder. Hurtige, mobilvenlige og sat op, så I kan findes på Google og få henvendelser. I kender prisen, før vi går i gang.',
    priceFromLabel: 'Fra',
    priceFromNote: 'fast pris · ekskl. moms',
    heroCta: 'Bliv ringet op',
    heroSecondary: 'Se priserne',
    caseSection: {
      eyebrow: 'Seneste hjemmeside',
      heading: 'The Jivers. En hjemmeside med samme energi som bandet.',
      body: 'Swingbandet The Jivers fik en ny hjemmeside med bookingformular, lydklip, der afspilles som vinylplader, livevideo og en engelsk version. Bygget til at arrangører hurtigt kan høre bandet og sende en forespørgsel.',
      points: ['Bookingformular med spamfilter', 'Lydklip og livevideo', 'Dansk og engelsk version', 'Teknisk SEO og hosting'],
      cta: 'Se hele casen',
      visit: 'Besøg jivers.dk',
    },
    cost: {
      eyebrow: 'Pris',
      heading: 'Hvad koster en ny hjemmeside?',
      lead: 'En ny hjemmeside hos os koster 9.995, 14.995 eller 24.995 kr. ekskl. moms. Hvilken pakke I lander i, afhænger især af tre ting.',
      factors: [
        { title: 'Antal sider', body: 'En hjemmeside med forside, ydelser, om jer og kontakt er hurtigere at lave end en med en side til hver ydelse.' },
        { title: 'Funktioner', body: 'Booking, betaling, integrationer og automatisering tager mere tid end en almindelig kontaktformular.' },
        { title: 'Indhold', body: 'Har I tekster og billeder klar, går det hurtigere. Ellers skriver vi teksterne sammen med jer.' },
      ],
    },
    packages: {
      eyebrow: 'Pakker',
      heading: 'Tre pakker. Fast pris.',
    },
    included: {
      eyebrow: 'Altid med',
      heading: 'Det får I med i alle pakker.',
      items: [
        'Design, der passer til jeres virksomhed',
        'Mobilvenlig og hurtig hjemmeside',
        'Kontakt- eller bookingformular',
        'Egen titel og beskrivelse på hver side',
        'Sitemap og opsætning til Google',
        'Opsætning af analytics',
        'Sikker forbindelse (https)',
        'Hjælp til at gå live',
      ],
    },
    process: {
      eyebrow: 'Forløbet',
      heading: 'Sådan får I en ny hjemmeside.',
      steps: [
        { title: 'Afklaring', body: 'En kort samtale om jeres virksomhed, jeres kunder og hvad hjemmesiden skal kunne. Gratis og uforpligtende.' },
        { title: 'Tilbud til fast pris', body: 'I får et skriftligt tilbud med pris, omfang og tidsplan, før arbejdet går i gang.' },
        { title: 'Design og udvikling', body: 'Vi designer og bygger siden og viser jer den undervejs, så I kan nå at ændre retning.' },
        { title: 'Lancering', body: 'Siden går live med titler, sitemap og analytics sat op, så Google kan finde den fra første dag.' },
      ],
    },
    callback: {
      eyebrow: 'Ny hjemmeside?',
      heading: 'Bliv ringet op.',
      lead: 'Skriv jeres nummer, så ringer vi og tager en snak om, hvad I har brug for, og hvilken pakke der passer. Eller book en afklaring.',
    },
    faq: { eyebrow: 'Spørgsmål', heading: 'Om nye hjemmesider.' },
    teaser: {
      eyebrow: 'Hjemmesider',
      heading: 'Skal I have en ny hjemmeside?',
      body: 'Vi bygger også nye hjemmesider til fast pris fra 9.995 kr. ekskl. moms. Hurtige, mobilvenlige og sat op til Google. Se fx den nye hjemmeside til swingbandet The Jivers.',
      cta: 'Se hjemmesider og priser',
      caseCta: 'Se The Jivers-casen',
    },
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
      description: 'Hjemmesider bygget af Aagesen Growth. Se den nye hjemmeside til swingbandet The Jivers, med booking, lydklip og video.',
      heading: 'Projekter',
      lead: 'Hjemmesider og digitale løsninger, vi har designet og bygget for rigtige kunder.',
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
    homeTitle: 'Growth Engine og ny hjemmeside til fast pris | Aagesen Growth',
    homeDescription:
      'Aagesen Growth finder de steder, hvor I taber kunder, og bygger nye hjemmesider til fast pris fra 9.995 kr. Kør en gratis Growth Scan, eller book en afklaring.',
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
      jivers: {
        kind: 'Swingband · Hjemmeside · Booking',
        disciplines: ['Hjemmeside', 'Design', 'Booking', 'SEO', 'Hosting'],
        summary:
          'En ny hjemmeside til et syv mand stort swingband, bygget til at arrangører hurtigt kan høre bandet og booke det til fest og firmafest.',
        strapline: 'En hjemmeside med samme energi som bandet.',
        challenge:
          'The Jivers spiller jump ’n’ jive og swing til fester i hele Danmark. Bandet havde brug for ét sted, hvor en arrangør hurtigt kan høre, se og mærke, hvad de får, og sende en bookingforespørgsel uden at skulle ringe rundt.',
        sections: [
          {
            heading: 'Design',
            body: 'Udtrykket kommer fra bandets egen verden: plakater fra 40’erne og 50’erne, sepiatonede fotos og et logo farvelagt i sidens palet. Siden skal føles som bandet, ikke som en skabelon.',
          },
          {
            heading: 'Lyd og video',
            body: 'Arrangører vil høre et band, før de booker det. Derfor kan lydklip afspilles direkte på siden som vinylplader, der drejer, mens nummeret spiller, og bandet kan ses live i video.',
          },
          {
            heading: 'Booking',
            body: 'Bookingformularen kræver kun navn og e-mail. Resten er valgfrit, så det er let at sende en forespørgsel. Henvendelser går direkte til de to bandmedlemmer, der svarer, og er beskyttet mod spam.',
          },
          {
            heading: 'Teknik og Google',
            body: 'Siden er bygget uden tunge frameworks, så den indlæses hurtigt, også på mobil. Billeder leveres i moderne formater, og hver side har sin egen titel og beskrivelse, sitemap og en engelsk version, så den kan findes på Google.',
          },
        ],
        delivered: [
          'Design og opbygning af hele hjemmesiden',
          'Syv sider til Google, herunder en engelsk version',
          'Bookingformular med spamfilter',
          'Lydafspiller formet som vinylplader',
          'Livevideo og fotogalleri',
          'Teknisk SEO: titler, sitemap og sprogversioner',
          'Hosting og drift',
        ],
        demonstrates:
          'At en hjemmeside kan have masser af personlighed og stadig være hurtig, nem at finde på Google og bygget til at skabe henvendelser.',
        proofLine: 'Hjemmeside · booking · lyd og video',
        period: '',
        disclosure: '',
        media: {
          desktop: {
            alt: 'Forsiden af jivers.dk på desktop med The Jivers-logoet, overskriften om swingband til fest og et foto af bandet på en havnemole.',
            caption: '',
          },
          mobile: { alt: 'Forsiden af jivers.dk på mobil med bandfoto og overskrift.', caption: '' },
          screenRecords: {
            alt: 'Lydklip på jivers.dk vist som fire vinylplader med pickup-arme og numrenes titler.',
            caption: 'Lydklip som vinylplader',
          },
          screenBooking: {
            alt: 'Bookingsiden på jivers.dk med formularen Bookingforespørgsel.',
            caption: 'Bookingformular',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
    } as Record<string, CaseCopy>,
  },
};

export type DictionaryShape = typeof da;

export default da;
