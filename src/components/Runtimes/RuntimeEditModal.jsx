import React from "react";
import * as Yup from "yup";
import {
  AFCheckbox,
  AFDropdown,
  AFFormModal,
  AFTextField,
} from "sharedComponents/Form";
import { useUpdateRuntime } from "hooks/runtime/useUpdateRuntime";
import RequiredLabel from "sharedComponents/RequiredLabel";
import { useFormikContext } from "formik";

function RuntimeEditModal({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedData,
}) {
  const [clusterSizes] = React.useState(
    selectedData.clusterSizes.map((size) => ({ label: size, value: size }))
  );

  const { mutateAsync: updateRuntime, isLoading: isUpdateRuntimeLoading } =
    useUpdateRuntime();

  const runtimeValidationSchema = React.useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("Name is required"),
      awsClusterId: Yup.string().test({
        name: "conditionalRequired",
        test: function (value) {
          const { managedByPlatform } = this.parent;

          if (!managedByPlatform && (!value || value.trim() === "")) {
            return this.createError({
              message: "Cluster ID is required",
              path: "awsClusterId",
            });
          }
          return true;
        },
      }),
      clusterSize: Yup.mixed().test({
        name: "conditionalRequired",
        test: function (value) {
          const { managedByPlatform } = this.parent;

          if (managedByPlatform && !value) {
            return this.createError({
              message: "Cluster size is required when managed by platform",
              path: "clusterSize",
            });
          }
          return true;
        },
      }),
      managedByPlatform: Yup.boolean(),
    });
  }, []);

  const FormContent = () => {
    const { values, setFieldValue } = useFormikContext();

    const handleCheckboxChange = (e) => {
      const checked = e.target.checked;
      setFieldValue("managedByPlatform", checked);
    };

    return (
      <>
        <AFTextField name="name" label={<RequiredLabel value="Name" />} />
        <AFTextField
          name="awsClusterId"
          label={<RequiredLabel value="Cluster ID" />}
          disabled={values.managedByPlatform}
        />
        <AFCheckbox
          name="managedByPlatform"
          label="Yes"
          legend="Managed by Platform"
          onChange={handleCheckboxChange}
          checked={values.managedByPlatform}
        />
        <AFDropdown
          options={clusterSizes}
          name="clusterSize"
          label={<RequiredLabel value="EMR Cluster Size" />}
          disabled={!values.managedByPlatform}
        />
      </>
    );
  };

  const handleSubmit = async (values) => {
    await updateRuntime({
      runtimeValues: {
        name: values.name,
        awsClusterId: values.awsClusterId || "",
        managedByPlatform: values.managedByPlatform,
        clusterSize: values.managedByPlatform
          ? values.clusterSize?.value || ""
          : "",
        isJupyterEnabled: false,
      },
      runtimeId: selectedData.id,
    });
    setIsEditModalOpen(false);
  };

  const initialValues = {
    name: selectedData.name,
    awsClusterId: selectedData.awsClusterId || "",
    managedByPlatform: selectedData.managedByPlatform === "Yes",
    clusterSize: clusterSizes.find(
      (size) => size.label === selectedData.clusterSize
    ),
  };
  return (
    <AFFormModal
      onClose={() => setIsEditModalOpen(false)}
      onSubmit={handleSubmit}
      validationSchema={runtimeValidationSchema}
      initialValues={initialValues}
      isOpen={isEditModalOpen}
      title="Edit Runtime"
      isLoading={isUpdateRuntimeLoading}
      primaryButtonText="Save"
    >
      <FormContent />
    </AFFormModal>
  );
}

export default RuntimeEditModal;
