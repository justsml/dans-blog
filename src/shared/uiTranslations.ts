import { SITE_DESCRIPTION, SITE_SEO_DESCRIPTION, SITE_TITLE } from "../consts";
import { DEFAULT_LOCALE, type Locale } from "./i18n";

type UiCopy = {
  site: {
    description: string;
    seoDescription: string;
  };
  nav: {
    primaryLabel: string;
    searchLabel: string;
    searchTitle: string;
    articles: string;
    quizzes: string;
    quizzesText: string;
    categories: string;
    popular: string;
    recent: string;
    projects: string;
    demosTitle: string;
    demosText: string;
    openSourceJournal: string;
    openSourceJournalText: string;
    about: string;
    aboutText: string;
    contactMe: string;
    ossLog: string;
    resume: string;
    languageLabel: string;
    languageVersion: string;
    languageUnavailable: string;
  };
  footer: {
    feeds: string;
    rssFeed: string;
    jsonFeed: string;
    quotable: string;
    quote: string;
    from: string;
    elsewhere: string;
    follow: string;
    share: string;
    copied: string;
    consulting: string;
    ctaTitle: string;
    ctaText: string;
    bookCall: string;
    related: string;
    readMore: string;
    subscribe: string;
    credits: string;
    rights: string;
    coverAltSuffix: string;
  };
  home: {
    title: string;
    eyebrow: string;
    heading: string;
    intro: string;
    resourcesEyebrow: string;
    resourcesTitle: string;
    resourcesText: string;
    hireKicker: string;
    hireTitle: string;
    ossKicker: string;
    ossTitle: string;
    latestEyebrow: string;
    latestTitle: string;
    latestText: string;
  };
  about: {
    title: string;
    heading: string;
    name: string;
    summary: string;
    reputation: string;
    openSource: string;
    resume: string;
  };
  contact: {
    title: string;
    heading: string;
    validationName: string;
    validationEmail: string;
    validationMessage: string;
    successTitle: string;
    sent: string;
    botLabel: string;
    botPlaceholder: string;
    name: string;
    email: string;
    message: string;
    messagePlaceholder: string;
    thanks: string;
    error: string;
    submit: string;
  };
  challenges: {
    title: string;
    subTitle: (totalQuizzes: number, totalQuestionCount: number) => string;
    heading: string;
    introOne: string;
    introTwo: string;
    factOne: string;
    factTwo: string;
    factThree: string;
  };
  openSource: {
    title: string;
    subTitle: string;
    heading: string;
    quote: string;
  };
  category: {
    title: string;
    description: (catCount: number, totalCount: number) => string;
    heading: string;
    breadcrumb: string;
    pageTitle: (category: string) => string;
    found: (count: number) => string;
  };
};

