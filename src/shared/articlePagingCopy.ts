import { DEFAULT_LOCALE, type Locale } from "./i18n";
// Order: idle, loading, retry, failure, end, announcement ({count}/{total}).
const labels: Record<Locale, readonly string[]> = {
  en: ["More posts", "Loading articles…", "Try again", "Articles could not be loaded. Your place is saved.", "You've reached the end of the articles.", "{count} more articles loaded. {total} articles shown."],
  es: ["Más artículos", "Cargando artículos…", "Intentar de nuevo", "No se pudieron cargar los artículos. Tu posición se conserva.", "Has llegado al final de los artículos.", "{count} artículos más cargados. {total} artículos mostrados."],
  hi: ["और लेख", "लेख लोड हो रहे हैं…", "फिर कोशिश करें", "लेख लोड नहीं हो सके। आपकी जगह सुरक्षित है।", "आप सभी लेख पढ़ चुके हैं।", "{count} और लेख लोड हुए। {total} लेख दिख रहे हैं।"],
  ja: ["もっと読む", "記事を読み込み中…", "再試行", "記事を読み込めませんでした。現在の位置は保持されています。", "すべての記事を表示しました。", "{count}件の記事を追加しました。{total}件を表示中。"],
  ru: ["Ещё статьи", "Загрузка статей…", "Попробовать снова", "Не удалось загрузить статьи. Ваша позиция сохранена.", "Все статьи показаны.", "Загружено ещё {count} статей. Показано: {total}."],
  de: ["Weitere Artikel", "Artikel werden geladen…", "Erneut versuchen", "Die Artikel konnten nicht geladen werden. Deine Position bleibt erhalten.", "Alle Artikel sind angezeigt.", "{count} weitere Artikel geladen. {total} Artikel angezeigt."],
  fr: ["Plus d’articles", "Chargement des articles…", "Réessayer", "Impossible de charger les articles. Votre position est conservée.", "Tous les articles ont été affichés.", "{count} articles supplémentaires chargés. {total} articles affichés."],
  it: ["Altri articoli", "Caricamento degli articoli…", "Riprova", "Impossibile caricare gli articoli. La tua posizione è mantenuta.", "Hai raggiunto la fine degli articoli.", "Caricati altri {count} articoli. {total} articoli visualizzati."],
  ar: ["المزيد من المقالات", "جارٍ تحميل المقالات…", "حاول مرة أخرى", "تعذر تحميل المقالات. تم الاحتفاظ بموضعك.", "وصلت إلى نهاية المقالات.", "تم تحميل {count} مقالات إضافية. يتم عرض {total} مقالات."],
  he: ["מאמרים נוספים", "טוען מאמרים…", "נסו שוב", "לא ניתן לטעון את המאמרים. המיקום שלכם נשמר.", "הגעתם לסוף המאמרים.", "נטענו עוד {count} מאמרים. מוצגים {total} מאמרים."],
  zh: ["更多文章", "正在加载文章…", "重试", "无法加载文章。您的阅读位置已保留。", "已显示全部文章。", "已加载另外 {count} 篇文章。共显示 {total} 篇。"],
};
export function getArticlePagingCopy(locale: Locale = DEFAULT_LOCALE) {
  const [idle, loading, retry, failure, end, announcement] = labels[locale] ?? labels.en;
  return { idle, loading, retry, failure, end, announcement };
}
