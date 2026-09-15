import { isLocale, type Locale } from "../../shared/i18n";

const keys = ["showExplanation", "hideExplanation", "hint", "dismiss", "hideHints", "previous", "next", "goTo", "score", "reset", "resetLabel", "celebrate", "completed", "perfect", "done", "misses", "tries"] as const;
type Messages = Record<typeof keys[number], string>;
type MessageValues<T extends readonly unknown[]> = { readonly [K in keyof T]: string };
const translations: Record<Locale, MessageValues<typeof keys>> = {
  en: ["Show explanation", "Hide explanation", "Hint", "Dismiss", "Hide next 5 hints", "Previous question", "Next question", "Go to question {n}", "Score", "Retake quiz", "Reset quiz progress", "Well done!", "Quiz completed", "Perfect!", "All done!", "Incorrect attempts: {n}", "Attempts: {n}"],
  he: ["הצגת הסבר", "הסתרת הסבר", "רמז", "סגירה", "הסתרת 5 הרמזים הבאים", "השאלה הקודמת", "השאלה הבאה", "מעבר לשאלה {n}", "ניקוד", "התחלת החידון מחדש", "איפוס ההתקדמות בחידון", "כל הכבוד!", "החידון הושלם", "מושלם!", "סיימתם!", "ניסיונות שגויים: {n}", "ניסיונות: {n}"],
  de: ["Erklärung anzeigen", "Erklärung ausblenden", "Hinweis", "Schließen", "Nächste 5 Hinweise ausblenden", "Vorherige Frage", "Nächste Frage", "Zu Frage {n}", "Punkte", "Quiz wiederholen", "Quizfortschritt zurücksetzen", "Gut gemacht!", "Quiz abgeschlossen", "Perfekt!", "Geschafft!", "Fehlversuche: {n}", "Versuche: {n}"],
  hi: ["व्याख्या दिखाएँ", "व्याख्या छिपाएँ", "संकेत", "बंद करें", "अगले 5 संकेत छिपाएँ", "पिछला प्रश्न", "अगला प्रश्न", "प्रश्न {n} पर जाएँ", "अंक", "क्विज़ फिर से शुरू करें", "क्विज़ की प्रगति रीसेट करें", "बहुत बढ़िया!", "क्विज़ पूरा हुआ", "एकदम सही!", "पूरा हुआ!", "गलत प्रयास: {n}", "प्रयास: {n}"],
  fr: ["Afficher l’explication", "Masquer l’explication", "Indice", "Fermer", "Masquer les 5 prochains indices", "Question précédente", "Question suivante", "Aller à la question {n}", "Score", "Recommencer le quiz", "Réinitialiser la progression du quiz", "Bravo !", "Quiz terminé", "Parfait !", "Terminé !", "Tentatives incorrectes : {n}", "Tentatives : {n}"],
  zh: ["显示解释", "隐藏解释", "提示", "关闭", "隐藏接下来5条提示", "上一题", "下一题", "跳到第{n}题", "得分", "重新测验", "重置测验进度", "做得好！", "测验已完成", "全对！", "已完成！", "错误尝试：{n}", "尝试次数：{n}"],
  ja: ["解説を表示", "解説を非表示", "ヒント", "閉じる", "次の5件のヒントを非表示", "前の問題", "次の問題", "問題{n}へ", "得点", "もう一度挑戦", "クイズの進捗をリセット", "よくできました！", "クイズ完了", "全問正解！", "完了！", "誤答回数：{n}", "回答回数：{n}"],
  ar: ["إظهار الشرح", "إخفاء الشرح", "تلميح", "إغلاق", "إخفاء التلميحات الخمسة التالية", "السؤال السابق", "السؤال التالي", "الانتقال إلى السؤال {n}", "النتيجة", "إعادة الاختبار", "إعادة تعيين تقدم الاختبار", "أحسنت!", "اكتمل الاختبار", "ممتاز!", "انتهيت!", "المحاولات الخاطئة: {n}", "المحاولات: {n}"],
  es: ["Mostrar explicación", "Ocultar explicación", "Pista", "Cerrar", "Ocultar las próximas 5 pistas", "Pregunta anterior", "Pregunta siguiente", "Ir a la pregunta {n}", "Puntuación", "Repetir el quiz", "Restablecer el progreso", "¡Bien hecho!", "Quiz completado", "¡Perfecto!", "¡Terminado!", "Intentos incorrectos: {n}", "Intentos: {n}"],
  it: ["Mostra spiegazione", "Nascondi spiegazione", "Indizio", "Chiudi", "Nascondi i prossimi 5 indizi", "Domanda precedente", "Domanda successiva", "Vai alla domanda {n}", "Punteggio", "Ripeti il quiz", "Azzera i progressi del quiz", "Ottimo lavoro!", "Quiz completato", "Perfetto!", "Finito!", "Tentativi errati: {n}", "Tentativi: {n}"],
  ru: ["Показать объяснение", "Скрыть объяснение", "Подсказка", "Закрыть", "Скрыть следующие 5 подсказок", "Предыдущий вопрос", "Следующий вопрос", "Перейти к вопросу {n}", "Счёт", "Пройти заново", "Сбросить прогресс викторины", "Отлично!", "Викторина завершена", "Идеально!", "Готово!", "Ошибочных попыток: {n}", "Попыток: {n}"],
};

export function getQuizMessages(locale = "en"): Messages {
  const values = translations[isLocale(locale) ? locale : "en"];
  return Object.fromEntries(keys.map((key, index) => [key, values[index]])) as Messages;
}

export function quizCount(template: string, count: number) {
  return template.replace("{n}", String(count));
}
