// Eine Quelle der Wahrheit für alle Inhalte.
// Fakten-Regel: Alles stammt von der bisherigen Website funkelfilm.com (Stand 01.11.2026).
// Nichts erfunden. Fehlendes ist als Platzhalter markiert und in OFFENE-INFOS.md gesammelt.

/** Vorschau-Schalter: noindex, Vorschau-Banner und sichtbare Platzhalter. Beim Livegang VORSCHAU=false. */
export const VORSCHAU = process.env.VORSCHAU !== 'false';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Pfad mit Base-Präfix (GitHub-Pages-Vorschau liegt unter /funkelfilm). */
export const u = (pfad: string) => `${BASE}${pfad.startsWith('/') ? pfad : '/' + pfad}`;

export const NAME = 'Funkelfilm';
export const INHABER = 'Sheeras Iqbal';
export const VORNAME = 'Sheeras';
export const ORT = 'Hamburg';
export const MAIL = 'kontakt@funkelfilm.com';
/** Feste Unterzeile zum Logo, zweizeilig; als Logo-Bestandteil mit Funkelfilm abstimmen (OFFENE-INFOS 5).
 *  Jamil 4321 wollte „Echte Geschichten. / Aus Hamburg erzählt.“, aber keine Doppelung mit der H1 („nein keine Dopplung“).
 *  Jamil 4330 hat Variante A gewählt. Umstellen = EINE Zeile: VARIANTE (unten); og.png danach neu erzeugen.
 *  A: Logo „Echte Geschichten.“ (einzeilig, Jamil 4345) + H1 „Authentische Filme. / Eindrucksvoll erzählt.“ (aktiv)
 *  B: Logo „Unternehmensfilme / aus Hamburg“ + H1 „Echte Geschichten. / Eindrucksvoll erzählt.“ */
export const LOGO_UNTERZEILEN = {
  a: ['Echte Geschichten.'] as string[], // Jamil 4345: „aus Hamburg erzählt entfernen“ → einzeilig
  b: ['Unternehmensfilme', 'aus Hamburg'] as string[],
};
export const HERO_TITEL = {
  a: { vor: 'Authentische ', wort: 'Filme', nach: '.', zeile2: 'Eindrucksvoll erzählt.' },
  b: { vor: 'Echte ', wort: 'Geschichten', nach: '.', zeile2: 'Eindrucksvoll erzählt.' },
};
export const VARIANTE: 'a' | 'b' = 'a'; // Jamil 4330: Variante A gewählt
export const LOGO_UNTERZEILE = LOGO_UNTERZEILEN[VARIANTE];
export const CLAIM = 'Echte Geschichten. Authentische Videos.';
export const UNTERZEILE = 'Teile deine Botschaft in bewegten Bildern – ehrlich & kreativ.';
export const BESCHREIBUNG =
  'Funkelfilm aus Hamburg: Imagefilme, Kundenstimmen, Recruitingvideos und Eventfilme. Seit 2017 erzählt Sheeras Iqbal Geschichten in bewegten Bildern – ehrlich, kreativ und hochwertig.';

/** Impressumsangaben der bisherigen Seite (funkelfilm.com/impressum). Vor Livegang vom Kunden bestätigen lassen. */
export const IMPRESSUM = {
  name: 'Sheeras Iqbal',
  firma: 'Funkelfilm',
  strasse: 'Fibigerstr. 277a',
  plzOrt: '22419 Hamburg',
  land: 'Deutschland',
  telefon: '+49 151 70812393',
  ustId: 'DE357550501',
};

/** Anruf- und WhatsApp-Knöpfe (Jamil Talk 4244). Nummer = die aus dem Impressum der bisherigen Seite (Jamil 4247: „Ja“, dieselbe).
 *  Ändern = EINE Zeile, z. B. TELEFON = '+49 40 1234567'. Leer = Vorschau zeigt „Nummer folgt“ ohne Link, live ausgeblendet. */
