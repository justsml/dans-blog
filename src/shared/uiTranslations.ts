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
    languageLabel: "Language",
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
    nav: { ...en.nav, primaryLabel: "Navegación principal", searchLabel: "Buscar", searchTitle: "Alternar panel de búsqueda", articles: "Artículos", quizzes: "Cuestionarios", quizzesText: "Prueba los desafíos de Dan.", categories: "Categorías", popular: "Más popular", recent: "Reciente", projects: "Proyectos", demosTitle: "Demos y ejemplos", demosText: "Una selección de proyectos, experimentos y repositorios.", openSourceJournal: "Diario open source", openSourceJournalText: "Un diario de mis contribuciones, proyectos y experimentos open source.", about: "Acerca de", aboutText: "Programador | Líder<br />Pensador | Manitas", contactMe: "Contacto", ossLog: "Registro OSS", resume: "Currículum", languageLabel: "Idioma", languageVersion: "versión", languageUnavailable: "traducción aún no disponible" },
    footer: { ...en.footer, feeds: "Feeds", rssFeed: "Feed RSS", jsonFeed: "Feed JSON", quotable: "Citable", quote: "¡Vaya! Dan, pareces un hombre-IA.", from: "de", elsewhere: "En otros sitios", follow: "Sígueme por ahí...", share: "Compartir esta página", copied: "Enlace copiado", consulting: "Consultoría", ctaTitle: "¿Problema técnico difícil?", ctaText: "Sistemas de IA, revisiones de seguridad, arquitectura TypeScript y rescates de producción.", bookCall: "Reservar llamada", related: "Artículos relacionados", readMore: "Leer más de Dan Levy", subscribe: "Suscribirse", credits: "Créditos del sitio", rights: "Todos los derechos rebasados.", coverAltSuffix: "imagen de portada del artículo" },
    home: { ...en.home, title: `${SITE_TITLE} | Ven por el código, quédate por el oficio.`, eyebrow: "Notas de campo", heading: "Notas de donde se acaban los docs.", intro: "Sistemas de IA, JavaScript, seguridad, bases de datos y arreglos que vale la pena recordar.", resourcesEyebrow: "Recursos", resourcesTitle: "Ayúdame a ayudarte", resourcesText: "Consultoría y notas de código abierto.", hireKicker: "Contrátame", hireTitle: "Construye mejores sistemas de IA", ossKicker: "Registro open source", ossTitle: "Sigue los commits", latestEyebrow: "Últimos textos", latestTitle: "Escritura reciente", latestText: "Lee lo último aquí." },
    about: { ...en.about, title: "Acerca de mí", heading: "Acerca de", name: "Dan Levy", summary: "Dan es programador, profesor, mentor y líder. Tiene más de 20 años de experiencia profesional en desarrollo de software, consultoría, equipos ágiles, arquitectura, seguridad, accesibilidad y UI/UX.", reputation: "Tras años trabajando con patrones y arquitectura de software, Dan se ha convertido en un experto buscado por charlas prácticas y motivadoras.", openSource: "Como colaborador activo en numerosos proyectos open source, Dan sigue aprendiendo lenguajes, metodologías, patrones y estilos de código.", resume: "Descargar el currículum de Dan" },
    contact: { ...en.contact, title: "Contacta a Dan", heading: "Contacta a Dan", validationName: "El nombre debe tener al menos 2 caracteres.", validationEmail: "Introduce un correo válido.", validationMessage: "El mensaje debe tener al menos 5 caracteres.", successTitle: "Enviado correctamente", sent: "Enviado", botLabel: "Humanos, dejad este campo en blanco", botPlaceholder: "Para los robots...", name: "Nombre", email: "Correo electrónico", message: "Mensaje", messagePlaceholder: "Escribe tu mensaje aquí.", thanks: "Gracias por escribir.", error: "Hubo un error al enviar el mensaje. Revisa el formulario e inténtalo de nuevo.", submit: "Enviar mensaje" },
    challenges: { ...en.challenges, title: "Desafíos y cuestionarios técnicos - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `Una colección de exactamente ${totalQuizzes} cuestionarios y ${totalQuestionCount} preguntas técnicas.`, heading: "Desafíos y cuestionarios técnicos", introOne: "De HTML y CSS a Node.js y SQL, estos cuestionarios reúnen lecciones inspiradas por experiencias reales de carrera.", introTwo: "Están diseñados para ser exigentes y poner a prueba tu conocimiento de rarezas y casos límite.", factOne: "Dato curioso: esta es mi unidad de contención.", factTwo: "Dato curioso: completar todos los cuestionarios desbloquea una experiencia especial en el sitio.", factThree: "Dato curioso: los datos curiosos no siempre son curiosos ni datos." },
    openSource: { ...en.openSource, title: "Diario open source de Dan", subTitle: "Al menos los que recuerdo", heading: "Mi registro de contribuciones", quote: "Me gustaría creer que contribuyo al open source por un noble espíritu altruista. Lo más probable es que simplemente quiera arreglar el problema que tengo delante." },
    category: { ...en.category, title: "DanLevy.net por categoría", description: (catCount, totalCount) => `${catCount} categorías y ${totalCount} artículos`, heading: "Artículos por categoría", breadcrumb: "Categoría /", pageTitle: (category) => `Categoría: ${category}`, found: (count) => `${count} artículos encontrados` },
  },
  hi: {
    ...en,
    site: { description: "कोडर | लीडर | विचारक | टिंकरर", seoDescription: "कोड के लिए आइए, हुनर के लिए ठहरिए." },
    nav: { ...en.nav, primaryLabel: "मुख्य नेविगेशन", searchLabel: "खोज", searchTitle: "खोज पैनल खोलें/बंद करें", articles: "लेख", quizzes: "क्विज़", quizzesText: "Dan की चुनौतियां आज़माएं.", categories: "श्रेणियां", popular: "लोकप्रिय", recent: "हालिया", projects: "प्रोजेक्ट", demosTitle: "डेमो और उदाहरण", demosText: "मेरे प्रोजेक्ट, प्रयोग और चुने हुए रिपॉज़िटरी.", openSourceJournal: "ओपन सोर्स जर्नल", openSourceJournalText: "मेरे ओपन सोर्स योगदान, प्रोजेक्ट और प्रयोगों का जर्नल.", about: "परिचय", aboutText: "कोडर | लीडर<br />विचारक | टिंकरर", contactMe: "संपर्क करें", ossLog: "OSS लॉग", resume: "रिज़्यूमे", languageLabel: "भाषा", languageVersion: "संस्करण", languageUnavailable: "अनुवाद अभी उपलब्ध नहीं है" },
    footer: { ...en.footer, feeds: "फ़ीड", rssFeed: "RSS फ़ीड", jsonFeed: "JSON फ़ीड", quotable: "उद्धरण योग्य", quote: "वाह! Dan, आप तो AI आदमी जैसे हैं!", from: "से", elsewhere: "और जगहें", follow: "मुझे यहां भी फ़ॉलो करें...", share: "यह पेज शेयर करें", copied: "लिंक कॉपी हो गया", consulting: "परामर्श", ctaTitle: "कठिन तकनीकी समस्या?", ctaText: "AI सिस्टम, सुरक्षा समीक्षा, TypeScript आर्किटेक्चर और प्रोडक्शन बचाव.", bookCall: "कॉल बुक करें", related: "संबंधित लेख", readMore: "Dan Levy के और लेख पढ़ें", subscribe: "सदस्यता लें", credits: "साइट क्रेडिट", rights: "सर्वाधिकार सुरक्षित.", coverAltSuffix: "लेख का कवर" },
    home: { ...en.home, title: `${SITE_TITLE} | कोड के लिए आइए, हुनर के लिए ठहरिए.`, eyebrow: "फ़ील्ड नोट्स", heading: "जहां दस्तावेज़ खत्म होते हैं, वहां की नोट्स.", intro: "AI सिस्टम, JavaScript, सुरक्षा, डेटाबेस और याद रखने लायक बग फ़िक्स.", resourcesEyebrow: "संसाधन", resourcesTitle: "मुझे आपकी मदद करने दें", resourcesText: "परामर्श कार्य और ओपन सोर्स नोट्स.", hireKicker: "मुझे हायर करें", hireTitle: "बेहतर AI सिस्टम बनाएं", ossKicker: "ओपन सोर्स लॉग", ossTitle: "कमिट्स फ़ॉलो करें", latestEyebrow: "नवीनतम लेखन", latestTitle: "हालिया लेखन", latestText: "नया लेख यहां पढ़ें." },
    about: { ...en.about, title: "मेरे बारे में", heading: "परिचय", name: "Dan Levy", summary: "Dan एक अनुभवी प्रोग्रामर, शिक्षक, मेंटर और लीडर हैं. उन्हें परामर्श, Agile टीम निर्माण, आर्किटेक्चर, सुरक्षा ऑडिट, एक्सेसिबिलिटी समीक्षा और UI/UX विश्लेषण में 20 साल से अधिक का पेशेवर अनुभव है.", reputation: "सॉफ़्टवेयर पैटर्न और आर्किटेक्चर में वर्षों के काम के बाद, Dan व्यावहारिक और प्रेरक वार्ताओं के लिए पहचाने जाने वाले विशेषज्ञ बन गए हैं.", openSource: "कई ओपन सोर्स प्रोजेक्ट में सक्रिय योगदानकर्ता के रूप में Dan भाषाओं, तरीकों, पैटर्न और कोड शैलियों से लगातार सीखते रहते हैं.", resume: "Dan का रिज़्यूमे डाउनलोड करें" },
    contact: { ...en.contact, title: "Dan से संपर्क करें", heading: "Dan से संपर्क करें", validationName: "नाम कम से कम 2 अक्षर का होना चाहिए.", validationEmail: "कृपया मान्य ईमेल पता दर्ज करें.", validationMessage: "संदेश कम से कम 5 अक्षर का होना चाहिए.", successTitle: "सफलतापूर्वक भेजा गया", sent: "भेजा गया", botLabel: "साथी इंसानों, यह फ़ील्ड खाली छोड़ें", botPlaceholder: "रोबोटों के लिए...", name: "नाम", email: "ईमेल", message: "संदेश", messagePlaceholder: "अपना संदेश यहां लिखें.", thanks: "संपर्क करने के लिए धन्यवाद.", error: "आपका संदेश भेजने में त्रुटि हुई. कृपया फ़ॉर्म जांचें और फिर कोशिश करें.", submit: "संदेश भेजें" },
    challenges: { ...en.challenges, title: "तकनीकी चुनौतियां और क्विज़ - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `ठीक ${totalQuizzes} क्विज़ और ${totalQuestionCount} तकनीकी प्रश्नों का संग्रह.`, heading: "तकनीकी चुनौतियां और क्विज़", introOne: "HTML और CSS से लेकर Node.js और SQL तक, ये क्विज़ वास्तविक करियर अनुभवों से निकली सीख से भरे हैं.", introTwo: "ये कभी-कभी कठिन होने के लिए बनाए गए हैं और अलग-अलग तकनीकों की विचित्रताओं व किनारों को परख सकते हैं.", factOne: "मज़ेदार तथ्य: यह मेरी containment unit है.", factTwo: "मज़ेदार तथ्य: सभी क्विज़ पूरे करने पर साइट पर एक खास अनुभव खुलता है.", factThree: "मज़ेदार तथ्य: \"मज़ेदार तथ्य\" हमेशा मज़ेदार या तथ्य नहीं होते." },
    openSource: { ...en.openSource, title: "Dan का ओपन सोर्स जर्नल", subTitle: "कम से कम वे जिन्हें मैं याद रखता हूं", heading: "मेरा योगदान लॉग", quote: "मैं मानना चाहता हूं कि मैं किसी उदात्त, परोपकारी भावना से ओपन सोर्स में योगदान देता हूं. सच शायद यह है कि मैं सामने आई समस्या को ठीक करना चाहता हूं." },
    category: { ...en.category, title: "DanLevy.net श्रेणी अनुसार", description: (catCount, totalCount) => `${catCount} श्रेणियां और ${totalCount} लेख`, heading: "श्रेणी अनुसार लेख", breadcrumb: "श्रेणी /", pageTitle: (category) => `श्रेणी: ${category}`, found: (count) => `${count} लेख मिले` },
  },
  ja: {
    ...en,
    site: { description: "コーダー | リーダー | 思索家 | いじる人", seoDescription: "コードを読みに来て、技術の勘どころで居残る場所。" },
    nav: { ...en.nav, primaryLabel: "メインナビゲーション", searchLabel: "検索", searchTitle: "検索パネルを切り替える", articles: "記事", quizzes: "クイズ", quizzesText: "Danのチャレンジを試す", categories: "カテゴリ", popular: "人気", recent: "最近", projects: "プロジェクト", demosTitle: "デモと例", demosText: "プロジェクト、実験、リポジトリの抜粋。", openSourceJournal: "オープンソース日誌", openSourceJournalText: "オープンソースへの貢献、プロジェクト、実験の記録。", about: "プロフィール", aboutText: "コーダー | リーダー<br />思索家 | いじる人", contactMe: "連絡する", ossLog: "OSSログ", resume: "履歴書", languageLabel: "言語", languageVersion: "版", languageUnavailable: "翻訳はまだありません" },
    footer: { ...en.footer, feeds: "フィード", rssFeed: "RSSフィード", jsonFeed: "JSONフィード", quotable: "引用", quote: "わあ！Dan、AIみたいな人ですね！", from: "より", elsewhere: "ほかの場所", follow: "あちこちでフォローする...", share: "このページを共有", copied: "リンクをコピーしました", consulting: "コンサルティング", ctaTitle: "難しい技術課題がありますか？", ctaText: "AIシステム、セキュリティレビュー、TypeScriptアーキテクチャ、本番環境の救出。", bookCall: "通話を予約", related: "関連記事", readMore: "Dan Levyの記事をもっと読む", subscribe: "購読", credits: "サイトクレジット", rights: "全権利をrebase済み。", coverAltSuffix: "記事カバー" },
    home: { ...en.home, title: `${SITE_TITLE} | コードを読みに来て、技術の勘どころで居残る場所。`, eyebrow: "現場メモ", heading: "ドキュメントが尽きた先のメモ。", intro: "AIシステム、JavaScript、セキュリティ、データベース、覚えておきたいバグ修正。", resourcesEyebrow: "リソース", resourcesTitle: "手伝わせてください", resourcesText: "コンサルティングとオープンソースの記録。", hireKicker: "依頼する", hireTitle: "より良いAIシステムを作る", ossKicker: "オープンソースログ", ossTitle: "コミットを追う", latestEyebrow: "最新記事", latestTitle: "最近の執筆", latestText: "最新はこちら。" },
    about: { ...en.about, title: "私について", heading: "プロフィール", name: "Dan Levy", summary: "Danは経験豊富なプログラマー、教師、メンター、リーダーです。コンサルティング、Agileチーム作り、アーキテクチャ、セキュリティ監査、アクセシビリティレビュー、UI/UX分析まで、20年以上の実務経験があります。", reputation: "ソフトウェアパターンとアーキテクチャに長年取り組み、卒業式から役員会議室まで、実用的で人を動かす話ができる専門家として知られるようになりました。", openSource: "多くのオープンソースプロジェクトに貢献しながら、言語、手法、パターン、コードスタイルを学び続けています。", resume: "Danの履歴書をダウンロード" },
    contact: { ...en.contact, title: "Danに連絡", heading: "Danに連絡", validationName: "名前は2文字以上で入力してください。", validationEmail: "有効なメールアドレスを入力してください。", validationMessage: "メッセージは5文字以上で入力してください。", successTitle: "送信しました", sent: "送信済み", botLabel: "人間のみなさん、この欄は空のままにしてください", botPlaceholder: "ロボット向け...", name: "名前", email: "メール", message: "メッセージ", messagePlaceholder: "ここにメッセージを入力してください。", thanks: "ご連絡ありがとうございます。", error: "メッセージの送信中にエラーが発生しました。フォームを確認してもう一度お試しください。", submit: "メッセージを送信" },
    challenges: { ...en.challenges, title: "技術チャレンジとクイズ - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `ちょうど${totalQuizzes}個のクイズと${totalQuestionCount}個の技術問題のコレクションです。`, heading: "技術チャレンジとクイズ", introOne: "HTMLとCSSからNode.jsとSQLまで、実務経験から生まれた学びを詰め込んだクイズです。", introTwo: "ときどき手強く、さまざまな技術の癖やエッジケースを試すように作っています。", factOne: "豆知識: これは私の封じ込め装置です。", factTwo: "豆知識: すべてのクイズを完了するとサイト上の特別な体験が開きます。", factThree: "豆知識: 「豆知識」は必ずしも豆でも知識でもありません。" },
    openSource: { ...en.openSource, title: "Danのオープンソース日誌", subTitle: "少なくとも覚えている分", heading: "貢献ログ", quote: "崇高で利他的な精神からオープンソースに貢献している、と思いたいところです。たぶん実際には、自分が直面している問題を直したいだけです。" },
    category: { ...en.category, title: "DanLevy.net カテゴリ別", description: (catCount, totalCount) => `${catCount}カテゴリ、${totalCount}記事`, heading: "カテゴリ別の記事", breadcrumb: "カテゴリ /", pageTitle: (category) => `カテゴリ: ${category}`, found: (count) => `${count}件の記事` },
  },
  ru: {
    ...en,
    site: { description: "Кодер | Лидер | Мыслитель | Мастер на все руки", seoDescription: "Приходите за кодом, оставайтесь ради ремесла." },
    nav: { ...en.nav, primaryLabel: "Основная навигация", searchLabel: "Поиск", searchTitle: "Открыть или закрыть панель поиска", articles: "Статьи", quizzes: "Квизы", quizzesText: "Попробуйте задания Dan.", categories: "Категории", popular: "Популярное", recent: "Недавнее", projects: "Проекты", demosTitle: "Демо и примеры", demosText: "Подборка моих проектов, экспериментов и репозиториев.", openSourceJournal: "Журнал open source", openSourceJournalText: "Журнал моих open source вкладов, проектов и экспериментов.", about: "Обо мне", aboutText: "Кодер | Лидер<br />Мыслитель | Мастер", contactMe: "Связаться", ossLog: "OSS-лог", resume: "Резюме", languageLabel: "Язык", languageVersion: "версия", languageUnavailable: "перевод пока недоступен" },
    footer: { ...en.footer, feeds: "Ленты", rssFeed: "RSS-лента", jsonFeed: "JSON-лента", quotable: "Цитата", quote: "Вау! Dan, ты как человек-AI!", from: "от", elsewhere: "Еще где-то", follow: "Подписывайтесь в разных местах...", share: "Поделиться этой страницей", copied: "Ссылка скопирована", consulting: "Консалтинг", ctaTitle: "Сложная техническая проблема?", ctaText: "AI-системы, ревью безопасности, архитектура TypeScript и спасение продакшена.", bookCall: "Запланировать звонок", related: "Похожие статьи", readMore: "Читать еще Dan Levy", subscribe: "Подписаться", credits: "О сайте", rights: "Все права rebase-нуты.", coverAltSuffix: "обложка статьи" },
    home: { ...en.home, title: `${SITE_TITLE} | Приходите за кодом, оставайтесь ради ремесла.`, eyebrow: "Полевые заметки", heading: "Заметки оттуда, где заканчивается документация.", intro: "AI-системы, JavaScript, безопасность, базы данных и багфиксы, которые стоит запомнить.", resourcesEyebrow: "Ресурсы", resourcesTitle: "Помогите мне помочь вам", resourcesText: "Консалтинг и заметки об open source.", hireKicker: "Нанять меня", hireTitle: "Стройте лучшие AI-системы", ossKicker: "Open source лог", ossTitle: "Следите за коммитами", latestEyebrow: "Последние тексты", latestTitle: "Недавние статьи", latestText: "Читайте новое здесь." },
    about: { ...en.about, title: "Обо мне", heading: "Обо мне", name: "Dan Levy", summary: "Dan — опытный программист, преподаватель, наставник и лидер. У него более 20 лет профессионального опыта в разработке, консалтинге, построении Agile-команд, архитектуре, аудитах безопасности, ревью доступности и анализе UI/UX.", reputation: "После многих лет работы с паттернами и архитектурой ПО Dan стал востребованным экспертом с репутацией автора практичных и мотивирующих выступлений.", openSource: "Как активный участник множества open source проектов, Dan продолжает учиться на разных языках, методологиях, паттернах и стилях кода.", resume: "Скачать резюме Dan" },
    contact: { ...en.contact, title: "Связаться с Dan", heading: "Связаться с Dan", validationName: "Имя должно содержать минимум 2 символа.", validationEmail: "Введите корректный email.", validationMessage: "Сообщение должно содержать минимум 5 символов.", successTitle: "Успешно отправлено", sent: "Отправлено", botLabel: "Люди, оставьте это поле пустым", botPlaceholder: "Для роботов...", name: "Имя", email: "Email", message: "Сообщение", messagePlaceholder: "Введите сообщение здесь.", thanks: "Спасибо за сообщение.", error: "При отправке сообщения произошла ошибка. Проверьте форму и попробуйте снова.", submit: "Отправить сообщение" },
    challenges: { ...en.challenges, title: "Технические задания и квизы - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `Коллекция ровно из ${totalQuizzes} квизов и ${totalQuestionCount} технических вопросов.`, heading: "Технические задания и квизы", introOne: "От HTML и CSS до Node.js и SQL: эти квизы наполнены находками из реального карьерного опыта.", introTwo: "Они иногда сложные и проверяют знание странностей и крайних случаев разных технологий.", factOne: "Забавный факт: это мой блок сдерживания.", factTwo: "Забавный факт: прохождение всех квизов открывает особый опыт на сайте.", factThree: "Забавный факт: «забавные факты» не всегда забавные и не всегда факты." },
    openSource: { ...en.openSource, title: "Open source журнал Dan", subTitle: "По крайней мере те, что я помню", heading: "Мой лог вкладов", quote: "Хочется верить, что я вношу вклад в open source из благородного альтруизма. Скорее всего, я просто хочу исправить проблему, с которой столкнулся." },
    category: { ...en.category, title: "DanLevy.net по категориям", description: (catCount, totalCount) => `${catCount} категорий и ${totalCount} статей`, heading: "Статьи по категориям", breadcrumb: "Категория /", pageTitle: (category) => `Категория: ${category}`, found: (count) => `Найдено статей: ${count}` },
  },
  de: {
    ...en,
    site: { description: "Coder | Leader | Denker | Tüftler", seoDescription: "Komm wegen des Codes, bleib wegen des Handwerks." },
    nav: { ...en.nav, primaryLabel: "Hauptnavigation", searchLabel: "Suche", searchTitle: "Suchleiste ein- oder ausblenden", articles: "Artikel", quizzes: "Quizze", quizzesText: "Probiere Dans Challenges.", categories: "Kategorien", popular: "Beliebt", recent: "Neu", projects: "Projekte", demosTitle: "Demos und Beispiele", demosText: "Eine Auswahl meiner Projekte, Experimente und Repos.", openSourceJournal: "Open-Source-Journal", openSourceJournalText: "Ein Journal meiner Open-Source-Beiträge, Projekte und Experimente.", about: "Über mich", aboutText: "Coder | Leader<br />Denker | Tüftler", contactMe: "Kontakt", ossLog: "OSS-Log", resume: "Lebenslauf", languageLabel: "Sprache", languageVersion: "Version", languageUnavailable: "Übersetzung ist noch nicht verfügbar" },
    footer: { ...en.footer, feeds: "Feeds", rssFeed: "RSS-Feed", jsonFeed: "JSON-Feed", quotable: "Zitat", quote: "Wow! Dan, du bist wie ein AI-Mensch!", from: "von", elsewhere: "Anderswo", follow: "Folge mir hier und dort...", share: "Diese Seite teilen", copied: "Link kopiert", consulting: "Beratung", ctaTitle: "Schwieriges technisches Problem?", ctaText: "AI-Systeme, Security-Reviews, TypeScript-Architektur und Produktionsrettung.", bookCall: "Call buchen", related: "Ähnliche Artikel", readMore: "Mehr von Dan Levy lesen", subscribe: "Abonnieren", credits: "Site-Credits", rights: "Alle Rechte rebased.", coverAltSuffix: "Artikelbild" },
    home: { ...en.home, title: `${SITE_TITLE} | Komm wegen des Codes, bleib wegen des Handwerks.`, eyebrow: "Notizen aus dem Feld", heading: "Notizen von dort, wo die Doku aufhört.", intro: "AI-Systeme, JavaScript, Security, Datenbanken und Bugfixes, die man behalten sollte.", resourcesEyebrow: "Ressourcen", resourcesTitle: "Hilf mir, dir zu helfen", resourcesText: "Consulting-Arbeit und Open-Source-Notizen.", hireKicker: "Beauftragen", hireTitle: "Bessere AI-Systeme bauen", ossKicker: "Open-Source-Log", ossTitle: "Den Commits folgen", latestEyebrow: "Neueste Texte", latestTitle: "Aktuelle Artikel", latestText: "Lies das Neueste hier." },
    about: { ...en.about, title: "Über mich", heading: "Über mich", name: "Dan Levy", summary: "Dan ist ein erfahrener Programmierer, Lehrer, Mentor und Leader. Er hat über 20 Jahre professionelle Erfahrung in Softwareentwicklung, Consulting, Agile-Teamaufbau, Architektur, Security-Audits, Accessibility-Reviews und UI/UX-Analyse.", reputation: "Nach Jahren in Software-Patterns und Architektur ist Dan ein gefragter Experte mit einem Ruf für praktische, motivierende Vorträge.", openSource: "Als aktiver Contributor vieler Open-Source-Projekte lernt Dan ständig über Sprachen, Methoden, Patterns und Codestile hinweg.", resume: "Dans Lebenslauf herunterladen" },
    contact: { ...en.contact, title: "Dan kontaktieren", heading: "Dan kontaktieren", validationName: "Der Name muss mindestens 2 Zeichen lang sein.", validationEmail: "Bitte gib eine gültige E-Mail-Adresse ein.", validationMessage: "Die Nachricht muss mindestens 5 Zeichen lang sein.", successTitle: "Erfolgreich gesendet", sent: "Gesendet", botLabel: "Liebe Menschen, dieses Feld leer lassen", botPlaceholder: "Für Roboter...", name: "Ihr Name", email: "E-Mail", message: "Nachricht", messagePlaceholder: "Schreib deine Nachricht hier.", thanks: "Danke für deine Nachricht.", error: "Beim Senden deiner Nachricht ist ein Fehler aufgetreten. Bitte prüfe das Formular und versuche es erneut.", submit: "Nachricht senden" },
    challenges: { ...en.challenges, title: "Tech-Challenges und Quizze - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `Eine Sammlung von genau ${totalQuizzes} Quizzen und ${totalQuestionCount} technischen Fragen.`, heading: "Tech-Challenges und Quizze", introOne: "Von HTML und CSS bis Node.js und SQL: Diese Quizze enthalten Lektionen aus echten Berufserfahrungen.", introTwo: "Sie sollen stellenweise anspruchsvoll sein und prüfen Eigenheiten und Randfälle verschiedener Technologien.", factOne: "Fun Fact: Das ist meine Eindämmungseinheit.", factTwo: "Fun Fact: Wer alle Quizze abschließt, schaltet eine besondere Erfahrung auf der Site frei.", factThree: "Fun Fact: „Fun Facts“ sind nicht unbedingt fun oder facts." },
    openSource: { ...en.openSource, title: "Dans Open-Source-Journal", subTitle: "Zumindest die, an die ich mich erinnere", heading: "Mein Beitragslog", quote: "Ich würde gern glauben, dass ich aus edlem, altruistischem Geist zu Open Source beitrage. Wahrscheinlich will ich einfach das Problem beheben, vor dem ich gerade stehe." },
    category: { ...en.category, title: "DanLevy.net nach Kategorie", description: (catCount, totalCount) => `${catCount} Kategorien und ${totalCount} Artikel`, heading: "Artikel nach Kategorie", breadcrumb: "Kategorie /", pageTitle: (category) => `Kategorie: ${category}`, found: (count) => `${count} Artikel gefunden` },
  },
  fr: {
    ...en,
    site: { description: "Codeur | Leader | Penseur | Bricoleur", seoDescription: "Venez pour le code, restez pour le métier." },
    nav: { ...en.nav, primaryLabel: "Navigation principale", searchLabel: "Recherche", searchTitle: "Afficher ou masquer le panneau de recherche", articles: "Tous les articles", quizzes: "Quiz", quizzesText: "Essayez les défis de Dan.", categories: "Catégories", popular: "Populaire", recent: "Récent", projects: "Projets", demosTitle: "Démos et exemples", demosText: "Une sélection de mes projets, expériences et dépôts.", openSourceJournal: "Journal open source", openSourceJournalText: "Un journal de mes contributions, projets et expériences open source.", about: "À propos", aboutText: "Codeur | Leader<br />Penseur | Bricoleur", contactMe: "Me contacter", ossLog: "Journal OSS", resume: "CV", languageLabel: "Langue", languageVersion: "version traduite", languageUnavailable: "traduction pas encore disponible" },
    footer: { ...en.footer, feeds: "Flux", rssFeed: "Flux RSS", jsonFeed: "Flux JSON", quotable: "Citation", quote: "Waouh ! Dan, tu es comme un homme-IA !", from: "de", elsewhere: "Ailleurs", follow: "Suivez-moi un peu partout...", share: "Partager cette page", copied: "Lien copié", consulting: "Conseil", ctaTitle: "Problème technique difficile ?", ctaText: "Systèmes d'IA, revues de sécurité, architecture TypeScript et sauvetage de production.", bookCall: "Réserver un appel", related: "Articles liés", readMore: "Lire davantage de Dan Levy", subscribe: "S'abonner", credits: "Crédits du site", rights: "Tous droits rebasés.", coverAltSuffix: "couverture de l'article" },
    home: { ...en.home, title: `${SITE_TITLE} | Venez pour le code, restez pour le métier.`, eyebrow: "Notes de terrain", heading: "Notes depuis l'endroit où la documentation s'arrête.", intro: "Systèmes d'IA, JavaScript, sécurité, bases de données et corrections de bugs à retenir.", resourcesEyebrow: "Ressources", resourcesTitle: "Aidez-moi à vous aider", resourcesText: "Conseil et notes open source.", hireKicker: "Me recruter", hireTitle: "Construire de meilleurs systèmes d'IA", ossKicker: "Journal open source", ossTitle: "Suivre les commits", latestEyebrow: "Derniers textes", latestTitle: "Écriture récente", latestText: "Lisez les nouveautés ici." },
    about: { ...en.about, title: "À propos de moi", heading: "À propos", name: "Dan Levy", summary: "Dan est programmeur, enseignant, mentor et leader accompli. Il a plus de 20 ans d'expérience professionnelle en développement logiciel, conseil, construction d'équipes Agile, architecture, audits de sécurité, revues d'accessibilité et analyse UI/UX.", reputation: "Après des années de travail sur les patterns et l'architecture logicielle, Dan est devenu un expert recherché pour des interventions pratiques et motivantes.", openSource: "Contributeur actif de nombreux projets open source, Dan continue d'apprendre à travers les langages, méthodes, patterns et styles de code.", resume: "Télécharger le CV de Dan" },
    contact: { ...en.contact, title: "Contacter Dan", heading: "Contacter Dan", validationName: "Le nom doit contenir au moins 2 caractères.", validationEmail: "Veuillez saisir une adresse e-mail valide.", validationMessage: "Le message doit contenir au moins 5 caractères.", successTitle: "Envoi réussi", sent: "Envoyé", botLabel: "Humains, laissez ce champ vide", botPlaceholder: "Pour les robots...", name: "Nom", email: "E-mail", message: "Votre message", messagePlaceholder: "Écrivez votre message ici.", thanks: "Merci pour votre message.", error: "Une erreur s'est produite lors de l'envoi. Vérifiez le formulaire et réessayez.", submit: "Envoyer le message" },
    challenges: { ...en.challenges, title: "Défis techniques et quiz - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `Une collection d'exactement ${totalQuizzes} quiz et ${totalQuestionCount} questions techniques.`, heading: "Défis techniques et quiz", introOne: "De HTML et CSS à Node.js et SQL, ces quiz contiennent des leçons inspirées d'expériences professionnelles réelles.", introTwo: "Ils sont conçus pour être parfois difficiles et tester les bizarreries et cas limites de diverses technologies.", factOne: "Fait amusant : ceci est mon unité de confinement.", factTwo: "Fait amusant : terminer tous les quiz débloque une expérience spéciale sur le site.", factThree: "Fait amusant : les « faits amusants » ne sont pas toujours amusants, ni des faits." },
    openSource: { ...en.openSource, title: "Journal open source de Dan", subTitle: "Au moins ceux dont je me souviens", heading: "Mon journal de contributions", quote: "J'aimerais croire que je contribue à l'open source par noble esprit altruiste. Il y a de fortes chances que je veuille simplement corriger le problème que j'ai sous les yeux." },
    category: { ...en.category, title: "DanLevy.net par catégorie", description: (catCount, totalCount) => `${catCount} catégories et ${totalCount} articles`, heading: "Articles par catégorie", breadcrumb: "Catégorie /", pageTitle: (category) => `Catégorie : ${category}`, found: (count) => `${count} articles trouvés` },
  },
  it: {
    ...en,
    site: { description: "Coder | Leader | Pensatore | Smanettone", seoDescription: "Vieni per il codice, resta per il mestiere." },
    nav: { ...en.nav, primaryLabel: "Navigazione principale", searchLabel: "Cerca", searchTitle: "Apri o chiudi il pannello di ricerca", articles: "Articoli", quizzes: "Quiz", quizzesText: "Prova le sfide di Dan.", categories: "Categorie", popular: "Popolari", recent: "Recenti", projects: "Progetti", demosTitle: "Demo ed esempi", demosText: "Una selezione di progetti, esperimenti e repository.", openSourceJournal: "Diario open source", openSourceJournalText: "Un diario dei miei contributi, progetti ed esperimenti open source.", about: "Chi sono", aboutText: "Coder | Leader<br />Pensatore | Smanettone", contactMe: "Contattami", ossLog: "Log OSS", resume: "Curriculum", languageLabel: "Lingua", languageVersion: "versione", languageUnavailable: "traduzione non ancora disponibile" },
    footer: { ...en.footer, feeds: "Feed", rssFeed: "Feed RSS", jsonFeed: "Feed JSON", quotable: "Citabile", quote: "Wow! Dan, sei tipo un uomo-AI!", from: "da", elsewhere: "Altrove", follow: "Seguimi un po' in giro...", share: "Condividi questa pagina", copied: "Link copiato", consulting: "Consulenza", ctaTitle: "Problema tecnico difficile?", ctaText: "Sistemi di IA, revisioni di sicurezza, architettura TypeScript e salvataggi in produzione.", bookCall: "Prenota una call", related: "Articoli correlati", readMore: "Leggi altro di Dan Levy", subscribe: "Iscriviti", credits: "Crediti del sito", rights: "Tutti i diritti rebasati.", coverAltSuffix: "copertina dell'articolo" },
    home: { ...en.home, title: `${SITE_TITLE} | Vieni per il codice, resta per il mestiere.`, eyebrow: "Note dal campo", heading: "Note da dove la documentazione finisce.", intro: "Sistemi di IA, JavaScript, sicurezza, database e bug fix da ricordare.", resourcesEyebrow: "Risorse", resourcesTitle: "Aiutami ad aiutarti", resourcesText: "Consulenza e note open source.", hireKicker: "Assumimi", hireTitle: "Costruire sistemi di IA migliori", ossKicker: "Log open source", ossTitle: "Segui i commit", latestEyebrow: "Ultimi scritti", latestTitle: "Scritti recenti", latestText: "Leggi le novità qui." },
    about: { ...en.about, title: "Chi sono", heading: "Chi sono", name: "Dan Levy", summary: "Dan è un programmatore, insegnante, mentor e leader esperto. Ha oltre 20 anni di esperienza professionale nello sviluppo software, consulenza, creazione di team Agile, architettura, audit di sicurezza, revisioni di accessibilità e analisi UI/UX.", reputation: "Dopo anni di lavoro su pattern e architettura software, Dan è diventato un esperto richiesto per interventi pratici e motivanti.", openSource: "Come contributore attivo di molti progetti open source, Dan continua a imparare tra linguaggi, metodologie, pattern e stili di codice.", resume: "Scarica il curriculum di Dan" },
    contact: { ...en.contact, title: "Contatta Dan", heading: "Contatta Dan", validationName: "Il nome deve contenere almeno 2 caratteri.", validationEmail: "Inserisci un indirizzo email valido.", validationMessage: "Il messaggio deve contenere almeno 5 caratteri.", successTitle: "Inviato correttamente", sent: "Inviato", botLabel: "Umani, lasciate vuoto questo campo", botPlaceholder: "Per i robot...", name: "Nome", email: "Email", message: "Messaggio", messagePlaceholder: "Scrivi qui il tuo messaggio.", thanks: "Grazie per aver scritto.", error: "Si è verificato un errore durante l'invio. Controlla il modulo e riprova.", submit: "Invia messaggio" },
    challenges: { ...en.challenges, title: "Sfide tecniche e quiz - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `Una raccolta di esattamente ${totalQuizzes} quiz e ${totalQuestionCount} domande tecniche.`, heading: "Sfide tecniche e quiz", introOne: "Da HTML e CSS a Node.js e SQL, questi quiz contengono lezioni ispirate a esperienze professionali reali.", introTwo: "Sono pensati per essere impegnativi e per mettere alla prova stranezze e casi limite di varie tecnologie.", factOne: "Curiosità: questa è la mia unità di contenimento.", factTwo: "Curiosità: completare tutti i quiz sblocca un'esperienza speciale sul sito.", factThree: "Curiosità: le «curiosità» non sono necessariamente curiose, né fatti." },
    openSource: { ...en.openSource, title: "Diario open source di Dan", subTitle: "Almeno quelli che ricordo", heading: "Il mio log dei contributi", quote: "Mi piacerebbe credere di contribuire all'open source per nobile spirito altruista. Probabilmente voglio solo risolvere il problema che ho davanti." },
    category: { ...en.category, title: "DanLevy.net per categoria", description: (catCount, totalCount) => `${catCount} categorie e ${totalCount} articoli`, heading: "Articoli per categoria", breadcrumb: "Categoria /", pageTitle: (category) => `Categoria: ${category}`, found: (count) => `${count} articoli trovati` },
  },
  ar: {
    ...en,
    site: { description: "مبرمج | قائد | مفكر | محب للتجريب", seoDescription: "تعال من أجل الكود، وابق من أجل الحرفة." },
    nav: { ...en.nav, primaryLabel: "التنقل الرئيسي", searchLabel: "بحث", searchTitle: "تبديل لوحة البحث", articles: "مقالات", quizzes: "اختبارات", quizzesText: "جرّب تحديات Dan.", categories: "تصنيفات", popular: "الأكثر شيوعًا", recent: "الأحدث", projects: "مشاريع", demosTitle: "عروض وأمثلة", demosText: "مجموعة من مشاريعي وتجاربي ومستودعاتي.", openSourceJournal: "يوميات المصدر المفتوح", openSourceJournalText: "يوميات عن مساهماتي ومشاريعي وتجاريبي في المصدر المفتوح.", about: "نبذة", aboutText: "مبرمج | قائد<br />مفكر | محب للتجريب", contactMe: "تواصل معي", ossLog: "سجل OSS", resume: "السيرة الذاتية", languageLabel: "اللغة", languageVersion: "نسخة", languageUnavailable: "الترجمة غير متاحة بعد" },
    footer: { ...en.footer, feeds: "الخلاصات", rssFeed: "خلاصة RSS", jsonFeed: "خلاصة JSON", quotable: "اقتباس", quote: "رائع! Dan، أنت مثل رجل ذكاء اصطناعي!", from: "من", elsewhere: "أماكن أخرى", follow: "تابعني في أماكن مختلفة...", share: "مشاركة هذه الصفحة", copied: "تم نسخ الرابط", consulting: "استشارات", ctaTitle: "مشكلة تقنية صعبة؟", ctaText: "أنظمة ذكاء اصطناعي، مراجعات أمنية، بنية TypeScript، وإنقاذ الإنتاج.", bookCall: "احجز مكالمة", related: "مقالات ذات صلة", readMore: "اقرأ المزيد من Dan Levy", subscribe: "اشترك", credits: "اعتمادات الموقع", rights: "جميع الحقوق محفوظة ومُعاد ترتيبها.", coverAltSuffix: "غلاف المقال" },
    home: { ...en.home, title: `${SITE_TITLE} | تعال من أجل الكود، وابق من أجل الحرفة.`, eyebrow: "ملاحظات ميدانية", heading: "ملاحظات من حيث تنتهي الوثائق.", intro: "أنظمة ذكاء اصطناعي، JavaScript، أمن، قواعد بيانات، وإصلاحات أخطاء تستحق التذكر.", resourcesEyebrow: "موارد", resourcesTitle: "ساعدني كي أساعدك", resourcesText: "أعمال استشارية وملاحظات عن المصدر المفتوح.", hireKicker: "وظّفني", hireTitle: "ابنِ أنظمة ذكاء اصطناعي أفضل", ossKicker: "سجل المصدر المفتوح", ossTitle: "تابع الـ commits", latestEyebrow: "أحدث الكتابات", latestTitle: "كتابات حديثة", latestText: "اقرأ الأحدث هنا." },
    about: { ...en.about, title: "نبذة عني", heading: "نبذة", name: "Dan Levy", summary: "Dan مبرمج ومعلم ومرشد وقائد متمرس. لديه أكثر من 20 عامًا من الخبرة المهنية في تطوير البرمجيات، والاستشارات، وبناء فرق Agile، والهندسة، وتدقيق الأمن، ومراجعات الوصول، وتحليل UI/UX.", reputation: "بعد سنوات من العمل في أنماط البرمجيات والهندسة، أصبح Dan خبيرًا مطلوبًا بسمعة في تقديم محاضرات عملية ومحفزة.", openSource: "بصفته مساهمًا نشطًا في العديد من مشاريع المصدر المفتوح، يواصل Dan التعلم عبر اللغات والمنهجيات والأنماط وأساليب الكود.", resume: "تنزيل سيرة Dan الذاتية" },
    contact: { ...en.contact, title: "تواصل مع Dan", heading: "تواصل مع Dan", validationName: "يجب أن يتكون الاسم من حرفين على الأقل.", validationEmail: "يرجى إدخال بريد إلكتروني صالح.", validationMessage: "يجب أن تتكون الرسالة من 5 أحرف على الأقل.", successTitle: "تم الإرسال بنجاح", sent: "تم الإرسال", botLabel: "أيها البشر، اتركوا هذا الحقل فارغًا", botPlaceholder: "للروبوتات...", name: "الاسم", email: "البريد الإلكتروني", message: "الرسالة", messagePlaceholder: "اكتب رسالتك هنا.", thanks: "شكرًا لتواصلك.", error: "حدث خطأ أثناء إرسال رسالتك. تحقق من النموذج وحاول مرة أخرى.", submit: "إرسال الرسالة" },
    challenges: { ...en.challenges, title: "تحديات واختبارات تقنية - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `مجموعة تضم بالضبط ${totalQuizzes} اختبارات و${totalQuestionCount} أسئلة تقنية.`, heading: "تحديات واختبارات تقنية", introOne: "من HTML وCSS إلى Node.js وSQL، تمتلئ هذه الاختبارات بدروس مستوحاة من تجارب مهنية حقيقية.", introTwo: "صُممت لتكون صعبة أحيانًا، وقد تختبر معرفتك بالغرائب والحالات الحدية في تقنيات مختلفة.", factOne: "معلومة طريفة: هذه وحدة الاحتواء الخاصة بي.", factTwo: "معلومة طريفة: إكمال كل الاختبارات يفتح تجربة خاصة على الموقع.", factThree: "معلومة طريفة: «المعلومات الطريفة» ليست بالضرورة طريفة أو معلومات." },
    openSource: { ...en.openSource, title: "يوميات Dan في المصدر المفتوح", subTitle: "على الأقل ما أستطيع تذكره", heading: "سجل مساهماتي", quote: "أود أن أصدق أنني أساهم في المصدر المفتوح بدافع نبيل وإيثاري. غالبًا أنا فقط أريد إصلاح المشكلة التي أواجهها." },
    category: { ...en.category, title: "DanLevy.net حسب التصنيف", description: (catCount, totalCount) => `${catCount} تصنيفات و${totalCount} مقالات`, heading: "المقالات حسب التصنيف", breadcrumb: "تصنيف /", pageTitle: (category) => `تصنيف: ${category}`, found: (count) => `تم العثور على ${count} مقالات` },
  },
  he: {
    ...en,
    site: { description: "מקודד | מנהיג | חושב | מתקן דברים", seoDescription: "בואו בשביל הקוד, הישארו בשביל המלאכה." },
    nav: { ...en.nav, primaryLabel: "ניווט ראשי", searchLabel: "חיפוש", searchTitle: "פתיחה או סגירה של חלונית החיפוש", articles: "מאמרים", quizzes: "חידונים", quizzesText: "נסו את האתגרים של Dan.", categories: "קטגוריות", popular: "פופולרי", recent: "אחרונים", projects: "פרויקטים", demosTitle: "דמואים ודוגמאות", demosText: "מבחר מהפרויקטים, הניסויים והמאגרים שלי.", openSourceJournal: "יומן קוד פתוח", openSourceJournalText: "יומן של תרומות, פרויקטים וניסויים בקוד פתוח.", about: "אודות", aboutText: "מקודד | מנהיג<br />חושב | מתקן דברים", contactMe: "צרו קשר", ossLog: "יומן OSS", resume: "קורות חיים", languageLabel: "שפה", languageVersion: "גרסה", languageUnavailable: "התרגום עדיין לא זמין" },
    footer: { ...en.footer, feeds: "פידים", rssFeed: "פיד RSS", jsonFeed: "פיד JSON", quotable: "ציטוט", quote: "וואו! Dan, אתה כמו איש AI!", from: "מאת", elsewhere: "במקומות אחרים", follow: "עקבו אחריי בכל מיני מקומות...", share: "שתפו את העמוד הזה", copied: "הקישור הועתק", consulting: "ייעוץ", ctaTitle: "בעיה טכנית קשה?", ctaText: "מערכות AI, סקירות אבטחה, ארכיטקטורת TypeScript וחילוץ פרודקשן.", bookCall: "קבעו שיחה", related: "מאמרים קשורים", readMore: "קראו עוד מאת Dan Levy", subscribe: "הרשמה", credits: "קרדיטים לאתר", rights: "כל הזכויות עברו rebase.", coverAltSuffix: "תמונת שער למאמר" },
    home: { ...en.home, title: `${SITE_TITLE} | בואו בשביל הקוד, הישארו בשביל המלאכה.`, eyebrow: "רשימות מהשטח", heading: "רשימות מהמקום שבו התיעוד נגמר.", intro: "מערכות AI, JavaScript, אבטחה, מסדי נתונים ותיקוני באגים ששווה לזכור.", resourcesEyebrow: "משאבים", resourcesTitle: "עזרו לי לעזור לכם", resourcesText: "עבודת ייעוץ ורשימות קוד פתוח.", hireKicker: "שכרו אותי", hireTitle: "בונים מערכות AI טובות יותר", ossKicker: "יומן קוד פתוח", ossTitle: "עקבו אחרי הקומיטים", latestEyebrow: "כתיבה אחרונה", latestTitle: "מאמרים אחרונים", latestText: "קראו את החדש כאן." },
    about: { ...en.about, title: "עליי", heading: "אודות", name: "Dan Levy", summary: "Dan הוא מתכנת, מורה, מנטור ומנהיג מנוסה. יש לו יותר מ-20 שנות ניסיון מקצועי בפיתוח תוכנה, ייעוץ, בניית צוותי Agile, ארכיטקטורה, ביקורות אבטחה, ביקורות נגישות וניתוח UI/UX.", reputation: "אחרי שנים של עבודה בדפוסי תוכנה וארכיטקטורה, Dan הפך למומחה מבוקש עם מוניטין להרצאות מעשיות ומעודדות.", openSource: "כתורם פעיל לפרויקטי קוד פתוח רבים, Dan ממשיך ללמוד דרך שפות, מתודולוגיות, דפוסים וסגנונות קוד.", resume: "הורדת קורות החיים של Dan" },
    contact: { ...en.contact, title: "צרו קשר עם Dan", heading: "צרו קשר עם Dan", validationName: "השם חייב להכיל לפחות 2 תווים.", validationEmail: "נא להזין כתובת אימייל תקינה.", validationMessage: "ההודעה חייבת להכיל לפחות 5 תווים.", successTitle: "נשלח בהצלחה", sent: "נשלח", botLabel: "בני אדם, השאירו את השדה הזה ריק", botPlaceholder: "בשביל הרובוטים...", name: "שם", email: "אימייל", message: "הודעה", messagePlaceholder: "כתבו את ההודעה כאן.", thanks: "תודה שפניתם.", error: "אירעה שגיאה בשליחת ההודעה. בדקו את הטופס ונסו שוב.", submit: "שליחת הודעה" },
    challenges: { ...en.challenges, title: "אתגרים וחידונים טכניים - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `אוסף של בדיוק ${totalQuizzes} חידונים ו-${totalQuestionCount} שאלות טכניות.`, heading: "אתגרים וחידונים טכניים", introOne: "מ-HTML ו-CSS ועד Node.js ו-SQL, החידונים האלה מלאים בתובנות שמגיעות מניסיון קריירה אמיתי.", introTwo: "הם נועדו להיות מאתגרים לפעמים, ולבדוק היכרות עם מוזרויות ומקרי קצה של טכנולוגיות שונות.", factOne: "עובדה משעשעת: זו יחידת ההכלה שלי.", factTwo: "עובדה משעשעת: השלמת כל החידונים פותחת חוויה מיוחדת באתר.", factThree: "עובדה משעשעת: «עובדות משעשעות» אינן בהכרח משעשעות או עובדות." },
    openSource: { ...en.openSource, title: "יומן הקוד הפתוח של Dan", subTitle: "לפחות אלה שאני זוכר", heading: "יומן התרומות שלי", quote: "הייתי רוצה להאמין שאני תורם לקוד פתוח מתוך רוח אצילית ואלטרואיסטית. סביר יותר שאני פשוט רוצה לתקן את הבעיה שמולי." },
    category: { ...en.category, title: "DanLevy.net לפי קטגוריה", description: (catCount, totalCount) => `${catCount} קטגוריות ו-${totalCount} מאמרים`, heading: "מאמרים לפי קטגוריה", breadcrumb: "קטגוריה /", pageTitle: (category) => `קטגוריה: ${category}`, found: (count) => `נמצאו ${count} מאמרים` },
  },
  zh: {
    ...en,
    site: { description: "程序员 | 领导者 | 思考者 | 折腾者", seoDescription: "为代码而来，为手艺留下。" },
    nav: { ...en.nav, primaryLabel: "主导航", searchLabel: "搜索", searchTitle: "切换搜索面板", articles: "文章", quizzes: "测验", quizzesText: "试试 Dan 的挑战。", categories: "分类", popular: "热门", recent: "最新", projects: "项目", demosTitle: "演示与示例", demosText: "我的项目、实验和仓库精选。", openSourceJournal: "开源日志", openSourceJournalText: "记录我的开源贡献、项目和实验。", about: "关于", aboutText: "程序员 | 领导者<br />思考者 | 折腾者", contactMe: "联系我", ossLog: "OSS 日志", resume: "简历", languageLabel: "语言", languageVersion: "版本", languageUnavailable: "翻译尚不可用" },
    footer: { ...en.footer, feeds: "订阅源", rssFeed: "RSS 订阅源", jsonFeed: "JSON 订阅源", quotable: "可引用", quote: "哇！Dan，你就像个 AI 人！", from: "来自", elsewhere: "其他地方", follow: "在各处关注我...", share: "分享此页面", copied: "链接已复制", consulting: "咨询", ctaTitle: "棘手的技术问题？", ctaText: "AI 系统、安全评审、TypeScript 架构，以及生产环境救援。", bookCall: "预约通话", related: "相关文章", readMore: "阅读 Dan Levy 的更多文章", subscribe: "订阅", credits: "网站鸣谢", rights: "保留所有 rebased 权利。", coverAltSuffix: "文章封面" },
    home: { ...en.home, title: `${SITE_TITLE} | 为代码而来，为手艺留下。`, eyebrow: "现场笔记", heading: "来自文档尽头的笔记。", intro: "AI 系统、JavaScript、安全、数据库，以及值得记住的 bug 修复。", resourcesEyebrow: "资源", resourcesTitle: "帮我帮你", resourcesText: "咨询工作和开源笔记。", hireKicker: "雇用我", hireTitle: "构建更好的 AI 系统", ossKicker: "开源日志", ossTitle: "追踪提交", latestEyebrow: "最新写作", latestTitle: "近期文章", latestText: "在这里阅读最新内容。" },
    about: { ...en.about, title: "关于我", heading: "关于", name: "Dan Levy", summary: "Dan 是一位经验丰富的程序员、教师、导师和领导者。他在软件开发、咨询、Agile 团队建设、架构、安全审计、无障碍评审和 UI/UX 分析方面拥有 20 多年的专业经验。", reputation: "多年研究软件模式和架构之后，Dan 成为备受寻求的主题专家，以务实且有激励性的演讲而闻名。", openSource: "作为多个开源项目的活跃贡献者，Dan 持续从语言、方法论、模式和代码风格中学习。", resume: "下载 Dan 的简历" },
    contact: { ...en.contact, title: "联系 Dan", heading: "联系 Dan", validationName: "姓名至少需要 2 个字符。", validationEmail: "请输入有效的电子邮箱地址。", validationMessage: "消息至少需要 5 个字符。", successTitle: "提交成功", sent: "已发送", botLabel: "人类朋友们，请留空此字段", botPlaceholder: "给机器人用...", name: "姓名", email: "电子邮箱", message: "消息", messagePlaceholder: "在这里输入你的消息。", thanks: "感谢联系。", error: "发送消息时出错。请检查表单后重试。", submit: "发送消息" },
    challenges: { ...en.challenges, title: "技术挑战与测验 - DanLevy.net", subTitle: (totalQuizzes, totalQuestionCount) => `这里正好有 ${totalQuizzes} 个测验和 ${totalQuestionCount} 道技术题。`, heading: "技术挑战与测验", introOne: "从 HTML 和 CSS 到 Node.js 与 SQL，这些测验包含来自真实职业经历的知识点。", introTwo: "它们有时会很有挑战性，也会考察各种技术的怪癖和边界情况。", factOne: "趣味事实：这是我的收容单元。", factTwo: "趣味事实：完成所有测验会解锁网站上的特殊体验。", factThree: "趣味事实：“趣味事实”不一定有趣，也不一定是事实。" },
    openSource: { ...en.openSource, title: "Dan 的开源日志", subTitle: "至少是我还记得的那些", heading: "我的贡献记录", quote: "我愿意相信自己贡献开源是出于某种高尚的利他精神。更可能的是，我只是想修掉眼前这个问题。" },
    category: { ...en.category, title: "DanLevy.net 分类浏览", description: (catCount, totalCount) => `${catCount} 个分类，${totalCount} 篇文章`, heading: "按分类浏览文章", breadcrumb: "分类 /", pageTitle: (category) => `分类：${category}`, found: (count) => `找到 ${count} 篇文章` },
  },
};

export function getUiCopy(locale: Locale = DEFAULT_LOCALE): UiCopy {
  return copies[locale] ?? copies[DEFAULT_LOCALE];
}
