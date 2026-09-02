import type { CaseCopy } from '@/i18n/types';

/**
 * Danish — the source dictionary.
 *
 * This file defines the shape. `Dictionary` is `typeof da`, so the English and
 * Swedish files are type-checked against it and a missing key is a build
 * error rather than a blank space on a live page.
 */
const da = {
  // ------------------------------------------------------------------ chrome
  nav: {
    work: 'Projekter',
    services: 'Ydelser',
    pricing: 'Priser',
    approach: 'Sådan arbejder vi',
    about: 'Om',
    faq: 'FAQ',
    contact: 'Kontakt',
  },

  header: {
    home: 'Aagesen Growth — til forsiden',
    menu: 'Menu',
    close: 'Luk',
    skip: 'Spring til indhold',
    language: 'Sprog',
    languageSwitch: 'Skift sprog',
  },

  cta: {
    startProject: 'Start et projekt',
    seeWork: 'Se vores arbejde',
    seePricing: 'Se priser',
    allPricing: 'Se alle priser',
    viewCase: 'Se hele casen',
    visitSite: 'Besøg websitet',
    talk: 'Tal med os om projektet',
    writeDirect: 'Skriv direkte',
    allQuestions: 'Se alle spørgsmål',
    back: 'Tilbage',
    backToWork: 'Tilbage til projekter',
  },

  // -------------------------------------------------------------------- hero
  hero: {
    eyebrow: 'Websites · SEO · GEO · Google Ads · Meta Ads',
    lines: ['Digital vækst.', 'Uden det store', 'bureau.'],
    lead: 'Websites, SEO, GEO og betalt annoncering til virksomheder, der vil have bedre digitale resultater — uden unødvendigt bureaukompleksitet.',
    primary: 'Start et projekt',
    secondary: 'Se vores arbejde',
    scroll: 'Rul',
    stack: {
      label: 'Udvalgt arbejde',
      desktopAlt: 'Forsiden af pluseins.dk vist i et browservindue.',
      mobileAlt: 'pluseins.dk vist på en telefon.',
    },
  },

  /** The line that runs under the hero. Short, factual, no adjectives. */
  ticker: [
    'Website-design & udvikling',
    'SEO',
    'GEO / AI-synlighed',
    'Google Ads',
    'Meta Ads',
    'Vækststrategi',
    'Analytics & tracking',
    'Løbende drift',
  ],

  // -------------------------------------------------------- services ledger
  ledger: {
    eyebrow: 'Ydelser & priser',
    heading: 'Otte discipliner. Fem prispunkter.',
    lead: 'Alt kan stå alene eller samles i ét fast samarbejde. Priserne herunder er startpriser — den endelige pris afhænger af omfang.',
    fromLabel: 'Fra',
    perMonth: '/ md.',
    oneOff: 'engangs',
    partOf: 'Del af Growth Partner',
    note: 'Alle priser er ekskl. moms. Annoncebudget, hosting og licenser afregnes separat.',
  },

  services: {
    websites: {
      name: 'Websites',
      line: 'Design og udvikling',
      body: 'Custom design og udvikling bygget omkring kunderejsen — ikke omkring en skabelon.',
    },
    seo: {
      name: 'SEO',
      line: 'Synlighed i Google',
      body: 'Teknisk fundament, indholdsstruktur og søgehensigt, så I bliver fundet af dem der leder.',
    },
    geo: {
      name: 'GEO',
      line: 'Synlighed i AI-søgning',
      body: 'Struktureret information, så I bliver forstået og citeret af ChatGPT, Perplexity og AI Overviews.',
    },
    googleAds: {
      name: 'Google Ads',
      line: 'Aktiv efterspørgsel',
      body: 'Kampagnestruktur, konverteringssporing og løbende optimering mod de søgninger der køber.',
    },
    metaAds: {
      name: 'Meta Ads',
      line: 'Efterspørgsel og retargeting',
      body: 'Målgrupper, kreativ test og retargeting på Facebook og Instagram.',
    },
    strategy: {
      name: 'Vækststrategi',
      line: 'Prioritering',
      body: 'Hvad der skal gøres først, hvorfor, og hvad det realistisk flytter.',
    },
    analytics: {
      name: 'Analytics',
      line: 'Tracking og måling',
      body: 'Et målesetup I kan træffe beslutninger på — samtykke, hændelser og rapportering.',
    },
    care: {
      name: 'Website-drift',
      line: 'Løbende pasning',
      body: 'Opdateringer, backup, sikkerhed, performance og de små rettelser, der ellers hober sig op.',
    },
  },

  // ---------------------------------------------------------------- websites
  websites: {
    eyebrow: 'Websites',
    lines: ['Vi bygger websites,', 'der ikke ligner', 'skabeloner.'],
    lead: 'Et website er ikke en brochure. Det er det sted, hvor folk beslutter, om de har lyst til at kontakte jer. Vi designer og bygger det selv — struktur, design, kode, måling og drift.',
    includesLabel: 'Et website-projekt kan indeholde',
    includes: [
      'Custom design',
      'Responsiv udvikling',
      'SEO-fundament',
      'GEO / AI-synlighed',
      'Analytics og tracking',
      'Konverteringsstruktur',
      'CMS hvor det giver mening',
      'Integrationer',
      'Løbende drift',
    ],
    priceLabel: 'Website-projekter fra',
    priceNote: 'Endelig pris afhænger af omfang, indhold og funktionalitet.',
    proofLabel: 'Det website, du læser lige nu',
    proofBody: 'er bygget af os. Samme stak, samme krav til hastighed, tilgængelighed og synlighed som det, vi bygger til kunder.',
    cta: 'Start et website-projekt',
  },

  // ------------------------------------------------------------ featured case
  featured: {
    eyebrow: 'Udvalgt projekt',
    kicker: 'Digital platform · website · synlighed',
    heading: 'Fra fysisk destination til digital brandoplevelse.',
    body: 'Plus Eins er boutique, salumeria og deli i Rørvig. Vi byggede det digitale fundament — website, struktur og synlighed — og har siden kørt den løbende marketing. Da Deli-konceptet kom til, kunne strukturen bære det uden at blive lavet om.',
    facts: [
      { label: 'Ét digitalt univers', body: 'Boutique, Salumeria og Deli under én sammenhængende identitet.' },
      { label: 'Mobile first', body: 'Designet til den del af kunderejsen, der reelt foregår på telefonen.' },
      { label: 'Search-ready', body: 'Teknisk struktur bygget til både Google og AI-baseret søgning.' },
      { label: 'Bygget til at vokse', body: 'Nye koncepter og kampagner kan komme til uden ombygning.' },
    ],
    ctaCase: 'Se hele casen',
    ctaSimilar: 'Start et lignende projekt',
    moreLabel: 'Flere projekter',
  },

  // ------------------------------------------------------------------ seo/geo
  searchVisibility: {
    eyebrow: 'SEO + GEO',
    lines: ['Søgning ændrer sig.', 'Jeres synlighed', 'bør gøre det samme.'],
    lead: 'Folk søger stadig i Google. Men flere og flere spørger en AI-assistent i stedet — og får ét svar med et par kilder, i stedet for ti blå links. Skal I være en af de kilder, skal jeres information kunne læses af begge dele.',
    seo: {
      title: 'SEO',
      body: 'Synlighed i søgeresultaterne.',
      points: [
        'Teknisk fundament og indeksering',
        'Indholdsstruktur og intern linkning',
        'Søgehensigt og indhold',
        'Lokal søgning og Google Business',
      ],
    },
    geo: {
      title: 'GEO',
      body: 'Synlighed i AI-genererede svar.',
      points: [
        'Struktureret data og schema',
        'Entydige, citerbare formuleringer',
        'Konsistens på tværs af kilder',
        'Overvågning af AI-svar',
      ],
    },
    measure: {
      title: 'Måling',
      body: 'Vi rapporterer på det, der kan efterprøves: placeringer, klik, henvendelser og hvornår I optræder som kilde. Ikke på synlighedsscorer, ingen kan kontrollere.',
    },
    priceLabel: 'SEO + GEO fra',
    cta: 'Få en synlighedsvurdering',
  },

  // ------------------------------------------------------------- paid growth
  paid: {
    eyebrow: 'Betalt vækst',
    lines: ['Annoncekroner', 'der kan gøres op.'],
    lead: 'Google Ads og Meta Ads drevet som et regnestykke, ikke som en kampagnekalender. Vi sætter op, måler, skærer fra og skalerer det, der virker.',
    points: [
      { label: 'Opsætning', body: 'Konto, kampagnestruktur og målgrupper bygget fra bunden — eller ryddet op i det, der er.' },
      { label: 'Drift', body: 'Løbende justering af budskaber, budgetter og målretning ud fra hvad der reelt konverterer.' },
      { label: 'Tracking', body: 'Konverteringssporing og samtykke sat rigtigt op, så tallene kan bruges til noget.' },
      { label: 'Rapportering', body: 'Hvad I brugte, hvad I fik, og hvad vi ændrer næste gang. På almindeligt dansk.' },
    ],
    priceLabel: 'Annoncedrift fra',
    adSpendNote: 'Annoncebudgettet betales direkte til Google og Meta og er ikke en del af honoraret.',
    cta: 'Tal om annoncering',
  },

  // ----------------------------------------------------------------- pricing
  pricing: {
    eyebrow: 'Priser',
    lines: ['Ingen skjulte', 'bureaupriser.'],
    lead: 'Startpriser, ikke lokkepriser. Den endelige pris afhænger af omfang — og den får I, før vi går i gang.',
    fromLabel: 'Fra',
    perMonth: 'pr. måned',
    oneOff: 'engangsbeløb',
    exVat: 'ekskl. moms',
    recommended: 'Mest valgt',
    includesLabel: 'Indeholder typisk',
    tiers: {
      websites: {
        name: 'Websites',
        tagline: 'Design og udvikling af nyt website',
        body: 'Til virksomheder der har brug for et website, som faktisk skaber henvendelser.',
        includes: [
          'Custom design og udvikling',
          'Responsivt på alle skærme',
          'SEO- og GEO-fundament',
          'Analytics og konverteringssporing',
          'Lancering og overdragelse',
        ],
      },
      searchVisibility: {
        name: 'SEO + GEO',
        tagline: 'Synlighed i Google og AI-søgning',
        body: 'Til virksomheder der vil findes af dem, der leder — uanset hvor de leder.',
        includes: [
          'Teknisk SEO og indholdsstruktur',
          'Søgehensigt og indholdsplan',
          'Struktureret data og schema',
          'AI-synlighed og kildeovervågning',
          'Månedlig rapportering',
        ],
      },
      paid: {
        name: 'Betalt vækst',
        tagline: 'Google Ads og Meta Ads',
        body: 'Til virksomheder der vil købe efterspørgsel og kunne se, hvad det koster at få en kunde.',
        includes: [
          'Opsætning og kampagnestruktur',
          'Løbende drift og optimering',
          'Kreativ og budskabstest',
          'Konverteringssporing',
          'Månedlig rapportering',
        ],
      },
      partner: {
        name: 'Growth Partner',
        tagline: 'Løbende digital partner',
        body: 'Til virksomheder der vil have én fast partner på hele det digitale — og en plan der bliver eksekveret.',
        includes: [
          'Løbende website-forbedringer',
          'SEO, GEO og indhold',
          'Annoncering efter behov',
          'Analytics og konverteringsarbejde',
          'Strategi og prioritering',
          'Fast kontakt og fast kadence',
        ],
      },
      care: {
        name: 'Website-drift',
        tagline: 'Pasning af et website vi har bygget',
        body: 'Til virksomheder der vil have websitet holdt opdateret, sikkert og hurtigt.',
        includes: [
          'Opdateringer og backup',
          'Sikkerhed og overvågning',
          'Performance-tjek',
          'Mindre indholdsrettelser',
        ],
      },
    },
    disclaimer: 'Alle priser er ekskl. moms og er startpriser. Annoncebudget, hosting, licenser, foto og eksterne omkostninger afregnes separat. Løbende aftaler kan opsiges med en måneds varsel.',
    cta: 'Få en pris på jeres opgave',
  },

  // ------------------------------------------------------------------ process
  process: {
    eyebrow: 'Sådan arbejder vi',
    heading: 'Fire trin. Ingen mellemled.',
    lead: 'I taler med den person, der udfører arbejdet. Hele vejen.',
    steps: [
      { label: 'Afklaring', body: 'Vi finder ud af, hvad problemet faktisk er, og hvad der er værd at gøre først. Gratis, og uden en salgstale forklædt som analyse.' },
      { label: 'Plan og pris', body: 'I får et konkret omfang og en fast pris, før arbejdet begynder. Ingen timer der løber.' },
      { label: 'Udførelse', body: 'Vi bygger. I ser det undervejs og kan justere, mens det stadig er billigt at justere.' },
      { label: 'Drift og vækst', body: 'Efter lancering måler vi, retter og forbedrer — eller I overtager selv. Begge dele er i orden.' },
    ],
  },

  // -------------------------------------------------------------------- about
  about: {
    eyebrow: 'Om Aagesen Growth',
    heading: 'Lille setup. Seniorarbejde.',
    body: [
      'Aagesen Growth er ikke et bureau med 50 ansatte, og vi lader som ingenting. Vi er et lille, moderne setup, hvor den der sælger opgaven, også er den der løser den.',
      'Det betyder kortere vej fra beslutning til udførelse, ingen account-lag mellem jer og arbejdet, og ingen overhead I betaler for uden at få noget for. Til gengæld tager vi ikke alting ind — vi siger nej til opgaver, vi ikke er de rigtige til.',
    ],
    points: [
      { label: 'Direkte adgang', body: 'I skriver til den, der bygger. Ikke til en projektkoordinator.' },
      { label: 'Fast omfang', body: 'I ved hvad der leveres, før vi går i gang.' },
      { label: 'Hurtig udførelse', body: 'Små beslutningsveje betyder, at ting bliver lavet i denne uge, ikke i næste kvartal.' },
    ],
    disclosure: 'Aagesen Growth ApS er en del af MOWE Systems ApS.',
  },

  // ---------------------------------------------------------------- final cta
  finalCta: {
    lines: ['Lad os finde ud af,', 'hvad der faktisk', 'flytter noget.'],
    lead: 'Fortæl kort, hvad der ikke virker i dag. Så fortæller vi, hvad vi ville prioritere først — også hvis svaret er, at I ikke har brug for os.',
    primary: 'Start et projekt',
    secondary: 'Skriv direkte',
    reassure: 'Ingen binding. Intet salgsopkald.',
  },

  // ------------------------------------------------------------------- footer
  footer: {
    description: 'Websites, synlighed og annoncering hos én ansvarlig partner — for virksomheder, der vil have det gjort ordentligt.',
    servicesHeading: 'Ydelser',
    companyHeading: 'Virksomhed',
    legalHeading: 'Juridisk',
    privacy: 'Privatlivspolitik',
    cookies: 'Cookiepolitik',
    cvr: 'CVR',
    rights: 'Alle rettigheder forbeholdes.',
    builtBy: 'Designet og bygget af Aagesen Growth.',
  },

  // -------------------------------------------------------------------- pages
  pages: {
    pricing: {
      title: 'Priser',
      description: 'Startpriser på websites, SEO + GEO, betalt annoncering, growth partner og website-drift. Ingen skjulte bureaupriser.',
      heading: 'Priser',
      lead: 'Startpriser for hver disciplin. Den endelige pris afhænger af omfang, og den får I skriftligt, før vi går i gang.',
    },
    work: {
      title: 'Projekter',
      description: 'Udvalgte projekter fra Aagesen Growth — websites, digitale platforme og løbende vækstsamarbejder.',
      heading: 'Projekter',
      lead: 'Udvalgt arbejde. Websites, digitale platforme og løbende samarbejder.',
      allLabel: 'Alle projekter',
      disciplinesLabel: 'Discipliner',
      deliveredLabel: 'Leveret',
      demonstratesLabel: 'Hvad det viser',
      challengeLabel: 'Udgangspunktet',
      periodLabel: 'Periode',
      nextLabel: 'Næste projekt',
      similarCta: 'Start et lignende projekt',
    },
    contact: {
      title: 'Kontakt',
      description: 'Skriv til Aagesen Growth om websites, SEO, GEO eller annoncering. I får et konkret svar — ikke en salgssekvens.',
      heading: 'Start et projekt',
      lead: 'Fortæl kort hvad I har brug for. I får et konkret svar fra den person, der ville lave arbejdet.',
      formHeading: 'Skriv til os',
      name: 'Navn',
      company: 'Virksomhed',
      email: 'E-mail',
      website: 'Website',
      help: 'Hvad handler det om?',
      helpPlaceholder: 'Vælg et område',
      helpOther: 'Ved ikke endnu / andet',
      message: 'Besked',
      messagePlaceholder: 'Hvad virker ikke i dag, og hvad kunne I tænke jer i stedet?',
      submit: 'Send henvendelse',
      sending: 'Sender…',
      successHeading: 'Tak — vi har den.',
      successBody: 'Vi vender tilbage hurtigst muligt, typisk inden for én arbejdsdag.',
      errorHeading: 'Det gik galt.',
      errorBody: 'Beskeden blev ikke sendt. Prøv igen, eller skriv direkte til os på e-mail.',
      required: 'påkrævet',
      optional: 'valgfri',
      errors: {
        name: 'Skriv dit navn',
        email: 'Skriv din e-mail, så vi kan svare',
        emailInvalid: 'E-mailadressen ser ikke rigtig ud',
        message: 'Skriv kort, hvad I gerne vil have hjælp til',
      },
      nextHeading: 'Hvad der sker nu',
      next: [
        'I får en kvittering på skærmen med det samme.',
        'Vi læser henvendelsen og kigger selv på jeres side, hvis I har oplyst den.',
        'I får et konkret svar — enten et par opklarende spørgsmål eller et forslag til en kort samtale.',
      ],
      noneHeading: 'Hvad der ikke sker',
      none: [
        'Ingen automatiske mailsekvenser',
        'Ingen opfølgende salgsopkald',
        'Oplysningerne bruges kun til at svare jer',
      ],
      directHeading: 'Eller direkte',
    },
    faq: {
      title: 'Ofte stillede spørgsmål',
      description: 'Svar på de spørgsmål vi oftest får om priser, tidsplan, websites, SEO, GEO og annoncering.',
      heading: 'Ofte stillede spørgsmål',
      lead: 'De spørgsmål vi oftest får. Mangler der et, så spørg.',
    },
    notFound: {
      title: 'Siden findes ikke',
      heading: '404',
      lead: 'Siden her findes ikke — eller den er flyttet. Prøv forsiden.',
      cta: 'Til forsiden',
    },
    legalNotice: '',
  },

  // -------------------------------------------------------------------- misc
  cookies: {
    heading: 'Cookies',
    body: 'Vi bruger nødvendige cookies for at siden fungerer. Med dit samtykke bruger vi også statistik- og marketingcookies. Du kan ændre dit valg når som helst.',
    accept: 'Accepter alle',
    reject: 'Afvis',
    customise: 'Tilpas',
    save: 'Gem valg',
    policy: 'Cookiepolitik',
    necessary: 'Nødvendige',
    necessaryBody: 'Kræves for at siden fungerer. Kan ikke fravælges.',
    statistics: 'Statistik',
    statisticsBody: 'Hjælper os med at forstå, hvordan siden bruges.',
    marketing: 'Marketing',
    marketingBody: 'Bruges til at måle og målrette annoncering.',
    always: 'Altid aktiv',
  },

  // --------------------------------------------------------------- work copy
  /**
   * Per-project copy. `media` keys match `mediaKey` in data/cases.ts — alt
   * text has to be in the language the page is read in.
   */
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

  // ---------------------------------------------------------------------- faq
  faq: [
    {
      q: 'Hvad koster en hjemmeside?',
      a: 'Website-projekter starter fra 12.500 kr. ekskl. moms. Prisen afhænger af omfang: antal sider, hvor meget indhold der skal produceres, om der skal CMS eller integrationer på, og hvor meget funktionalitet der skal bygges. I får en fast pris, før arbejdet går i gang.',
    },
    {
      q: 'Hvor lang tid tager et website?',
      a: 'Et typisk website tager to til seks uger fra opstart til lancering. Det, der oftest forlænger et projekt, er ikke udviklingen — det er indhold, billeder og feedbackrunder. Vi siger på forhånd, hvad vi har brug for fra jer og hvornår.',
    },
    {
      q: 'Hvad er forskellen på SEO og GEO?',
      a: 'SEO handler om at blive fundet i søgeresultaterne — teknisk fundament, indholdsstruktur og søgehensigt. GEO handler om at blive forstået og citeret i AI-genererede svar, for eksempel i ChatGPT, Perplexity eller Googles AI Overviews. De trækker på mange af de samme ting, men GEO stiller skarpere krav til struktureret data og til, at jeres information er entydig og konsistent på tværs af kilder.',
    },
    {
      q: 'Er annoncebudgettet inkluderet i prisen?',
      a: 'Nej. Honoraret dækker opsætning, drift, optimering og rapportering. Selve annoncebudgettet betaler I direkte til Google og Meta, så I har fuld indsigt i, hvad der bliver brugt.',
    },
    {
      q: 'Kan I forbedre vores nuværende website i stedet for at bygge et nyt?',
      a: 'Ofte, ja. Hvis fundamentet er sundt, er det som regel billigere og hurtigere at rette struktur, hastighed, indhold og konverteringspunkter end at starte forfra. Vi siger det ærligt, hvis vi mener, at et nyt website er det rigtige — og lige så ærligt, hvis det ikke er.',
    },
    {
      q: 'Binder vi os til en lang aftale?',
      a: 'Nej. Løbende aftaler kører måned for måned og kan opsiges med en måneds varsel. Et website-projekt er en engangsopgave med en fast pris.',
    },
    {
      q: 'Hvem laver arbejdet?',
      a: 'Den person, I taler med. Aagesen Growth er et lille setup — der er ikke et account-lag mellem jer og den, der bygger. Hvis en opgave kræver kompetencer, vi ikke har, siger vi det og henviser videre.',
    },
    {
      q: 'Hvad hvis vi allerede har et bureau?',
      a: 'Så er der som regel to muligheder: vi tager en afgrænset del, som de ikke dækker, eller vi kigger på tallene sammen med jer og siger, hvad vi ville gøre anderledes. Vi skal ikke bruge tid på at overbevise jer om at skifte, hvis det, I har, virker.',
    },
  ],

  meta: {
    homeTitle: 'Aagesen Growth — websites, SEO, GEO og betalt vækst',
    homeDescription: 'Websites, SEO, GEO og betalt annoncering til virksomheder, der vil have bedre digitale resultater uden unødvendigt bureaukompleksitet. Websites fra 12.500 kr.',
  },
};

export default da;
