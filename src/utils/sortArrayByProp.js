export const sortArraybyProp = (arrayName = [], prop = "name") => {
  const sortedArray = arrayName.sort((first, second) => {
    const firstName = first[prop],
      secondName = second[prop];
    if (firstName < secondName) {
      return -1;
    } else if (firstName > secondName) {
      return 1;
    } else return 0;
  });
  return sortedArray;
};
