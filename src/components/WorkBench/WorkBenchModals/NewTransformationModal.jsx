import { AFFormModal } from "sharedComponents/Form";
import * as Yup from "yup";

function NewTransformationModal({ isAddModalOpen, setIsAddModalOpen }) {
  const { mutateAsync: createData, isLoading: isCreateDataLoading } = () => {};
  const validationSchema = Yup.object().shape({});
  const initialValues = {};
  const handleOnSubmit = (formValues) => {
    const newData = {};
    createData(newData);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      isLoading={isCreateDataLoading}
      primaryButtonText="Create"
      isOpen={isAddModalOpen}
      initialValues={initialValues}
      title="New Transformation"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <p>New Transformation Modal</p>
    </AFFormModal>
  );
}
export default NewTransformationModal;
