export const jsonStringify = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};
