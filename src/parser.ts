
import { KindleEntry } from "./KindleEntry";
import { KindleEntryParsed } from "./KindleEntryParsed";
import Hashmap from "hashmap";

/**
 * Read a string line by line returns an Array of KindleEntry
 * @param kindleClipping
 */
export function readKindleClipping(kindleClipping: string): Array<KindleEntry> {
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
      throw new Error(`Error parsing on line: ${totalLines}`);
    }
  }

  return kindleClipps;
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

