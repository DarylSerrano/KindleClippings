import { KindleEntry } from "./KindleEntry";
import { KindleEntryParsed } from "./KindleEntryParsed";
import Hashmap from "hashmap";
/**
 * Reads a file returning an Array of KindleEntry
 * @param path
 */
export declare function readKindleClippingFile(path: string): Promise<Array<KindleEntry>>;
/**
 * Read a string line by line returns an Array of KindleEntry
 * @param kindleClipping
 */
export declare function readKindleClipping(kindleClipping: string): Array<KindleEntry>;
/**
 * Takes and array of KindleEntry and perses de data into an Array of KindleEntryParsed
 * @param kindleEntries
 */
export declare function parseKindleEntries(kindleEntries: Array<KindleEntry>): Array<KindleEntryParsed>;
/**
 * Saves all the data into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param filename
 * @param pretty
 */
export declare function saveAllIntoFile(entriesParsed: Array<KindleEntryParsed>, pathToSave: string, filename?: string, pretty?: boolean): Promise<any>;
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
export declare function organizeKindleEntriesByBookTitle(entriesParsed: Array<KindleEntryParsed>): Hashmap<string, Array<KindleEntryParsed>>;
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
export declare function organizeKindleEntriesByAuthors(entriesParsed: Array<KindleEntryParsed>): Hashmap<string, Array<KindleEntryParsed>>;
/**
 * Save the data organized by book title into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param pretty
 */
export declare function saveByBookTitle(entriesParsed: Array<KindleEntryParsed>, pathToSave: string, pretty?: boolean): Promise<any>;
/**
 * Save the data organized by authors into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param pretty
 */
export declare function saveByAuthor(entriesParsed: Array<KindleEntryParsed>, pathToSave: string, pretty?: boolean): Promise<any>;
//# sourceMappingURL=parser.d.ts.map