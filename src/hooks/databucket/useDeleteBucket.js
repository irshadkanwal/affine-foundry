import { useMutation, useQueryClient } from "react-query";
import { fetchWrapper } from "../../utils/fetchWrapper";
import { BASE_URL } from "../../config";
import { notifyError, notifySuccess } from "utils/toastNotifications";

async function deleteBucket({ bucketId }) {
  return await fetchWrapper({
    method: "DELETE",
    url: `${BASE_URL}/api/data-bucket/${bucketId}`,
  });
}

export function useDeleteBucket() {
  const queryClient = useQueryClient();

  return useMutation(({ bucketId }) => deleteBucket({ bucketId }), {
    onSuccess: () => {
      queryClient.invalidateQueries("DataBucket");
      notifySuccess("Data bucket deleted successfully.");
    },
    onError: (error) => {
      if (error instanceof Error) {
        notifyError(`Failed to delete data bucket: ${error.message}`);
      }
    },
  });
}
