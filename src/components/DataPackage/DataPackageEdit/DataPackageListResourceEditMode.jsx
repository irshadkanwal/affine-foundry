import React from "react";
import * as Yup from "yup";

import {
  Checkbox,
  TextInput,
  Dropdown,
  TextArea,
  CheckboxGroup,
  Loading,
  Modal,
} from "@carbon/react";
import { Information } from "@carbon/react/icons";
import { Field, Form, Formik } from "formik";
import { RESOURCE_DATA_FORMAT, dataLevelType } from "../../../constants";
import { transformedDate } from "../../../utils/transformedDate";
import { useUpdateDataPackageResourceById } from "../../../hooks/datapackage/useUpdateDataPackageResourceById";
import RequiredLabel from "sharedComponents/RequiredLabel";

function DataPackageResourceEditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedRow,
  dataClass,
  transactionType,
}) {
  const dataClassOtions = dataClass?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const transactionTypeOptions = transactionType?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const dataLevelTypeOptions = dataLevelType.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const selectedRowData = selectedRow?.cells.reduce((acc, value) => {
    const objectKey = value.id.split(":");
    return {
      ...acc,
      [objectKey[1]]: value.value,
      archive: selectedRow.resourceArchive,
      autoProfileData: selectedRow.resourceAutoProfile,
      description: selectedRow.resourceDescription,
      dataLevelType: selectedRow.dataLevelType,
    };
  }, {});
  const archivedLabel = selectedRowData?.archivedAt
    ? `Archived on ${transformedDate(selectedRowData?.archivedAt)}`
    : "Archive";
  const validationSchema = Yup.object().shape({
    dataClassId: Yup.object().required(),
    transactionTypeId: Yup.object().required(),
    name: Yup.string().required(),
    dataFormat: Yup.object().required(),
    title: Yup.string().required(),
    dataLevelType: Yup.object().required(),
  });
  const initialValues = {
    dataClassId: dataClassOtions?.filter(
      (listItem) => listItem.label === selectedRowData.dataClassName
    )[0],
    transactionTypeId: transactionTypeOptions?.filter(
      (listItem) => listItem.label === selectedRowData.transactionTypeName
    )[0],
    name: selectedRowData.name,
    description: selectedRowData.description,
    dataFormat: RESOURCE_DATA_FORMAT?.filter(
      (item) => item.label === selectedRowData.dataFormatted
    )[0],
    title: selectedRowData.title,
    archiveDate: selectedRow.resourceArchive,
    autoProfile: selectedRow.resourceAutoProfile,
    dataLevelType: dataLevelTypeOptions?.filter(
      (item) => item.value === selectedRowData.dataLevelType.id
    )[0],
  };
  const {
    mutateAsync: updateDataPackageResource,
    isLoading: isUpdateDataResourceLoading,
  } = useUpdateDataPackageResourceById();
  const updateDataPackageResourceHandler = async (formValues) => {
    const resourceData = {
      name: formValues.name,
      title: formValues.title,
      description: formValues.description,
      dataPackageId: 76, //
      userId: 2, //
      dataClassId: formValues.dataClassId.value,
      editable: false,
      transactionTypeId: formValues.transactionTypeId.value,
      dataFormatId: formValues.dataFormat.id,
      autoProfileData: formValues.autoProfile,
      archive: formValues.archiveDate,
      dataLevelTypeId: formValues.dataLevelType.value,
    };
    await updateDataPackageResource({
      resourceData,
      resourceId: selectedRow.id,
    });
    setIsEditModalOpen(false);
  };
  return (
    <>
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={updateDataPackageResourceHandler}
        >
          {(props) => {
            return (
              <>
                <Modal
                  open={isEditModalOpen}
                  modalHeading="Edit Data Package Resource"
                  primaryButtonText={
                    isUpdateDataResourceLoading ? "Updating..." : "Save"
                  }
                  onRequestClose={() => setIsEditModalOpen(false)}
                  onRequestSubmit={props.handleSubmit}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 9999,
                  }}
                  secondaryButtonText="Cancel"
                >
                  {isUpdateDataResourceLoading ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loading
                        description="Active loading indicator"
                        withOverlay={false}
                      />
                    </div>
                  ) : (
                    <Form>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          justifyContent: "space-between",
                          marginBottom: "20px",
                        }}
                      >
                        <div style={{ width: "50%" }}>
                          <Field name="dataClassId">
                            {({ field, form }) => (
                              <Dropdown
                                invalidText="A valid value is required"
                                id="data-class"
                                items={dataClassOtions || []}
                                selectedItem={field.value}
                                label="Choose an Option"
                                itemToString={(item) =>
                                  item ? item?.label : ""
                                }
                                invalid={
                                  props.errors.dataClassId &&
                                  props.touched.dataClassId
                                }
                                titleText={
                                  <RequiredLabel value={"Data Class"} />
                                }
                                {...field}
                                onChange={(selectedItem) => {
                                  form.setFieldValue(
                                    field.name,
                                    selectedItem.selectedItem
                                  );
                                }}
                              />
                            )}
                          </Field>
                        </div>
                        <div style={{ width: "50%" }}>
                          <Field name="transactionTypeId">
                            {({ field, form }) => (
                              <Dropdown
                                invalidText="A valid value is required"
                                id="data-bucket-dropdown"
                                items={transactionTypeOptions || []}
                                selectedItem={field.value}
                                label="Choose an Option"
                                invalid={
                                  props.errors.transactionTypeId &&
                                  props.touched.transactionTypeId
                                }
                                titleText={
                                  <RequiredLabel value={"Transaction Type"} />
                                }
                                itemToString={(item) =>
                                  item ? item?.label : ""
                                }
                                {...field}
                                onChange={(selectedItem) => {
                                  form.setFieldValue(
                                    field.name,
                                    selectedItem.selectedItem
                                  );
                                }}
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "20px",
                        }}
                      >
                        <Field name="name">
                          {({ field }) => (
                            <TextInput
                              id="name"
                              invalidText="A valid value is required"
                              {...field}
                              labelText={<RequiredLabel value={"Name"} />}
                              invalid={props.errors.name && props.touched.name}
                              placeholder="Type a name"
                            />
                          )}
                        </Field>
                      </div>
                      <Field name="description">
                        {({ field }) => (
                          <TextArea
                            {...field}
                            id="description"
                            invalidText="A valid value is required"
                            labelText="Description"
                            placeholder="description"
                            maxCount={255}
                            maxLength={255}
                            invalid={
                              props.errors.description &&
                              props.touched.description
                            }
                          />
                        )}
                      </Field>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "10px",
                          justifyContent: "space-between",
                          margin: "20px 0",
                        }}
                      >
                        <Field name="dataFormat">
                          {({ field, form }) => (
                            <Dropdown
                              {...field}
                              id="data-format"
                              invalidText="A valid value is required"
                              titleText={
                                <RequiredLabel value={"Data Format"} />
                              }
                              label="Choose an option"
                              selectedItem={field.value}
                              items={RESOURCE_DATA_FORMAT}
                              itemToString={(item) => (item ? item.label : "")}
                              style={{ width: "50%" }}
                              onChange={(selectedItem) => {
                                form.setFieldValue(
                                  field.name,
                                  selectedItem.selectedItem
                                );
                              }}
                              invalid={
                                props.errors.dataFormat &&
                                props.touched.dataFormat
                              }
                            />
                          )}
                        </Field>
                        <div style={{ width: "50%" }}>
                          <Field name="title">
                            {({ field }) => (
                              <TextInput
                                id="title"
                                invalidText="A valid value is required"
                                labelText={<RequiredLabel value={"Title"} />}
                                {...field}
                                invalid={
                                  props.errors.title && props.touched.title
                                }
                                placeholder="Type a title"
                              />
                            )}
                          </Field>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          // justifyContent: "space-between",
                        }}
                      >
                        <Field name="dataLevelType">
                          {({ field, form }) => (
                            <Dropdown
                              {...field}
                              id="data-level"
                              invalidText="A valid value is required"
                              label="Choose an option"
                              titleText={
                                <RequiredLabel value={"Data Level Type"} />
                              }
                              selectedItem={field.value}
                              items={dataLevelTypeOptions}
                              itemToString={(item) => (item ? item.label : "")}
                              style={{ width: "50%" }}
                              onChange={(selectedItem) => {
                                form.setFieldValue(
                                  field.name,
                                  selectedItem.selectedItem
                                );
                              }}
                              invalid={
                                props.errors.dataLevelType &&
                                props.touched.dataLevelType
                              }
                            />
                          )}
                        </Field>
                        <div
                          style={{
                            display: "flex",
                            flexGrow: 1,
                          }}
                        >
                          <Field name="autoProfile">
                            {({ field }) => (
                              <CheckboxGroup legendText="">
                                <legend
                                  className="cds--label"
                                  style={{ display: "flex", gap: "5px" }}
                                >
                                  Auto Profile
                                  <Information />
                                </legend>
                                <Checkbox
                                  labelText={`Yes`}
                                  id="checkbox-label-auto-package-1"
                                  defaultChecked={field.value}
                                  {...field}
                                />
                              </CheckboxGroup>
                            )}
                          </Field>
                          <Field name="archiveDate">
                            {({ field }) => (
                              <CheckboxGroup
                                legendText=""
                                style={{ marginLeft: "43%" }}
                              >
                                <legend
                                  className="cds--label"
                                  style={{ display: "flex", gap: "5px" }}
                                >
                                  Archive
                                </legend>
                                <Checkbox
                                  labelText={archivedLabel}
                                  id="checkbox-label-archive-1"
                                  defaultChecked={field.value}
                                  {...field}
                                />
                              </CheckboxGroup>
                            )}
                          </Field>
                        </div>
                      </div>
                    </Form>
                  )}
                </Modal>
              </>
            );
          }}
        </Formik>
      </>
    </>
  );
}
export default DataPackageResourceEditModal;
