export const shortInfo = (text, count = 5, sperator = " ") => {
  return text?.split(sperator)?.length > count
    ? `${text
        .split(sperator)
        .slice(0, count - 1)
        .join(sperator)} ...`
    : text;
};
