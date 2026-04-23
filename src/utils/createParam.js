export function createParams(list = []) {
  const values = list?.map((data, i) => {
    if (i === 0) return `resource_id=${data?.id}`;
    else return `&resource_id=${data?.id}`;
  });
  return values?.join("");
}
