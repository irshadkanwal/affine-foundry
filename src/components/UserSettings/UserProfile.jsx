import React from "react";
import { Button, Column } from "@carbon/react";
import { AFForm, AFTextField } from "sharedComponents/Form";

function UserProfile() {
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
      <h3 style={{ padding: "20px" }}>User Profile</h3>
      <AFForm>
        <AFTextField
          name="firstName"
          label="First name"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="lastName"
          label="Last name"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="address1"
          label="Address 1"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="address2"
          label="Address 2"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="state"
          label="State"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="zipCode"
          label="Zip code"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="number"
          label="Phone number"
          size={8}
          style={{ background: "#dadada" }}
        />
        <AFTextField
          name="email"
          label="Email"
          size={8}
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

export default UserProfile;
