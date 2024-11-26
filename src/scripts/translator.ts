import fs from "node:fs";
import path from "node:path";
import axios from "axios";
import yargs from "yargs";
import ISO6391 from "iso-639-1";
import { glob } from "glob";
import { hideBin } from "yargs/helpers";
interface TranslatorOptions {
  sourceFiles: string;
  outputPath: string;
  language: string[];
}
type LangCodes = ReturnType<(typeof ISO6391)["getAllCodes"]>;
type LangNames = ReturnType<(typeof ISO6391)["getAllNames"]>;

export async function Translator(options: TranslatorOptions) {
  let { sourceFiles, outputPath, language } = options;

  const languages: Record<string, string> = Object.fromEntries(
    language
      .map((l) => [l, l.length <= 3 ? ISO6391.getName(l) : l])
      .filter(Boolean),
  );

  console.log("language", languages);
  // Retrieve files based on the glob pattern
  const files = glob.sync(sourceFiles);

  if (!files.length) {
    console.error("No files found matching the provided glob pattern.");
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

  for (const filePath of files) {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    for (const [code, langName] of Object.entries(languages)) {
      try {
        const outputPath = options.outputPath;
        const parts = filePath.split(path.sep);
        const fileName = path.basename(filePath);

        const subDir = parts.slice(parts.length - 2, parts.length - 1);
        const translatedPath = path.join(outputPath, code, subDir[0]);
        if (!fs.existsSync(translatedPath))
          fs.mkdirSync(translatedPath, { recursive: true });

        const translatedFilePath = path.join(translatedPath, fileName);
        const translatedContent = await translateText(fileContent, langName);

        console.log(`Translating ${filePath} to ${langName} ${code}...`, {
          outputPath,
          fileName,
          translatedFilePath,
        });

        fs.writeFileSync(translatedFilePath, translatedContent, "utf-8");

        console.log(`Translated file saved: ${translatedFilePath}`);
      } catch (error) {
        console.error(`Failed to translate ${filePath} to ${code}:`, error);
      }
    }
  }
}

/*
{ 
    "model": "QuantFactory/Mistral-Nemo-Prism-12B-v7-GGUF",
    "messages": [ 
      { "role": "system", "content": "Always answer in rhymes." },
      { "role": "user", "content": "Introduce yourself." }
    ], 
    "temperature": 0.7, 
    "max_tokens": -1,
    "stream": false
}
*/
async function translateText(
  text: string,
  targetLanguage: string,
): Promise<string> {
  const apiUrl =
    process.env.CHAT_API_URL || "http://localhost:1234/v1/chat/completions";
  const apiKey = process.env.CHAT_API_KEY;
  const model =
    process.env.CHAT_API_MODEL ||
    "lmstudio-community/Meta-Llama-3.1-8B-Instruct-GGUF";

  let authentication: Record<string, string> = apiKey
    ? { Authorization: `Bearer ${apiKey}` }
    : {};

  if (!apiUrl) throw new Error("API URL is required.");
  if (!text || text.length < 3)
    throw new Error("Text to translate is too short.");
  if (!targetLanguage) throw new Error("Target language code is required.");

  try {
    const prompt = `Translate the following blog post to ${targetLanguage}.
DO NOT TRANSLATE: special formatting, html tags, \`import\` statements, frontmatter properties, references to source code in English, and CSS class names.
DO NOT TRANSLATE the key strings: title, subTitle, date, modified, tags, category, subCategory, cover_full_width, cover, cover_mobile, cover_icon, cover_credit.
Output the document starting with \`---\`. Omit any notes or editorializing. DO NOT APPEND OR INCLUDE ANYTHING OTHER THAN THE TRANSLATED DOCUMENT.
Add a \`lang: ${targetLanguage}\` property to the end of the frontmatter.
Ensure there are two ---. The first one is the frontmatter separator, the second one is the end of the frontmatter and the start of the content.

\n\`\`\`mdx\n${text}\n\`\`\``;

    console.log("Submitting Prompt:", prompt);
    const response = await axios.post(
      apiUrl,
      {
        model,
        messages: [
          {
            role: "system",
            content: `You are an exceptional technical writer and translator of english to any language.`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: -1,
        stream: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          ...authentication,
        },
      },
    );

    let translatedTextContent = "";
    const translatedText = response.data.choices[0].message.content;

    if (!translatedText)
      throw new Error("No translation returned from the API.");

    let codeBlockIndex = translatedText.indexOf("```mdx");
    let startIndex =
      codeBlockIndex >= 1 ? codeBlockIndex + 6 : translatedText.indexOf("---");
    const endIndex = translatedText.length;
    if (endIndex > 0) {
      const remainingTextAfterCodeBlock = translatedText.slice(endIndex);
      if (remainingTextAfterCodeBlock.length > 5) {
        console.error(
          "Translation contains extra content after code block.",
          remainingTextAfterCodeBlock,
        );
        throw new Error("Translation contains extra content after code block.");
      }
      translatedTextContent = translatedText.slice(startIndex, endIndex);
      // verify size of translated text is roughly the same as original
      if (translatedTextContent.length < text.length * 0.6)
        throw new Error(`Translation is too short. ${translatedTextContent.length} ${text.length}`);
    } else {
      console.error(`UNEXPECTED: Translation does not contain closing code block. %o`, translatedText);
      throw new Error(`UNEXPECTED: Translation does not contain closing code block. ${translatedText.length}`);
    }
    // Inject metadata into the translated text
    const metadata = `<!-- Translated from English to ${targetLanguage} -->
<!-- Original text length: ${text.length} characters -->
<!-- Translated text length: ${translatedTextContent.length} characters -->
<!-- Translation API: ${apiUrl} -->
<!-- Translation model: ${model} -->
<!-- Translation date: ${new Date().toISOString()} -->\n`;

    const finalText = `${translatedTextContent}\n${metadata}`;

    return finalText;
  } catch (error) {
    console.error("Translation API error:", error);
    throw new Error(`Translation API error: ${(error as Error).message}`);
  }
}

// CLI Entry Point
const args = await yargs(hideBin(process.argv))
  // .help('Translate files using the specified options')
  .options({
    sourceFiles: {
      type: "string",
      demandOption: true,
      describe: "Glob pattern for source files to be translated",
    },
    outputPath: {
      type: "string",
      demandOption: true,
      describe: "Path to save translated files",
    },
    language: {
      type: "string",
      demandOption: true,
      describe: "List of language codes to translate files into",
    },
  })
  .demandOption(["sourceFiles", "outputPath", "language"])
  .help("h")
  .alias("h", "help").argv;

console.log("args", args);

if (args.language.length > 0)
  await Translator({
    sourceFiles: args.sourceFiles,
    outputPath: args.outputPath,
    language: Array.isArray(args.language)
      ? args.language
      : args.language.split(","),
  });

// // Example usage:
// Translator({
//   sourceFiles: 'src/**/*.txt',
//   outputPath: 'i18n/',
//   language: ['es', 'fr', 'de'],
// });
