/* eslint-disable */
import { useFormikContext } from "formik";
import React from "react";

function FormSubmission({ setFormikBag }) {
  const formikBag = useFormikContext();
  React.useEffect(() => {
    setFormikBag(formikBag);
  }, []);
  return null;
}
export default FormSubmission;
