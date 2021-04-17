import fs from "fs";
import csv from "neat-csv";
import path from "path";

const inputPath = "input";
const outputPath = "output";

fs.readdir(inputPath, {}, ((err, files) => {
  if (err) {
    throw err;
  }

  files.forEach(async (file: any) => {
    const filePath = path.join(inputPath, file);
    const getFileContent = () => fs.readFileSync(filePath);

    const fileName = (file as string).toLowerCase();

    if (fileName.startsWith("keytrade")) {
      console.log(`Parsing '${fileName}' with the Keytrade parser...`);
      await transformKeytrade(getFileContent(), fileName);
      return;
    }

    console.log(`No parser found for '${fileName}'!`);
  });
}));

async function transformKeytrade(filePath: Buffer, fileName: string) {
  // Read and parse the CSV file.
  const records = await csv(filePath, {
    separator: ";",
    mapHeaders: ({ header }) => {
      switch (header) {
        case "Description":
          return "Note";
        case "Account":
          return "Payee";
        default:
          return header;
      }
    },
    mapValues: ({ header, value }) => {
      switch (header) {
        case "Amount":
          return parseFloat(`${value}`.replace(/[.\s+]/g, "").replace(/,/g, "."));
        default:
          return value;
      }
    }
  });

  // Only keep the required columns.
  const requiredHeaders = ["Date", "Payee", "Note", "Amount", "Currency"];
  records.forEach(record => Object
    .keys(record)
    .filter(key => !requiredHeaders.includes(key))
    .forEach(key => delete record[key])
  );

  // Write the parsed and transformed lines to the output folder.
  const outputStream = fs.createWriteStream(path.join(outputPath, fileName));
  outputStream.write(`${requiredHeaders.map(header => `"${header}"`).join(",")}\n`);
  records.forEach(record => {
    outputStream.write(`${requiredHeaders.map(header => `"${record[header]}"`).join(",")}\n`);
  });
  outputStream.close();
}
