import { KindleEntry } from "../KindleEntry";
import {KindleEntryParsed } from "../KindleEntryParsed";

const sampleEntry = {
    title: "非オタの彼女が俺の持ってるエロゲに興味津々なんだが…… (滝沢　慧;睦茸)",
    metadata: "- La subrayado en la página 197 | posición 2031-2035 | Añadido el sábado, 12 de octubre de 2019 0:37:31",
    content: "この部室は内側から施錠できるし、覗き窓みたいなものもない。"
}

// eslint-disable-next-line no-undef
describe('KindleEntryParsed', () => {
    let kindleEntry: KindleEntry;
    beforeEach(() => {
        kindleEntry = new KindleEntry(sampleEntry.title, sampleEntry.metadata, sampleEntry.content);
    })

    describe('parseAuthor', () => {
        test('Obtains author', () => {
            // AAA
            // Arrange
            const kindleParsed: KindleEntryParsed = new KindleEntryParsed(kindleEntry);

            // Act
            kindleParsed.parseAuthor();

            // Assert
            expect(kindleParsed.authors).toBe("滝沢　慧;睦茸");
        })
    })
})