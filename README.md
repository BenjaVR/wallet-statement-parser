# Wallet Statement Parser

Parses bank export files and make them readable by Wallet (by BudgetMakers).

## How to use

Add files to the [input](./input) folder and run `npm start`. All the files that can be parsed will be transformed and copied to the [output](./output) folder.

The files should start with the parser that should be used. E.g. for the `keytrade` parser, a file should be called something like `keytrade_statement_1.csv`.

## Supported parsers

- Keytrade
