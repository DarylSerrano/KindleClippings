"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LocationRegex = Object.freeze(/\d+-?\d*/);
exports.EntryTypeTranslations = Object.freeze({
    NOTE: ["note", "nota"],
    HIGHLIGHT: ["highlight", "subrayado"],
    BOOKMARK: ["bookmark", "marcador"]
});
var EntryType;
(function (EntryType) {
    EntryType["Note"] = "NOTE";
    EntryType["Highlight"] = "HIGHLIGHT";
    EntryType["Bookmark"] = "BOOKMARK";
})(EntryType = exports.EntryType || (exports.EntryType = {}));
class KindleEntryParsed {
    constructor(kindleEntry) {
        this.kindleEntry = kindleEntry;
        this.content = kindleEntry.contentClipp;
        this.parseAuthor();
        this.parseBook();
        this.parseMetadata();
    }
    parseAuthor() {
        const bookTitleAndAuthors = this.kindleEntry.bookTitleAndAuthors;
        let ocurrenceIndex = bookTitleAndAuthors.indexOf("(");
        if (ocurrenceIndex === -1) {
            throw new Error(`Could not parse author from bookTitleAndAuthors of KindleEntry: ${bookTitleAndAuthors}`);
        }
        let nextOcurrenceIndex = bookTitleAndAuthors.indexOf("(", ocurrenceIndex + 1);
        for (; nextOcurrenceIndex !== -1 && nextOcurrenceIndex < bookTitleAndAuthors.length;) {
            ocurrenceIndex = nextOcurrenceIndex;
            nextOcurrenceIndex = bookTitleAndAuthors.indexOf("(", ocurrenceIndex + 1);
        }
        const closingParenthesesIndex = bookTitleAndAuthors.indexOf(")", ocurrenceIndex);
        const authors = bookTitleAndAuthors.substring(ocurrenceIndex + 1, closingParenthesesIndex);
        // Save authors
        this.authors = authors;
    }
    parseBook() {
        const bookTitleAndAuthors = this.kindleEntry.bookTitleAndAuthors;
        let firstOccurrenceIndex = bookTitleAndAuthors.indexOf("(");
        let nextOccurrenceIndex = bookTitleAndAuthors.indexOf("(", firstOccurrenceIndex + 1);
        let lastIndex = firstOccurrenceIndex;
        for (; nextOccurrenceIndex !== -1;) {
            lastIndex = firstOccurrenceIndex;
            firstOccurrenceIndex = bookTitleAndAuthors.indexOf("(", firstOccurrenceIndex + 1);
            if (firstOccurrenceIndex === -1) {
                firstOccurrenceIndex = lastIndex;
            }
            nextOccurrenceIndex = bookTitleAndAuthors.indexOf("(", firstOccurrenceIndex + 1);
        }
        const bookTile = bookTitleAndAuthors.substring(0, firstOccurrenceIndex);
        this.bookTile = bookTile.trim();
    }
    parseMetadata() {
        const metadata = this.kindleEntry.metdataClipp;
        const indexOfFirstSeparator = metadata.indexOf("|");
        const indexOfSecondSeparator = metadata.indexOf("|", indexOfFirstSeparator + 1);
        if (indexOfFirstSeparator === -1 || indexOfSecondSeparator === -1) {
            throw new Error(`Could not parse metadata of: ${metadata}`);
        }
        // Obtaining separated strings
        const pageMetadataStr = metadata
            .substring(0, indexOfFirstSeparator)
            .trim();
        const locationMetadataStr = metadata
            .substring(indexOfFirstSeparator + 1, indexOfSecondSeparator)
            .trim();
        const dateOfCreation = metadata
            .substring(indexOfSecondSeparator + 1)
            .trim();
        // Page parsing
        const matchPage = /\d+/.exec(pageMetadataStr);
        if (matchPage == null) {
            throw new Error(`Can't parse page number from pageMetadataStr: ${pageMetadataStr}`);
        }
        const page = Number(matchPage[0]);
        if (page === NaN) {
            throw new Error(`Can't parse page number of: matchPage: ${matchPage} from pageMetadataStr: ${pageMetadataStr}`);
        }
        else {
            this.page = page;
        }
        // location parsing
        const matchLocation = LocationRegex.exec(locationMetadataStr);
        if (matchLocation == null) {
            throw new Error(`Can't parse location from locationMetadataStr: ${locationMetadataStr}`);
        }
        const location = matchLocation[0];
        this.location = location;
        // Date of creation parsing
        this.dateOfCreation = dateOfCreation;
        // Type of entry parsing
        this.type = this.parseEntryType(pageMetadataStr);
    }
    parseEntryType(pageMetadataStr) {
        const pageMetaddataLowerCase = pageMetadataStr.toLowerCase();
        let isTypeNote = false;
        let isTypeHighlight = false;
        let isTypeBookmark = false;
        for (const noteTranslation of exports.EntryTypeTranslations.NOTE) {
            if (pageMetaddataLowerCase.includes(noteTranslation)) {
                isTypeNote = true;
                break;
            }
        }
        if (isTypeNote) {
            return EntryType.Note;
        }
        for (const highlightTranslation of exports.EntryTypeTranslations.HIGHLIGHT) {
            if (pageMetaddataLowerCase.includes(highlightTranslation)) {
                isTypeHighlight = true;
                break;
            }
        }
        if (isTypeHighlight) {
            return EntryType.Highlight;
        }
        for (const bookMarkTranslation of exports.EntryTypeTranslations.BOOKMARK) {
            if (pageMetaddataLowerCase.includes(bookMarkTranslation)) {
                isTypeBookmark = true;
                break;
            }
        }
        if (isTypeBookmark) {
            return EntryType.Bookmark;
        }
        else {
            throw new Error(`Couldn't parse type of Entry: pageMetadataStr: ${pageMetadataStr}`);
        }
    }
    toJSON() {
        return {
            authors: this.authors,
            bookTile: this.bookTile,
            page: this.page,
            location: this.location,
            dateOfCreation: this.dateOfCreation,
            content: this.content,
            type: this.type
        };
    }
}
exports.KindleEntryParsed = KindleEntryParsed;
//# sourceMappingURL=KindleEntryParsed.js.map