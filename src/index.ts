#!/usr/bin/env node

import * as process from "process";
import yargs from "yargs";
import * as parser from "./parser";

type Organize = "all" | "authors" | "book";
const organizeTypes: ReadonlyArray<Organize> = ["all", "authors", "book"];

interface Arguments {
  [x: string]: unknown;
  inFile: string;
  outDir: string;
  orgType: Organize;
  outFile: string | undefined;
}

const args: Arguments = yargs.options({
  inFile: { type: "string", demandOption: true, alias: "i" },
  outDir: { type: "string", demandOption: true, alias: "d" },
  outFile: { type: "string", alias: "f" },
  orgType: { choices: organizeTypes, alias: "org", demandOption: true }
}).argv;

async function executeCommand(args: Arguments) {
  try {
    let allKindleEntries = await parser.readKindleClippingFile(args.inFile);
    let entriesParsed = parser.parseKindleEntries(allKindleEntries);

    switch (args.orgType) {
      case "all":
        await parser.saveAllIntoFile(entriesParsed, args.outDir);
        break;
      case "authors":
        await parser.saveByAuthor(entriesParsed, args.outDir);
        break;
      case "book":
        await parser.saveByBookTitle(entriesParsed, args.outDir);
        break;
      default:
        console.error(`No valid orgType: ${args}`);
        break;
    }

    process.exit(0);
  } catch (err) {
    console.error(`${err.stack}`);
    process.exit(1);
  }
}

executeCommand(args);
