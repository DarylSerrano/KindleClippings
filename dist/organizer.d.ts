import { KindleEntryParsed } from "./KindleEntryParsed";
/**
 * Organize the data into a Map<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
export declare function organizeKindleEntriesByBookTitle(entriesParsed: Array<KindleEntryParsed>, kindleEntriesOrganized?: Map<string, Array<KindleEntryParsed>>): Map<string, Array<KindleEntryParsed>>;
/**
 * Organize the data into a Map<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
export declare function organizeKindleEntriesByAuthors(entriesParsed: Array<KindleEntryParsed>, kindleEntriesOrganized?: Map<string, Array<KindleEntryParsed>>): Map<string, Array<KindleEntryParsed>>;
//# sourceMappingURL=organizer.d.ts.map