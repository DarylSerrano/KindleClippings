import { createReadStream, promises, writeFileSync } from "fs";
import { resolve } from "path";
import * as readline from "readline";
import { KindleEntry } from "./KindleEntry";
import { KindleEntryParsed } from "./KindleEntryParsed";
import Hashmap from "hashmap";
import { type } from "os";

/**
 * Reads a file returning an Array of KindleEntry
 * @param path 
 */
export async function readKindleClippingFile(
  path: string
): Promise<Array<KindleEntry>> {
  try {
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
        throw new Error(
          `Error parsing on line: ${totalLines} of file: ${path}`
        );
      }
    }

    return kindleClipps;
  } catch (err) {
    throw err;
  }
}

/**
 * Read a string line by line returns an Array of KindleEntry
 * @param kindleClipping 
 */
export function readKindleClipping(kindleClipping: string): Array<KindleEntry> {
  try {
    const buffer: Array<string> = [];
    const kindleClipps: Array<KindleEntry> = [];
    let totalLines: number = 0;
    let lines: Array<string> = kindleClipping.split("\n");
    
    for (const line of lines) {
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
        throw new Error(
          `Error parsing on line: ${totalLines}`
        );
      }
    }

    return kindleClipps;
  } catch (err) {
    throw err;
  }
}

/**
 * Takes and array of KindleEntry and perses de data into an Array of KindleEntryParsed
 * @param kindleEntries 
 */
export function parseKindleEntries(
  kindleEntries: Array<KindleEntry>
): Array<KindleEntryParsed> {
  const kindleEntriesParsed: Array<KindleEntryParsed> = [];

  kindleEntries.forEach(entry => {
    kindleEntriesParsed.push(new KindleEntryParsed(entry));
  });
  return kindleEntriesParsed;
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
  await promises.writeFile(outPath, JSON.stringify(entriesParsed, null, pretty? 4 : null));
}

/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>> 
 * where each key represents the Book title
 * @param entriesParsed 
 */
export function organizeKindleEntriesByBookTitle(
  entriesParsed: Array<KindleEntryParsed>
): Hashmap<string, Array<KindleEntryParsed>> {
  const kindleEntriesOrganized: Hashmap<
    string,
    Array<KindleEntryParsed>
  > = new Hashmap();

  entriesParsed.forEach(entry => {
    let bookTitle = entry.bookTile;
    if (kindleEntriesOrganized.has(bookTitle)) {
      kindleEntriesOrganized.get(bookTitle).push(entry);
    } else {
      kindleEntriesOrganized.set(bookTitle, [entry]);
    }
  });

  return kindleEntriesOrganized;
}

/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>> 
 * where each key represents the authors
 * @param entriesParsed 
 */
export function organizeKindleEntriesByAuthors(
  entriesParsed: Array<KindleEntryParsed>
): Hashmap<string, Array<KindleEntryParsed>> {
  const kindleEntriesOrganized: Hashmap<
    string,
    Array<KindleEntryParsed>
  > = new Hashmap();

  entriesParsed.forEach(entry => {
    let authors = entry.authors;
    if (kindleEntriesOrganized.has(authors)) {
      kindleEntriesOrganized.get(authors).push(entry);
    } else {
      kindleEntriesOrganized.set(authors, [entry]);
    }
  });

  return kindleEntriesOrganized;
}

/**
 * Save the data organized by book title into a json file
 * @param entriesParsed 
 * @param pathToSave 
 * @param pretty 
 */
export async function saveByBookTitle(
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
      writeFileSync(dataPathOut, JSON.stringify(dataOut, null, pretty? 4 : null));
    } else {
      await promises.writeFile(dataPathOut, JSON.stringify(dataOut, null, pretty? 4 : null));
    }
  });
}

/**
 * Save the data organized by authors into a json file
 * @param entriesParsed 
 * @param pathToSave 
 * @param pretty 
 */
export async function saveByAuthor(
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
      writeFileSync(dataPathOut, JSON.stringify(dataOut, null, pretty? 4 : null));
    } else {
      await promises.writeFile(dataPathOut, JSON.stringify(dataOut, null, pretty? 4 : null));
    }
  });
}
