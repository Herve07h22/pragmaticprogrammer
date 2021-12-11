// Chapter 5 "Bend or break" p156

/*

1) I dont like monads like Option or Maybe.
They need a bind function to get the value out of the box, compute the result, and
store it in a new box.
In case of Error, it passes uselessy through the pipeline of functions.
So I prefer Exceptions.

2) Waiting for |> operator in Javascript...
Meanwhile, I use Ramda.

*/

import * as fs from "fs";
import { pipe } from "ramda"; 

const readFile: (filename: string) => string = (filename) => {
  console.log(filename);
  const buffer = fs.readFileSync(filename);
  return buffer.toString("utf8");
};

const splitLines: (content: string) => string[] = (content) => {
  if (content) {
    const lines = content.split("\n");
    console.log(`Found ${lines.length} lines in the file`);
    return lines;
  }
  throw new Error("Empty content");
};

const truncateLine = (line: string) => line.slice(0, 20);

const findPattern: (pattern: string) => (lines: string[]) => string[] =
  (pattern) => (lines) =>
    lines.filter((line) => line.includes(pattern)).map(truncateLine);

// Wrapper for a function which could throw an error
function callCanThrow<A, B>(fn: (p: A) => B, props: A) {
  try {
    return fn(props);
  } catch (e: any) {
    return { error: e?.message };
  }
}


const grep = (word: string, filename: string) =>
    callCanThrow(pipe(
        readFile, 
        splitLines, 
        findPattern(word)
    ), filename);

const resultOrError = grep("word", "./pipeline/test_grep.txt");

if ("error" in resultOrError) {
  console.log("Error :", resultOrError.error);
} else {
  console.log("Result :", resultOrError);
}
