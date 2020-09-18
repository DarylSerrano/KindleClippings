"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const KindleEntry_1 = require("./KindleEntry");
const KindleEntryParsed_1 = require("./KindleEntryParsed");
/**
 * Read a string line by line returns an Array of KindleEntry
 * @param kindleClipping
 */
function readKindleClipping(kindleClipping) {
    const buffer = [];
    const kindleClipps = [];
    let totalLines = 0;
    let lines = kindleClipping.split("\n");
    for (const line of lines) {
        try {
            if (line.includes("==========")) {
                // console.log(buffer);
                kindleClipps.push(KindleEntry_1.KindleEntry.createKindleClipp(buffer));
                buffer.splice(0);
            }
            else {
                buffer.push(line.trim());
            }
            totalLines++;
        }
        catch (err) {
            throw new Error(`Error parsing on line: ${totalLines}`);
        }
    }
    return kindleClipps;
}
exports.readKindleClipping = readKindleClipping;
/**
 * Takes and array of KindleEntry and perses de data into an Array of KindleEntryParsed
 * @param kindleEntries
 */
function parseKindleEntries(kindleEntries) {
    const kindleEntriesParsed = [];
    kindleEntries.forEach(entry => {
        kindleEntriesParsed.push(new KindleEntryParsed_1.KindleEntryParsed(entry));
    });
    return kindleEntriesParsed;
}
exports.parseKindleEntries = parseKindleEntries;
//# sourceMappingURL=parser.js.map