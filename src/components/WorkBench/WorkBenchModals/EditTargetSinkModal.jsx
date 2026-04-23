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
function EditTargetSinkModal({ setIsModalOpen, isModalOpen }) {
  const { mutateAsync: updateData, isLoading: isUpdateDataLoading } = () => {};
  const validationSchema = Yup.object().shape({
    transactionType: Yup.object().required(),
    tableResourceName: Yup.string().required(),
    statement: Yup.string().required(),
  });
  const initialValues = {
    transactionType: "",
    tableResourceName: "",
    statement: "",
  };
  const handleOnSubmit = (formValues) => {
    const newData = {};
    updateData(newData);
  };
  return (
    <AFFormModal
      onClose={() => setIsModalOpen(false)}
      isLoading={isUpdateDataLoading}
      primaryButtonText="Save"
      isOpen={isModalOpen}
      initialValues={initialValues}
      title="Edit Target/Sink"
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
      modelSize="sm"
    >
      <AFTextField name="tableResourceName" label="Table/Resource Name" />
      <AFDropdown
        options={OPTIONS}
        name="transactionType"
        label="Transaction Type"
      />
      <AFTextArea
        name="statement"
        maxCount={300}
        maxLength={300}
        label="Overwrite SQL"
      />
    </AFFormModal>
  );
}
export default EditTargetSinkModal;
