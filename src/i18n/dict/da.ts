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
    pricing: 'Pris',
    faq: 'FAQ',
    work: 'Projekter',
    booking: 'Book en afklaring',
  },

  header: {
    home: 'Aagesen Growth — til forsiden',
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
    lead: 'Growth Engine analyserer jeres digitale kunderejse, finder hvor potentiale går tabt, og prioriterer de forbedringer, der kan gøre størst forskel.',
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
    talkInstead: 'Vil I hellere tale sammen med det samme?',
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
      manualRequested: 'Manuel scanning ønsket',
      networkError: 'Scanningen kunne ikke gennemføres.',
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
    heading: 'Du kan miste kunder, før du ved, de findes.',
    lead: 'Potentielle kunder går tabt tre steder i den digitale kunderejse — ofte uden at det nogensinde vises i regnskabet.',
    leaks: [
      {
        index: '01',
        title: 'Bliv fundet',
        body: 'Potentielle kunder finder jer måske aldrig — på Google, i Maps eller i AI-søgning.',
        items: ['Google', 'Google Maps', 'AI-søgning'],
      },
      {
        index: '02',
        title: 'Bliv valgt',
        body: 'Besøgende kan forlade websitet igen, uden at henvende sig.',
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
    heading: 'Sådan virker Growth Engine.',
    lead: 'Ikke en fast standardpakke. Vi analyserer, prioriterer og implementerer det, der faktisk flytter noget i jeres kunderejse.',
    stages: [
      { key: 'analyze', label: 'Analysér', description: 'Vi analyserer jeres digitale kunderejse.' },
      { key: 'prioritize', label: 'Prioritér', description: 'Vi finder de muligheder med størst potentiale.' },
      { key: 'improve', label: 'Forbedr', description: 'De vigtigste Growth Actions implementeres.' },
      { key: 'measure', label: 'Mål', description: 'Vi følger effekten af ændringerne.' },
      { key: 'repeat', label: 'Gentag', description: 'Nye muligheder prioriteres løbende.' },
    ],
  },

  // ----------------------------------------------------------------- product
  product: {
    caption: 'Sådan kan overblikket se ud, når Growth Engine er koblet på. Eksempeldata — ikke målte resultater.',
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
      heading: 'Lead-flow',
      items: [
        { kind: 'lead', text: 'Ny henvendelse via formular', meta: 'svar sendt efter 40 sek.' },
        { kind: 'recovered', text: 'Ubesvaret opkald', meta: 'SMS-opfølgning sendt' },
        { kind: 'booked', text: 'Tilbud fulgt op', meta: 'aftale booket' },
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
    orTalk: 'Eller spring scanningen over og',
    orTalkCta: 'book en afklaring',
  },

  // ---------------------------------------------------------------- pricing
  pricing: {
    name: 'Growth Engine',
    setup: 7500,
    monthly: 5995,
    setupLabel: 'opsætning',
    monthlyLabel: '/ måned',
    vat: 'Priser ekskl. moms',
    binding: 'Ingen binding ud over løbende måned + 30 dage.',
  },

  // ------------------------------------------------------- founder program
  founder: {
    eyebrow: 'Founder Program',
    heading: 'Vær med til at forme Growth Engine.',
    lead: 'Vi udvælger de første virksomheder, som vil arbejde tæt sammen med os om Growth Engine.',
    body: 'Vi analyserer jeres kunderejse, prioriterer de største muligheder og implementerer de Growth Actions, der giver mening for netop jeres virksomhed. Til gengæld beder vi om løbende feedback og mulighed for at dokumentere resultaterne som case, hvis samarbejdet skaber målbar værdi.',
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
    afterBody: 'Samarbejdet fortsætter til Growth Engines normale pris. Ingen overraskelser.',
    includedHeading: 'Det arbejder vi med',
    included: [
      'Løbende analyse af kunderejsen',
      'Google- og AI-synlighed',
      'Månedlig Growth Scan',
      'Prioriterede Growth Actions',
      'Implementering af relevante Growth Actions',
      'Måling og rapportering',
    ],
    microcopy: 'Bygget til virksomheder, hvor én ekstra kunde kan betale for systemet.',
  },

  // -------------------------------------------------------------------- fit
  fit: {
    eyebrow: 'Hvem det er til',
    heading: 'Growth Engine er bygget til virksomheder, hvor:',
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
        q: 'Hvad er Growth Engine helt præcist?',
        a: 'Growth Engine analyserer jeres digitale kunderejse, finder hvor I potentielt går glip af kunder, og prioriterer de forbedringer med størst potentiale. De vigtigste muligheder implementeres som Growth Actions, og effekten måles løbende.',
      },
      {
        q: 'Hvad får vi konkret?',
        a: 'En løbende analyse af jeres kunderejse, herunder Google- og AI-synlighed, en månedlig Growth Scan, prioriterede Growth Actions, implementering af de aktioner der giver mening for jer, samt måling og rapportering.',
      },
      {
        q: 'Er Growth Engine et færdigt softwaresystem?',
        a: 'Growth Engine består i dag af vores analyse- og prioriteringssystem kombineret med implementering af Growth Actions. I Founder-fasen udvikler og standardiserer vi de løsninger, der viser sig at skabe værdi på tværs af virksomheder. Det betyder, at løsningen tilpasses jeres konkrete kunderejse frem for at tvinge jer ind i en fast standardpakke.',
      },
      {
        q: 'Kan I garantere flere kunder?',
        a: 'Nej, og det bør ingen. Vi sælger processen og implementeringen — ikke et garanteret resultat. Vi kan garantere, at de vigtigste muligheder i jeres kunderejse bliver identificeret, prioriteret og forbedret løbende, og at I kan se det i tallene.',
      },
      {
        q: 'Hvad er Founder Programmet?',
        a: 'De første tre virksomheder får Growth Engine til en introduktionspris i tre måneder, mod at give løbende feedback og mulighed for at dokumentere resultaterne som case, hvis samarbejdet skaber målbar værdi. Herefter fortsætter samarbejdet til den normale pris — det er aftalt fra start.',
      },
      {
        q: 'Er der binding?',
        a: 'Nej. Opsætningen betales én gang. Abonnementet kan opsiges med løbende måned + 30 dage.',
      },
    ],
  },

  // ------------------------------------------------------------- final cta
  final: {
    eyebrow: 'Kom i gang',
    heading: 'Klar til at se, hvor din virksomhed har potentiale?',
    lead: 'Skriv webadressen og få jeres foreløbige resultat med det samme — eller book en samtale direkte.',
    primary: 'Få din gratis Growth Scan',
    secondary: 'Book en afklaring',
    reassure: 'Ingen binding. Ingen salgssekvens.',
  },

  // ----------------------------------------------------------------- footer
  footer: {
    description:
      'Growth Engine finder de steder, hvor I potentielt går glip af kunder i jeres digitale kunderejse — og hjælper med at prioritere og forbedre dem løbende.',
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
        'Book en gratis, uforpligtende afklaring med Aagesen Growth om jeres digitale kunderejse, og om Growth Engine giver mening for jer.',
      heading: 'Book en afklaring',
      lead: 'En direkte samtale om jeres forretning — ikke et salgsopkald. Gratis og uden forpligtelse.',
      agendaHeading: 'Det taler vi om',
      agenda: [
        'Jeres nuværende digitale kunderejse — hvor findes I, og hvordan konverterer sitet',
        'Hvor I potentielt går glip af kunder, og hvad der ville batte mest at rette først',
        'Om Growth Engine er relevant for jer lige nu',
        'Hvad et samarbejde konkret ville indebære',
      ],
      noneHeading: 'Det sker ikke',
      none: ['Ingen salgssekvens', 'Ingen automatiske opkald', 'Oplysningerne bruges kun til samtalen'],
      embedNote: 'Vælg et tidspunkt, der passer jer.',
      embedFallbackLink: 'Åbn kalenderen i nyt vindue',
      fallbackHeading: 'Kalenderbooking er på vej.',
      fallbackBody:
        'Skriv jeres oplysninger, så finder vi en tid sammen. I hører fra os inden for én arbejdsdag.',
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

  meta: {
    homeTitle: 'Growth Engine — flere kunder, færre tabte leads | Aagesen Growth',
    homeDescription:
      'Growth Engine finder de steder i jeres digitale kunderejse, hvor I potentielt går glip af kunder — og hjælper med at prioritere og forbedre dem løbende. Kør en gratis Growth Scan, eller book en afklaring.',
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
