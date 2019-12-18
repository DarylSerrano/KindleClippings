import { createReadStream, promises, writeFileSync } from "fs";
import { resolve } from "path";
import * as readline from "readline";
import { KindleEntry } from "../KindleEntry";
import { KindleEntryParsed } from "../KindleEntryParsed";
import {
  organizeKindleEntriesByAuthors,
  organizeKindleEntriesByBookTitle
} from "../parser";
import { type } from "os";

/**
 * Reads a file returning an Array of KindleEntry
 * @param path
 */
export async function readKindleClippingFile(
  path: string
): Promise<Array<KindleEntry>> {
  const readStreamFile = createReadStream(path);
  const fileReadLine = readline.createInterface({
    input: readStreamFile,
    //output: process.stdout,
    terminal: false
  });

  const buffer: Array<string> = [];
  const kindleClipps: Array<KindleEntry> = [];
  let totalLines: number = 0;

  for await (const line of fileReadLine) {
    try {
      if (line.includes("==========")) {
        // console.log(buffer);

        kindleClipps.push(KindleEntry.createKindleClipp(buffer));
        buffer.splice(0);
      } else {
        buffer.push(line.trim());
      }
      totalLines++;
    } catch (err) {
      throw new Error(`Error parsing on line: ${totalLines} of file: ${path}`);
    }
  }

  return kindleClipps;
}

/**
 * Saves all the data into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param filename
 * @param pretty
 */
export async function saveAllIntoFile(
  entriesParsed: Array<KindleEntryParsed>,
  pathToSave: string,
  filename?: string,
  pretty?: boolean
): Promise<any> {
  let outPath = resolve(pathToSave, filename ? filename : "out.json");
  await promises.writeFile(
    outPath,
    JSON.stringify(entriesParsed, null, pretty ? 4 : null)
  );
}

/**
 * Save the data organized by authors into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param pretty
 */
export async function saveByAuthorFile(
  entriesParsed: Array<KindleEntryParsed>,
  pathToSave: string,
  pretty?: boolean
): Promise<any> {
  let outPath = resolve(pathToSave);

  const kindleEntriesOrganized = organizeKindleEntriesByAuthors(entriesParsed);

  kindleEntriesOrganized.forEach(async (kindleEntries, authors) => {
    let dataOut = {
      authors: authors,
      entries: kindleEntries
    };

    let filename = `${authors}.json`;
    let dataPathOut = resolve(outPath, filename);
    // Determine os and use sync or promise write
    if (
      type()
        .toLowerCase()
        .includes("win") ||
      type()
        .toLowerCase()
        .includes("windows")
    ) {
      writeFileSync(
        dataPathOut,
        JSON.stringify(dataOut, null, pretty ? 4 : null)
      );
    } else {
      await promises.writeFile(
        dataPathOut,
        JSON.stringify(dataOut, null, pretty ? 4 : null)
      );
    }
  });
}

/**
 * Save the data organized by book title into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param pretty
 */
export async function saveByBookTitleFile(
  entriesParsed: Array<KindleEntryParsed>,
  pathToSave: string,
  pretty?: boolean
): Promise<any> {
  let outPath = resolve(pathToSave);

  const kindleEntriesOrganized = organizeKindleEntriesByBookTitle(
    entriesParsed
  );

  await kindleEntriesOrganized.forEach(async (kindleEntries, bookTitle) => {
    let dataOut = {
      bookTile: bookTitle,
      entries: kindleEntries
    };

    let filename = `${bookTitle}.json`;
    let dataPathOut = resolve(outPath, filename);

    // Determine os and use sync or promise write
    if (
      type()
        .toLowerCase()
        .includes("win") ||
      type()
        .toLowerCase()
        .includes("windows")
    ) {
      writeFileSync(
        dataPathOut,
        JSON.stringify(dataOut, null, pretty ? 4 : null)
      );
    } else {
      await promises.writeFile(
        dataPathOut,
        JSON.stringify(dataOut, null, pretty ? 4 : null)
      );
    }
  });
}
