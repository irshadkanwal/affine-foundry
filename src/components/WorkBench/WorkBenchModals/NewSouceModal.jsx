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
function NewSourceModal({ isAddModalOpen, setIsAddModalOpen }) {
  const {
    mutateAsync: createNewData,
    isLoading: isCreateNewDataLoading,
  } = () => {};
  const validationSchema = Yup.object().shape({
    type: Yup.object().required(),
    tableName: Yup.string().required(),
    statement: Yup.string().required(),
  });
  const initialValues = {
    type: "",
    tableName: "",
    statement: "",
  };
  const handleOnSubmit = (formValues) => {
    const newData = {};
    createNewData(newData);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      isLoading={isCreateNewDataLoading}
      primaryButtonText="Create"
      isOpen={isAddModalOpen}
      initialValues={initialValues}
      title="New Source"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFDropdown options={OPTIONS} name="type" label="Type" />
      <AFTextField name="tableName" label="Table Name" />
      <AFTextArea
        name="statement"
        maxCount={300}
        maxLength={300}
        label="SQL Statement"
      />
    </AFFormModal>
  );
}
export default NewSourceModal;
