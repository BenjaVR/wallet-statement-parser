export enum WalletHeader {
  Date = "Date",
  Note = "Note",
  Payee = "Payee",
  Currency = "Currency",
  Category = "Category",
  Income = "Income",
  Expense = "Expense",
  Fee = "Fee",
}

type ParsedRecord = {
  [key in WalletHeader]: string | number;
};

interface ParseResult {
  headers: WalletHeader[];
  records: ParsedRecord[];
}

export type Parser = (filePath: Buffer) => Promise<ParseResult>;
