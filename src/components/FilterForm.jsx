import { DatePicker, DatePickerInput, Button, Stack } from "@carbon/react";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { AFCheckbox, AFDropdown } from "sharedComponents/Form";

function FilterForm({
  setIsFilterOpen,
  onSubmit,
  filterLable,
  isCheckBoxFilter,
  dataPackage = [],
  dataResource = [],
  classesSortBy = [],
  showClasses = [],
  isMultiCheckBox,
  showDateInput = true,
}) {
  const dataPackageOptions = dataPackage?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  const dataResourceOptions = dataResource?.map((data) => {
    return {
      value: data.id,
      label: data.name,
    };
  });
  const [formData, setFormData] = useState({
    isYes: true,
    isNo: true,
    createdFromDate: [],
    updatedFromDate: [],
  });
  const [inValidation, setinValidation] = useState({
    createdStart: false,
    createdEnd: false,
    updatedStart: false,
    updatedEnd: false,
  });
  const initialValues = {
    isYes: true,
    isNo: true,
    dataPackage: "",
    showClasses: "",
    classesSortBy: "",
  };

  const updateInvalidation = (value) => {
    setinValidation((preStateValid) => {
      return (preStateValid = { ...preStateValid, ...value });
    });
  };
  const updateFormDataHandler = (value) => {
    setFormData(
      (preState) =>
        (preState = {
          ...preState,
          ...value,
        })
    );
  };

  const onResetForm = () => {
    setinValidation({
      createdStart: false,
      createdEnd: false,
      updatedStart: false,
      updatedEnd: false,
    });
    setFormData({
      isYes: true,
      isNo: true,
      createdFromDate: [],
      updatedFromDate: [],
    });
    onSubmit({
      isYes: true,
      isNo: true,
      dataPackage: {
        value: 0,
      },
      classesSortBy: {
        value: 0,
      },
      showClasses: {
        value: 0,
      },
    });
    setIsFilterOpen(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        onSubmit(values);
        setIsFilterOpen(false);
      }}
      enableReinitialize
    >
      {(props) => (
        <Form
          style={{
            width: "340px",
          }}
        >
          <div style={{ padding: "25px" }}>
            <Stack gap={7}>
              <h3>Filter</h3>
              {isCheckBoxFilter ? (
                <div
                  style={{
                    display: "flex",
                    margin: 0,
                    flexDirection: "column",
                    gap: "10px",
                    alignItems: "baseline",
                  }}
                >
                  <legend>{filterLable}</legend>
                  <div
                    style={{
                      display: "flex",
                      margin: 0,
                      flexDirection: "row",
                      gap: "10px",
                      alignItems: "baseline",
                    }}
                  >
                    <Field type="checkbox" name="isYes" id="isYes" />
                    <label htmlFor="isYes">Yes</label>
                    <Field name="isNo" type="checkbox" id="isNo" />
                    <label htmlFor="isNo">No</label>
                  </div>
                </div>
              ) : isMultiCheckBox ? (
                <>
                  <AFCheckbox name="totalRuns" />
                  <AFCheckbox name="activeRuns" />
                  <AFCheckbox name="completedRuns" />
                  <AFCheckbox name="successful" />
                  <AFCheckbox />
                  <AFCheckbox />
                </>
              ) : (
                <>
                  {dataPackageOptions.length !== 0 && (
                    <AFDropdown
                      label="Data Package"
                      name="dataPackage"
                      options={dataPackageOptions}
                    />
                  )}

                  {dataResourceOptions.length !== 0 && (
                    <AFDropdown
                      label="Data Resource"
                      name="dataResource"
                      options={dataResourceOptions}
                    />
                  )}

                  {classesSortBy.length !== 0 && (
                    <AFDropdown
                      label="Sort By"
                      name="classesSortBy"
                      options={classesSortBy}
                    />
                  )}
                  {showClasses.length !== 0 && (
                    <AFDropdown
                      label="Show"
                      name="showClasses"
                      options={showClasses}
                    />
                  )}
                </>
              )}
              {showDateInput && (
                <>
                  <DatePicker
                    datePickerType="range"
                    maxDate="20/06/2023"
                    minDate="01/01/2017"
                    onChange={(e) => {
                      updateFormDataHandler({ createdFromDate: e });
                    }}
                  >
                    <DatePickerInput
                      id="date-archived-start"
                      placeholder="mm/dd/yyyy"
                      labelText="Created From"
                      onClick={() =>
                        updateInvalidation({ createdStart: false })
                      }
                      invalid={inValidation.createdStart}
                      size="md"
                    />
                    <DatePickerInput
                      id="date-archived-finish"
                      onClick={() => {
                        updateInvalidation({ createdEnd: false });
                      }}
                      placeholder="mm/dd/yyyy"
                      labelText="To"
                      invalid={inValidation.createdEnd}
                      size="md"
                    />
                  </DatePicker>
                  <DatePicker
                    maxDate="20/06/2023"
                    minDate="01/01/2017"
                    datePickerType="range"
                    value={formData.updatedFromDate}
                    onChange={(e) =>
                      updateFormDataHandler({ updatedFromDate: e })
                    }
                  >
                    <DatePickerInput
                      id="date-active-start"
                      placeholder="mm/dd/yyyy"
                      invalid={inValidation.updatedStart}
                      onClick={() =>
                        updateInvalidation({ updatedStart: false })
                      }
                      labelText="Last Updated From"
                      size="md"
                    />
                    <DatePickerInput
                      id="date-active-finish"
                      invalid={inValidation.updatedEnd}
                      placeholder="mm/dd/yyyy"
                      onClick={(e) => {
                        updateInvalidation({ updatedEnd: false });
                      }}
                      labelText="To"
                      size="md"
                    />
                  </DatePicker>
                </>
              )}
            </Stack>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              kind="ghost"
              type="reset"
              onClick={onResetForm}
              style={{ width: "50%" }}
            >
              Reset
            </Button>
            <Button kind="primary" type="submit" style={{ width: "50%" }}>
              Apply
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default FilterForm;
