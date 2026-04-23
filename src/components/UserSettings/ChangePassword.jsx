import React from "react";
import { Button, Column } from "@carbon/react";
import { AFForm, AFTextField } from "sharedComponents/Form";

function ChangePassword() {
  const [lgValue, setLgValue] = React.useState(
    window.innerWidth > 1700 ? 7 : 8
  );
  const updateLgValue = () => {
    setLgValue(window.innerWidth > 1700 ? 7 : 8);
  };

  React.useEffect(() => {
    window.addEventListener("resize", updateLgValue);
    return () => {
      window.removeEventListener("resize", updateLgValue);
    };
  }, []);
  return (
    <>
      <h3 style={{ padding: "20px" }}>Change Password</h3>
      <AFForm>
        <AFTextField
          name="current"
          label="Current password"
          placeHolder="Enter Current password"
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="new"
          label="New password"
          placeHolder="Enter New password"
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="confirm"
          label="Confirm new password"
          placeHolder="Confirm new password"
          style={{ background: "#dadada" }}
        />
        <Column lg={window.innerWidth > 1700 ? 9 : 8} sm={8} md={8}>
          <Button style={{ width: "100%" }}>Save</Button>
        </Column>
        <Column lg={lgValue} sm={8} md={8}>
          <Button style={{ width: "100%" }} kind="tertiary">
            Cancel
          </Button>
        </Column>
      </AFForm>
    </>
  );
}

export default ChangePassword;
