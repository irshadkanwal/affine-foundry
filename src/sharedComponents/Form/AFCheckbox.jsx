import React from "react";
import { Checkbox, CheckboxGroup, Column } from "carbon-components-react";
import { useField } from "formik";

//this is currently only handling the boolean
export default function AFCheckbox({
  name,
  label,
  size = 16,
  colProps = {},
  legend = "", // can accept ReactNode
  ...rest
}) {
  const [field, meta] = useField(name);

  const isInvalid = meta.touched && meta.error;

  return (
    <Column span={size} style={{ marginBottom: "20px" }} {...colProps}>
      <CheckboxGroup legendText="" isInvalid={isInvalid}>
        {legend}
        <Checkbox
          labelText={label}
          id={name}
          defaultChecked={field.value}
          {...field}
          {...rest}
        />
      </CheckboxGroup>
    </Column>
  );
}
