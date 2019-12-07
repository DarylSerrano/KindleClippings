#!/usr/bin/env node
import * as process from "process";
import yargs from "yargs";
import * as Parser from "./parser";
import ora from "ora";
import { resolve } from "path";

type Organize = "all" | "authors" | "book";
const organizeTypes: ReadonlyArray<Organize> = ["all", "authors", "book"];

interface Arguments {
  [x: string]: unknown;
  inFile: string;
  outDir: string;
  orgType: Organize;
  outFile: string | undefined;
  pretty: boolean;
}

const args: Arguments = yargs
  .options({
    inFile: {
      type: "string",
      demandOption: true,
      alias: "i",
      describe: "'My Clippings.txt' file from a Kindle"
    },
    outDir: { type: "string", alias: "d", default: "./" },
    outFile: {
      type: "string",
      alias: "f",
      describe: "Out filename, only works if using organize type 'all'"
    },
    orgType: {
      choices: organizeTypes,
      alias: "org",
      default: organizeTypes[0]
    },
    pretty: {
      type: "boolean",
      alias: "p",
      default: false,
      describe: "Prints the output json in a readable format"
    }
  })
  .usage("Usage: $0  [options]")
  .example(
    '$0 -i "My Clippings.txt" -d "./clippings"',
    "Parse information into a file in json on the directory ./clippings"
  )
  .epilog(
    "For issue reporting and bugs: https://github.com/DaryKiri/KindleClippings/issues"
  ).argv;

async function executeCommand(args: Arguments) {
  const spinner = ora();
  try {
    let allKindleEntries = await Parser.readKindleClippingFile(args.inFile);
    let entriesParsed = Parser.parseKindleEntries(allKindleEntries);

    switch (args.orgType) {
      case "all":
        spinner.start(`Saving data into path: ${resolve(args.outDir)}`);
        await Parser.saveAllIntoFile(
          entriesParsed,
          args.outDir,
          args.outFile,
          args.pretty
        );
        break;
      case "authors":
        spinner.start(
          `Saving data by author into path ${resolve(args.outDir)}`
        );
        await Parser.saveByAuthor(entriesParsed, args.outDir, args.pretty);
        break;
      case "book":
        spinner.start(
          `Saving data by book title into path ${resolve(args.outDir)}`
        );
        await Parser.saveByBookTitle(entriesParsed, args.outDir, args.pretty);
        break;
      default:
        console.error(`No valid orgType: ${args}`);
        break;
    }

    process.exit(0);
  } catch (err) {
    console.error(`${err}`);
    console.error(`${err.stack}`);
    process.exit(1);
  } finally {
    spinner.stop();
  }
}

executeCommand(args);
