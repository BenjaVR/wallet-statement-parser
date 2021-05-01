import { Buffer } from "buffer";
import fs from "fs";
import path from "path";
import { parserMap } from "./parsers";

const inputPath = path.join(__dirname, "..", "input");
const outputPath = path.join(__dirname, "..", "output");

fs.readdir(inputPath, {}, (err, files) => {
  if (err) {
    throw err;
  }

  files
    .map((file: string | Buffer) => {
      return typeof file === "string" ? file.toLowerCase() : file.toString().toLowerCase();
    })
    .filter((fileName) => !fileName.startsWith(".")) // Skip dot-files.
    .forEach(async (fileName) => {
      const filePath = path.join(inputPath, fileName);
      const fileContent = fs.readFileSync(filePath);

      for (const parserName of Object.keys(parserMap)) {
        if (!fileName.startsWith(parserName)) {
          continue;
        }
        console.log(`Parsing '${fileName}' with the '${parserName}' parser...`);

        const { headers, records } = await parserMap[parserName](fileContent);

        // Write the parsed and transformed lines to the output folder.
        const outputStream = fs.createWriteStream(path.join(outputPath, fileName));
        outputStream.write(`${headers.map((header) => `"${header}"`).join(",")}\n`);
        records.forEach((record) => {
          const values = headers.map((header) => {
            const value = record[header];
            if (value === undefined || value === "") {
              return "";
            }
            return `"${value}"`;
          });
          outputStream.write(`${values.join(",")}\n`);
        });
        outputStream.close();

        return; // Exit foreach loop -> we have found a matching parser!
      }

      console.log(`No parser found for '${fileName}'!`);
    });
});
