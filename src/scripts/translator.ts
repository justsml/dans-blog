import fs from "node:fs";
import path from "node:path";
import yargs from "yargs";
import langs, { type Language } from "langs";
import { glob } from "glob";
import { hideBin } from "yargs/helpers";
import { getPrediction } from "../shared/gptAPI.ts";
// import { Readable } from "node:stream";
interface TranslatorOptions {
  sourceFiles: string;
  outputPath: string;
  language: string[];
}
// type LanguageCodes = ReturnType<(typeof ISO6391)["getAllCodes"]>;
// type LangNames = ReturnType<(typeof ISO6391)["getAllNames"]>;

const OVERWRITE_MODE = process.argv.includes("--overwrite");

export async function Translator(options: TranslatorOptions) {
  let { sourceFiles, outputPath, language } = options;

  const languages: Language[] = language
    .map((l): Language | undefined =>
      l.length <= 2
        ? langs.where("1", l) || langs.where("2", l)
        : l.length <= 3
          ? langs.where("3", l)
          : undefined,
    )
    .filter(Boolean) as Language[];

  console.log("language", languages);
  // Retrieve files based on the glob pattern
  const files = glob.sync(sourceFiles);

  if (!files.length) {
    console.error("No files found matching the provided glob pattern.");
    return;
  }

  // Ensure output directory exists
  // if (!fs.existsSync(outputPath)) fs.mkdirSync(outputPath, { recursive: true });

  for (const filePath of files) {
    const fileContent = fs.readFileSync(filePath, "utf-8");

    for (const lang of languages) {
      const {
        local: localLanguageName,
        name: standardLanguageName,
        "2": languageCode,
        "1": languageCodeShort,
        // "3": languageCodeLong,
      } = lang;
      const targetFilePath = filePath.replace(
        /\.mdx?$/,
        `.${languageCodeShort ?? languageCode}.mdx`,
      );

      // Check if we should overwrite any existing file
      if (!args.overwrite && fs.existsSync(targetFilePath)) {
        console.warn(
          `Target file exists! Use --overwrite to overwrite ${targetFilePath}`,
        );
        continue;
      }

      const targetStream = fs.createWriteStream(targetFilePath, {
        flags: OVERWRITE_MODE ? "w" : "wx",
        encoding: "utf-8",
      });
      try {
        const handleWriteFn = (text: string | null) => {
          targetStream.write(text);
        }
        //const extraInstructions = `Prefix all \`.webp\` and \`.gif\` images with prefix: ../../${subDir}.
        // ALSO, prefix markdown image paths with: ../../${subDir}/.
        // ALSO, prefix markdown links with: /${code}/.`;

        // `This file was translated from English to ${langName} using a machine translation API. The translation may not be perfect, so please review and correct any errors.`;
        const translatedContent = await translateText({
          text: fileContent,
          languageCode: languageCode,
          localLanguageName,
          standardLanguageName,
          handleWriteFn,
          // extraInstructions,
        });

        console.log(`Translated ${filePath} to ${standardLanguageName} ${languageCode}...`, {
          outputPath,
          targetFilePath,
          localLanguageName,
        });

        console.log(`Translated file saved: ${targetFilePath}`);
      } catch (error) {
        console.error(`Failed to translate ${filePath} to ${languageCode}:`, error);
      } finally {
        targetStream?.end();
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
async function translateText({
  text,
  languageCode,
  localLanguageName,
  standardLanguageName,
  extraInstructions,
  handleWriteFn,
}: {
  text: string;
  languageCode: string;
  localLanguageName: string;
  standardLanguageName: string;
  extraInstructions?: string;
  handleWriteFn?: (text: string) => void;
}): Promise<boolean> {
  const apiUrl =
    process.env.CHAT_API_URL || "http://192.168.0.87:1234/v1/chat/completions";
  const apiKey = process.env.CHAT_API_KEY;
  const model = process.env.CHAT_API_MODEL || "meta-llama-3-8b-instruct:2";

  let authentication: Record<string, string> = apiKey
    ? { Authorization: `Bearer ${apiKey}` }
    : {};

  console.log({ apiUrl, apiKey, model, authentication });
  if (!apiUrl) throw new Error("API URL is required.");
  if (!text || text.length < 3)
    throw new Error("Text to translate is too short.");
  if (!languageCode) throw new Error("Target language code is required.");

  try {
    const prompt = `
### Content to Translate to ${standardLanguageName} ###
\n\`\`\`mdx\n${text}\n\`\`\``;

    // console.log("Submitting Prompt:", prompt);
    const stream = getPrediction([
      {
        role: "system",
        content: `You are an exceptional technical writer and translator of english to any language.
        ### Instruction ###
Translate the following blog post to ${standardLanguageName}, language code ${languageCode}.

DO NOT TRANSLATE: special formatting, html tags, \`import\` statements, frontmatter properties, references to source code in English, and CSS class names.
DO NOT TRANSLATE frontmatter keys: title, subTitle, date, modified, tags, category, subCategory, cover_full_width, cover, cover_mobile, cover_icon, cover_credit.
DO NOT TRANSLATE the code blocks and inline code snippets.

${extraInstructions || ""}

DO NOT MODIFY LINKS STARTING WITH \`https://\` or \`http://\`.
ALSO, UPDATE TRANSLATED HEADER ID LINKS.

Output the document starting with \`---\`. Omit any notes or editorializing.
DO NOT ADD ANY TEXT BEFORE OR AFTER OUTPUT.
DO NOT PREPEND, APPEND OR INCLUDE ANY COMMENTS OR NOTES IN THE TRANSLATION.
ENSURE \`---\` is included to mark end of frontmatter.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ]);

    // const readable = Readable.from(stream);
    try {
      for await (let response of stream) {
        if (response.startsWith("title:")) {
          console.log("Title detected in response, patch works?");
          response = `language_iso: ${languageCode}\nlanguage_local: ${localLanguageName}\ntitle:`;
        }
        if (handleWriteFn) handleWriteFn(response);
        process.stdout.write(`${response}`);
        // process.stdout.write(`\r${response.slice(0, Math.min(response.length - 1, 100))}...`);
      }
    } catch (error) {
      console.error("Stream error:", error);
      throw new Error(`Stream error: ${(error as Error).message}`);
    }

    // Inject metadata into the translated text
    const metadata = `\n\n{/* Translated from English to ${standardLanguageName}
Original text length: ${text.length} characters
Translation API: ${apiUrl}
Translation model: ${model}
Translation date: ${new Date().toISOString()} */}\n\n`;

    handleWriteFn?.(`\n${metadata}\n`);

    return true;
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
    overwrite: {
      type: "boolean",
      describe: "Overwrite existing files",
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
