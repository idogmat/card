export const formDate = (str: string) => {
  return new Date(str).toLocaleString("ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};
