import React from "react";
import * as Yup from "yup";
import { Modal, TextInput, TextArea, Loading } from "@carbon/react";
import { useUpdateBucket } from "../../hooks/databucket/useUpdateBucket";
import { Formik, Form, Field, ErrorMessage } from "formik";

function DataBucketEditModal({
  isDataBucketEditModalOpen,
  setIsDataBucketEditModalOpen,
  selectedRow,
}) {
  const selectedRowData = selectedRow;
  // ?.cells.reduce((acc, value) => {
  //   const objectKey = value.id.split(":");
  //   return {
  //     ...acc,
  //     [objectKey[1]]: value.value,
  //     bucketID: Number(objectKey[0]),
  //   };
  // }, {});

  const { mutateAsync: updateBucket, isLoading: isUpdateBucketLoading } =
    useUpdateBucket(selectedRowData.bucketID);

  const handleUpdateBucket = async (formData) => {
    const date = new Date().toISOString();
    const newDate = date.split("T").join(" ").split(".");
    const isActive = formData.status === "active" ? true : false;
    await updateBucket({
      bucketId: selectedRowData.id,
      name: formData.name,
      arn: formData.arn,
      active: isActive,
      createdAt: newDate[0],
    });
    setIsDataBucketEditModalOpen(false);
  };
  const dataBucketValidationSchema = Yup.object().shape({
    name: Yup.string().required("This field is required"),
    arn: Yup.string().required("This field is required"),
  });

  return (
    <Formik
      initialValues={{
        name: selectedRowData.name,
        arn: selectedRowData.arn,
        status: selectedRowData.active === true ? "active" : "inactive",
      }}
      validationSchema={dataBucketValidationSchema}
      onSubmit={(formData) => handleUpdateBucket(formData)}
    >
      {(props) => (
        <Modal
          open={isDataBucketEditModalOpen}
          modalHeading="Edit Data Bucket"
          primaryButtonText={
            isUpdateBucketLoading ? "Updating Bucket..." : "Save"
          }
          onRequestClose={() => setIsDataBucketEditModalOpen(false)}
          onRequestSubmit={props.handleSubmit}
          secondaryButtonText="Cancel"
        >
          {isUpdateBucketLoading ? (
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
              <div id="my-radio-group">Status</div>
              <div role="group" aria-labelledby="my-radio-group">
                <label>
                  <Field type="radio" name="status" value="active" />
                  Active
                </label>
                <label>
                  <Field type="radio" name="status" value="inactive" />
                  Inactive
                </label>
              </div>
            </Form>
          )}
        </Modal>
      )}
    </Formik>
  );
}

export default DataBucketEditModal;
