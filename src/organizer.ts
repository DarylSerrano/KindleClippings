import { KindleEntryParsed } from "./KindleEntryParsed";

/**
 * Organize the data into a Map<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
export function organizeKindleEntriesByBookTitle(
  entriesParsed: Array<KindleEntryParsed>,
  kindleEntriesOrganized?: Map<string, Array<KindleEntryParsed>>
): Map<string, Array<KindleEntryParsed>> {
  let newKindleEntriesOrganized: Map<
    string,
    Array<KindleEntryParsed>
  > | null = null;

  if(entriesParsed.length === 0){
    throw new Error("entriesParsed empty");
  }

  if (kindleEntriesOrganized) {
    newKindleEntriesOrganized = kindleEntriesOrganized;
  } else {
    newKindleEntriesOrganized = new Map();
  }

  entriesParsed.forEach(entry => {
    let bookTitle = entry.bookTile;
    if (newKindleEntriesOrganized.has(bookTitle)) {
      newKindleEntriesOrganized.get(bookTitle).push(entry);
    } else {
      newKindleEntriesOrganized.set(bookTitle, [entry]);
    }
  });

  return newKindleEntriesOrganized;
}

/**
 * Organize the data into a Map<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
export function organizeKindleEntriesByAuthors(
  entriesParsed: Array<KindleEntryParsed>,
  kindleEntriesOrganized?: Map<string, Array<KindleEntryParsed>>
): Map<string, Array<KindleEntryParsed>> {
  let newKindleEntriesOrganized: Map<
    string,
    Array<KindleEntryParsed>
  > | null = null;

  if(entriesParsed.length === 0){
    throw new Error("entriesParsed empty");
  }

  if (kindleEntriesOrganized) {
    newKindleEntriesOrganized = kindleEntriesOrganized;
  } else {
    newKindleEntriesOrganized = new Map();
  }

  entriesParsed.forEach(entry => {
    let authors = entry.authors;
    if (newKindleEntriesOrganized.has(authors)) {
      newKindleEntriesOrganized.get(authors).push(entry);
    } else {
      newKindleEntriesOrganized.set(authors, [entry]);
    }
  });

  return newKindleEntriesOrganized;
}
