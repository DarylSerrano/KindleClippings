import { KindleEntryParsed } from "./KindleEntryParsed";
import Hashmap from "hashmap";

/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
export function organizeKindleEntriesByBookTitle(
  entriesParsed: Array<KindleEntryParsed>,
  kindleEntriesOrganized?: Hashmap<string, Array<KindleEntryParsed>>
): Hashmap<string, Array<KindleEntryParsed>> {
  let newKindleEntriesOrganized: Hashmap<
    string,
    Array<KindleEntryParsed>
  > | null = null;

  if (kindleEntriesOrganized) {
    newKindleEntriesOrganized = kindleEntriesOrganized;
  } else {
    newKindleEntriesOrganized = new Hashmap();
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
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
export function organizeKindleEntriesByAuthors(
  entriesParsed: Array<KindleEntryParsed>,
  kindleEntriesOrganized?: Hashmap<string, Array<KindleEntryParsed>>
): Hashmap<string, Array<KindleEntryParsed>> {
  let newKindleEntriesOrganized: Hashmap<
    string,
    Array<KindleEntryParsed>
  > | null = null;

  if (kindleEntriesOrganized) {
    newKindleEntriesOrganized = kindleEntriesOrganized;
  } else {
    newKindleEntriesOrganized = new Hashmap();
  }

  entriesParsed.forEach(entry => {
    let authors = entry.authors;
    if (newKindleEntriesOrganized.has(authors)) {
      newKindleEntriesOrganized.get(authors).push(entry);
    } else {
      newKindleEntriesOrganized.set(authors, [entry]);
    }
  });

  return kindleEntriesOrganized;
}
