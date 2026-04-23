import React from "react";
import CustomDataTable from "../../../Datatable";
import { ComboBox, Button } from "@carbon/react";
import DataResourceSchemaAddModal from "./DataResourceSchemaAddModal";
import { useResourceSchema } from "../../../../hooks/dataresources/useResourceSchema";
import DeleteModel from "../../../DeleteModel/DeleteModel";
import { useDeleteResourceSchema } from "../../../../hooks/dataresources/useDeleteResourceSchema";

const headerData = [
  {
    key: "dataClass",
    header: "Data Class",
  },
  {
    key: "position",
    header: "Position",
  },
  {
    key: "length",
    header: "Length",
  },
  {
    key: "sourceName",
    header: "Source Name",
  },
  {
    key: "targetName",
    header: "Target Name",
  },
  {
    key: "title",
    header: "Title",
  },
  {
    key: "description",
    header: "Description",
  },
  {
    key: "dataType",
    header: "Data Type",
  },
  {
    key: "skipPosition",
    header: "Skip Position",
  },
  {
    key: "justified",
    header: "Justified",
  },
  {
    key: "format",
    header: "Format",
  },
];
function DataResourceSchemaTableView({
  selectedDataResourceId,
  selectedDataResourceName,
}) {
  const { data: tableResourceSchema } = useResourceSchema(
    selectedDataResourceId
  );
  const [selectedSchemaId, setSelectedSchemaId] = React.useState();
  const tableNameOptions = tableResourceSchema?.map((resource) => ({
    label: resource?.tableNameX,
    value: resource.id,
  }));
  const showData = tableResourceSchema?.filter(
    (data) => data.id === selectedSchemaId
  );
  const [isResourceSchemaAddModal, setIsResourceSchemaAddModal] =
    React.useState(false);
  const {
    mutateAsync: deleteResourceSchema,
    isLoading: isDeleteResourceSchemaDeleteLoading,
  } = useDeleteResourceSchema(selectedDataResourceId);

  const [isDeleteModelOpen, setIsDeleteModelOpen] = React.useState(false);
  const [itemsToDeleteIDs, setitemsToDeleteIDs] = React.useState([]);
  const [singleItemToDeleteID, setSingleItemToDeleteID] = React.useState(null);

  const deleteCaller = (id) => {
    deleteResourceSchema({ schemaId: id });
  };

  const deleteBatchActionHanlder = (idList) => {
    setIsDeleteModelOpen(true);
    setitemsToDeleteIDs(idList);
  };

  const deleteActionHanlder = (id) => {
    setIsDeleteModelOpen(true);
    setSingleItemToDeleteID(id);
  };
  return (
    <>
      <style>
        {`.noheader.cds--data-table-header {
          padding: 10px;
        }
        .noheader.cds--table-toolbar {
          min-height: 0;
      }`}
      </style>
      <div className="noheader">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ComboBox
            onChange={({ selectedItem }) => {
              setSelectedSchemaId(selectedItem?.value);
            }}
            id="carbon-combobox"
            placeholder="Table Name"
            items={tableNameOptions || []}
            itemToString={(item) => (item ? item?.label : "")}
            titleText="Table Name"
          />
          <Button onClick={() => setIsResourceSchemaAddModal(true)}>
            New Table +
          </Button>
        </div>
        <div style={{ margin: "20px 0 0 0" }}>
          <span>
            Has Lookup Ahead:
            {!selectedSchemaId
              ? "- -"
              : showData[0]?.hasLookAhead
              ? "Yes"
              : "No"}
          </span>
          <span style={{ marginLeft: "10%" }}>Lookup Ahead: - -</span>
          <span style={{ marginLeft: "10%" }}>
            Schema Version:
            {!selectedSchemaId ? "- -" : showData[0]?.version}
          </span>
        </div>
        <CustomDataTable
          headers={headerData}
          rows={[]}
          shouldTableBatchActionsRender={false}
          shouldAddNewButton={false}
          shouldEditButtonRender={false}
          deleteAction={deleteActionHanlder}
          deleteBatchAction={deleteBatchActionHanlder}
        />
        {isResourceSchemaAddModal && (
          <DataResourceSchemaAddModal
            selectedDataResourceName={selectedDataResourceName}
            selectedDataResourceId={selectedDataResourceId}
            isResourceSchemaAddModal={isResourceSchemaAddModal}
            setIsResourceSchemaAddModal={setIsResourceSchemaAddModal}
          />
        )}{" "}
        {(isDeleteModelOpen || isDeleteResourceSchemaDeleteLoading) && (
          <DeleteModel
            deleteActionHanlder={deleteActionHanlder}
            deleteCaller={deleteCaller}
            itemsToDeleteIDs={itemsToDeleteIDs}
            setIsDeleteModelOpen={setIsDeleteModelOpen}
            isDeleteModelOpen={isDeleteModelOpen}
            setitemsToDeleteIDs={setitemsToDeleteIDs}
            singleItemToDeleteID={singleItemToDeleteID}
            setSingleItemToDeleteID={setSingleItemToDeleteID}
            isLoading={isDeleteResourceSchemaDeleteLoading}
          />
        )}
      </div>
    </>
  );
}

export default DataResourceSchemaTableView;
