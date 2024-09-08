import { parse as csvParse } from "csv-parse/sync";

export const jsonParser = <T>(data: string) => {
  return JSON.parse(data) as T[];
};

export const csvParser = <T>(data: string, delimiter?: string) => {
  const records = csvParse(data, {
    columns: true,
    skip_empty_lines: true,
    delimiter,
  });

  return records as T[];
};