const en = {
  site: {
    description: SITE_DESCRIPTION,
    seoDescription: SITE_SEO_DESCRIPTION,
  },
  nav: {
    primaryLabel: "Primary navigation",
    searchLabel: "Search",
    searchTitle: "Toggle search panel",
    articles: "Articles",
    quizzes: "Quizzes",
    quizzesText: "Try Dan's Challenges!",
    categories: "Categories",
    popular: "Popular",
    recent: "Recent",
    projects: "Projects",
    demosTitle: "Demos & Examples",
    demosText: "A selection of my projects, experiments and assorted repos.",
    openSourceJournal: "Open Source Journal",
    openSourceJournalText: "A journal of my open source contributions, projects, and experiments.",
    about: "About",
    aboutText: "Coder | Leader<br />Thinker | Tinkerer",
    contactMe: "Contact Me",
    ossLog: "OSS Log",
    resume: "Resume",
    languageLabel: "Article language",
    languageVersion: "version",
    languageUnavailable: "translation is not available yet",
  },
  footer: {
    feeds: "Feeds",
    rssFeed: "RSS feed",
    jsonFeed: "JSON feed",
    quotable: "Quotable",
    quote: "Wow! Dan, you're like an AI man!",
    from: "from",
    elsewhere: "Elsewhere",
    follow: "Follow me places...",
    share: "Share this page",
    copied: "Copied link",
    consulting: "Consulting",
    ctaTitle: "Hard technical problem?",
    ctaText: "AI systems, security reviews, TypeScript architecture, and production rescue work.",
    bookCall: "Book a call",
    related: "Related articles",
    readMore: "Read More Shit by Dan Levy",
    subscribe: "Subscribe",
    credits: "Site credits",
    rights: "All rights rebased.",
    coverAltSuffix: "article cover",
  },
  home: {
    title: `${SITE_TITLE} | ${SITE_SEO_DESCRIPTION}`,
    eyebrow: "Field notes",
    heading: "Notes from where the docs run out.",
    intro: "AI systems, JavaScript, security, databases, and bug fixes worth remembering.",
    resourcesEyebrow: "Resources",
    resourcesTitle: "Help me help you",
    resourcesText: "Consulting work and open source notes.",
    hireKicker: "Hire Me",
    hireTitle: "Build better AI systems",
    ossKicker: "Open Source Log",
    ossTitle: "Follow the commits",
    latestEyebrow: "Latest writing",
    latestTitle: "Recent writing",
    latestText: "Read the latest here.",
  },
  about: {
    title: "About Me",
    heading: "About",
    name: "Dan Levy",
    summary:
      "Dan is an accomplished programmer, teacher, mentor, and leader. He has over 20 years of professional software development experience across consulting, Agile team building, architecture, security audits, accessibility reviews, and UI/UX analysis.",
    reputation:
      "After years of work in software patterns and architecture, Dan has become a sought-out subject matter expert with a reputation for practical, motivating talks from graduations to the board room.",
    openSource:
      "As an active contributor to numerous Open Source projects, Dan keeps learning across languages, methodologies, patterns, and code styles.",
    resume: "Download Dan's Resume",
  },
  contact: {
    title: "Contact Dan!",
    heading: "Contact Dan!",
    validationName: "Name must be at least 2 characters.",
    validationEmail: "Please enter a valid email address.",
    validationMessage: "Message must be at least 5 characters.",
    successTitle: "Successfully submitted!",
    sent: "Sent!",
    botLabel: "Fellow humans, leave this field blank",
    botPlaceholder: "For the robots...",
    name: "Name",
    email: "Email",
    message: "Message",
    messagePlaceholder: "Type your message here.",
    thanks: "Thanks for reaching out!",
    error: "There was an error sending your message. Please check the form and try again.",
    submit: "Send Message",
  },
  challenges: {
    title: "Tech Challenges & Quizzes - DanLevy.net",
    subTitle: (totalQuizzes, totalQuestionCount) =>
      `A collection of exactly ${totalQuizzes} quizzes and ${totalQuestionCount} tech questions!`,
    heading: "Tech Challenges & Quizzes",
    introOne:
      "From HTML & CSS to Node.js & SQL, these quizzes are filled with gems inspired by real career experiences.",
    introTwo:
      "They are designed to be challenging at times, and may indeed test your knowledge of the quirks and edge cases of various technologies.",
    factOne: "Fun fact: This is my containment unit.",
    factTwo:
      "Fun fact: Completing all quizzes unlocks a special experience on the site.",
    factThree: "Fun fact: \"Fun facts\" are not necessarily fun, or facts.",
  },
  openSource: {
    title: "Dan's Open Source Journal",
    subTitle: "At least the ones I can remember",
    heading: "My Contribution Log",
    quote:
      "I'd like to believe I contribute to open source out of some noble, altruistic spirit. Chances are, I simply want to fix the issue I'm facing.",
  },
  category: {
    title: "DanLevy.net by Category",
    description: (catCount, totalCount) =>
      `Featuring ${catCount} categories and ${totalCount} articles`,
    heading: "Articles by Category",
    breadcrumb: "Category /",
    pageTitle: (category) => `Category: ${category}`,
    found: (count) => `Found ${count} articles`,
  },
} satisfies UiCopy;

