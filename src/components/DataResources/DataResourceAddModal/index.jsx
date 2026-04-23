// import React from "react";
// import { ComboBox, Modal } from "@carbon/react";
// import { Dropdown, TextArea, TextInput } from "carbon-components-react";

// function DataResourceEditModal({ isOpen, setIsOpen }) {
//   return (
//     <Modal
//       open={isOpen}
//       modalHeading="Add a custom domain"
//       modalLabel="Account resources"
//       primaryButtonText="Save"
//       onRequestClose={() => setIsOpen(false)}
//     >
//       <div style={{ width: "100%" }}>
//         <form>
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               justifyContent: "space-between",
//               marginBottom: "20px",
//             }}
//           >
//             <ComboBox
//               onChange={() => {}}
//               id="carbon-combobox"
//               placeholder="874938"
//               items={items}
//               downshiftProps={{
//                 onStateChange: () => {
//                   //console.log("the state has changed");
//                 },
//               }}
//               itemToString={(item) => (item ? item.text : "")}
//               titleText="Data Bucket"
//             />
//             <ComboBox
//               onChange={() => {}}
//               id="carbon-combobox"
//               placeholder="173768"
//               items={items}
//               downshiftProps={{
//                 onStateChange: () => {
//                   //console.log("the state has changed");
//                 },
//               }}
//               itemToString={(item) => (item ? item.text : "")}
//               titleText="Owner"
//             />
//           </div>
//           <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//             <TextInput
//               id="name"
//               invalidText="A valid value is required"
//               labelText="Name"
//               placeholder="Data Bucket Name"
//               // onChange={handleNameChange}
//               // invalid={!dataBucketName ? true : false}
//               value={selectedRowData?.name}
//             />
//             <TextInput
//               id="path"
//               invalidText="A valid value is required"
//               labelText="Base Path"
//               placeholder="Data Bucket Name"
//               helperText="Base paths for the data package within the assigned bucket"
//               // onChange={handleNameChange}
//               // invalid={!dataBucketName ? true : false}
//               value={selectedRowData?.basePath}
//             />
//             <Dropdown
//               id="default"
//               titleText="Data Classification"
//               label="Dropdown menu options"
//               items={items}
//               itemToString={(item) => (item ? item.text : "")}
//             />
//           </div>
//           <TextArea
//             id="description"
//             invalidText="A valid value is required"
//             labelText="Description"
//             placeholder="description"
//             maxCount={255}
//             maxLength={255}
//             // onChange={handleARNChange}
//             // invalid={!arn ? true : false}
//             value={selectedRowData?.description}
//           />
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               justifyContent: "space-between",
//               margin: "20px 0",
//             }}
//           >
//             <Dropdown
//               id="default"
//               titleText="Data Check Frequency"
//               label="Dropdown menu options"
//               items={items}
//               itemToString={(item) => (item ? item.text : "")}
//             />
//             <ComboBox
//               onChange={() => {}}
//               id="carbon-combobox"
//               placeholder="Choose an option"
//               items={items}
//               downshiftProps={{
//                 onStateChange: () => {
//                   //console.log("the state has changed");
//                 },
//               }}
//               itemToString={(item) => (item ? item.text : "")}
//               titleText="Day"
//             />
//             <ComboBox
//               id="carbon-combobox"
//               placeholder="Choose an option"
//               items={items}
//               downshiftProps={{
//                 onStateChange: () => {
//                   //console.log("the state has changed");
//                 },
//               }}
//               itemToString={(item) => (item ? item.text : "")}
//               titleText="Time"
//             />
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// }

// export default DataResourceEditModal;
