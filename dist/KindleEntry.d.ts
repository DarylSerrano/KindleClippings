export declare class KindleEntry {
    private _bookTitleAndAuthors;
    private _metdataClipp;
    private _contentClipp;
    constructor(bookTitle: string, metdataClipp: string, contentClipp: string);
    get bookTitleAndAuthors(): string;
    get metdataClipp(): string;
    get contentClipp(): string;
    static createKindleClipp(clipp: Array<string>): KindleEntry;
    toJSON(): {
        bookTitle: string;
        metdataClipp: string;
        contentClipp: string;
    };
}
//# sourceMappingURL=KindleEntry.d.ts.map