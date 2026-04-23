import React from "react";
import * as Yup from "yup";
import {
  AFCheckbox,
  AFDropdown,
  AFForm,
  AFTextArea,
  AFTextField,
} from "sharedComponents/Form";

import { useUpdateReferenceData } from "hooks/referencedata/useUpdateReferenceData";
import { jsonStringify } from "utils/jsonStringify";
import { useConnectionType } from "hooks/dataconnectors/useConnectionTypes";
import FormSubmission from "components/FormSubmission/FormSubmission";
import { useDataFormat } from "hooks/useDataFormat";
import RequiredLabel from "sharedComponents/RequiredLabel";

function ReferenceDataSource({
  dataSourceValues,
  setFormikBag,
  overViewData,
  setIsOpen,
  setModalButtonConfig,
}) {
  const { dataSource: dataSourceJson } = dataSourceValues;
  const { data: sourceTypes = [] } = useConnectionType();
  const { data: dataFormatData = [] } = useDataFormat();
  const typesOptions = sourceTypes?.map((data) => ({
    value: data?.id,
    label: data?.type,
  }));

  const {
    mutateAsync: updateReferenceData,
    isLoading: isUpdateReferenceDataLoading,
  } = useUpdateReferenceData();

  const dataSource = jsonStringify(dataSourceJson);
  const [dropdownValue, setDropdownValue] = React.useState(
    dataSource?.data_format || null
  );
  const dataFormatOptions = dataFormatData?.map((data) => {
    return { value: data.id, label: data.name };
  });
  React.useEffect(() => {
    //is Submitting is updated when ever isLoading Changes while preventing old config

    setModalButtonConfig((prev) => ({
      ...prev,
      isSubmitting: isUpdateReferenceDataLoading,
    }));
  }, [isUpdateReferenceDataLoading, setModalButtonConfig]);
  const initialValues = {
    dataFormat: dataFormatOptions?.filter(
      (data) => data.value === dataSource.data_format
    )[0],
    sourceType: typesOptions?.filter(
      (data) => data.value === dataSource.source_type
    )[0],
    delimiter: dataSource.delimiter,
    connectionString: dataSource.connection_string,
    sqlStatement: dataSource.sql_override,
    continue: dataSource.continue_if_sql_fail,
    cache: dataSourceValues.cachingEnabled,
  };
  const validationSchema = Yup.object().shape({
    dataFormat: Yup.object().required(),
    sourceType: Yup.object().required(),
    connectionString: Yup.string().required(),
    sqlStatement: Yup.string().required(),
    delimiter: dropdownValue === 1 ? Yup.string().required() : "",
  });
  const onSubmitHandle = async (formValues) => {
    const dataSourceUpdatedData = {
      connection_string: formValues.connectionString,
      continue_if_sql_fail: formValues.continue,
      data_format: formValues.dataFormat.value,
      delimiter: formValues.dataFormat.value === 1 ? formValues.delimiter : "",
      sample_data_table: dataSource.sample_data_table || "",
      source_type: formValues.sourceType.value,
      sql_override: formValues.sqlStatement,
      table_name: dataSource.table_name || "",
    };
    const referenceData = {
      ...overViewData,
      dataSource: JSON.stringify(dataSourceUpdatedData),
      cachingEnabled: formValues.cache,
    };
    await updateReferenceData({
      referenceData,
      referenceId: dataSourceValues.id,
    });
    setIsOpen(false);
  };

  return (
    <>
      <AFForm
        initialValues={initialValues}
        onSubmit={onSubmitHandle}
        validationSchema={validationSchema}
        isLoading={isUpdateReferenceDataLoading}
      >
        <FormSubmission setFormikBag={setFormikBag} />
        <AFDropdown
          label={<RequiredLabel value="Data Format" />}
          name="dataFormat"
          setOnChangeValue={setDropdownValue}
          size={8}
          options={dataFormatOptions}
        />
        <AFDropdown
          label={<RequiredLabel value="Source Type" />}
          name="sourceType"
          size={8}
          options={typesOptions}
        />
        {dropdownValue === 1 && (
          <AFTextField
            name="delimiter"
            label={<RequiredLabel value="Delimiter" />}
            size={8}
          />
        )}
        <AFTextField
          name="connectionString"
          label={<RequiredLabel value="Connection String" />}
          size={dropdownValue === 1 ? 8 : 16}
        />
        <AFTextArea
          label={<RequiredLabel value="Override SQL Statement" />}
          name="sqlStatement"
          maxCount={300}
          maxLength={300}
        />
        <AFCheckbox
          legend="Continue If SQL fail"
          label="Yes"
          name="continue"
          size={8}
        />
        <AFCheckbox legend="Enable Caching" name="cache" label="Yes" size={8} />
      </AFForm>
    </>
  );
}

export default ReferenceDataSource;
