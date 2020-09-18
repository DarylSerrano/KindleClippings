"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hashmap_1 = __importDefault(require("hashmap"));
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
function organizeKindleEntriesByBookTitle(entriesParsed, kindleEntriesOrganized) {
    let newKindleEntriesOrganized = null;
    if (kindleEntriesOrganized) {
        newKindleEntriesOrganized = kindleEntriesOrganized;
    }
    else {
        newKindleEntriesOrganized = new hashmap_1.default();
    }
    entriesParsed.forEach(entry => {
        let bookTitle = entry.bookTile;
        if (newKindleEntriesOrganized.has(bookTitle)) {
            newKindleEntriesOrganized.get(bookTitle).push(entry);
        }
        else {
            newKindleEntriesOrganized.set(bookTitle, [entry]);
        }
    });
    return newKindleEntriesOrganized;
}
exports.organizeKindleEntriesByBookTitle = organizeKindleEntriesByBookTitle;
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
function organizeKindleEntriesByAuthors(entriesParsed, kindleEntriesOrganized) {
    let newKindleEntriesOrganized = null;
    if (kindleEntriesOrganized) {
        newKindleEntriesOrganized = kindleEntriesOrganized;
    }
    else {
        newKindleEntriesOrganized = new hashmap_1.default();
    }
    entriesParsed.forEach(entry => {
        let authors = entry.authors;
        if (newKindleEntriesOrganized.has(authors)) {
            newKindleEntriesOrganized.get(authors).push(entry);
        }
        else {
            newKindleEntriesOrganized.set(authors, [entry]);
        }
    });
    return kindleEntriesOrganized;
}
exports.organizeKindleEntriesByAuthors = organizeKindleEntriesByAuthors;
//# sourceMappingURL=organizer.js.map