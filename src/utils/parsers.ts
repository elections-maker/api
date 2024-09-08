export const jsonParser = <T>(data: string) => {
  return JSON.parse(data) as T[];
};
