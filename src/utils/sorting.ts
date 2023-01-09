
export const orderLineCompare = (a, b) => {
  if (a.description > b.description) return 1;
  if (a.description < b.description) return -1;
  return 0;
}
