import { KindleEntry } from "./KindleEntry";
import { KindleEntryParsed } from "./KindleEntryParsed";
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
//# sourceMappingURL=parser.d.ts.map