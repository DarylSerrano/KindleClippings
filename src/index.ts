import { createReadStream, createWriteStream } from "fs";
import * as stream from "stream";
import { resolve } from "path";
import * as process from "process";
import * as readline from "readline";
import { promisify } from "util";
import { once } from "events";
import { KindleEntry } from "./KindleEntry";

const finished = promisify(stream.finished);

// Need 2 args, filePath of the clippings kindle file, filePath where to save the .tsv generated

async function readFile(path: string): Promise<Array<KindleEntry>> {
  const fileReadLine = readline.createInterface({
    input: createReadStream(path),
    //output: process.stdout,
    terminal: false
  });

  const buffer: Array<string> = []; // Always
  const kindleClipps: Array<KindleEntry> = [];
  let totalLines: number = 0;

  for await (const line of fileReadLine) {
    if (line.includes("==========")) {
      console.log(buffer);

      kindleClipps.push(KindleEntry.createKindleClipp(buffer));
      buffer.splice(0);
    } else {
      buffer.push(line.trim());
    }
    totalLines++;
  }

  return kindleClipps;
}

async function saveToJsonFile(
  clippings: Array<KindleEntry>,
  pathToSave: string
) {
  // Create filestream write
  const outWrittable = createWriteStream(resolve(pathToSave, "out.tsv"));
  for (let i = 0; i < clippings.length; i++) {
    let iterable = [];
    iterable.push(clippings[i].bookTitleAndAuthors);
    iterable.push("\t");
    iterable.push(clippings[i].metdataClipp);
    iterable.push("\t");
    iterable.push(clippings[i].contentClipp);
    iterable.push("\n");

    for (const chunk of iterable) {
      if (!outWrittable.write(chunk)) {
        await once(outWrittable, "drain");
      }
    }
  }

  outWrittable.end();
  await finished(outWrittable);
}

(function doRead(): void {
  readFile(resolve(process.argv[2]))
    .catch(e => {
      console.log("error");
      console.log(e);
    })
    .then((clippings: Array<KindleEntry>) => {
      saveToJsonFile(clippings, process.argv[3]);
    })
    .catch(err => {
      console.log(err);
    });
})();
