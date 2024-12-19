import { ElementHandle } from "playwright";
import fs from "fs/promises";

export const saveAltText = async (
  quizElement: ElementHandle<SVGElement | HTMLElement>,
  outputPath: string,
) => {
  const quizPlainText = await _getQuizPlainText(quizElement);
  await fs.writeFile(outputPath, quizPlainText, "utf-8");
  return quizPlainText;
}

const _getQuizPlainText = async (
  quizElement: ElementHandle<SVGElement | HTMLElement>,
) => {
  const count: number | string = await (await quizElement.$(".quiz-question-count"))?.innerText()! ?? -1;
  const quizTitle = await (await quizElement.$(".quiz-title"))?.innerText();
  const questionText = await (await quizElement.$(".question"))?.innerText();
  const optionsList = await quizElement.$$(".quiz-options .option");

  const optionsText = await Promise.all(
    optionsList.map(async (option, idx) => {
      return `${idx + 1}. ${await option.innerText()}`;
    }),
  );

  return `# ${count.trim()} ${quizTitle}\n\n${questionText}\n------\n\n${optionsText.join("\n")}\n\n[credit](https://danlevy.net/)\n`;
};
