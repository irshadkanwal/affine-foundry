import { fetchWrapper } from "../../utils/fetchWrapper";
import { useQuery } from "react-query";
import { BASE_URL } from "../../config";
import { notifyError } from "utils/toastNotifications";

export function getDataResourceProfileHeaderById(resourceId) {
  return fetchWrapper({
    url: `${BASE_URL}/api/data-resource/${resourceId}/profile-header`,
    method: "GET",
  });
}

export function useDataResourceProfileHeaderById(resourceId) {
  const queryResult = useQuery(
    ["DataResourceProfileHeaderById", resourceId],
    () => getDataResourceProfileHeaderById(resourceId),
    {
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(
            `Failed to fetch data resource profile header by id: ${error.message}`
          );
        }
      },
      enabled: !!resourceId,
    }
  );

  const profileHeaderIdMap = queryResult?.data?.reduce((acc, curr) => {
    return { ...acc, [curr.profileKey]: curr };
  }, {});
  const profileHeaderIdByNameMap = queryResult?.data?.reduce((acc, curr) => {
    return { ...acc, [curr.profileTitle]: curr.profileKey };
  }, {});
  const profileHeaderNameByIdMap = queryResult?.data?.reduce((acc, curr) => {
    return { ...acc, [curr.profileKey]: curr.profileTitle };
  }, {});

  const profileHeaderOptions = queryResult?.data?.reduce((acc, curr) => {
    return [...acc, { value: curr.profileKey, label: curr.profileTitle }];
  }, []);

  return {
    ...queryResult,
    profileHeaderOptions,
    profileHeaderIdMap,
    profileHeaderIdByNameMap,
    profileHeaderNameByIdMap,
  };
}
