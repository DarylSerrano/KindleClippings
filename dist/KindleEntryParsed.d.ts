import { KindleEntry } from "./KindleEntry";
export declare const EntryTypeTranslations: Readonly<{
    NOTE: string[];
    HIGHLIGHT: string[];
    BOOKMARK: string[];
}>;
export declare enum EntryType {
    Note = "NOTE",
    Highlight = "HIGHLIGHT",
    Bookmark = "BOOKMARK"
}
export declare class KindleEntryParsed {
    private kindleEntry;
    authors: string;
    bookTile: string;
    page: number;
    location: string;
    dateOfCreation: string;
    type: EntryType;
    content: string;
    constructor(kindleEntry: KindleEntry);
    parseAuthor(): void;
    parseBook(): void;
    parseMetadata(): void;
    parseEntryType(pageMetadataStr: string): EntryType;
    toJSON(): {
        authors: string;
        bookTile: string;
        page: number;
        location: string;
        dateOfCreation: string;
        content: string;
        type: EntryType;
    };
}
//# sourceMappingURL=KindleEntryParsed.d.ts.map