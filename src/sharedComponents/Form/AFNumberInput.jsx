import { Column, NumberInput } from "carbon-components-react";
import { useField } from "formik";

export default function AFNumberInput({
  name,
  label,
  size = 16,
  min = 0,
  max,
  colProps = {},
  ...rest
}) {
  const [field, meta, helpers] = useField(name);

  const isInvalid = meta.touched && meta.error;

  const handleChange = (e, field) => {
    helpers.setValue(field.value);
  };

  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <NumberInput
        {...field}
        id={name}
        min={min}
        name={name}
        max={max}
        label={label}
        value={field.value}
        onChange={handleChange}
        step={30}
        invalid={isInvalid}
        invalidText={isInvalid && meta.error}
        {...rest}
      />
    </Column>
  );
}
