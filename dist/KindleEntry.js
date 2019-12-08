"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KindleEntry {
    constructor(bookTitle, metdataClipp, contentClipp) {
        this._bookTitleAndAuthors = bookTitle;
        this._contentClipp = contentClipp;
        this._metdataClipp = metdataClipp;
    }
    get bookTitleAndAuthors() {
        return this._bookTitleAndAuthors;
    }
    get metdataClipp() {
        return this._metdataClipp;
    }
    get contentClipp() {
        return this._contentClipp;
    }
    static createKindleClipp(clipp) {
        /*
          0 -> title
          1 -> metadata
          2 -> blank
          3 -> content
          */
        if (clipp.length === 4) {
            return new KindleEntry(clipp[0], clipp[1], clipp[3]);
        }
        else {
            throw new Error(`clipp array invalid: ${clipp}`);
        }
    }
    toJSON() {
        return {
            bookTitle: this.bookTitleAndAuthors,
            metdataClipp: this.metdataClipp,
            contentClipp: this.contentClipp
        };
    }
}
exports.KindleEntry = KindleEntry;
//# sourceMappingURL=KindleEntry.js.map