export const TELEFON = IMPRESSUM.telefon;
/** WhatsApp-Nummer – standardmäßig dieselbe wie TELEFON; nur ändern, wenn WhatsApp über eine andere Nummer läuft. */
export const WHATSAPP = TELEFON;
const nurZiffern = (n: string) => n.replace(/[^\d+]/g, '').replace(/^00/, '+').replace(/^0/, '+49');
export const TELEFON_LINK = TELEFON ? `tel:${nurZiffern(TELEFON)}` : '';
export const WHATSAPP_LINK = WHATSAPP ? `https://wa.me/${nurZiffern(WHATSAPP).replace(/^\+/, '')}` : '';


export const SOZIAL = [
  { name: 'Instagram', href: 'https://www.instagram.com/funkelfilm/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@funkelfilm3834/videos' },
  { name: 'Facebook', href: 'https://www.facebook.com/funkelfilm/' },
];

export const NAV = [
  { titel: 'Leistungen', href: '/services/' },
  { titel: 'Projekte', href: '/erfolgsgeschichten/' },
  { titel: 'Über mich', href: '/about/' },
  { titel: 'Kontakt', href: '/kontakt/' },
];

/** Vertrauensband – nur belegte Aussagen der bisherigen Seite. */
export const BAND = [
  { wert: 'Seit 2017', text: 'Imagefilme für Menschen und Unternehmen' },
  { wert: 'Über 100', text: 'Projekte (Stand 2024)' },
  { wert: 'Echt', text: 'Videos, die deine Botschaft nahbar vermitteln' },
  { wert: 'Einfach', text: 'Unkomplizierte Abläufe, du konzentrierst dich aufs Wesentliche' },
];

export type Clip = { datei: string; poster: string; breite: number; hoehe: number };
const clip = (name: string, breite = 800, hoehe = 450): Clip => ({
  datei: `/medien/clips/${name}.mp4`,
  poster: `/medien/clips/${name}.webp`,
  breite,
  hoehe,
});

export type Leistung = {
  slug: string;
  titel: string;
  kurz: string;
  ueberschrift: string;
  text: string[];
  seitenH1: string;
  seitenIntro: string;
  warum: string;
  vorteile: { titel: string; text: string }[];
  knopf: string;
  clip: Clip;
};

