import { Loading, Modal } from "@carbon/react";

function DeleteModel({
  setIsDeleteModelOpen,
  itemsToDeleteIDs,
  setitemsToDeleteIDs,
  deleteCaller,
  singleItemToDeleteID,
  setSingleItemToDeleteID,
  isLoading = false,
  externalOnClose = () => {},
}) {
  const bulkSubmitHandler = () => {
    itemsToDeleteIDs?.forEach(async (itemToDeleteId) => {
      await deleteCaller(itemToDeleteId);
    });
    setIsDeleteModelOpen(false);
    setitemsToDeleteIDs([]);
  };

  const singleSubmitHandler = async () => {
    singleItemToDeleteID !== 1 && (await deleteCaller(singleItemToDeleteID));
    setIsDeleteModelOpen(false);
    setSingleItemToDeleteID(null);
  };

  return (
    <Modal
      open
      danger
      size="sm"
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
      }}
      modalHeading="Confirm Delete Operation"
      modalLabel="Confirmation"
      primaryButtonText={isLoading ? "Deleting..." : "Delete"}
      secondaryButtonText="Cancel"
      onRequestClose={() => {
        setIsDeleteModelOpen(false);
        externalOnClose();
      }}
      onRequestSubmit={
        !itemsToDeleteIDs.length ? singleSubmitHandler : bulkSubmitHandler
      }
    >
      {isLoading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading description="Deleting..." withOverlay={false} />
          </div>
        </>
      ) : (
        <>
          {itemsToDeleteIDs.length
            ? `You are about to perform a batch delete operation. This action will
          permanently delete the selected items and cannot be undone. Please confirm
          your decision.`
            : `You are about to perform delete operation. This action will
          permanently delete the selected item and cannot be undone. Please confirm
          your decision.`}
        </>
      )}
    </Modal>
  );
}
export default DeleteModel;
