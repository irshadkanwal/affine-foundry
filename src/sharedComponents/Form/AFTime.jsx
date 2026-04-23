import { Column } from "carbon-components-react";
import { useField } from "formik";

export default function AFTime({
  name,
  label = "Time",
  size = 16,
  colProps = {},
  ...rest
}) {
  const [field, meta] = useField(name);

  const isInvalid = meta.touched && meta.error;

  return (
    <>
      <style>
        {`
        
.styled input[type="time"]:focus {
    outline: none;
    background: #fff;
    border-bottom: 1px solid var(--cds-border-strong);
  }
  
  .styled input[type="time"]:invalid {
      background: #fff;
      border:none;
      outline-offset:-2px;
      outline:2px solid var(--cds-support-error, #da1e28)
  }
  
  .styled input[type="time"],
  .styled .unsupported {
    background: #fff;
    border: none;
    border-bottom: 1px solid var(--cds-border-strong);
    display: block;
    margin-bottom: .625em;
    height:40px;
    margin-top: .5em;
    outline-offset: 3px;
    padding: .45em .45em .45em .65em;
    width: 100%;
  }
        `}
      </style>
      <Column
        span={size}
        style={{ marginBottom: "20px" }}
        {...colProps}
        className="styled"
      >
        <label htmlFor={name}>{label}</label>
        <input
          type="time"
          id={name}
          name={name}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          className={isInvalid ? "invalid-input" : ""}
          step="1"
          {...rest}
        />
        {isInvalid && (
          <div
            className="invalid-feedback "
            style={{
              color: "#da1e28",
              maxHeight: "12.5rem",
              fontWeight: "400",
            }}
          >
            {meta.error}
          </div>
        )}
      </Column>
    </>
  );
}
