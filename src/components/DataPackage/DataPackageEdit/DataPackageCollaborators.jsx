import React from "react";
import CustomDataTable from "../../Datatable";
import { useDataCollaborators } from "../../../hooks/datacollaborators/useDataCollaborators";
import { useUsers } from "../../../hooks/users/useUsers";
import { useDataCollaboratorRoles } from "../../../hooks/datacollaborators/useCollaboratotRole";
import { formatDateTime } from "../../../utils/formatDateTime";
import DataPackageCollaboratorAddModel from "./DataPackageCollaboratorAddModel";
import DataPackageCollaboratorEditModel from "./DataPackageCollaboratorEditModel";
import DeleteModel from "../../DeleteModel/DeleteModel";
import { useDeleteDataCollaborator } from "../../../hooks/datacollaborators/useDeleteDataCollaborator";

const headerData = [
  {
    key: "userName",
    header: "Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "role",
    header: "Role",
  },
  {
    key: "lastActivityAt",
    header: "Last Activity",
  },
];

function DataPackageCollaborators({ selectedDataPackageId }) {
  const { data: dataCollaboratorsData } = useDataCollaborators();
  const dataCollaborators = dataCollaboratorsData?.filter(
    (data) => data?.dataPackageId === selectedDataPackageId
  );
  const { data: users } = useUsers();
  const { data: collaboratorRole } = useDataCollaboratorRoles();
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState();

  const {
    mutateAsync: deleteCollaborator,
    isLoading: isCollaboratorDeleteLoading,
  } = useDeleteDataCollaborator();

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);
  const deleteCaller = (id) => {
    deleteCollaborator({ collaboratorId: id });
  };
  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };

  const transformedData = dataCollaborators?.map((collaborator) => {
    const foundUser = users?.find((user) => user.id === collaborator.userId);

    const founCollaboratorRole = collaboratorRole?.find(
      (role) => role.id === collaborator.collaboratorRoleId
    );
    return {
      ...collaborator,
      lastActivityAt: formatDateTime(collaborator.lastActivityAt),
      userName: foundUser?.name,
      email: foundUser?.email,
      role: founCollaboratorRole?.role,
    };
  });

  return (
    <>
      <CustomDataTable
        tableHeading="Data Collaborators"
        headers={headerData}
        buttonText="New Collaborator +"
        rows={transformedData}
        deleteAction={deleteActionHanlder}
        deleteBatchAction={deleteBatchActionHanlder}
        getSelectedRow={setSelectedData}
        openAddModal={setIsAddModalOpen}
        shouldTableBatchActionsRender={true}
        openEditModal={setIsEditModalOpen}
      />

      {isAddModalOpen && (
        <DataPackageCollaboratorAddModel
          selectedDataPackageId={selectedDataPackageId}
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          collaboratorRole={collaboratorRole}
          users={users}
        />
      )}
      {isEditModalOpen && (
        <DataPackageCollaboratorEditModel
          selectedDataPackageId={selectedDataPackageId}
          isOpen={isEditModalOpen}
          selectedData={selectedData}
          setIsOpen={setIsEditModalOpen}
          collaboratorRole={collaboratorRole}
          users={users}
        />
      )}
      {(isDeleteModelOpen || isCollaboratorDeleteLoading) && (
        <DeleteModel
          deleteActionHanlder={deleteActionHanlder}
          deleteCaller={deleteCaller}
          itemsToDeleteIDs={itemsToDeleteIDs}
          setIsDeleteModelOpen={setIsDeleteModelOpen}
          setitemsToDeleteIDs={setitemsToDeleteIDs}
          singleItemToDeleteID={singleItemToDeleteID}
          setSingleItemToDeleteID={setSingleItemToDeleteID}
          isLoading={isCollaboratorDeleteLoading}
        />
      )}
    </>
  );
}

export default DataPackageCollaborators;
