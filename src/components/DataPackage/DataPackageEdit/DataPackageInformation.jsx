import React from "react";
import * as Yup from "yup";

import {
  Checkbox,
  TextInput,
  Dropdown,
  TextArea,
  CheckboxGroup,
  Loading,
} from "@carbon/react";

import { Cron } from "react-js-cron";
import { Information } from "@carbon/react/icons";
import { useDataBucket } from "../../../hooks/databucket/useDataBucket";
import "react-js-cron/dist/styles.css";

import { Field, Form, Formik } from "formik";
import { useDataClassification } from "../../../hooks/dataclassification/useDataClassification";
import { useUsers } from "../../../hooks/users/useUsers";
import { useUpdateDataPackage } from "../../../hooks/datapackage/useUpdateDataPackage";
import { transformedDate } from "../../../utils/transformedDate";
import FormSubmission from "../../FormSubmission/FormSubmission";
import RequiredLabel from "sharedComponents/RequiredLabel";

const frequencyOptions = ["Manual", "Scheduled", "Continuous"];

function DataPackageInformation({
  selectedRow,
  setFormikBag,
  setIsOpen,
  setSelectedTrigger,
  selectedTrigger,
  tableNameSuggestions,
}) {
  const selectedRowData = selectedRow;
  const [value, setValue] = React.useState(
    selectedRowData?.cronSchedule || " "
  );
  const [slaValue, setSlaValue] = React.useState(
    selectedRowData?.slaCronSchedule || " "
  );
  const [showSuggestions, setShowSuggestions] = React.useState();
  const [pathInput, setPathInput] = React.useState();
  const { data: dataBucket = [] } = useDataBucket();
  const { data: users = [] } = useUsers();
  const { data: classifications = [] } = useDataClassification();
  const dataBucketOptions = dataBucket?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  const userOptions = users?.map((user) => {
    return {
      value: user.id,
      label: user.name,
    };
  });

  const classificationOptions = classifications?.map((classification) => {
    return {
      value: classification.id,
      label: classification.type,
    };
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
  });
  React.useEffect(() => {
    setSelectedTrigger({
      slaCron: selectedRowData?.slaCronSchedule,
      trigger: selectedRowData?.frequency,
    });
  }, [selectedRowData, setSelectedTrigger]);
  const initialValues = {
    dataBucket: selectedRowData.dataBucket.name,
    owner: selectedRowData.owner.name,
    name: selectedRowData.name,
    path: selectedRowData.basePath,
    classification: selectedRowData.dataClassification?.type,
    description: selectedRowData?.description,
    trigger: selectedRowData?.frequency,
    slaSchedule: selectedRowData?.slaCronSchedule,
    autoProfile: !!selectedRowData.autoProfileData,
    archiveDate: selectedRowData.archivedAt ? true : false,
    apacheIceBergTable: !!selectedRowData.apacheIceBergTable,
  };

  const archivedLabel = selectedRowData.archivedAt
    ? `Archived on ${transformedDate(selectedRowData.archivedAt)}`
    : "Archive";

  const {
    mutateAsync: updateDataPackage,
    isLoading: isUpdateDataPackageLoading,
  } = useUpdateDataPackage();

  const updateDataPackageHandler = async (formValues) => {
    const datatoSubmit = {
      dataPackageId: selectedRowData.id,
      dataBucketId: !formValues.dataBucket.value
        ? dataBucketOptions.filter(
            (bucket) => bucket.label === formValues.dataBucket
          )[0].value
        : formValues.dataBucket.value,
      ownerId: !formValues.owner.value
        ? userOptions.filter((user) => user.label === formValues.owner)[0].value
        : formValues.owner.value,
      name: formValues.name,
      basePath: pathInput || formValues.path,
      dataClassificationId: !formValues.classification.value
        ? classificationOptions.filter(
            (option) => option.label === formValues.classification
          )[0].value
        : formValues.classification.value,
      description: formValues.description,
      autoProfileData: formValues.autoProfile,
      archive: formValues.archiveDate,
      frequency: formValues.trigger,
      slaCronSchedule: formValues.slaSchedule
        ? slaValue
        : selectedRowData?.slaCronSchedule || "",
      cronSchedule:
        formValues.trigger === "Scheduled"
          ? value
          : selectedRowData?.cronSchedule || "",
    };
    await updateDataPackage(datatoSubmit);
    setIsOpen(false);
  };

  const autoCompleteContent = (
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        top: -20,
        width: "100%",
        overflow: "auto",
        maxHeight: "120px",
        zIndex: 99999,
        border: "1px solid #0f62fe",
        borderTop: "none",
      }}
    >
      <style>
        {`
        
        .custom-list-1 li{
          padding:10px 16px;
           border-bottom: 1px solid rgba(0,0,0,.25);
        }
          .custom-list-1 li:last-child{
          border-bottom:none !important;
        }
          .custom-list-1 li:hover{
          background-color:#e8e8e8;
        }
     `}
      </style>
      <ul style={{ cursor: "pointer" }} className="custom-list-1">
        {tableNameSuggestions
          ?.filter((value) =>
            value?.potentialName
              ?.toLowerCase()
              .includes(pathInput?.split("/").pop()?.toLowerCase())
          )
          ?.map((table, index) => (
            <li
              key={index}
              onClick={() =>
                setPathInput((pre) => {
                  const partialPath = pre?.substring(
                    0,
                    pre.lastIndexOf("/") + 1
                  );
                  return partialPath + table?.potentialName;
                })
              }
            >
              {table?.potentialName}
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={updateDataPackageHandler}
        validationSchema={validationSchema}
      >
        {(props) => {
          return (
            <>
              {isUpdateDataPackageLoading ? (
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
                  <div onClick={() => setShowSuggestions(false)}>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "space-between",
                        marginBottom: "20px",
                      }}
                    >
                      <FormSubmission setFormikBag={setFormikBag} />
                      <div style={{ width: "50%" }}>
                        <Field name="dataBucket">
                          {({ field, form }) => (
                            <Dropdown
                              invalidText="A valid value is required"
                              id="data-bucket-dropdown"
                              items={dataBucketOptions}
                              label="Choose an Option"
                              selectedItem={field.value}
                              invalid={
                                props.errors.dataBucket &&
                                props.touched.dataBucket
                              }
                              titleText={
                                <RequiredLabel value={"Data Bucket"} />
                              }
                              {...field}
                              onChange={(selectedItem) => {
                                form.setFieldValue(
                                  field.name,
                                  selectedItem.selectedItem
                                );
                              }}
                              disabled
                            />
                          )}
                        </Field>
                      </div>
                      <div style={{ width: "50%" }}>
                        <Field name="owner">
                          {({ field, form }) => (
                            <Dropdown
                              invalidText="A valid value is required"
                              id="carbon-dropdown-example"
                              items={userOptions}
                              label="Choose an Option"
                              titleText={<RequiredLabel value={"Owner"} />}
                              selectedItem={field.value}
                              {...field}
                              invalid={
                                props.errors.owner && props.touched.owner
                              }
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
                        gap: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      <Field name="name">
                        {({ field }) => (
                          <TextInput
                            id="name"
                            invalidText="A valid value is required"
                            labelText={<RequiredLabel value={"Name"} />}
                            {...field}
                            invalid={props.errors.name && props.touched.name}
                            placeholder="Type a name"
                            disabled
                          />
                        )}
                      </Field>

                      <Field name="path">
                        {({ field, form }) => (
                          <div
                            style={{
                              width: "45%",
                            }}
                          >
                            <TextInput
                              id="path"
                              {...field}
                              invalidText="A valid value is required"
                              labelText="Base Path"
                              autoComplete="off"
                              value={pathInput || field.value}
                              placeholder="Ex: path/path/path"
                              helperText="Base paths for the data package within the assigned bucket"
                              invalid={props.errors.path && props.touched.path}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowSuggestions(true);
                              }}
                              onChange={(e) => {
                                form.setFieldValue(field.name, e.target.value);
                                setPathInput(e.target.value);
                              }}
                              disabled
                            />
                            <div
                              style={{
                                position: "relative",
                              }}
                            >
                              {showSuggestions && autoCompleteContent}
                            </div>
                          </div>
                        )}
                      </Field>
                      <div style={{ width: "200px" }}>
                        <Field name="classification">
                          {({ field, form }) => (
                            <Dropdown
                              {...field}
                              id="classification"
                              invalidText="A valid value is required"
                              titleText={
                                <RequiredLabel value={"Data Classification"} />
                              }
                              items={classificationOptions}
                              selectedItem={field.value}
                              label="Choose an Option"
                              onChange={(selectedItem) => {
                                form.setFieldValue(
                                  field.name,
                                  selectedItem.selectedItem
                                );
                              }}
                              invalid={
                                props.errors.classification &&
                                props.touched.classification
                              }
                            />
                          )}
                        </Field>
                      </div>
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
                        gap: "10px",
                        justifyContent: "space-between",
                        margin: "20px 0",
                      }}
                      className=""
                    >
                      <div
                        style={{ display: "flex", gap: "50px", width: "50%" }}
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
                                id="checkbox-label-1"
                                checked={field.value}
                                {...field}
                              />
                            </CheckboxGroup>
                          )}
                        </Field>
                        <Field name="archiveDate">
                          {({ field }) => (
                            <CheckboxGroup
                              legendText=""
                              style={{ marginLeft: "5.3%" }}
                            >
                              <legend
                                className="cds--label"
                                style={{ display: "flex", gap: "5px" }}
                              >
                                Archive
                              </legend>
                              <Checkbox
                                labelText={archivedLabel}
                                id="checkbox-label-archive"
                                checked={field.value}
                                {...field}
                              />
                            </CheckboxGroup>
                          )}
                        </Field>
                        <Field name="slaSchedule">
                          {({ field }) => (
                            <CheckboxGroup
                              legendText=""
                              onChange={(e) =>
                                setSelectedTrigger((pre) => ({
                                  ...pre,
                                  slaCron: e.target.checked,
                                }))
                              }
                            >
                              <legend
                                className="cds--label"
                                style={{ display: "flex", gap: "5px" }}
                              >
                                SLA Schedule
                              </legend>
                              <Checkbox
                                labelText={`Yes`}
                                id="checkbox-label-2"
                                defaultChecked={field.value}
                                {...field}
                              />
                            </CheckboxGroup>
                          )}
                        </Field>
                        <Field name="apacheIceBergTable">
                          {({ field }) => (
                            <CheckboxGroup legendText="">
                              <div
                                className="cds--label"
                                style={{ display: "flex", gap: "5px" }}
                              >
                                Apache Iceberg Table
                              </div>
                              <Checkbox
                                labelText={`Yes`}
                                id="apacheIceBergTable"
                                checked={field.value}
                                {...field}
                              />
                            </CheckboxGroup>
                          )}
                        </Field>
                      </div>
                      <div style={{ width: "50%" }}>
                        <Field name="trigger">
                          {({ field, form }) => (
                            <Dropdown
                              {...field}
                              id="trigger"
                              items={frequencyOptions}
                              initialSelectedItem={field.value}
                              onChange={(selectedItem) => {
                                setSelectedTrigger((pre) => ({
                                  ...pre,
                                  trigger: selectedItem?.selectedItem,
                                }));
                                form.setFieldValue(
                                  field.name,
                                  selectedItem.selectedItem
                                );
                              }}
                              invalidText="A valid value is required"
                              titleText="Data Check Frequency"
                              label="Choose an Option"
                              style={{ width: "100%" }}
                              invalid={
                                props.errors.trigger && props.touched.trigger
                              }
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <style>
                        {`
                       .react-js-cron{
                       flex-grow:1;
                      
                       flex-wrap:nowrap;
                        }
                      .ant-select-dropdown{
                            z-index:99999
                       }
                       `}
                      </style>
                      <div style={{ width: "50%", overflow: "auto" }}>
                        {selectedTrigger?.slaCron && (
                          <div>
                            <label for="description" class="cds--label">
                              SLA Cron Schedule
                            </label>
                            <Cron value={slaValue} setValue={setSlaValue} />
                          </div>
                        )}
                      </div>
                      <div style={{ width: "50%", overflow: "auto" }}>
                        {selectedTrigger?.trigger === "Scheduled" && (
                          <div>
                            <label for="description" class="cds--label">
                              Cron Schedule
                            </label>
                            <Cron value={value} setValue={setValue} />
                          </div>
                        )}
                      </div>
                    </div>{" "}
                    {selectedTrigger?.slaCron && (
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          width: "50%",
                          marginBottom: "20px",
                        }}
                      >
                        <Field name="dataRefreshInterval">
                          {({ field, meta }) => (
                            <TextInput
                              id="refresh-interval"
                              type="number"
                              placeholder="Data Refresh Interval"
                              labelText={"Data Refresh Interval (days)"}
                              max={31}
                              invalid={meta.touched && meta.error}
                              invalidText={meta.error}
                              {...field}
                            />
                          )}
                        </Field>

                        <Field name="dataQualityThreshold">
                          {({ field, meta }) => (
                            <TextInput
                              id="quality-threshold"
                              type="number"
                              placeholder="Data Quality Threshold"
                              labelText={"Data Quality Threshold (%)"}
                              min={0}
                              max={100}
                              step="0.1"
                              invalid={meta.touched && meta.error}
                              invalidText={meta.error}
                              {...field}
                            />
                          )}
                        </Field>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </>
          );
        }}
      </Formik>
    </>
  );
}

export default DataPackageInformation;
