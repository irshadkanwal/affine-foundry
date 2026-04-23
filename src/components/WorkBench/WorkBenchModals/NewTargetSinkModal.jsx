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
function NewTargetSinkModal({ isAddModalOpen, setIsAddModalOpen }) {
  const { mutateAsync: createData, isLoading: isCreateDataLoading } = () => {};
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
    createData(newData);
  };
  return (
    <AFFormModal
      onClose={() => setIsAddModalOpen(false)}
      isLoading={isCreateDataLoading}
      primaryButtonText="Create"
      isOpen={isAddModalOpen}
      initialValues={initialValues}
      title="New Target/Sink"
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
export default NewTargetSinkModal;
