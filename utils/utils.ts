export const getIdFromPath = (id: string) =>
  id
    .replace(/\//g, ' ')
    .trim()
    .split(' ')
    .reverse()[0];
