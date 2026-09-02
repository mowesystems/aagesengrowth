import type { Dictionary } from '@/i18n/dictionary';

/** Swedish. Type-checked against the Danish source shape. */
const sv: Dictionary = {
  nav: {
    work: 'Projekt',
    services: 'Tjänster',
    pricing: 'Priser',
    approach: 'Så arbetar vi',
    about: 'Om',
    faq: 'FAQ',
    contact: 'Kontakt',
  },

  header: {
    home: 'Aagesen Growth — till startsidan',
    menu: 'Meny',
    close: 'Stäng',
    skip: 'Hoppa till innehåll',
    language: 'Språk',
    languageSwitch: 'Byt språk',
  },

  cta: {
    startProject: 'Starta ett projekt',
    seeWork: 'Se vårt arbete',
    seePricing: 'Se priser',
    allPricing: 'Se alla priser',
    viewCase: 'Se hela caset',
    visitSite: 'Besök webbplatsen',
    talk: 'Prata med oss om projektet',
    writeDirect: 'Mejla oss direkt',
    allQuestions: 'Se alla frågor',
    back: 'Tillbaka',
    backToWork: 'Tillbaka till projekt',
  },

  hero: {
    eyebrow: 'Webbplatser · SEO · GEO · Google Ads · Meta Ads',
    lines: ['Digital tillväxt.', 'Utan den stora', 'byrån.'],
    lead: 'Webbplatser, SEO, GEO och betald annonsering för företag som vill ha bättre digitala resultat — utan onödig byråkomplexitet.',
    primary: 'Starta ett projekt',
    secondary: 'Se vårt arbete',
    scroll: 'Skrolla',
    stack: {
      label: 'Utvalt arbete',
      desktopAlt: 'Startsidan på pluseins.dk visad i ett webbläsarfönster.',
      mobileAlt: 'pluseins.dk visad på en telefon.',
    },
  },

  ticker: [
    'Webbdesign & utveckling',
    'SEO',
    'GEO / AI-synlighet',
    'Google Ads',
    'Meta Ads',
    'Tillväxtstrategi',
    'Analys & mätning',
    'Löpande drift',
  ],

  ledger: {
    eyebrow: 'Tjänster & priser',
    heading: 'Åtta discipliner. Fem prispunkter.',
    lead: 'Allt kan stå för sig självt eller samlas i ett löpande samarbete. Priserna nedan är startpriser — slutpriset beror på omfattning.',
    fromLabel: 'Från',
    perMonth: '/ mån',
    oneOff: 'engångs',
    partOf: 'Del av Growth Partner',
    note: 'Alla priser är exkl. moms. Annonsbudget, hosting och licenser faktureras separat.',
  },

  services: {
    websites: {
      name: 'Webbplatser',
      line: 'Design och utveckling',
      body: 'Skräddarsydd design och utveckling byggd kring kundresan — inte kring en mall.',
    },
    seo: {
      name: 'SEO',
      line: 'Synlighet i Google',
      body: 'Teknisk grund, innehållsstruktur och sökintention, så att de som letar hittar er.',
    },
    geo: {
      name: 'GEO',
      line: 'Synlighet i AI-sök',
      body: 'Strukturerad information, så att ni förstås och citeras av ChatGPT, Perplexity och AI Overviews.',
    },
    googleAds: {
      name: 'Google Ads',
      line: 'Aktiv efterfrågan',
      body: 'Kampanjstruktur, konverteringsmätning och löpande optimering mot de sökningar som köper.',
    },
    metaAds: {
      name: 'Meta Ads',
      line: 'Efterfrågan och retargeting',
      body: 'Målgrupper, kreativa tester och retargeting på Facebook och Instagram.',
    },
    strategy: {
      name: 'Tillväxtstrategi',
      line: 'Prioritering',
      body: 'Vad som ska göras först, varför, och vad det realistiskt kan flytta.',
    },
    analytics: {
      name: 'Analys',
      line: 'Mätning och spårning',
      body: 'En mätuppsättning ni kan fatta beslut på — samtycke, händelser och rapportering.',
    },
    care: {
      name: 'Webbdrift',
      line: 'Löpande underhåll',
      body: 'Uppdateringar, backup, säkerhet, prestanda och de små fixarna som annars hopar sig.',
    },
  },

  websites: {
    eyebrow: 'Webbplatser',
    lines: ['Vi bygger webbplatser', 'som inte ser ut', 'som mallar.'],
    lead: 'En webbplats är ingen broschyr. Det är där människor bestämmer sig för om de vill höra av sig. Vi designar och bygger den själva — struktur, design, kod, mätning och drift.',
    includesLabel: 'Ett webbprojekt kan innehålla',
    includes: [
      'Skräddarsydd design',
      'Responsiv utveckling',
      'SEO-grund',
      'GEO / AI-synlighet',
      'Analys och mätning',
      'Konverteringsstruktur',
      'CMS där det är motiverat',
      'Integrationer',
      'Löpande drift',
    ],
    priceLabel: 'Webbprojekt från',
    priceNote: 'Slutpriset beror på omfattning, innehåll och funktionalitet.',
    proofLabel: 'Webbplatsen du läser just nu',
    proofBody: 'är byggd av oss. Samma stack och samma krav på hastighet, tillgänglighet och synlighet som det vi bygger åt kunder.',
    cta: 'Starta ett webbprojekt',
  },

  featured: {
    eyebrow: 'Utvalt projekt',
    kicker: 'Digital plattform · webbplats · synlighet',
    heading: 'Från fysisk destination till digital varumärkesupplevelse.',
    body: 'Plus Eins är boutique, salumeria och deli i Rørvig. Vi byggde den digitala grunden — webbplats, struktur och synlighet — och har sedan dess skött den löpande marknadsföringen. När Deli-konceptet kom till bar strukturen det utan att byggas om.',
    facts: [
      { label: 'Ett digitalt universum', body: 'Boutique, Salumeria och Deli under en sammanhållen identitet.' },
      { label: 'Mobile first', body: 'Designad för den del av kundresan som faktiskt sker i telefonen.' },
      { label: 'Search-ready', body: 'Teknisk struktur byggd för både Google och AI-baserad sökning.' },
      { label: 'Byggd för att växa', body: 'Nya koncept och kampanjer kan läggas till utan ombyggnad.' },
    ],
    ctaCase: 'Se hela caset',
    ctaSimilar: 'Starta ett liknande projekt',
    moreLabel: 'Fler projekt',
  },

  searchVisibility: {
    eyebrow: 'SEO + GEO',
    lines: ['Sökandet förändras.', 'Er synlighet', 'bör göra detsamma.'],
    lead: 'Folk söker fortfarande i Google. Men allt fler frågar en AI-assistent i stället — och får ett svar med ett par källor, i stället för tio blå länkar. Ska ni vara en av de källorna måste er information kunna läsas av båda.',
    seo: {
      title: 'SEO',
      body: 'Synlighet i sökresultaten.',
      points: [
        'Teknisk grund och indexering',
        'Innehållsstruktur och intern länkning',
        'Sökintention och innehåll',
        'Lokal sökning och Google Business',
      ],
    },
    geo: {
      title: 'GEO',
      body: 'Synlighet i AI-genererade svar.',
      points: [
        'Strukturerad data och schema',
        'Entydiga, citerbara formuleringar',
        'Konsekvens över källor',
        'Bevakning av AI-svar',
      ],
    },
    measure: {
      title: 'Mätning',
      body: 'Vi rapporterar på det som går att kontrollera: placeringar, klick, förfrågningar och när ni förekommer som källa. Inte på synlighetspoäng ingen kan verifiera.',
    },
    priceLabel: 'SEO + GEO från',
    cta: 'Få en synlighetsbedömning',
  },

  paid: {
    eyebrow: 'Betald tillväxt',
    lines: ['Annonskronor', 'som går att redovisa.'],
    lead: 'Google Ads och Meta Ads drivna som ett räknestycke, inte som en kampanjkalender. Vi sätter upp, mäter, skär bort och skalar det som fungerar.',
    points: [
      { label: 'Uppsättning', body: 'Konto, kampanjstruktur och målgrupper byggda från grunden — eller en upprensning av det som finns.' },
      { label: 'Drift', body: 'Löpande justering av budskap, budgetar och målgrupper utifrån vad som faktiskt konverterar.' },
      { label: 'Mätning', body: 'Konverteringsmätning och samtycke rätt uppsatt, så att siffrorna går att använda.' },
      { label: 'Rapportering', body: 'Vad ni la ut, vad ni fick, och vad vi ändrar härnäst. På vanlig svenska.' },
    ],
    priceLabel: 'Annonsdrift från',
    adSpendNote: 'Annonsbudgeten betalas direkt till Google och Meta och ingår inte i arvodet.',
    cta: 'Prata om annonsering',
  },

  pricing: {
    eyebrow: 'Priser',
    lines: ['Inga dolda', 'byråpriser.'],
    lead: 'Startpriser, inte lockpriser. Slutpriset beror på omfattning — och det får ni innan vi sätter igång.',
    fromLabel: 'Från',
    perMonth: 'per månad',
    oneOff: 'engångsbelopp',
    exVat: 'exkl. moms',
    recommended: 'Mest valda',
    includesLabel: 'Innehåller vanligtvis',
    tiers: {
      websites: {
        name: 'Webbplatser',
        tagline: 'Design och utveckling av ny webbplats',
        body: 'För företag som behöver en webbplats som faktiskt skapar förfrågningar.',
        includes: [
          'Skräddarsydd design och utveckling',
          'Responsiv på alla skärmar',
          'SEO- och GEO-grund',
          'Analys och konverteringsmätning',
          'Lansering och överlämning',
        ],
      },
      searchVisibility: {
        name: 'SEO + GEO',
        tagline: 'Synlighet i Google och AI-sök',
        body: 'För företag som vill hittas av dem som letar — oavsett var de letar.',
        includes: [
          'Teknisk SEO och innehållsstruktur',
          'Sökintention och innehållsplan',
          'Strukturerad data och schema',
          'AI-synlighet och källbevakning',
          'Månatlig rapportering',
        ],
      },
      paid: {
        name: 'Betald tillväxt',
        tagline: 'Google Ads och Meta Ads',
        body: 'För företag som vill köpa efterfrågan och se vad en kund faktiskt kostar.',
        includes: [
          'Uppsättning och kampanjstruktur',
          'Löpande drift och optimering',
          'Kreativa tester och budskapstester',
          'Konverteringsmätning',
          'Månatlig rapportering',
        ],
      },
      partner: {
        name: 'Growth Partner',
        tagline: 'Löpande digital partner',
        body: 'För företag som vill ha en fast partner för hela det digitala — och en plan som genomförs.',
        includes: [
          'Löpande förbättringar av webbplatsen',
          'SEO, GEO och innehåll',
          'Annonsering vid behov',
          'Analys och konverteringsarbete',
          'Strategi och prioritering',
          'Fast kontakt och fast kadens',
        ],
      },
      care: {
        name: 'Webbdrift',
        tagline: 'Skötsel av en webbplats vi byggt',
        body: 'För företag som vill hålla webbplatsen uppdaterad, säker och snabb.',
        includes: [
          'Uppdateringar och backup',
          'Säkerhet och övervakning',
          'Prestandakontroll',
          'Mindre innehållsändringar',
        ],
      },
    },
    disclaimer: 'Alla priser är exkl. moms och är startpriser. Annonsbudget, hosting, licenser, foto och externa kostnader faktureras separat. Löpande avtal kan sägas upp med en månads varsel.',
    cta: 'Få ett pris på er uppgift',
  },

  process: {
    eyebrow: 'Så arbetar vi',
    heading: 'Fyra steg. Inga mellanled.',
    lead: 'Ni pratar med den person som utför arbetet. Hela vägen.',
    steps: [
      { label: 'Klarhet', body: 'Vi tar reda på vad problemet faktiskt är och vad som är värt att göra först. Kostnadsfritt, och utan säljsnack förklätt till analys.' },
      { label: 'Plan och pris', body: 'Ni får en konkret omfattning och ett fast pris innan arbetet börjar. Inga timmar som skenar.' },
      { label: 'Genomförande', body: 'Vi bygger. Ni ser det längs vägen och kan justera medan det fortfarande är billigt att justera.' },
      { label: 'Drift och tillväxt', body: 'Efter lansering mäter, rättar och förbättrar vi — eller så tar ni över själva. Båda går bra.' },
    ],
  },

  about: {
    eyebrow: 'Om Aagesen Growth',
    heading: 'Litet setup. Seniort arbete.',
    body: [
      'Aagesen Growth är ingen byrå med 50 anställda, och vi låtsas inte vara det. Vi är ett litet, modernt setup där den som säljer uppdraget också är den som löser det.',
      'Det betyder kortare väg från beslut till genomförande, inget account-lager mellan er och arbetet, och ingen overhead ni betalar för utan att få något tillbaka. I gengäld tar vi inte in allt — vi säger nej till uppdrag vi inte är rätt personer för.',
    ],
    points: [
      { label: 'Direkt tillgång', body: 'Ni skriver till den som bygger. Inte till en projektkoordinator.' },
      { label: 'Fast omfattning', body: 'Ni vet vad som levereras innan vi börjar.' },
      { label: 'Snabbt genomförande', body: 'Korta beslutsvägar gör att saker blir gjorda den här veckan, inte nästa kvartal.' },
    ],
    disclosure: 'Aagesen Growth ApS är en del av MOWE Systems ApS.',
  },

  finalCta: {
    lines: ['Låt oss ta reda på', 'vad som faktiskt', 'flyttar något.'],
    lead: 'Berätta kort vad som inte fungerar i dag. Så berättar vi vad vi skulle prioritera först — även om svaret är att ni inte behöver oss.',
    primary: 'Starta ett projekt',
    secondary: 'Mejla oss direkt',
    reassure: 'Ingen bindning. Inget säljsamtal.',
  },

  footer: {
    description: 'Webbplatser, synlighet och annonsering hos en ansvarig partner — för företag som vill ha det gjort ordentligt.',
    servicesHeading: 'Tjänster',
    companyHeading: 'Företag',
    legalHeading: 'Juridik',
    privacy: 'Integritetspolicy',
    cookies: 'Cookiepolicy',
    cvr: 'Org.nr',
    rights: 'Alla rättigheter förbehållna.',
    builtBy: 'Designad och byggd av Aagesen Growth.',
  },

  pages: {
    pricing: {
      title: 'Priser',
      description: 'Startpriser för webbplatser, SEO + GEO, betald tillväxt, growth partner och webbdrift. Inga dolda byråpriser.',
      heading: 'Priser',
      lead: 'Startpriser för varje disciplin. Slutpriset beror på omfattning, och det får ni skriftligt innan vi börjar.',
    },
    work: {
      title: 'Projekt',
      description: 'Utvalda projekt från Aagesen Growth — webbplatser, digitala plattformar och löpande tillväxtsamarbeten.',
      heading: 'Projekt',
      lead: 'Utvalt arbete. Webbplatser, digitala plattformar och löpande samarbeten.',
      allLabel: 'Alla projekt',
      disciplinesLabel: 'Discipliner',
      deliveredLabel: 'Levererat',
      demonstratesLabel: 'Vad det visar',
      challengeLabel: 'Utgångspunkten',
      periodLabel: 'Period',
      nextLabel: 'Nästa projekt',
      similarCta: 'Starta ett liknande projekt',
    },
    contact: {
      title: 'Kontakt',
      description: 'Skriv till Aagesen Growth om webbplatser, SEO, GEO eller annonsering. Ni får ett konkret svar — inte en säljsekvens.',
      heading: 'Starta ett projekt',
      lead: 'Berätta kort vad ni behöver. Ni får ett konkret svar från den person som skulle göra arbetet.',
      formHeading: 'Skriv till oss',
      name: 'Namn',
      company: 'Företag',
      email: 'E-post',
      website: 'Webbplats',
      help: 'Vad gäller det?',
      helpPlaceholder: 'Välj ett område',
      helpOther: 'Vet inte än / annat',
      message: 'Meddelande',
      messagePlaceholder: 'Vad fungerar inte i dag, och vad skulle ni vilja ha i stället?',
      submit: 'Skicka förfrågan',
      sending: 'Skickar…',
      successHeading: 'Tack — vi har den.',
      successBody: 'Vi återkommer så snart vi kan, oftast inom en arbetsdag.',
      errorHeading: 'Något gick fel.',
      errorBody: 'Meddelandet skickades inte. Försök igen, eller mejla oss direkt.',
      required: 'obligatorisk',
      optional: 'valfri',
      errors: {
        name: 'Skriv ditt namn',
        email: 'Skriv din e-post så att vi kan svara',
        emailInvalid: 'E-postadressen ser inte rätt ut',
        message: 'Beskriv kort vad ni vill ha hjälp med',
      },
      nextHeading: 'Vad som händer nu',
      next: [
        'Ni får en bekräftelse på skärmen direkt.',
        'Vi läser förfrågan och tittar själva på er sida, om ni angett den.',
        'Ni får ett konkret svar — antingen ett par klargörande frågor eller ett förslag på ett kort samtal.',
      ],
      noneHeading: 'Vad som inte händer',
      none: [
        'Inga automatiska mejlsekvenser',
        'Inga uppföljande säljsamtal',
        'Uppgifterna används bara för att svara er',
      ],
      directHeading: 'Eller direkt',
    },
    faq: {
      title: 'Vanliga frågor',
      description: 'Svar på de frågor vi oftast får om priser, tidsplan, webbplatser, SEO, GEO och annonsering.',
      heading: 'Vanliga frågor',
      lead: 'De frågor vi oftast får. Saknas någon, fråga.',
    },
    notFound: {
      title: 'Sidan finns inte',
      heading: '404',
      lead: 'Den här sidan finns inte — eller så har den flyttat. Prova startsidan.',
      cta: 'Till startsidan',
    },
    legalNotice:
      'Vår integritets- och cookiepolicy publiceras på danska, som är den juridiskt gällande versionen.',
  },

  cookies: {
    heading: 'Cookies',
    body: 'Vi använder nödvändiga cookies för att sidan ska fungera. Med ditt samtycke använder vi även statistik- och marknadsföringscookies. Du kan ändra ditt val när som helst.',
    accept: 'Acceptera alla',
    reject: 'Avvisa',
    customise: 'Anpassa',
    save: 'Spara val',
    policy: 'Cookiepolicy',
    necessary: 'Nödvändiga',
    necessaryBody: 'Krävs för att sidan ska fungera. Kan inte väljas bort.',
    statistics: 'Statistik',
    statisticsBody: 'Hjälper oss förstå hur sidan används.',
    marketing: 'Marknadsföring',
    marketingBody: 'Används för att mäta och rikta annonsering.',
    always: 'Alltid aktiv',
  },

  work: {
    cases: {
      'plus-eins': {
        kind: 'Boutique · Salumeria · Deli · Rørvig',
        disciplines: ['Webbplats', 'SEO', 'GEO', 'Meta Ads', 'Strategi'],
        summary:
          'En digital grund för en fysisk boutique som skulle vara lika tydlig online som i butiken.',
        strapline: 'Från fysiskt koncept till sammanhållet digitalt varumärke.',
        challenge:
          'Plus Eins hade en stark fysisk identitet, men den digitala närvaron berättade inte samma historia. Det saknades ett ställe där varumärket, sortimentet och butikens tonläge hängde ihop — och en grund som kunde bära den fortsatta utvecklingen.',
        sections: [
          {
            heading: 'Angreppssätt',
            body: 'Arbetet började med strukturen snarare än designen. Vad ska en besökare kunna ta reda på, och i vilken ordning? Först därefter lades det visuella ovanpå, så att designen stödjer innehållet i stället för att konkurrera med det.',
          },
          {
            heading: 'Det vi byggde',
            body: 'En webbplats som samlar varumärket, sortimentet och butikens praktiska uppgifter på ett ställe. Sidstrukturen är gjord så att nya kategorier och koncept kan tillkomma utan att strukturen behöver göras om — vilket blev avgörande när Deli-konceptet kom till.',
          },
          {
            heading: 'Löpande arbete',
            body: 'Samarbetet har fortsatt efter lansering med innehåll, visuell kommunikation, sociala medier och den löpande marknadsföringsriktningen. Prioriteringen justeras efter vad butiken behöver under den aktuella perioden.',
          },
        ],
        delivered: [
          'Webbplats med utbyggbar struktur',
          'Digital varumärkesriktning',
          'Innehåll och visuell kommunikation',
          'Sociala medier och kampanjer',
          'SEO och GEO',
          'Förberedelse för webbshop',
        ],
        demonstrates:
          'Att en webbplats måste byggas för det som kommer efteråt. Strukturen höll när ett helt nytt koncept skulle in.',
        proofLine: 'Webbplats · varumärkessystem · löpande tillväxtsamarbete',
        period: 'Löpande samarbete',
        disclosure: '',
        media: {
          desktop: {
            alt: 'Startsidan på pluseins.dk på desktop med den helbreda hero-bilden från innergården.',
            caption: '',
          },
          mobile: {
            alt: 'Startsidan på pluseins.dk på mobil med navigation och hero-bild.',
            caption: '',
          },
          photoBoutique: {
            alt: 'Plus Eins boutique utifrån med parasoller, regissörsstolar och korgar på terrassen.',
            caption: 'Boutique',
          },
          photoSalumeria: {
            alt: 'Salumeria-disken hos Plus Eins med korv, ostar och delikatesser.',
            caption: 'Salumeria',
          },
          photoExterior: {
            alt: 'Plus Eins-byggnaden i Rørvig sedd utifrån i kvällsljus med ljus i fönstren.',
            caption: 'Butiken',
          },
          screenBoutique: {
            alt: 'Boutique-sidan på pluseins.dk med redaktionell placering av bild och text.',
            caption: 'Boutique',
          },
          screenSalumeria: {
            alt: 'Salumeria-sidan på pluseins.dk med samma sidmall som övriga koncept.',
            caption: 'Salumeria',
          },
        },
      },
      'plus-eins-deli': {
        kind: 'Konceptlansering',
        disciplines: ['Konceptlansering', 'Innehåll', 'Meta Ads'],
        summary:
          'Lanseringen av ett nytt deli-koncept under ett befintligt varumärke — utan att späda ut det varumärke det växte ur.',
        strapline: 'Ett nytt koncept inuti ett etablerat varumärke.',
        challenge:
          'Deli-konceptet skulle introduceras som något nytt och självständigt, men fortfarande tydligt höra till Plus Eins. För mycket åtskillnad och det skulle kännas som en främmande verksamhet. För lite och det skulle försvinna i det befintliga.',
        sections: [
          {
            heading: 'Angreppssätt',
            body: 'Konceptet behandlades som en utvidgning av varumärket, inte som ett sidospår. Samma visuella grundton, men ett eget spår i strukturen, så att Deli kan kommuniceras självständigt utan att bryta helheten.',
          },
          {
            heading: 'Lanseringen',
            body: 'Själva introduktionen kördes digitalt genom webbplats, innehåll och sociala medier med en samlad riktning i stället för spridda inlägg. Den digitala grunden var på plats innan kommunikationen gick ut — inte tvärtom.',
          },
        ],
        delivered: [
          'Digital lansering av konceptet',
          'Innehåll och visuell kommunikation',
          'Integration i den befintliga sidstrukturen',
          'Kampanjer och löpande synlighet',
        ],
        demonstrates:
          'Att en lansering är ett struktur- och timingproblem lika mycket som ett designproblem.',
        proofLine: 'Konceptsida · lanseringsinnehåll · kampanjer',
        period: 'Löpande samarbete',
        disclosure: 'Del av det löpande samarbetet med Plus Eins.',
        media: {
          desktop: {
            alt: 'Deli-sidan på pluseins.dk med rubriken Deli bredvid en stor bild på en focaccia.',
            caption: '',
          },
          mobile: { alt: 'Deli-sidan på pluseins.dk visad på mobil.', caption: '' },
          photoDeli: {
            alt: 'Focaccia med prosciutto di Parma, tomat och ruccola från Plus Eins Deli.',
            caption: 'Deli',
          },
        },
      },
      'mowe-systems': {
        kind: 'SaaS · AI-synlighet',
        disciplines: ['Varumärke', 'Produkt', 'Webbplats', 'SEO', 'GEO'],
        summary:
          'Från komplex mjukvaruidé till en produkt man förstår på trettio sekunder — och en plattform som kan växa.',
        strapline: 'En ny kategori, förklarad på trettio sekunder.',
        challenge:
          'MOWE Systems är en AI visibility-plattform. Den typen av produkt är svår att sälja eftersom kategorin är ny: folk måste först förstå att problemet finns innan de kan se värdet av lösningen. Teknisk komplexitet skulle förmedlas utan att bli otillgänglig.',
        sections: [
          {
            heading: 'Positionering först',
            body: 'Innan en rad kod skrevs till webbplatsen klargjordes vad produkten är, vem den är för och vilket problem den löser, på ett språk en beslutsfattare kan använda. Positioneringen blev grunden för både produktstruktur och kommunikation.',
          },
          {
            heading: 'Produkt och webbplats som ett',
            body: 'Webbplatsen och produktens egen struktur utvecklades i samspel, så att sättet produkten förklaras på matchar sättet den faktiskt fungerar på. Det gör både onboarding och försäljning enklare, eftersom det inte finns något glapp mellan löfte och verklighet.',
          },
          {
            heading: 'Synlighet i en ny kategori',
            body: 'SEO och GEO byggdes in från start. När kategorin är ny finns få etablerade sökningar att slåss om — men det finns en reell möjlighet att bli den källa som både sökmotorer och AI-assistenter hämtar från.',
          },
        ],
        delivered: [
          'Varumärke och positionering',
          'Webbplats och produktkommunikation',
          'Produktarkitektur och konverteringsstruktur',
          'SEO- och GEO-strategi',
          'Teknisk grund för plattformen',
        ],
        demonstrates:
          'Att tekniskt djup och enkel kommunikation inte är motsatser. Det svåra är att göra det komplexa begripligt utan att göra det fel.',
        proofLine: 'Positionering · produktarkitektur · webbplats · synlighet',
        period: '',
        disclosure:
          'MOWE Systems är skapat och utvecklat av samma person som står bakom Aagesen Growth.',
        media: {
          desktop: {
            alt: 'Startsidan på mowesystems.com med rubriken Get Found Before Your Competitors och analysformuläret.',
            caption: '',
          },
          mobile: { alt: 'Startsidan på mowesystems.com visad på mobil.', caption: '' },
          screenProduct: {
            alt: 'Produktsektionen på mowesystems.com som ställer synlighet före och efter mot varandra.',
            caption: 'Före och efter',
          },
          screenSteps: {
            alt: 'Sektionen på mowesystems.com som förklarar produkten i tre steg.',
            caption: 'Produkten i tre steg',
          },
        },
      },
    },
  },

  faq: [
    {
      q: 'Vad kostar en webbplats?',
      a: 'Webbprojekt startar från 12 500 kr exkl. moms. Priset beror på omfattning: antal sidor, hur mycket innehåll som ska produceras, om CMS eller integrationer behövs, och hur mycket funktionalitet som ska byggas. Ni får ett fast pris innan arbetet börjar.',
    },
    {
      q: 'Hur lång tid tar en webbplats?',
      a: 'En typisk webbplats tar två till sex veckor från start till lansering. Det som oftast drar ut på tiden är inte utvecklingen — det är innehåll, bilder och feedbackrundor. Vi säger i förväg vad vi behöver från er och när.',
    },
    {
      q: 'Vad är skillnaden mellan SEO och GEO?',
      a: 'SEO handlar om att hittas i sökresultaten — teknisk grund, innehållsstruktur och sökintention. GEO handlar om att förstås och citeras i AI-genererade svar, till exempel i ChatGPT, Perplexity eller Googles AI Overviews. De bygger på mycket av samma saker, men GEO ställer skarpare krav på strukturerad data och på att er information är entydig och konsekvent över källor.',
    },
    {
      q: 'Ingår annonsbudgeten i priset?',
      a: 'Nej. Arvodet täcker uppsättning, drift, optimering och rapportering. Själva annonsbudgeten betalar ni direkt till Google och Meta, så att ni har full insyn i vad som förbrukas.',
    },
    {
      q: 'Kan ni förbättra vår nuvarande webbplats i stället för att bygga en ny?',
      a: 'Ofta, ja. Om grunden är sund är det oftast billigare och snabbare att rätta struktur, hastighet, innehåll och konverteringspunkter än att börja om. Vi säger ärligt om vi tycker att en ny webbplats är rätt — och lika ärligt om den inte är det.',
    },
    {
      q: 'Binder vi upp oss på ett långt avtal?',
      a: 'Nej. Löpande avtal går månad för månad och kan sägas upp med en månads varsel. Ett webbprojekt är en engångsuppgift till ett fast pris.',
    },
    {
      q: 'Vem gör arbetet?',
      a: 'Den person ni pratar med. Aagesen Growth är ett litet setup — det finns inget account-lager mellan er och den som bygger. Om en uppgift kräver kompetenser vi inte har säger vi det och hänvisar vidare.',
    },
    {
      q: 'Vad om vi redan har en byrå?',
      a: 'Då finns oftast två alternativ: vi tar en avgränsad del som de inte täcker, eller så tittar vi på siffrorna tillsammans med er och säger vad vi skulle göra annorlunda. Vi ska inte lägga er tid på att övertyga er om att byta om det ni har fungerar.',
    },
  ],

  meta: {
    homeTitle: 'Aagesen Growth — webbplatser, SEO, GEO och betald tillväxt',
    homeDescription:
      'Webbplatser, SEO, GEO och betald annonsering för företag som vill ha bättre digitala resultat utan onödig byråkomplexitet. Webbplatser från 12 500 kr.',
  },
};

export default sv;