export const LEISTUNGEN: Leistung[] = [
  {
    slug: 'imagefilme',
    titel: 'Imagefilm',
    kurz: 'Zeige, was dein Unternehmen besonders macht – authentisch und auf den Punkt.',
    ueberschrift: 'Imagefilme, die Vertrauen schaffen',
    text: [
      'Du möchtest zeigen, wofür dein Unternehmen steht? Dann lass uns gemeinsam einen Film machen, der das rüberbringt – klar, emotional und ohne große Show.',
      'Ein guter Imagefilm verkauft nicht durch Effekte, sondern durch Ehrlichkeit.',
    ],
    seitenH1: 'Dein Unternehmen im besten Licht – mit einem professionellen Imagefilm.',
    seitenIntro: 'Mach deine Marke sichtbar und wecke Emotionen, die in Erinnerung bleiben.',
    warum:
      'Ein Imagefilm ist mehr als ein Video – er ist dein stärkstes Aushängeschild, das Emotionen weckt, Vertrauen aufbaut und deine Marke unvergesslich macht.',
    vorteile: [
      { titel: 'Mehr Sichtbarkeit', text: 'Präsentiere dein Unternehmen eindrucksvoll auf Website, Social Media & Co.' },
      { titel: 'Stärkere Kundenbindung', text: 'Erzeuge Vertrauen durch authentische Einblicke und emotionale Storys.' },
      { titel: 'Mehr Anfragen', text: 'Überzeuge Interessenten schneller und mache dein Angebot greifbar.' },
    ],
    knopf: 'Imagefilm planen',
    clip: clip('unternehmen'),
  },
  {
    slug: 'erfahrungsberichte',
    titel: 'Kundenstimmen',
    kurz: 'Lass deine Kunden zu Wort kommen und Vertrauen schaffen.',
    ueberschrift: 'Kundenstimmen, die überzeugen',
    text: [
      'Nichts wirkt glaubwürdiger als echte Menschen, die von ihren Erfahrungen erzählen.',
      'In einem Testimonial-Video bringe ich genau das rüber – ohne Skript, ohne Kitsch, aber mit viel Gefühl.',
    ],
    seitenH1: 'Echte Geschichten, echte Emotionen – mit professionellen Testimonials.',
    seitenIntro: 'Lass deine Kunden für dich sprechen und zeige die Wirkung deiner Produkte und Dienstleistungen.',
    warum:
      'Testimonials sind der Schlüssel, um Vertrauen zu gewinnen. Sie verbinden emotionale Geschichten mit authentischen Erfahrungen und schaffen eine direkte Verbindung zu deiner Zielgruppe.',
    vorteile: [
      { titel: 'Echte Kundenstimmen', text: 'Authentizität, die Vertrauen schafft.' },
      { titel: 'Emotionen wecken', text: 'Geschichten, die begeistern und im Gedächtnis bleiben.' },
      { titel: 'Flexibler Einsatz', text: 'Ideal für Websites, Social Media und Verkaufsseiten.' },
    ],
    knopf: 'Testimonial anfragen',
    clip: clip('kundenstimmen'),
  },
  {
    slug: 'recruitingfilm',
    titel: 'Recruitingvideo',
    kurz: 'Sprich potenzielle Mitarbeiter direkt an und zeige, warum dein Team besonders ist.',
    ueberschrift: 'Recruitingvideos, die Menschen gewinnen',
    text: [
      'Zeig, wie dein Team wirklich tickt – mit einem Video, das mehr vermittelt als nur freie Stellen.',
      'Ein guter Recruitingfilm spricht nicht nur Bewerber an, sondern auch Herzen.',
    ],
    seitenH1: 'Attraktive Einblicke – mit einem professionellen Recruitingfilm.',
    seitenIntro:
      'Mit einem Film, der nicht nur deine Unternehmenskultur zeigt, sondern auch die besten Talente für dich gewinnt.',
    warum:
      'Recruitingfilme begeistern Talente und bringen sie in dein Team. Sie zeigen deine Unternehmenskultur und wecken das Interesse von Fachkräften, die wirklich zu dir passen.',
    vorteile: [
      { titel: 'Unternehmenskultur im Fokus', text: 'Zeig, was dein Unternehmen besonders macht – Werte, Visionen und Teamgeist.' },
      { titel: 'Talente gewinnen', text: 'Begeistere qualifizierte Bewerber und motiviere sie, Teil deines Teams zu werden.' },
      { titel: 'Gezielte Ansprache', text: 'Für Jobportale, Karriereseiten und Social Media – dort, wo Talente suchen.' },
    ],
    knopf: 'Recruitingfilm planen',
    clip: clip('recruiting', 640, 360),
  },
  {
    slug: 'veranstaltungsfilm',
    titel: 'Eventfilm',
    kurz: 'Halte besondere Momente fest und teile sie mit deinem Publikum.',
    ueberschrift: 'Eventfilme, die Erinnerungen lebendig halten',
    text: [
      'Ob Messe, Feier oder Workshop – ich halte die besonderen Momente deines Events fest.',
      'Nicht nur als Rückblick, sondern als Geschichte, die auch danach noch begeistert.',
    ],
    seitenH1: 'Erinnerungen, die bleiben – mit einem professionellen Veranstaltungsfilm.',
    seitenIntro:
      'Fange die unvergesslichen Momente deines Events ein und mach sie erlebbar – für Teilnehmer, Partner und zukünftige Events.',
    warum:
      'Veranstaltungsfilme machen dein Event unvergesslich – sie halten die besten Momente fest und zeigen die Highlights so, dass sie Emotionen wecken.',
    vorteile: [
      { titel: 'Erinnerungen, die bleiben', text: 'Deine Veranstaltung bleibt lebendig – für Teilnehmer und Partner.' },
      { titel: 'Mehr Reichweite', text: 'Für Social Media, Marketing und die Werbung für dein nächstes Event.' },
      { titel: 'Emotionen und Highlights', text: 'Besondere Momente eindrucksvoll in Szene gesetzt.' },
    ],
    knopf: 'Eventfilm anfragen',
    clip: clip('event'),
  },
];

