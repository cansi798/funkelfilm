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

export const HERO = {
  titel: 'Deine Arbeit verdient mehr Aufmerksamkeit.',
  unter: [
    'Viele Unternehmen leisten hervorragende Arbeit. Doch online sieht man das oft nicht.',
    'Wir erzählen deine Geschichte so, dass Kunden Vertrauen aufbauen, bevor sie überhaupt Kontakt aufnehmen.',
  ],
};

/** Vertrauenszeile. Keine Sterne: Es gibt keine belegte Bewertungsquelle (auch die alte Seite zeigt keine). */
export const VERTRAUEN = [
  { text: 'Über 100 Projekte umgesetzt', hinweis: 'Stand 2024', belegt: true },
  { text: 'Hamburg & deutschlandweit', hinweis: '', belegt: true }, // deutschlandweit bestätigt (Jamil Talk 4231, 02.11.)
  { text: 'Persönliche Betreuung vom ersten Gespräch bis zur Veröffentlichung', hinweis: '', belegt: true },
];

export const PROBLEM = {
  titel: 'Kommt dir das bekannt vor?',
  karten: [
    'Dein Unternehmen leistet gute Arbeit. Aber online wirkt alles wie bei der Konkurrenz.',
    'Interessenten verstehen nicht sofort, was euch besonders macht.',
    'Neue Mitarbeiter kennen eure Kultur nicht.',
    'Es fehlt Vertrauen, bevor das erste Gespräch stattfindet.',
  ],
  uebergang: 'Genau hier beginnt die Kraft einer echten Geschichte.',
};

export const LOESUNG = {
  titel: 'Menschen vertrauen Menschen.',
  text: 'Ein guter Film zeigt nicht nur, was du machst. Er zeigt:',
  punkte: ['wie du arbeitest', 'wer hinter dem Unternehmen steht', 'warum Kunden gerne mit dir arbeiten', 'was dich besonders macht'],
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
