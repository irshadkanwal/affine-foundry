import React from "react";
import { Asterisk } from "@carbon/react/icons";

function RequiredLabel({ value }) {
  return (
    <>
      {value} <Asterisk color="red" size={12} />
    </>
  );
}

export default RequiredLabel;
