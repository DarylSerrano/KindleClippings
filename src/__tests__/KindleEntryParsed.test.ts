import { KindleEntry } from "../KindleEntry";
import { KindleEntryParsed, EntryType } from "../KindleEntryParsed";

interface DataEntry {
  entry: KindleEntry;
  titleParsed: string;
  author: string;
  page: number;
  location: string;
  dateOfCreation: string;
  type: EntryType;
}

const sampleEntries: Array<DataEntry> = [
  {
    entry: new KindleEntry(
      "非オタの彼女が俺の持ってるエロゲに興味津々なんだが…… (滝沢　慧;睦茸)",
      "- La subrayado en la página 197 | posición 2031-2035 | Añadido el sábado, 12 de octubre de 2019 0:37:31",
      "この部室は内側から施錠できるし、覗き窓みたいなものもない。"
    ),
    titleParsed: "非オタの彼女が俺の持ってるエロゲに興味津々なんだが…… ",
    author: "滝沢　慧;睦茸",
    page: 197,
    location: "2031-2035",
    dateOfCreation: "Añadido el sábado, 12 de octubre de 2019 0:37:31",
    type: EntryType.Highlight
  }
];

// eslint-disable-next-line no-undef
describe("KindleEntryParsed", () => {
  let sampleEntry: DataEntry;
  beforeEach(() => {
    sampleEntry = sampleEntries[0];
  });

  describe("parseAuthor", () => {
    test("Obtains author", () => {
      // AAA
      // Arrange
      const kindleParsed: KindleEntryParsed = new KindleEntryParsed(
        sampleEntry.entry
      );

      // Act
      kindleParsed.parseAuthor();

      // Assert
      expect(kindleParsed.authors).toBe(sampleEntry.author);
    });
  });

  describe("parseBook", () => {
    test("Obtains book title", () => {
      // Arrange
      const kindleParsed: KindleEntryParsed = new KindleEntryParsed(
        sampleEntry.entry
      );

      // Act
      kindleParsed.parseBook();

      // Assert
      expect(kindleParsed.bookTile).toBe(sampleEntry.titleParsed);
    });
  });

  describe("parseEntryType", () => {
    test("Obtains correct entry type", () => {
      // Arrange
      const kindleParsed: KindleEntryParsed = new KindleEntryParsed(
        sampleEntry.entry
      );

      // Act
      let entryTypeObtained: EntryType = kindleParsed.parseEntryType(
        sampleEntry.entry.metdataClipp
      );

      // Assert
      expect(entryTypeObtained).toBe(sampleEntry.type);
    });
  });

  describe("parseMetadata", () => {
    test("Obtains correct page", () => {
      // Arrange
      const kindleParsed: KindleEntryParsed = new KindleEntryParsed(
        sampleEntry.entry
      );
      // Act
      kindleParsed.parseMetadata();

      // Assert
      expect(kindleParsed.page).toBe(sampleEntry.page);
    });

    test("Obtains correct location", () => {
      // Arrange
      const kindleParsed: KindleEntryParsed = new KindleEntryParsed(
        sampleEntry.entry
      );
      // Act
      kindleParsed.parseMetadata();

      // Assert
      expect(kindleParsed.location).toBe(sampleEntry.location);
    });

    test("Obtains correct date of creation", () => {
      // Arrange
      const kindleParsed: KindleEntryParsed = new KindleEntryParsed(
        sampleEntry.entry
      );
      // Act
      kindleParsed.parseMetadata();

      // Assert
      expect(kindleParsed.dateOfCreation).toBe(sampleEntry.dateOfCreation);
    });
  });
});
