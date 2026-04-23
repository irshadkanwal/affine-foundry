import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataResource() {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource`,
    method: "GET",
  });
}

export function useDataResource() {
  const queryResult = useQuery("DataResource", getDataResource, {
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to fetch data resources: ${error.message}`);
      }
    },
  });

  const resourceIdMap = queryResult?.data?.reduce((acc, curr) => {
    return { ...acc, [curr.id]: curr };
  }, {});
  const resourceIdByNameMap = queryResult?.data?.reduce((acc, curr) => {
    return { ...acc, [curr.name]: curr.id };
  }, {});
  const resourceNameByIdMap = queryResult?.data?.reduce((acc, curr) => {
    return { ...acc, [curr.id]: curr.name };
  }, {});

  const resourceOptions = queryResult?.data?.reduce((acc, curr) => {
    return [...acc, { value: curr.id, label: curr.name }];
  }, []);

  return {
    ...queryResult,
    resourceOptions,
    resourceIdMap,
    resourceIdByNameMap,
    resourceNameByIdMap,
  };
}
