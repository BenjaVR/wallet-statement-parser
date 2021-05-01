import keytradeParser from "./keytradeParser";
import { Parser } from "./types";

export const parserMap: { [parserName: string]: Parser } = {
  keytrade: keytradeParser,
};
