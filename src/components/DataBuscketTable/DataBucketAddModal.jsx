import React from "react";
import * as Yup from "yup";
import { Modal, TextInput, TextArea, Loading } from "@carbon/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateBucket } from "hooks/databucket/useCreateBucket";

function DataBucketAddModal({
  isDataBucketAddModalOpen,
  setIsDataBucketAddModalOpen,
  handleNameChange,
  handleARNChange,
}) {
  const dataBucketValidationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    arn: Yup.string().required("This field is required"),
  });

  const { mutateAsync: createBucket, isLoading: isBucketLoading } =
    useCreateBucket();

  const handleCreateBucket = async (formData) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");

    await createBucket({
      name: formData.name,
      arn: formData.arn,
      createdAt: newDate[0],
      createdBy: 1,
    });
    setIsDataBucketAddModalOpen(false);
  };
  return (
    <Formik
      initialValues={{ name: "", arn: "", status: true }}
      validationSchema={dataBucketValidationSchema}
      onSubmit={(formData) => handleCreateBucket(formData)}
    >
      {(props) => (
        <Modal
          open={isDataBucketAddModalOpen}
          modalHeading="New Data Bucket"
          primaryButtonText={isBucketLoading ? "Creating Bucket..." : "Create"}
          onRequestClose={() => setIsDataBucketAddModalOpen(false)}
          onRequestSubmit={props.handleSubmit}
          secondaryButtonText="Cancel"
        >
          {isBucketLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loading
                description="Active loading indicator"
                withOverlay={false}
              />
            </div>
          ) : (
            <Form>
              <Field name="name">
                {({ field }) => (
                  <TextInput
                    id="name"
                    labelText="Name"
                    placeholder="Data Bucket Name"
                    invalid={props.errors.name && props.touched.name}
                    onChange={handleNameChange}
                    {...field}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>
              <Field name="arn">
                {({ field }) => (
                  <TextArea
                    id="arn"
                    labelText="ARN"
                    placeholder="ARN"
                    maxCount={255}
                    invalid={props.errors.arn && props.touched.arn}
                    onChange={handleARNChange}
                    maxLength={255}
                    {...field}
                  />
                )}
              </Field>
              <div style={{ color: "red" }}>
                <ErrorMessage
                  name="arn"
                  component="div"
                  className="error-message"
                />
              </div>
            </Form>
          )}
        </Modal>
      )}
    </Formik>
  );
}

export default DataBucketAddModal;
