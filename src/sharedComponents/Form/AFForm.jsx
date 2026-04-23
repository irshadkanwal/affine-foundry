import React from "react";
import { Formik, Form } from "formik";
import { Loading, Grid } from "carbon-components-react";

export default function AFForm({
  onSubmit,
  initialValues,
  validationSchema,
  isLoading = false,
  loadingMessage = "Loading...",
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading description={loadingMessage} withOverlay={false} />
        </div>
      ) : (
        <Form>
          <Grid style={{ padding: 0 }}>{children}</Grid>
        </Form>
      )}
    </Formik>
  );
}
