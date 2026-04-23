import { TextArea, Column } from "carbon-components-react";
import { useField } from "formik";

export default function AFTextArea({
  name,
  label,
  placeholder,
  maxCount = 255,
  maxLength = 255,
  size = 16,
  enableCounter = true,
  colProps = {},
  ...rest
}) {
  const [field, meta] = useField(name);

  const isInvalid = meta.touched && meta.error;

  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <TextArea
        id={name}
        labelText={label}
        placeholder={placeholder}
        maxCount={maxCount}
        invalid={isInvalid}
        invalidText={isInvalid && meta.error}
        maxLength={maxLength}
        enableCounter={enableCounter}
        {...field}
        {...rest}
      />
    </Column>
  );
}
