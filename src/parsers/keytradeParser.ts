import csv from "neat-csv";
import filterObjectKeys from "../utils/filterObjectKeys";
import { Parser, WalletHeader } from "./types";

const keytradeParser: Parser = async (filePath) => {
  const headers: WalletHeader[] = [
    WalletHeader.Date,
    WalletHeader.Payee,
    WalletHeader.Note,
    WalletHeader.Income,
    WalletHeader.Currency,
  ];

  const headersMap: { [rawHeader: string]: WalletHeader } = {
    Date: WalletHeader.Date,
    Account: WalletHeader.Payee,
    Description: WalletHeader.Note,
    Amount: WalletHeader.Income,
    Currency: WalletHeader.Currency
  };

  // Read and parse the CSV file.
  const records = await csv(filePath, {
    separator: ";",
    mapHeaders: ({ header }) => headersMap[header] ?? header,
    mapValues: ({ header, value }) => {
      switch (header) {
        case WalletHeader.Income:
          return parseFloat(`${value}`.replace(/[.\s+]/g, "").replace(/,/g, "."));
        default:
          return value;
      }
    },
  });

  return {
    headers,
    records: records.map((record) => filterObjectKeys(record, headers)),
  };
};

export default keytradeParser;