/** Die Vorgehensweise (gleich auf allen Leistungsseiten der bisherigen Seite). Kurzfassung für die Zeitleiste, Langfassung auf Abruf. */
export const ABLAUF = [
  {
    titel: 'Beratung',
    kurz: 'Deine Vision verstehen',
    lang: 'Gemeinsam erarbeiten wir, was deine Marke einzigartig macht. Ich höre zu, stelle die richtigen Fragen und entwickle ein Verständnis für deine Ziele und Botschaften.',
  },
  {
    titel: 'Konzept',
    kurz: 'Kreative Planung',
    lang: 'Ein maßgeschneidertes Konzept, das Storytelling, Emotionen und visuelle Highlights vereint. Wir planen jeden Schritt, damit dein Film Eindruck macht.',
  },
  {
    titel: 'Dreh',
    kurz: 'Professionelle Videoproduktion',
    lang: 'Action! Mit moderner Technik und jahrelanger Erfahrung fangen wir die besten Bilder ein – immer mit einem Auge für Details und Ästhetik.',
  },
  {
    titel: 'Postproduktion',
    kurz: 'Schnitt, Farbe, Ton',
    lang: 'Jetzt kommt der Feinschliff: Schnitt, Farbkorrektur, Sounddesign und Effekte. Alles wird so abgestimmt, dass dein Film seine volle Wirkung entfaltet.',
  },
  {
    titel: 'Veröffentlichung',
    kurz: 'Bereit für deine Kanäle',
    lang: 'Dein Funkelfilm wird passend für Website, Social Media oder Präsentationen ausgespielt. Ich begleite dich bei der Veröffentlichung.',
  },
];

/** Projekte: nur Filme, die auf der bisherigen Seite eingebunden sind und auf YouTube abrufbar waren (Prüfung 01.11.2026). */
export const PROJEKTE = [
  {
    titel: 'Die Goldmalerin',
    art: 'Imagefilm',
    youtube: 'WExx2qd8Uc0',
    bild: 'film-goldmalerin',
    bildBreiten: [800],
  },
  {
    titel: 'Nexus Fighter Academy – Nexus Kids',
    art: 'Eindrücke',
    youtube: 'sX3z4bte2JM',
    bild: 'film-nexus-kids',
    bildBreiten: [640, 1100],
  },
];

