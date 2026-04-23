import React from "react";
import { useField } from "formik";
import { RadioButtonGroup, RadioButton } from "carbon-components-react";
import { Column } from "carbon-components-react";

export default function AFRadioButtonGroup({
  name,
  label,
  options,
  size = 16,
  colProps = {},
  handleValueChange = () => {},
  ...rest
}) {
  const [field, meta, helpers] = useField({ name });
  const { value } = field;
  const handleChange = (value) => {
    helpers.setValue(value);
    handleValueChange(value);
  };
  const isInvalid = meta.touched && meta.error;
  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <RadioButtonGroup
        name={name}
        valueSelected={value}
        onChange={handleChange}
        legendText={label}
        invalid={isInvalid}
        {...rest}
      >
        {options.map((option) => (
          <RadioButton
            key={option.value}
            id={option.value}
            labelText={option.labelText}
            value={option.value}
          />
        ))}
      </RadioButtonGroup>
    </Column>
  );
}
