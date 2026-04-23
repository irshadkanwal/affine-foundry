import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function createReferenceData({
  active, //
  cachingEnabled,
  code, //
  description, //
  forceRefresh,
  isBroadcastEligible,
  maintainVersion, //
  maxVersionCount, //
  name, //
  namespace, //
  preBuiltLookupCache,
  refreshCycle,
  rowCount,
  staticLookup,
  staticSource,
  versionIncrementIntervalDays, //
  visible,
  dataSource, //
  createdAt,
}) {
  return await fetchWrapper({
    method: "POST",
    url: `${BASE_URL}/api/lookup`,
    body: {
      active,
      cachingEnabled,
      code,
      description,
      forceRefresh,
      isBroadcastEligible,
      maintainVersion,
      maxVersionCount,
      name,
      namespace,
      preBuiltLookupCache,
      refreshCycle,
      rowCount,
      staticLookup,
      staticSource,
      versionIncrementIntervalDays,
      visible,
      dataSource,
      createdAt,
    },
  });
}

export function useCreateReferenceData() {
  const queryClient = useQueryClient();

  return useMutation(
    ({
      active,
      cachingEnabled,
      code,
      description,
      forceRefresh,
      isBroadcastEligible,
      maintainVersion,
      maxVersionCount,
      name,
      namespace,
      preBuiltLookupCache,
      refreshCycle,
      rowCount,
      staticLookup,
      staticSource,
      versionIncrementIntervalDays,
      visible,
      dataSource,
      createdAt,
    }) =>
      createReferenceData({
        active,
        cachingEnabled,
        code,
        description,
        forceRefresh,
        isBroadcastEligible,
        maintainVersion,
        maxVersionCount,
        name,
        namespace,
        preBuiltLookupCache,
        refreshCycle,
        rowCount,
        staticLookup,
        staticSource,
        versionIncrementIntervalDays,
        visible,
        dataSource,
        createdAt,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ReferenceData");
        notifySuccess("Reference data created successfully");
      },
      onError: (error) => {
        if (error instanceof Error) {
          notifyError(`Failed to create reference data: ${error.message}`);
        }
      },
    }
  );
}