const copies: Record<Locale, UiCopy> = {
  en,
  es: {
    ...en,
    site: { description: "Programador | Líder | Pensador | Manitas", seoDescription: "Ven por el código, quédate por el oficio." },
    nav: { ...en.nav, articles: "Artículos", quizzes: "Cuestionarios", quizzesText: "Prueba los desafíos de Dan.", categories: "Categorías", popular: "Popular", recent: "Reciente", projects: "Proyectos", demosTitle: "Demos y ejemplos", demosText: "Una selección de proyectos, experimentos y repositorios.", about: "Acerca de", contactMe: "Contacto", resume: "Currículum", languageLabel: "Idioma del artículo", languageVersion: "versión", languageUnavailable: "traducción aún no disponible" },
    footer: { ...en.footer, feeds: "Feeds", rssFeed: "Feed RSS", jsonFeed: "Feed JSON", quotable: "Citable", from: "de", elsewhere: "En otros sitios", follow: "Sígueme por ahí...", share: "Compartir esta página", copied: "Enlace copiado", consulting: "Consultoría", ctaTitle: "¿Problema técnico difícil?", ctaText: "Sistemas de IA, revisiones de seguridad, arquitectura TypeScript y rescates de producción.", bookCall: "Reservar llamada", related: "Artículos relacionados", readMore: "Leer más de Dan Levy", subscribe: "Suscribirse", credits: "Créditos del sitio", rights: "Todos los derechos rebasados.", coverAltSuffix: "imagen de portada del artículo" },
    home: { ...en.home, eyebrow: "Notas de campo", heading: "Notas de donde se acaban los docs.", intro: "Sistemas de IA, JavaScript, seguridad, bases de datos y arreglos que vale la pena recordar.", resourcesEyebrow: "Recursos", resourcesTitle: "Ayúdame a ayudarte", resourcesText: "Consultoría y notas de código abierto.", hireKicker: "Contrátame", hireTitle: "Construye mejores sistemas de IA", ossKicker: "Registro open source", ossTitle: "Sigue los commits", latestEyebrow: "Últimos textos", latestTitle: "Escritura reciente", latestText: "Lee lo último aquí." },
    about: { ...en.about, title: "Acerca de mí", heading: "Acerca de", summary: "Dan es programador, profesor, mentor y líder. Tiene más de 20 años de experiencia profesional en desarrollo de software, consultoría, equipos ágiles, arquitectura, seguridad, accesibilidad y UI/UX.", reputation: "Tras años trabajando con patrones y arquitectura de software, Dan se ha convertido en un experto buscado por charlas prácticas y motivadoras.", openSource: "Como colaborador activo en numerosos proyectos open source, Dan sigue aprendiendo lenguajes, metodologías, patrones y estilos de código.", resume: "Descargar el currículum de Dan" },
    contact: { ...en.contact, title: "Contacta a Dan", heading: "Contacta a Dan", validationName: "El nombre debe tener al menos 2 caracteres.", validationEmail: "Introduce un correo válido.", validationMessage: "El mensaje debe tener al menos 5 caracteres.", successTitle: "Enviado correctamente", sent: "Enviado", botLabel: "Humanos, dejad este campo en blanco", botPlaceholder: "Para los robots...", name: "Nombre", message: "Mensaje", messagePlaceholder: "Escribe tu mensaje aquí.", thanks: "Gracias por escribir.", error: "Hubo un error al enviar el mensaje. Revisa el formulario e inténtalo de nuevo.", submit: "Enviar mensaje" },
    challenges: { ...en.challenges, title: "Desafíos y cuestionarios técnicos - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `Una colección de exactamente ${totalQuizzes} cuestionarios y ${totalQuestionCount} preguntas técnicas.`, heading: "Desafíos y cuestionarios técnicos", introOne: "De HTML y CSS a Node.js y SQL, estos cuestionarios reúnen lecciones inspiradas por experiencias reales de carrera.", introTwo: "Están diseñados para ser exigentes y poner a prueba tu conocimiento de rarezas y casos límite.", factOne: "Dato curioso: esta es mi unidad de contención.", factTwo: "Dato curioso: completar todos los cuestionarios desbloquea una experiencia especial en el sitio.", factThree: "Dato curioso: los datos curiosos no siempre son curiosos ni datos." },
    openSource: { ...en.openSource, title: "Diario open source de Dan", subTitle: "Al menos los que recuerdo", heading: "Mi registro de contribuciones", quote: "Me gustaría creer que contribuyo al open source por un noble espíritu altruista. Lo más probable es que simplemente quiera arreglar el problema que tengo delante." },
    category: { ...en.category, title: "DanLevy.net por categoría", description: (catCount, totalCount) => `${catCount} categorías y ${totalCount} artículos`, heading: "Artículos por categoría", breadcrumb: "Categoría /", pageTitle: (category) => `Categoría: ${category}`, found: (count) => `${count} artículos encontrados` },
  },
  hi: en,
  ja: en,
  ru: en,
  de: en,
  fr: en,
  it: en,
  zh: en,
};

export function getUiCopy(locale: Locale = DEFAULT_LOCALE): UiCopy {
  return copies[locale] ?? copies[DEFAULT_LOCALE];
}
