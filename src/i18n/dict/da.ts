import type { CaseCopy } from '@/i18n/types';

/**
 * Danish — the source dictionary.
 *
 * Every word a visitor reads on the Growth Engine site lives here, so copy is
 * reviewed in one place and the components stay free of prose. Numbers that
 * describe a price are here too; numbers that describe a result are not —
 * those come from a scan, never from a dictionary.
 */
const da = {
  // ------------------------------------------------------------------ chrome
  nav: {
    engine: 'Growth Engine',
    how: 'Sådan virker det',
    pricing: 'Pris',
    faq: 'FAQ',
    work: 'Projekter',
    review: 'Growth Review',
  },

  header: {
    home: 'Aagesen Growth — til forsiden',
    menu: 'Menu',
    close: 'Luk',
    skip: 'Spring til indhold',
    nav: 'Hovedmenu',
  },

  cta: {
    scan: 'Kør gratis Growth Scan',
    scanShort: 'Gratis Growth Scan',
    scanMobile: 'Growth Scan',
    how: 'Se hvordan det virker',
    fullReview: 'Få den fulde gennemgang',
    bookReview: 'Book en Growth Review',
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
    lead: 'Growth Engine hjælper servicevirksomheder med at blive fundet på Google og AI – og følger automatisk op på potentielle kunder.',
    /** Labels on the signal visualisation. Short: they sit on a live diagram. */
    sources: ['Google', 'ChatGPT', 'Google Maps', 'AI-søgning', 'Perplexity'],
    core: 'Growth Engine',
    outputs: ['Lead', 'Opfølgning', 'Kunde'],
    diagramAlt:
      'Søgesignaler fra Google og AI-platforme løber ind i Growth Engine og kommer ud som leads, opfølgning og kunder.',
  },

  // --------------------------------------------------------------- the scan
  /** Shared by the hero scanner, the dedicated section and the closing. */
  scan: {
    label: 'Din virksomheds website',
    placeholder: 'https://dinvirksomhed.dk',
    cta: 'Kør gratis Growth Scan',
    micro: 'Gratis · Ingen kortoplysninger · Ca. 60 sek.',
    invalid: 'Skriv en webadresse, fx dinvirksomhed.dk',
    running: 'Scanner',
    /** The sequence. Each line is shown while that stage runs. */
    steps: [
      { key: 'connect', label: 'Forbinder til website' },
      { key: 'google', label: 'Analyserer Google-synlighed' },
      { key: 'ai', label: 'Tjekker AI-synlighed' },
      { key: 'capture', label: 'Analyserer lead-indfangning' },
      { key: 'trust', label: 'Tjekker anmeldelser og tillid' },
      { key: 'competitors', label: 'Sammenligner med konkurrenter' },
      { key: 'opportunities', label: 'Finder vækstmuligheder' },
    ],
    stepStatus: { done: 'Målt', queued: 'Fuld gennemgang', running: 'Kører' },

    result: {
      eyebrow: 'Growth Scan · Foreløbigt resultat',
      scoreLabel: 'Growth Score',
      preliminary: 'Foreløbig',
      /** {n} is replaced with the number of measured signals. */
      basis: 'Baseret på {n} målte signaler fra jeres website.',
      pendingBasis:
        'Google-synlighed, AI-synlighed og konkurrenter kræver søgedata og måles i den fulde gennemgang.',
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
      findingsHeading: 'Vi fandt {n} vækstmuligheder',
      severities: { critical: 'Kritisk', opportunity: 'Mulighed', quickwin: 'Quick win' },
      severityPlural: { critical: 'Kritiske', opportunity: 'Muligheder', quickwin: 'Quick wins' },
      lockedHeading: '{n} muligheder er låst',
      lockedBody:
        'Resten af gennemgangen — søgeord, AI-svar, konkurrenter og en prioriteret handlingsplan — får I i den fulde Growth Review.',
      unlockCta: 'Få den fulde gennemgang',
      rescan: 'Scan et andet website',
      /** Shown when the site could not be reached. The lead path stays open. */
      unreachableHeading: 'Vi kunne ikke nå websitet automatisk.',
      unreachableBody:
        'Det sker fx ved bot-beskyttelse eller en langsom server. Send adressen, så kører vi scanningen manuelt og sender resultatet.',
      unreachableCta: 'Send til manuel scanning',
      timestamp: 'Scannet',
    },

    /** The lead capture that turns a scan into a booked review. */
    lead: {
      eyebrow: 'Fuld Growth Review',
      heading: 'Hvem skal have den fulde gennemgang?',
      body: 'Vi gennemgår søgeord, AI-svar, konkurrenter og lead-flow manuelt og sender en prioriteret handlingsplan. Ingen salgssekvens.',
      name: 'Navn',
      company: 'Virksomhed',
      email: 'E-mail',
      phone: 'Telefon',
      website: 'Website',
      optional: 'valgfri',
      submit: 'Book den fulde gennemgang',
      sending: 'Sender…',
      privacy: 'Oplysningerne bruges kun til at levere gennemgangen.',
      successHeading: 'Tak — gennemgangen er bestilt.',
      successBody:
        'I hører fra os inden for én arbejdsdag med et tidspunkt til gennemgangen. Den tager cirka 30 minutter og kræver ingen forberedelse.',
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

  // ----------------------------------------------------------------- problem
  problem: {
    eyebrow: 'Problemet',
    heading: 'Du kan miste kunden, før du ved, den findes.',
    lead: 'Vækst lækker to steder. Begge er usynlige i regnskabet, fordi kunden aldrig blev til en henvendelse — eller blev det og forsvandt.',
    leaks: [
      {
        index: '01',
        title: 'De finder dig ikke',
        body: 'Kunden søger — på Google, i Maps, i ChatGPT. Hvis svaret er en konkurrent, er valget truffet, før du var med.',
        items: ['Google', 'ChatGPT', 'AI-søgning', 'Lokal søgning', 'Konkurrenter'],
      },
      {
        index: '02',
        title: 'Du fanger dem ikke',
        body: 'Kunden henvender sig — og venter. Et ubesvaret opkald, en formular uden svar, et tilbud uden opfølgning. Leadet er tabt uden at nogen ser det.',
        items: ['Ubesvarede opkald', 'Langsomt svar', 'Ingen opfølgning', 'Glemte tilbud', 'Gamle leads'],
      },
    ],
    diagram: {
      without: 'Uden Growth Engine',
      with: 'Med Growth Engine',
      search: 'Søgning',
      lead: 'Lead',
      customer: 'Kunde',
      lost: 'Tabt',
      leakLabels: ['Ikke fundet', 'Ubesvaret opkald', 'Ingen opfølgning'],
      nodeLabels: ['Fundet', 'Fanget', 'Fulgt op'],
      alt: 'To forløb. Uden Growth Engine falder leads ud undervejs. Med Growth Engine føres søgningen hele vejen til kunde.',
    },
  },

  // ------------------------------------------------------------------ engine
  engine: {
    eyebrow: 'Growth Engine',
    heading: 'Ét system. Fra søgning til kunde.',
    lead: 'Ikke fire ydelser. Ét sammenhængende system, der finder, fanger og følger op — og måler det hele ét sted.',
    stages: [
      { key: 'discover', label: 'Discover', da: 'Bliv fundet' },
      { key: 'analyze', label: 'Analyze', da: 'Find hullerne' },
      { key: 'improve', label: 'Improve', da: 'Ret det vigtigste' },
      { key: 'capture', label: 'Capture', da: 'Fang henvendelsen' },
      { key: 'followup', label: 'Follow up', da: 'Følg op automatisk' },
      { key: 'measure', label: 'Measure', da: 'Mål alt ét sted' },
    ],
    modules: [
      {
        key: 'visibility',
        index: '01',
        title: 'Visibility',
        body: 'Følger de søgninger, der betyder noget for jer — på Google og i AI-svar — og viser, hvor I bliver valgt fra.',
      },
      {
        key: 'optimization',
        index: '02',
        title: 'Optimization',
        body: 'Finder og prioriterer de ændringer, der med størst sandsynlighed flytter synlighed og konvertering. Tre ad gangen.',
      },
      {
        key: 'recovery',
        index: '03',
        title: 'Lead Recovery',
        body: 'Svarer hurtigt, samler ubesvarede henvendelser op og følger op automatisk, indtil der er et svar.',
      },
      {
        key: 'reporting',
        index: '04',
        title: 'Reporting',
        body: 'Synlighed, muligheder og leads i ét overblik. Ingen rapporter, der skal læses — kun tal, der skal handles på.',
      },
    ],
  },

  // ----------------------------------------------------------------- product
  product: {
    eyebrow: 'Growth Engine · Dashboard',
    heading: 'Alt, der driver vækst. Ét overblik.',
    lead: 'Sådan ser systemet ud for jer. Tallene her er eksempler på, hvad dashboardet viser — ikke målte resultater.',
    note: 'Eksempeldata',
    period: 'Seneste 30 dage',
    metrics: {
      score: 'Growth Score',
      google: 'Google-synlighed',
      ai: 'AI-synlighed',
      received: 'Leads modtaget',
      recovered: 'Leads reddet',
      appointments: 'Aftaler',
      opportunities: 'Vækstmuligheder',
      actions: 'Handlinger udført',
      response: 'Median svartid',
    },
    competitors: {
      heading: 'Synlighed vs. konkurrenter',
      you: 'Jer',
      competitor: 'Konkurrent',
    },
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
      heading: 'Lead-flow',
      items: [
        { kind: 'lead', text: 'Ny henvendelse via formular', meta: 'svar sendt efter 40 sek.' },
        { kind: 'recovered', text: 'Ubesvaret opkald', meta: 'SMS-opfølgning sendt' },
        { kind: 'booked', text: 'Tilbud fulgt op', meta: 'aftale booket' },
      ],
    },
  },

  // ------------------------------------------------------------ before/after
  beforeAfter: {
    eyebrow: 'Driftsforskellen',
    heading: 'Samme henvendelse. To forløb.',
    before: {
      label: 'Før',
      flows: [
        ['Lead kommer ind', 'venter', 'intet svar', 'glemt'],
        ['Kunden søger', 'konkurrent vises', 'kunde tabt'],
      ],
    },
    after: {
      label: 'Med Growth Engine',
      flow: [
        'Søgning',
        'Virksomhed fundet',
        'Lead fanget',
        'Svar med det samme',
        'Opfølgning',
        'Aftale',
        'Målbart resultat',
      ],
    },
  },

  // ------------------------------------------------------------ scan section
  scanSection: {
    eyebrow: 'Gratis Growth Scan',
    heading: 'Find ud af, hvor din virksomhed taber vækst.',
    lead: 'Skriv jeres webadresse. Scanningen måler det, der kan måles automatisk, og markerer, hvad der kræver den fulde gennemgang.',
    analyses: [
      { title: 'Google-synlighed', body: 'Bliver I fundet på de søgninger, der giver kunder?' },
      { title: 'AI-synlighed', body: 'Anbefaler ChatGPT og AI-søgning jer — eller konkurrenten?' },
      { title: 'Website-konvertering', body: 'Gør sitet det let at ringe, skrive og bestille?' },
      { title: 'Lead-indfangning', body: 'Hvad sker der, når nogen henvender sig uden for åbningstid?' },
      { title: 'Anmeldelser og tillid', body: 'Giver jeres profil kunden grund til at vælge jer?' },
      { title: 'Konkurrentposition', body: 'Hvem vises, hvor I ikke gør?' },
    ],
  },

  // -------------------------------------------------------------------- how
  how: {
    eyebrow: 'Sådan virker det',
    heading: 'I skal ikke blive marketingfolk. Vi driver systemet.',
    steps: [
      { index: '01', title: 'Scan', body: 'Vi analyserer jeres nuværende vækstsystem: synlighed, konvertering, lead-flow og konkurrenter.' },
      { index: '02', title: 'Installér', body: 'Growth Engine kobles på jeres website, telefon og Google Business-profil. Typisk inden for to uger.' },
      { index: '03', title: 'Forbedr', body: 'De vækstmuligheder med størst værdi bliver udført først. Tre prioriterede handlinger om måneden.' },
      { index: '04', title: 'Kør', body: 'Synlighed og opfølgning overvåges og forbedres løbende. I ser det hele i ét dashboard.' },
    ],
  },

  // ---------------------------------------------------------------- pricing
  pricing: {
    eyebrow: 'Pris',
    heading: 'Én pris. Hele systemet.',
    name: 'Growth Engine',
    setup: 7500,
    monthly: 5995,
    setupLabel: 'opsætning',
    monthlyLabel: '/ måned',
    vat: 'Priser ekskl. moms',
    binding: 'Ingen binding ud over løbende måned + 30 dage.',
    includedHeading: 'Det får I',
    included: [
      'Overvågning af Google- og AI-synlighed',
      'Månedlig Growth Scan',
      '3 prioriterede Growth Actions om måneden',
      'Automatisk svar på nye henvendelser',
      'Opsamling af ubesvarede leads',
      'Opfølgningssekvenser',
      'Anmeldelsesflow',
      'Growth-dashboard',
      'Månedlig rapportering',
    ],
    microcopy: 'Bygget til virksomheder, hvor én ekstra kunde kan betale for systemet.',
    cta: 'Kør gratis Growth Scan',
  },

  // ------------------------------------------------------- founder program
  founder: {
    eyebrow: 'Founder Program',
    heading: 'Vi udvælger de første tre virksomheder til Growth Engine.',
    body: 'Tre pladser til virksomheder, der vil være med fra starten og give ærlig feedback, mens systemet bliver bygget færdigt omkring dem.',
    setup: 2995,
    monthly: 3995,
    duration: 'i 3 måneder',
    seatsLabel: 'pladser',
    seats: 3,
    conditions: ['Maks. 3 virksomheder', 'Samme system, samme drift', 'Herefter normal pris'],
    cta: 'Ansøg via Growth Scan',
    ariaLabel: 'Founder Program: begrænset lanceringstilbud',
  },

  // -------------------------------------------------------------------- fit
  fit: {
    eyebrow: 'Hvem det er til',
    heading: 'Growth Engine er bygget til virksomheder, hvor:',
    forItems: [
      'kunderne har en reel ordre- eller livstidsværdi',
      'henvendelser kommer via website og telefon',
      'lokal søgning betyder noget for salget',
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
        q: 'Hvad er Growth Engine helt præcist?',
        a: 'Et løbende system, der gør jer mere synlige på Google og i AI-svar, fanger henvendelser hurtigere og følger op automatisk — målt i ét dashboard. Vi driver det. I får kunderne.',
      },
      {
        q: 'Er det SEO?',
        a: 'SEO er en del af det, men ikke hele det. Synlighed på Google er én indgang. AI-svar, lead-indfangning og opfølgning er de tre andre, og de mangler i de fleste SEO-aftaler.',
      },
      {
        q: 'Er Google Ads inkluderet?',
        a: 'Nej. Growth Engine arbejder med den synlighed og de leads, I har og kan få uden annoncebudget. Annoncering kan lægges ovenpå, hvis tallene viser, at det giver mening.',
      },
      {
        q: 'Virker det med vores nuværende website?',
        a: 'Ja. Growth Engine kobles på det website, I har. Er der ændringer, der giver stor effekt, indgår de i de månedlige Growth Actions.',
      },
      {
        q: 'Skal vi have et nyt CRM?',
        a: 'Nej. Lead-opsamling og opfølgning kører i Growth Engine. Bruger I allerede et system, kan leads sendes videre dertil.',
      },
      {
        q: 'Hvad er AI-synlighed?',
        a: 'Om ChatGPT, Google AI-oversigter og lignende nævner og anbefaler jer, når nogen spørger efter en leverandør i jeres område. Det kræver andet og mere end klassisk SEO.',
      },
      {
        q: 'Hvor hurtigt kan det installeres?',
        a: 'Typisk inden for to uger fra aftale. Scanningen og den første handlingsplan er klar, før vi kobler noget på.',
      },
      {
        q: 'Kan I garantere flere kunder?',
        a: 'Nej, og det bør ingen. Vi kan garantere, at synlighed, svartid og opfølgning bliver målt og forbedret hver måned — og at I kan se det i tallene.',
      },
      {
        q: 'Hvad sker der efter Growth Scan?',
        a: 'I får det foreløbige resultat med det samme. Beder I om den fulde gennemgang, får I en 30 minutters Growth Review med søgeord, AI-svar, konkurrenter og en prioriteret plan — uden forpligtelse.',
      },
      {
        q: 'Er der binding?',
        a: 'Nej. Opsætningen betales én gang. Abonnementet kan opsiges med løbende måned + 30 dage.',
      },
    ],
  },

  // ------------------------------------------------------------- final cta
  final: {
    eyebrow: 'Gratis Growth Scan',
    heading: 'Se, hvad der holder jeres vækst tilbage.',
    lead: 'Skriv webadressen. Resten klarer scanningen.',
  },

  // ----------------------------------------------------------------- footer
  footer: {
    description:
      'Growth Engine: synlighed på Google og AI, hurtigere svar og automatisk opfølgning — for servicevirksomheder, der vil have flere kunder og færre tabte leads.',
    productHeading: 'Growth Engine',
    companyHeading: 'Virksomhed',
    privacy: 'Privatlivspolitik',
    cookies: 'Cookiepolitik',
    cvr: 'CVR',
    rights: 'Alle rettigheder forbeholdes.',
    poweredBy: 'Growth Engine drives af MOWE — Aagesen Growths egen platform.',
  },

  // ------------------------------------------------------------------ pages
  pages: {
    review: {
      title: 'Book en Growth Review',
      description:
        'Book en gratis Growth Review: 30 minutters gennemgang af jeres Google- og AI-synlighed, lead-flow og konkurrenter — med en prioriteret handlingsplan.',
      heading: 'Book en Growth Review',
      lead: 'En 30 minutters gennemgang af, hvor I taber kunder — og hvad der skal rettes først. Gratis og uden forpligtelse.',
      agendaHeading: 'Det gennemgår vi',
      agenda: [
        'Søgninger, hvor konkurrenter vises, og I ikke gør',
        'Hvad ChatGPT og AI-søgning svarer om jeres marked',
        'Hvad der sker med en henvendelse i dag — fra formular til svar',
        'Tre prioriterede handlinger med størst forventet effekt',
      ],
      noneHeading: 'Det sker ikke',
      none: ['Ingen salgssekvens', 'Ingen automatiske opkald', 'Oplysningerne bruges kun til gennemgangen'],
    },
    work: {
      title: 'Projekter',
      description: 'Udvalgte projekter fra Aagesen Growth — websites og digitale systemer bygget for rigtige virksomheder.',
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
      lead: 'Siden her findes ikke — eller den er flyttet. Prøv forsiden.',
      cta: 'Til forsiden',
    },
    legalNotice: '',
  },

  cookies: {
    heading: 'Cookies',
    body: 'Vi bruger nødvendige cookies for at siden fungerer. Med dit samtykke bruger vi også statistik- og marketingcookies. Du kan ændre dit valg når som helst.',
    accept: 'Accepter alle',
    reject: 'Afvis',
    policy: 'Cookiepolitik',
  },

  meta: {
    homeTitle: 'Growth Engine — flere kunder, færre tabte leads | Aagesen Growth',
    homeDescription:
      'Growth Engine hjælper servicevirksomheder med at blive fundet på Google og AI – og følger automatisk op på potentielle kunder. Kør en gratis Growth Scan på 60 sekunder.',
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
      'mowe-systems': {
        kind: 'SaaS · AI-synlighed',
        disciplines: ['Brand', 'Produkt', 'Website', 'SEO', 'GEO'],
        summary:
          'Fra kompleks softwareidé til et produkt, man kan forstå på tredive sekunder — og en platform, der kan vokse.',
        strapline: 'En ny kategori, forklaret på tredive sekunder.',
        challenge:
          'MOWE Systems er en AI visibility-platform. Den slags produkt er svært at sælge, fordi kategorien er ny: folk skal først forstå, at problemet findes, før de kan se værdien af løsningen. Teknisk kompleksitet skulle formidles uden at blive utilgængelig.',
        sections: [
          {
            heading: 'Positionering først',
            body: 'Før der blev skrevet en linje kode til websitet, blev det afklaret, hvad produktet er, hvem det er for, og hvilket problem det løser i et sprog en beslutningstager kan bruge. Positioneringen blev fundamentet for både produktstruktur og kommunikation.',
          },
          {
            heading: 'Produkt og website som ét',
            body: 'Websitet og produktets egen struktur blev udviklet i sammenhæng, så måden produktet forklares på, matcher måden det faktisk fungerer på. Det gør både onboarding og salg lettere, fordi der ikke er et spring mellem løfte og virkelighed.',
          },
          {
            heading: 'Synlighed i en ny kategori',
            body: 'SEO og GEO blev bygget ind fra start. Når kategorien er ny, er der få etablerede søgninger at kæmpe om — til gengæld er der en reel mulighed for at blive den kilde, både søgemaskiner og AI-assistenter trækker på.',
          },
        ],
        delivered: [
          'Brand og positionering',
          'Website og produktkommunikation',
          'Produktarkitektur og konverteringsstruktur',
          'SEO- og GEO-strategi',
          'Teknisk fundament for platformen',
        ],
        demonstrates:
          'At teknisk dybde og enkel kommunikation ikke er modsætninger. Det svære er at gøre det komplekse forståeligt uden at gøre det forkert.',
        proofLine: 'Positionering · produktarkitektur · website · synlighed',
        period: '',
        disclosure:
          'MOWE Systems er skabt og udviklet af samme person, der står bag Aagesen Growth.',
        media: {
          desktop: {
            alt: 'Forsiden af mowesystems.com med overskriften Get Found Before Your Competitors og analyseformularen.',
            caption: '',
          },
          mobile: { alt: 'Forsiden af mowesystems.com vist på mobil.', caption: '' },
          screenProduct: {
            alt: 'Produktsektionen på mowesystems.com, der stiller synlighed før og efter op mod hinanden.',
            caption: 'Før og efter',
          },
          screenSteps: {
            alt: 'Sektionen på mowesystems.com, der forklarer produktet i tre trin.',
            caption: 'Produktet i tre trin',
          },
        } as Record<string, { alt: string; caption: string }>,
      },
    } as Record<string, CaseCopy>,
  },
};

export type DictionaryShape = typeof da;

export default da;
