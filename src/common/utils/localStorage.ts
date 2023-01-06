export const setItemToLC = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLC = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};
