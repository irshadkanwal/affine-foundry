import React from "react";
import * as Yup from "yup";
import {
  AFCheckbox,
  AFDropdown,
  AFFormModal,
  AFTextField,
} from "sharedComponents/Form";
import { useCreateRuntime } from "hooks/runtime/useCreateRuntime";
import { useRuntimeSizes } from "hooks/runtime/useRuntimeSizes";
import RequiredLabel from "sharedComponents/RequiredLabel";

function RuntimeAddModal({ isOpen, setIsOpen }) {
  const [isManagedByPlatform, setIsManagedByPlatform] = React.useState(false);

  const { mutateAsync: createRuntime, isLoading: isCreateRuntimeLoading } =
    useCreateRuntime();

  const { data: runtimeSizes = [], isLoading: isRuntimeSizesLoading } =
   useRuntimeSizes();

  const isModalLoading = isCreateRuntimeLoading || isRuntimeSizesLoading;

  const clusterSizes = React.useMemo(() => {
      if (!runtimeSizes || runtimeSizes.length === 0) return [];
      return runtimeSizes
        .filter((size) => typeof size === "string" || typeof size === "number")
        .map((size) => ({
          label: size.toString(),
          value: size.toString(),
        }));
    }, [runtimeSizes]);

  const runtimeValidationSchema = Yup.object().shape({
    name: Yup.string().required(),
    awsClusterId: !isManagedByPlatform && Yup.string().required("Cluster ID is required"),
    clusterSize: isManagedByPlatform && Yup.object().required(),
  });

  const handleCreateRuntime = async (formData) => {
    const runtimeValues = {
      name: formData.name,
      awsClusterId: formData.awsClusterId,
      managedByPlatform: isManagedByPlatform,
      clusterSize: isManagedByPlatform ? formData.clusterSize?.value || "" : "",
      isJupyterEnabled: false,
    };

    await createRuntime({ runtimeValues: runtimeValues });
    setIsOpen(false);
  };

  const initialValues = {
    name: "",
    awsClusterId: "",
    managedByPlatform: false,
    clusterSize: "",
  };

  return (
    <>
      <AFFormModal
        onClose={() => setIsOpen(false)}
        onSubmit={handleCreateRuntime}
        validationSchema={runtimeValidationSchema}
        initialValues={initialValues}
        isOpen={isOpen}
        title="New Runtime"
        isLoading={isModalLoading}
        primaryButtonText="Create"
      >
        <AFTextField name="name" label={<RequiredLabel value="Name" />} />
        <AFTextField
          name="awsClusterId"
          label={<RequiredLabel value="Cluster ID" />}
          disabled={isManagedByPlatform}
        />
        <AFCheckbox
          name="managedByPlatform"
          label="Yes"
          legend="Managed by Platform"
          onChange={(e) => setIsManagedByPlatform(e.target.checked)}
        />
        <AFDropdown
          options={clusterSizes}
          name="clusterSize"
          label={<RequiredLabel value="EMR Cluster Size" />}
          disabled={!isManagedByPlatform}
        />
      </AFFormModal>
    </>
  );
}

export default RuntimeAddModal;
