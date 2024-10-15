import { parse as xlsxParse } from "node-xlsx";
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

export const xlsxParser = <T>(file: ArrayBuffer): T[] => {
  const [sheet] = xlsxParse<T[]>(file);
  const [headers, ...rows] = sheet.data;

  return rows.map((row) => {
    return headers.reduce((acc, header, index) => {
      return { ...acc, [header as string]: row[index] };
    }, {} as T);
  });
};
