import { globSync } from 'tinyglobby';
import { readFileSync, writeFileSync } from 'fs';

let quizzes = globSync("./src/content/posts/*quiz*/index.mdx", {onlyFiles: true, cwd: process.cwd()});

// quizzes = quizzes.filter((quiz) => quiz.includes('rusty'));

quizzes.forEach((quiz) => {
  const re = /index=\{(\d+)\}/g;
  const originalContent  = readFileSync(quiz, 'utf-8');
  let content = originalContent;
  let match = null;
  let idxCount = 0;

  while (match = re.exec(content)) {
    const [fullMatch, idx] = match;
    if (idxCount !== parseInt(idx)) {
      console.log('Mismatch! %o %o', idxCount, idx);
      content = content.slice(0, match.index) + `index={${idxCount}}` + content.slice(match.index + fullMatch.length);
    }
    // console.log('Found a match! %o %o', match[0], match.index);
    idxCount++;
  }
  if (content !== originalContent) {
    console.log(`Updating ${quiz}'s ${idxCount} Questions!!!`);
    writeFileSync(quiz, content);
  }

});


console.log(`Checked ${quizzes.length} quizzes! ✅`);