/** Kundenstimmen – wörtlich von funkelfilm.com/erfolgsgeschichten (Schreibweise unverändert). */
export const STIMMEN = [
  {
    text: 'Es freut mich sehr, Funkelfilm uneingeschränkt zu empfehlen. Sheeras überzeugte durch beeindruckende Kreativität und Professionalität in der Videoproduktion. Von der Ideenfindung bis zur finalen Bearbeitung zeigte er Präzision und ein tiefes Verständnis für emotionale Verbindungen in visuellen Geschichten. Flexibilität, technische Kompetenz und eine strukturierte Vorgehensweise zeichnen Funkelfilm aus. Die Endqualität des produzierten Videos hat meine Erwartungen übertroffen.',
    kurz: 'Die Endqualität des produzierten Videos hat meine Erwartungen übertroffen.',
    name: 'Jamil Ahmed',
    firma: 'Way2Buy',
  },
  {
    text: 'Ich rate jedem, Funkelfilm in Erwägung zu ziehen und das Projekt zu besprechen. Wir konnten über etwas mehr als 2 Jahre über 200 Videos produzieren, und das verdanken wir Sheeras!',
    kurz: 'Wir konnten über etwas mehr als 2 Jahre über 200 Videos produzieren, und das verdanken wir Sheeras!',
    name: 'Jonas Syed',
    firma: 'Nemere Group',
  },
  {
    text: 'Mit Sheeras haben wir diverse Imagefilm-Projekte umgesetzt. Er kann individuelle Kundenwünsche erfüllen und schafft mit seinem professionellen Know-How Videos, die zugleich kunstvoll als auch aussagekräftig sind!',
    kurz: '… Videos, die zugleich kunstvoll als auch aussagekräftig sind!',
    name: 'Jasmin Eikmeier',
    firma: 'Alstermühle',
  },
  {
    text: 'Wir arbeiten nun schon lange mit Sheeras Iqbal zusammen. Herr Igbal versteht sein Handwerk sehr gut und die Zusammenarbeit ist immer ein Vergnügen, sowohl geschäftlich als auch menschlich. Wir empfehlen Ihn jedem Unternehmen, das auf der Suche nach einem Videografen ist, welcher Professionalität, Kompetenz und Freundlichkeit vereint.',
    kurz: '… die Zusammenarbeit ist immer ein Vergnügen, sowohl geschäftlich als auch menschlich.',
    name: 'Nour Nouri',
    firma: 'Pashmin Art Consortia',
  },
  {
    text: 'Wir können Herrn Iqbal nur die besten Noten für seine vorzüglichen, professionellen Videos und Fotos ausstellen. Wir freuen uns auf eine weiterhin super Zusammenarbeit mit Herr Iqbal.',
    kurz: 'Wir können Herrn Iqbal nur die besten Noten für seine vorzüglichen, professionellen Videos und Fotos ausstellen.',
    name: 'Dirk Fischer',
    firma: 'EnergieReich Consulting',
  },
];

/** Meine Reise in bewegten Bildern (funkelfilm.com/about). */
export const REISE = [
  { jahr: '2015', titel: 'Der Anfang', text: 'Aus purer Leidenschaft fürs Geschichtenerzählen entstanden die ersten Filme. Vieles war neu – aber die Begeisterung war riesig.', bild: 'reise-2015' },
  { jahr: '2017', titel: 'Fokus Imagefilme', text: 'Immer mehr Unternehmen wollten sich authentisch zeigen. Hier wurde mir klar: Menschen gewinnen Menschen.', bild: 'reise-2017' },
  { jahr: '2024', titel: 'Über 100 Projekte', text: 'Heute blicke ich auf viele tolle Geschichten zurück – und freue mich auf all die, die noch kommen.', bild: 'reise-2024' },
];

export const UEBER = {
  hallo: 'Hi, ich bin Sheeras! Dein Ansprechpartner für Videoproduktionen mit Herz.',
  kurz: 'Seit 2017 begleite ich Menschen und Unternehmen dabei, ihre Geschichten in bewegten Bildern zu erzählen – mit einem offenen Ohr, einem geschulten Blick und dem Anspruch, hochwertige Ergebnisse zu liefern.',
  h1: 'Dein Videograf für echte Geschichten.',
  lang: [
    'Seit 2017 begleite ich Menschen und Unternehmen dabei, ihre Ideen in bewegte Bilder zu verwandeln. Mir ist wichtig, dass jede Produktion nicht nur gut aussieht, sondern sich echt anfühlt – mit Herz, Verstand und dem richtigen Gespür für das, was wirklich zählt.',
    'Ich glaube an ehrliches Storytelling. An Videos, die verbinden. Und daran, dass auch mit kleinen Mitteln Großes entstehen kann – wenn man sich wirklich reinhängt.',
  ],
  mission: 'Videos, die einen Unterschied machen.',
  missionText: 'Ich glaube an die Kraft des Geschichtenerzählens. Mein Ziel ist es, dir dabei zu helfen, deine Botschaft mit der Welt zu teilen.',
};

// ───────────────────────────────────────────────────────────────────────────────
// Startseite nach Jamils Konzept „FUNKELFILM 2027“ (Talk 4222, 01.11.2026). Texte wörtlich, humanizer nur leicht.
// Fakten-Regel: Was die bisherige Seite nicht belegt, ist Platzhalter (VORSCHAU) und steht in OFFENE-INFOS.md.

