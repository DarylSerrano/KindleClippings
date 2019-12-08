"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const readline = __importStar(require("readline"));
const KindleEntry_1 = require("./KindleEntry");
const KindleEntryParsed_1 = require("./KindleEntryParsed");
const hashmap_1 = __importDefault(require("hashmap"));
const os_1 = require("os");
/**
 * Reads a file returning an Array of KindleEntry
 * @param path
 */
function readKindleClippingFile(path) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const readStreamFile = fs_1.createReadStream(path);
            const fileReadLine = readline.createInterface({
                input: readStreamFile,
                //output: process.stdout,
                terminal: false
            });
            const buffer = [];
            const kindleClipps = [];
            let totalLines = 0;
            try {
                for (var fileReadLine_1 = __asyncValues(fileReadLine), fileReadLine_1_1; fileReadLine_1_1 = yield fileReadLine_1.next(), !fileReadLine_1_1.done;) {
                    const line = fileReadLine_1_1.value;
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
                        throw new Error(`Error parsing on line: ${totalLines} of file: ${path}`);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (fileReadLine_1_1 && !fileReadLine_1_1.done && (_a = fileReadLine_1.return)) yield _a.call(fileReadLine_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return kindleClipps;
        }
        catch (err) {
            throw err;
        }
    });
}
exports.readKindleClippingFile = readKindleClippingFile;
/**
 * Read a string line by line returns an Array of KindleEntry
 * @param kindleClipping
 */
function readKindleClipping(kindleClipping) {
    try {
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
    catch (err) {
        throw err;
    }
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
/**
 * Saves all the data into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param filename
 * @param pretty
 */
function saveAllIntoFile(entriesParsed, pathToSave, filename, pretty) {
    return __awaiter(this, void 0, void 0, function* () {
        let outPath = path_1.resolve(pathToSave, filename ? filename : "out.json");
        yield fs_1.promises.writeFile(outPath, JSON.stringify(entriesParsed, null, pretty ? 4 : null));
    });
}
exports.saveAllIntoFile = saveAllIntoFile;
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the Book title
 * @param entriesParsed
 */
function organizeKindleEntriesByBookTitle(entriesParsed) {
    const kindleEntriesOrganized = new hashmap_1.default();
    entriesParsed.forEach(entry => {
        let bookTitle = entry.bookTile;
        if (kindleEntriesOrganized.has(bookTitle)) {
            kindleEntriesOrganized.get(bookTitle).push(entry);
        }
        else {
            kindleEntriesOrganized.set(bookTitle, [entry]);
        }
    });
    return kindleEntriesOrganized;
}
exports.organizeKindleEntriesByBookTitle = organizeKindleEntriesByBookTitle;
/**
 * Organize the data into a HashMap<string, Array<KindleEntryParsed>>
 * where each key represents the authors
 * @param entriesParsed
 */
function organizeKindleEntriesByAuthors(entriesParsed) {
    const kindleEntriesOrganized = new hashmap_1.default();
    entriesParsed.forEach(entry => {
        let authors = entry.authors;
        if (kindleEntriesOrganized.has(authors)) {
            kindleEntriesOrganized.get(authors).push(entry);
        }
        else {
            kindleEntriesOrganized.set(authors, [entry]);
        }
    });
    return kindleEntriesOrganized;
}
exports.organizeKindleEntriesByAuthors = organizeKindleEntriesByAuthors;
/**
 * Save the data organized by book title into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param pretty
 */
function saveByBookTitle(entriesParsed, pathToSave, pretty) {
    return __awaiter(this, void 0, void 0, function* () {
        let outPath = path_1.resolve(pathToSave);
        const kindleEntriesOrganized = organizeKindleEntriesByBookTitle(entriesParsed);
        yield kindleEntriesOrganized.forEach((kindleEntries, bookTitle) => __awaiter(this, void 0, void 0, function* () {
            let dataOut = {
                bookTile: bookTitle,
                entries: kindleEntries
            };
            let filename = `${bookTitle}.json`;
            let dataPathOut = path_1.resolve(outPath, filename);
            // Determine os and use sync or promise write
            if (os_1.type()
                .toLowerCase()
                .includes("win") ||
                os_1.type()
                    .toLowerCase()
                    .includes("windows")) {
                fs_1.writeFileSync(dataPathOut, JSON.stringify(dataOut, null, pretty ? 4 : null));
            }
            else {
                yield fs_1.promises.writeFile(dataPathOut, JSON.stringify(dataOut, null, pretty ? 4 : null));
            }
        }));
    });
}
exports.saveByBookTitle = saveByBookTitle;
/**
 * Save the data organized by authors into a json file
 * @param entriesParsed
 * @param pathToSave
 * @param pretty
 */
function saveByAuthor(entriesParsed, pathToSave, pretty) {
    return __awaiter(this, void 0, void 0, function* () {
        let outPath = path_1.resolve(pathToSave);
        const kindleEntriesOrganized = organizeKindleEntriesByAuthors(entriesParsed);
        kindleEntriesOrganized.forEach((kindleEntries, authors) => __awaiter(this, void 0, void 0, function* () {
            let dataOut = {
                authors: authors,
                entries: kindleEntries
            };
            let filename = `${authors}.json`;
            let dataPathOut = path_1.resolve(outPath, filename);
            // Determine os and use sync or promise write
            if (os_1.type()
                .toLowerCase()
                .includes("win") ||
                os_1.type()
                    .toLowerCase()
                    .includes("windows")) {
                fs_1.writeFileSync(dataPathOut, JSON.stringify(dataOut, null, pretty ? 4 : null));
            }
            else {
                yield fs_1.promises.writeFile(dataPathOut, JSON.stringify(dataOut, null, pretty ? 4 : null));
            }
        }));
    });
}
exports.saveByAuthor = saveByAuthor;
//# sourceMappingURL=parser.js.map