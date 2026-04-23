import {
  AFDropdown,
  AFFormModal,
  AFTextArea,
  AFTextField,
} from "sharedComponents/Form";
import * as Yup from "yup";
const OPTIONS = [
  { value: "value1", label: "value1" },
  { value: "value2", label: "value2" },
];
function NewProjectModal({ isAddModalOpen, setIsAddModalOpen }) {
  const {
    mutateAsync: createNewProject,
    isLoading: isCreateProjectLoading,
  } = () => {};
  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    nameSpace: Yup.string().required(),
    dataPackage: Yup.object().required(),
  });
  const initialValues = {
    name: "",
    nameSpace: "",
    description: "",
    dataPackage: "",
  };
  const handleOnSubmit = (formValues) => {
    const projectData = {};
    createNewProject(projectData);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      isLoading={isCreateProjectLoading}
      primaryButtonText="Create"
      isOpen={isAddModalOpen}
      initialValues={initialValues}
      title="New Project"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField name="nameSpace" label="Project Name Space" />
      <AFTextField name="name" label="Project Name" />
      <AFTextArea
        name="description"
        maxCount={300}
        maxLength={300}
        label="Description"
      />
      <AFDropdown options={OPTIONS} name="dataPackage" label="Data Package" />
    </AFFormModal>
  );
}
export default NewProjectModal;
