import { TextInput, Column } from "carbon-components-react";
import { useField } from "formik";

export default function AFTextField({
  name,
  label,
  placeHolder = "",
  size = 16,
  colProps = {},
  ...rest
}) {
  const [field, meta] = useField(name);

  const isInvalid = meta.touched && meta.error;

  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <TextInput
        {...field}
        id={name}
        labelText={label}
        placeholder={placeHolder}
        invalid={isInvalid}
        invalidText={isInvalid && meta.error}
        {...rest}
      />
    </Column>
  );
}
