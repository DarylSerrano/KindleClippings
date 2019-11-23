import { KindleEntry } from "./KindleEntry";

const LocationRegex = Object.freeze(/\d+-\d+/);

export const EntryTypeTranslations = Object.freeze({
  NOTE: ["note", "marcador"],
  HIGHLIGHT: ["highlight", "subrayado"]
});

export enum EntryType {
  Note = "NOTE",
  Highlight = "HIGHLIGHT"
}

export class KindleEntryParsed {
  private kindleEntry: KindleEntry;
  authors: string;
  bookTile: string;
  page: number;
  location: string;
  dateOfCreation: string;
  type: EntryType;

  constructor(kindleEntry: KindleEntry) {
    this.kindleEntry = kindleEntry;
  }

  parseAuthor(): void {
    const bookTitleAndAuthors: string = this.kindleEntry.bookTitleAndAuthors;
    let firstOccurrenceIndex: number = bookTitleAndAuthors.indexOf("(");

    if (firstOccurrenceIndex === -1) {
      throw new Error(
        `Could not parse author from bookTitleAndAuthors of KindleEntry: ${bookTitleAndAuthors}`
      );
    }

    let nextOccurrenceIndex: number = bookTitleAndAuthors.indexOf(
      "(",
      firstOccurrenceIndex + 1
    );
    let lastIndex: number = firstOccurrenceIndex;
    for (; nextOccurrenceIndex !== -1; ) {
      lastIndex = firstOccurrenceIndex;
      firstOccurrenceIndex = bookTitleAndAuthors.indexOf(
        "(",
        firstOccurrenceIndex + 1
      );
      if (firstOccurrenceIndex === -1) {
        firstOccurrenceIndex = lastIndex;
      }
      nextOccurrenceIndex = bookTitleAndAuthors.indexOf(
        "(",
        firstOccurrenceIndex + 1
      );
    }

    const closingParenthesesIndex: number = bookTitleAndAuthors.indexOf(")");
    const authors: string = bookTitleAndAuthors.substring(
      firstOccurrenceIndex+1,
      closingParenthesesIndex
    );
    // Save authors
    this.authors = authors;
  }

  parseBook() {
    const bookTitleAndAuthors: string = this.kindleEntry.bookTitleAndAuthors;
    let firstOccurrenceIndex: number = bookTitleAndAuthors.indexOf("(");
    let nextOccurrenceIndex: number = bookTitleAndAuthors.indexOf(
      "(",
      firstOccurrenceIndex + 1
    );
    let lastIndex: number = firstOccurrenceIndex;
    for (; nextOccurrenceIndex !== -1; ) {
      lastIndex = firstOccurrenceIndex;
      firstOccurrenceIndex = bookTitleAndAuthors.indexOf(
        "(",
        firstOccurrenceIndex + 1
      );
      if (firstOccurrenceIndex === -1) {
        firstOccurrenceIndex = lastIndex;
      }
      nextOccurrenceIndex = bookTitleAndAuthors.indexOf(
        "(",
        firstOccurrenceIndex + 1
      );
    }
    const bookTile: string = bookTitleAndAuthors.substring(
      0,
      firstOccurrenceIndex
    );
    this.bookTile = bookTile;
  }

  parseMetadata() {
    const metadata: string = this.kindleEntry.metdataClipp;
    const indexOfPageSeparator: number = metadata.indexOf("|");
    const indexOfLocationSeparator: number = metadata
      .substring(indexOfPageSeparator + 1)
      .indexOf("|");
    const indexOfDateOfCreationSeparator: number = metadata
      .substring(indexOfLocationSeparator + 1)
      .indexOf("|");

    if (
      indexOfPageSeparator === -1 ||
      indexOfLocationSeparator === -1 ||
      indexOfDateOfCreationSeparator === -1
    ) {
      throw new Error(`Could not parse metadata of: ${metadata}`);
    }

    // Obtaining separated strings
    const pageMetadataStr: string = metadata.substring(0, indexOfPageSeparator);
    const locationMetadataStr: string = metadata.substr(
      indexOfPageSeparator + 1,
      indexOfPageSeparator
    );
    const dateOfCreation: string = metadata.substring(
      indexOfDateOfCreationSeparator + 1
    );

    // Page parsing
    const matchPage: RegExpExecArray | null | undefined = /\d+/.exec(
      pageMetadataStr
    );
    if (matchPage == null) {
      throw new Error(
        `Can't parse page number from pageMetadataStr: ${pageMetadataStr}`
      );
    }
    const page: number = Number(matchPage[0]);
    if (page === NaN) {
      throw new Error(
        `Can't parse page number of: matchPage: ${matchPage} from pageMetadataStr: ${pageMetadataStr}`
      );
    } else {
      this.page = page;
    }

    // location parsing
    const matchLocation:
      | RegExpExecArray
      | null
      | undefined = LocationRegex.exec(locationMetadataStr);
    if (matchLocation == null) {
      throw new Error(
        `Can't parse location from locationMetadataStr: ${locationMetadataStr}`
      );
    }
    const location: string = matchLocation[0];
    this.location = location;

    // Date of creation parsing
    this.dateOfCreation = dateOfCreation;

    // Type of entry parsing
    this.type = this.parseEntryType(pageMetadataStr);
  }

  parseEntryType(pageMetadataStr: string): EntryType {
    const pageMetaddataLowerCase: string = pageMetadataStr.toLowerCase();
    let isTypeNote: boolean = false;
    let isTypeHighlight: boolean = false;
    for (const noteTranslation of EntryTypeTranslations.NOTE) {
      if (pageMetaddataLowerCase.includes(noteTranslation)) {
        isTypeNote = true;
        break;
      }
    }

    if (isTypeNote) {
      return EntryType.Note;
    }

    for (const highlightTranslation of EntryTypeTranslations.HIGHLIGHT) {
      if (pageMetaddataLowerCase.includes(highlightTranslation)) {
        isTypeHighlight = true;
        break;
      }
    }

    if (isTypeHighlight) {
      return EntryType.Highlight;
    } else {
      throw new Error(
        `Couldn't parse type of Entry: pageMetadataStr: ${pageMetadataStr}`
      );
    }
  }
}
