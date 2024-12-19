#!/usr/bin/env node

import { createInterface } from "readline";
import { stdin, stdout } from "process";



export async function reIndexChallenges(input = stdin, output = stdout) {
  const rl = createInterface({
    input, //: stdin,
    // output, //: stdout,
    terminal: false,
  });

  let index = 0;

  rl.on("line", (line) => {
    const updatedLine = line.replace(/index=\{(\d+)\}/g, () => `index={${index++}}`);
    output.write(updatedLine + "\n");
    // console.log(updatedLine);
  })
  .on;
}



