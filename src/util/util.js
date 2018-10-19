export const getProperDate = t => {
  let d = new Date(t);
  return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
};