/** Neue Leistung (Jamil 4346, für Funkelfilm bestätigt). Ohne eigene Unterseite, bis es Beispiele gibt (OFFENE-INFOS 27). */
export const REELS = {
  titel: 'Reels für Social Media',
  ueberschrift: 'Reels für deine Social-Media-Kanäle',
  text: 'Kurze Filme im Hochformat für Instagram und andere Kanäle – gedreht und geschnitten im Stil deiner Marke.',
  knopf: 'Reels anfragen',
};

export const HERO = {
  // H1 zweizeilig nach Jamil (4319, Variante A gewählt 4330): „Authentische Filme. / Eindrucksvoll erzählt.“ – ersetzt Cans H1
  // „Filme, die zeigen, wie gut deine Arbeit ist.“. Akzent (seit 07.11. Gelb #FFCC00) = „Filme“ (das Wort Film sofort im Hero, Cans Klarheits-Ziel).
  titel: HERO_TITEL[VARIANTE], // Varianten oben bei LOGO_UNTERZEILEN
  // Subheadline (Jamil 4319).
  // Bei Variante A ohne „Authentische Filme“ (steht schon in der H1) – Jamils Inhalt sonst unverändert.
  unter: VARIANTE === 'a' ? 'Für Unternehmen, Marken und Menschen.' : 'Authentische Filme für Unternehmen, Marken und Menschen.',
  // Leistungszeile ohne „aus Hamburg“ (steht schon in der Personenzeile); „deutschlandweit“ bestätigt (Jamil 4231).
  leistung: 'Unternehmens-, Recruiting-, Eventfilme und Social-Media-Reels – deutschlandweit', // Reels: Jamil 4346
  // Schreibweise „Sheeras“ wie im Impressum der alten Seite (Frage „Sheeraz?“ offen, OFFENE-INFOS 15).
  person: { name: 'Sheeras Iqbal', rolle: 'Filmemacher & Videograph aus Hamburg' }, // „Videograph“ in Jamils Schreibweise (Talk 4240)
  // Kennzeile „Deine Arbeit verdient mehr Aufmerksamkeit.“ entfernt (Jamil 4320).
};

/** Einsatzgebiet (Can Talk 4242, 02.11.2026). „Deutschlandweit“ bestätigt (Jamil Talk 4231). Keine Projektorte behaupten –
 *  die Städte auf der Karte zeigen nur, wie weit das Gebiet reicht. */
export const EINSATZ = {
  titel: 'Aus Hamburg. Drehs in ganz Deutschland.',
  text: 'Funkelfilm sitzt in Hamburg und dreht für Unternehmen in ganz Deutschland.',
  anreise: 'Ob Berlin, München, Köln oder Leipzig: Die Anreise planen wir im kostenlosen Erstgespräch gleich mit ein.',
};

/** Vertrauen (Can Talk 4256: „Mach da die 100 weg … krasser Senior Level“). Die Zahl „Über 100 Projekte (Stand 2024)“ ist auf
 *  Cans Wunsch raus. Senior-Wirkung NUR aus Belegen: „Seit 2017“ (alte Seite: „seit 2017“, Startseite + Über mich; die Angaben
 *  „2015 – Der Anfang“ und „über 8 Jahre“ widersprechen sich teils → 2017 ist die sichere, mehrfach genannte Zahl), Leistungen
 *  und Ablauf der alten Seite (Konzept, Dreh, Schnitt, Farbe, Ton, Veröffentlichung), Einsatzgebiet (Jamil 4231), „direkt mit dem
 *  Filmemacher“ (Jamils Konzept, OFFENE-INFOS 16), 5 Kundenstimmen der alten Seite. Keine Sterne, keine erfundenen Zahlen/Kunden. */
