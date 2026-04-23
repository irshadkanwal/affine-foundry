import React from "react";
import { Modal, TextInput, Dropdown } from "@carbon/react";

function DataPackageConnectorAddModal({
  isOpen,
  setIsOpen,
  handleNameChange,
  items,
  name,
}) {
  return (
    <Modal
      open={isOpen}
      modalHeading="Add a custom domain"
      modalLabel="Account resources"
      primaryButtonText="Add"
      onRequestClose={() => setIsOpen(false)}
      secondaryButtonText="Cancel"
    >
      <div
        style={{
          display: "flex",
          gap: "4 0px",
          padding: "10px",
          flexDirection: "column",
        }}
      >
        <TextInput
          id="name"
          invalidText="A valid value is required"
          labelText="Name"
          placeholder="Data connection name"
          onChange={handleNameChange}
          invalid={!name ? true : false}
          size="xl"
        />
        <Dropdown
          id="carbon-dropdown-example"
          items={items}
          label="Choose an Option"
          titleText="Types"
        />
      </div>
    </Modal>
  );
}

export default DataPackageConnectorAddModal;
