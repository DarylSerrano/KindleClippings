import { KindleEntryParsed } from "./KindleEntryParsed";
import Hashmap from "hashmap";
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
export declare function organizeKindleEntriesByBookTitle(entriesParsed: Array<KindleEntryParsed>, kindleEntriesOrganized?: Hashmap<string, Array<KindleEntryParsed>>): Hashmap<string, Array<KindleEntryParsed>>;
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
export declare function organizeKindleEntriesByAuthors(entriesParsed: Array<KindleEntryParsed>, kindleEntriesOrganized?: Hashmap<string, Array<KindleEntryParsed>>): Hashmap<string, Array<KindleEntryParsed>>;
//# sourceMappingURL=organizer.d.ts.map