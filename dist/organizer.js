"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Organize the data into a Map<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
function organizeKindleEntriesByBookTitle(entriesParsed, kindleEntriesOrganized) {
    let newKindleEntriesOrganized = null;
    if (entriesParsed.length === 0) {
        throw new Error("entriesParsed empty");
    }
    if (kindleEntriesOrganized) {
        newKindleEntriesOrganized = kindleEntriesOrganized;
    }
    else {
        newKindleEntriesOrganized = new Map();
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
 * Organize the data into a Map<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
function organizeKindleEntriesByAuthors(entriesParsed, kindleEntriesOrganized) {
    let newKindleEntriesOrganized = null;
    if (entriesParsed.length === 0) {
        throw new Error("entriesParsed empty");
    }
    if (kindleEntriesOrganized) {
        newKindleEntriesOrganized = kindleEntriesOrganized;
    }
    else {
        newKindleEntriesOrganized = new Map();
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
    return newKindleEntriesOrganized;
}
exports.organizeKindleEntriesByAuthors = organizeKindleEntriesByAuthors;
//# sourceMappingURL=organizer.js.map