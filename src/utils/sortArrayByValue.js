//replace by sortArrayByProp file
export const sortArray = (arrayData) => {
  return arrayData?.sort((first, second) => {
    const firstKey = first.value,
      secondKey = second.value;
    if (firstKey < secondKey) {
      return -1;
    } else if (firstKey > secondKey) {
      return 1;
    } else return 0;
  });
};
