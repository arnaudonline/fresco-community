import * as Papa from "papaparse";
import { Card } from "./types";

export const parseCardsFromCsv = (
  csvData: string | undefined
): Card[] | undefined => {
  if (!csvData) return;
  const parsedData = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  });

  if (parsedData.errors.length > 0) {
    throw new Error(parsedData.errors[0].message);
  }

  return parsedData.data as Card[];
};