export const VERTRAUEN = {
  ueber: 'Erfahrung, die man sieht',
  jahr: '2017',
  vorJahr: 'Seit',
  jahrText: 'erzähle ich Geschichten von Unternehmen und Menschen in bewegten Bildern.', // nah an der alten Seite („Seit 2017 begleite ich …“)
  satz: 'Geschichten von Unternehmen und Menschen, in bewegten Bildern erzählt.',
  fakten: [
    { titel: 'Unternehmens-, Recruiting- und Eventfilme', text: 'Dazu Kundenstimmen-Videos, die Vertrauen schaffen.' },
    { titel: 'Alles aus einer Hand', text: 'Konzept, Dreh, Schnitt, Farbe, Ton und Veröffentlichung.' },
    { titel: 'Direkt mit dem Filmemacher', text: 'Keine Agentur dazwischen. Ein Ansprechpartner für alles.' },
    { titel: 'Hamburg & deutschlandweit', text: 'Gedreht wird dort, wo deine Geschichte passiert.' },
  ],
  stimmen: 'Was Kunden sagen',
};

/** „Warum ein echter Filmemacher statt KI?“ (Can Talk 4259) – sachlich, ohne KI schlechtzumachen; Art. 50 KI-VO nur allgemein. */
export const KI = {
  titel: 'Warum ein echter Filmemacher statt KI?',
  intro: 'KI kann viel. Aber sie war nie bei dir vor Ort.',
  links: 'KI-Video',
  rechts: 'Funkelfilm',
  // [KI lang, Funkelfilm lang, KI kurz (Handy), Funkelfilm kurz (Handy)] – am Handy zwei Spalten nebeneinander (Jamil 4271)
  zeilen: [
    ['Generierte Menschen und Orte', 'Dein Team, deine Räume, echte Gesichter', 'Generierte Menschen', 'Dein echtes Team'],
    ['Wirkt oft glatt, viele erkennen es sofort', 'Echtheit, der man glaubt', 'Wirkt oft künstlich', 'Wirkt echt'],
    ['Text rein, Film raus', 'Jemand, der zuhört, vor Ort Regie führt und deine Geschichte findet', 'Text rein, Film raus', 'Regie vor Ort'],
    ['Teils kennzeichnungspflichtig', 'Eigene Aufnahmen, Rechte und Freigaben klar geregelt', 'Teils Kennzeichnung nötig', 'Klare Rechte'],
  ] as [string, string, string, string][],
  hinweis: 'Für bestimmte KI-erzeugte Bilder und Videos sieht die EU-KI-Verordnung (Art. 50) eine Kennzeichnung vor. Das ist ein allgemeiner Hinweis, keine Rechtsberatung.',
};

export const PROBLEM = {
  titel: 'Kommt dir das bekannt vor?',
  karten: [
    'Dein Unternehmen leistet gute Arbeit. Aber online wirkt alles wie bei der Konkurrenz.',
    'Interessenten verstehen nicht sofort, was euch besonders macht.',
    'Neue Mitarbeiter kennen eure Kultur nicht.',
    'Es fehlt Vertrauen, bevor das erste Gespräch stattfindet.',
  ],
};

/** Referenzen im Kartenstil. belegt=false → Platzhalter-Karte (kein echtes Projekt auf der alten Seite). */
export const REFERENZEN = [
  {
    titel: 'Nexus Fighter Academy – Nexus Kids',
    text: 'Mehr Sichtbarkeit für Nachwuchsarbeit und Vereinsleben.',
    art: 'Eindrücke',
    youtube: 'sX3z4bte2JM',
    poster: '/medien/bilder/film-nexus-kids-640.webp',
    clip: '',
    belegt: true,
  },
  {
    titel: 'Die Goldmalerin',
    text: 'Mehr Vertrauen für Kunden und Geschäftspartner.',
    art: 'Unternehmensfilm',
    youtube: 'WExx2qd8Uc0',
    poster: '/medien/clips/goldmalerin.webp',
    clip: '/medien/clips/goldmalerin.mp4',
    belegt: true,
  },
  {
    titel: 'Recruitingfilm',
    text: 'Mitarbeiter gewinnen, die wirklich zum Unternehmen passen.',
    art: 'Projektname folgt',
    youtube: '',
    poster: '/medien/clips/recruiting.webp',
    clip: '/medien/clips/recruiting.mp4',
    belegt: false,
  },
];

