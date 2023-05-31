export const parseAvailability = (availability) => {
  const [from, to] = availability.split("-");
  return { from, to };
};
