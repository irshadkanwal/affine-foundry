import React from "react";
import { ComboBox } from "@carbon/react";
import CustomDataTable from "components/Datatable";
import CustomModal from "components/CustomModal";
import { useCreateDataClassMapping } from "hooks/dataHealth/dataClass/useCreateDataClassMapping";
import Loading from "components/Loading";
import { useUpdateDataClassMapping } from "hooks/dataHealth/dataClass/useUpdateDataClassMapping";
import ToggleContent from "./ToggleContent";
import DataColumnSingleSelection from "./DataColumnSingleSelection";

function getUniqueByProperty(arr, property = "fieldName") {
  return Array.from(new Set(arr.map((item) => item[property]))).map((value) => {
    return arr.find((item) => item[property] === value);
  });
}

function ComboBoxContent({
  data,
  dataClassLevel2,
  preSelectedClass,
  setSelectedDataClass,
  setDisablePrimaryButton,
}) {
  return (
    <ComboBox
      key={data?.profileDetailKey}
      items={dataClassLevel2}
      id={data?.profileDetailKey}
      initialSelectedItem={preSelectedClass}
      placeholder="Choose option"
      itemToString={(value) => value?.name}
      name="DependOnOpt"
      onChange={(value) => {
        setSelectedDataClass((preState) => [
          ...preState,
          {
            dataClassId: value.selectedItem?.id,
            fieldName: data?.columnName,
          },
        ]);
        setDisablePrimaryButton(false);
      }}
    />
  );
}

const headers = [
  { key: "columnName", header: "Name" },
  { key: "dataType", header: "Data Class" },
];