export const MENSCH = {
  titel: 'Hinter jedem Film steht ein Mensch.',
  zeilen: [
    'Hallo, ich bin Sheeras.',
    'Ich glaube nicht an gestellte Werbespots. Ich glaube daran, echte Menschen und echte Geschichten sichtbar zu machen.',
    'Deshalb arbeitest du bei Funkelfilm direkt mit dem Filmemacher. Ohne Umwege. Ohne große Agentur. Vom ersten Gespräch bis zum fertigen Film.',
  ],
};

/** Leistungen nach Kundenzielen. belegt=false → nicht auf der bisherigen Seite, Platzhalter. */
export const ZIELE = [
  { ziel: 'Ich möchte mehr Kunden gewinnen', loesung: 'Authentische Unternehmensfilme.', href: '/imagefilme/', clip: '/medien/clips/unternehmen.mp4', poster: '/medien/clips/unternehmen.webp', belegt: true, extra: { text: 'Kundenstimmen-Videos', href: '/erfahrungsberichte/' } },
  { ziel: 'Ich möchte Mitarbeiter finden', loesung: 'Recruitingfilme.', href: '/recruitingfilm/', clip: '/medien/clips/recruiting.mp4', poster: '/medien/clips/recruiting.webp', belegt: true },
  { ziel: 'Ich möchte mein Angebot erklären', loesung: 'Produkt- und Erklärungsvideos.', href: '/kontakt/', clip: '/medien/clips/kundenstimmen.mp4', poster: '/medien/clips/kundenstimmen.webp', belegt: false },
  { ziel: 'Ich möchte ein Event festhalten', loesung: 'Eventfilme.', href: '/veranstaltungsfilm/', clip: '/medien/clips/event.mp4', poster: '/medien/clips/event.webp', belegt: true, platzhalter: '„und Dokumentationen“ (Konzept) bitte bestätigen.' },
  { ziel: 'Ich möchte auf Social Media sichtbar sein', loesung: 'Reels für Social Media.', href: '/services/#reels', clip: '/medien/clips/reel.mp4', poster: '/medien/clips/reel.webp', belegt: true, platzhalter: 'Reel-Beispiele folgen – das Vorschaubild stammt vorerst aus dem Showreel.' }, // Jamil 4346
];

/** Ablauf nach Jamils Konzept (Kurzfassung), Langfassung aus der bisherigen Seite (ABLAUF). */
export const ABLAUF_KURZ = [
  { titel: 'Kennenlernen', text: 'Wir sprechen über deine Ziele.' },
  { titel: 'Konzept', text: 'Gemeinsam entwickeln wir die Geschichte.' },
  { titel: 'Dreh', text: 'Professionelle Aufnahmen vor Ort.' },
  { titel: 'Postproduktion', text: 'Schnitt, Musik und Feinschliff.' },
  { titel: 'Veröffentlichung', text: 'Bereit für Website, Social Media und Marketing.' },
];

/** FAQ aus dem Konzept. belegt=false → Antwort von Funkelfilm bestätigen lassen (Platzhalter). */
export const FAQ = [
  { frage: 'Was kostet ein Film?', antwort: 'Jedes Projekt ist individuell. Im Erstgespräch erhältst du eine realistische Einschätzung.', belegt: true },
  { frage: 'Muss ich vor die Kamera?', antwort: 'Nein. Gemeinsam finden wir die passende Lösung.', belegt: true },
  { frage: 'Wie lange dauert die Produktion?', antwort: 'Abhängig vom Umfang des Projekts.', belegt: true },
  { frage: 'Arbeitet Funkelfilm nur in Hamburg?', antwort: 'Nein. Produktionen sind deutschlandweit möglich.', belegt: true },
];

export const SCHLUSS = { titel: 'Deine Geschichte ist bereits da.', unter: 'Jetzt muss sie nur noch erzählt werden.', knopf: 'Kostenloses Erstgespräch vereinbaren' };
