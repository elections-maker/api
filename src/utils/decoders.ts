import { csvParser, jsonParser, xlsxParser } from "./parsers";

export const decoders = {
  csv: <T>(file: ArrayBuffer, delimiter?: string) => {
    const data = new TextDecoder().decode(file);
    return csvParser<T>(data, delimiter || ",");
  },
  json: <T>(file: ArrayBuffer) => {
    const data = new TextDecoder().decode(file);
    return jsonParser<T>(data);
  },
  xlsx: <T>(file: ArrayBuffer) => {
    return xlsxParser<T>(file);
  },
};