function DataClassModal({
  modalHeading,
  selectedColumn,
  columns = [],
  buttonText,
  secondaryButtonText,
  onRequestClose,
  dataClassLevel2 = [],
  dataResourceId,
  dataClassLoading,
  allDataClassMapping = [],
  isDataClassMappingLoading,
  refetchDataClassMapping,
  refetchDataClass2,
}) {
  const [selectedDataClass, setSelectedDataClass] = React.useState([]);
  const [selectedDataClassForMultipleCols, setDataClassForMultipleCols] =
    React.useState([]);
  const [selectedMultipleCol, setSelectedMultipleCol] = React.useState(columns);
  const [isColumnSelected, setIsColumnSelected] = React.useState();
  const [render, setRender] = React.useState(0);
  const [isWorkingOnMultipleCol, setIsWorkingOnMultipleCol] = React.useState();
  const [disablePrimaryButton, setDisablePrimaryButton] = React.useState(true);

  const dataClassMapping = React.useMemo(
    () =>
      allDataClassMapping?.filter(
        (value) => value?.dataResourceId === dataResourceId
      ),
    [dataResourceId, allDataClassMapping]
  );

  const {
    mutateAsync: createClassMapping,
    isLoading: isCreateDataClassLoading,
  } = useCreateDataClassMapping();

  const {
    mutateAsync: updatedDataClassMapping,
    isLoading: isUpdateDataClassLaoding,
  } = useUpdateDataClassMapping();

  const rowData = React.useMemo(() => {
    const filteredColumns = selectedMultipleCol.filter((data) => {
      if (selectedColumn) {
        return data.profileDetailKey === selectedColumn;
      } else {
        return data;
      }
    });
    return filteredColumns?.map((data, index) => {
      const preSelectedList = {
        name: dataClassMapping?.filter(
          (value) => value?.fieldName === data?.columnName
        ),
      };
      const value = dataClassLevel2?.find(
        (value) => value?.id === preSelectedList?.name[0]?.dataClassId
      );
      setRender((pre) => pre + 1);

      return {
        ...data,
        id: `${data.columnName}`,
        dataType: (
          <ComboBoxContent
            key={index + render}
            preSelectedClass={
              isColumnSelected && isWorkingOnMultipleCol
                ? selectedDataClassForMultipleCols
                : value
            }
            data={data}
            setDisablePrimaryButton={setDisablePrimaryButton}
            setSelectedDataClass={setSelectedDataClass}
            dataClassLevel2={dataClassLevel2}
          />
        ),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    columns,
    dataClassLevel2,
    dataClassMapping,
    selectedColumn,
    selectedDataClassForMultipleCols,
    selectedMultipleCol,
    isColumnSelected,
  ]);

  const handleSubmit = async () => {
    if (isColumnSelected && isWorkingOnMultipleCol) {
      const filteredNewCol = selectedMultipleCol.filter(
        (item) =>
          !dataClassMapping.some(
            (classItem) => classItem.fieldName === item.columnName
          )
      );
      const filteredOldCol = selectedMultipleCol.filter((item) =>
        dataClassMapping.some(
          (classItem) => classItem.fieldName === item.columnName
        )
      );
      const updatedNewData = filteredOldCol.map((filteredOldItem) => {
        const dataClassItem = dataClassMapping.find(
          (item) => item.fieldName === filteredOldItem.columnName
        );
        if (dataClassItem) {
          return {
            ...filteredOldItem,
            mappingId: dataClassItem.id,
          };
        }
        return filteredOldItem;
      });
      const classMappingData = filteredNewCol.map((newData) => ({
        dataResourceId: dataResourceId,
        dataClassId: selectedDataClassForMultipleCols.id,
        fieldName: newData?.columnName,
      }));
      await createClassMapping(classMappingData);
      updatedNewData.forEach(async (newData) => {
        await updatedDataClassMapping({
          mappingId: newData.mappingId,
          dataResourceId: dataResourceId,
          dataClassId: selectedDataClassForMultipleCols?.id,
          fieldName: newData?.columnName,
        });
      });
      setIsWorkingOnMultipleCol(false);
    } else {
      const filteredNewData = selectedDataClass.filter(
        (item) =>
          !dataClassMapping.some(
            (classItem) => classItem.fieldName === item.fieldName
          )
      );
      const filteredOldData = selectedDataClass.filter((item) =>
        dataClassMapping.some(
          (classItem) => classItem.fieldName === item.fieldName
        )
      );

      const updatedNewData = filteredOldData.map((filteredOldItem) => {
        const dataClassItem = dataClassMapping.find(
          (item) => item.fieldName === filteredOldItem.fieldName
        );
        if (dataClassItem) {
          return {
            ...filteredOldItem,
            id: dataClassItem.id,
          };
        }
        return filteredOldItem;
      });

      const uniqueFilteredNewData = getUniqueByProperty(filteredNewData);
      const uniqueFilteredOldData = getUniqueByProperty(updatedNewData);
      const classMappingData = uniqueFilteredNewData.map((newData) => ({
        dataResourceId: dataResourceId,
        dataClassId: newData.dataClassId,
        fieldName: newData?.fieldName,
      }));
      if (classMappingData?.length !== 0)
        await createClassMapping(classMappingData);

      uniqueFilteredOldData?.forEach(async (value) => {
        await updatedDataClassMapping({
          mappingId: value?.id,
          dataResourceId: dataResourceId,
          dataClassId: value?.dataClassId,
          fieldName: value?.fieldName,
        });
      });
    }
    refetchDataClass2();
    refetchDataClassMapping();
    setSelectedDataClass([]);
    setDisablePrimaryButton(true);
  };

  const applyClassAction = (selectedRows) => {
    setIsColumnSelected(true);
    const selectedColumnNames = selectedRows?.map((row) => row?.id);
    const selectedColumnList = columns.filter((col) =>
      selectedColumnNames?.includes(col.columnName)
    );
    setSelectedMultipleCol(selectedColumnList);
    setIsWorkingOnMultipleCol(true);
    setDisablePrimaryButton(false);
  };

  const handleResetTable = () => {
    setIsWorkingOnMultipleCol(false);
    setIsColumnSelected(false);
    refetchDataClass2();
    refetchDataClassMapping();
    setSelectedMultipleCol(columns);
    setRender((pre) => pre + 2);
    setSelectedDataClass([]);
    setDisablePrimaryButton(true);
  };
  return (
    <>
      <CustomModal
        isOpen={true}
        modalHeading={modalHeading}
        buttonText={buttonText}
        onRequestClose={onRequestClose}
        onRequestSubmit={handleSubmit}
        primaryButtonDisabled={disablePrimaryButton}
        secondaryButtonText={secondaryButtonText}
        passiveModal={false}
      >
        <style>
          {`
          .custom-assign-modal  .cds--table-toolbar {
              //  display: none;
            }
            .custom-assign-modal .cds--list-box__selection{
              display:none;
            }
          
       
            `}
        </style>
        {
          <div
            style={{ height: selectedColumn ? "470px" : "610px" }}
            className="custom-assign-modal"
          >
            {isCreateDataClassLoading ||
            isDataClassMappingLoading ||
            isUpdateDataClassLaoding ||
            dataClassLoading ? (
              <Loading />
            ) : selectedColumn ? (
              <DataColumnSingleSelection rowData={rowData} />
            ) : (
              <CustomDataTable
                rows={rowData}
                headers={headers}
                tableHeading="Columns"
                shouldActionsRender={false}
                applyClassAction={applyClassAction}
                tableInlineSearch={true}
                isSortable={true}
                isDataClassTable={true}
                downloadAction={handleResetTable}
                showDownloadButton="reset"
                toggleContent={
                  <ToggleContent
                    setDataClassForMultipleCols={setDataClassForMultipleCols}
                    dataClass={dataClassLevel2}
                  />
                }
              />
            )}
          </div>
        }
      </CustomModal>
    </>
  );
}
export default DataClassModal;
