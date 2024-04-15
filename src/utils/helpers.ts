export const createSearchParams = (params: { [keys: string]: string }) => {
  return `?${new URLSearchParams(params).toString()}`;
};
