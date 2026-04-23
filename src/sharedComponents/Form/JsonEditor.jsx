import React, { useState } from "react";
import { Column, FileUploaderDropContainer } from "@carbon/react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { python } from "@codemirror/lang-python";
import { useFormikContext } from "formik";

const FileEditor = ({
  name,
  label,
  value = "",
  onChange,
  accept = [".json"],
  size = 16,
  colProps = {},
}) => {
  const [fileContent, setFileContent] = useState(value);
  const [fileType, setFileType] = useState("json");
  const { setFieldValue } = useFormikContext();

  const getFileType = (fileName) => {
    if (fileName.endsWith(".json")) return "json";
    if (fileName.endsWith(".py")) return "python";
    return null;
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const type = getFileType(file.name);
      if (!type) {
        alert("Unsupported file type. Only .json and .py are allowed.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        setFileContent(text);
        setFileType(type);
        onChange(text);
      };
      reader.readAsText(file);
    }
  };

  const handleEditorChange = (value) => {
    setFileContent(value);
    onChange(value);
    setFieldValue(name, value);
  };

  const getEditorExtension = () => {
    return fileType === "python" ? python() : json();
  };

  return (
    <Column span={size} style={{ paddingBottom: "20px" }} {...colProps}>
      {fileContent ? (
        <CodeMirror
          name={name}
          label={label}
          value={fileContent}
          height="300px"
          extensions={[getEditorExtension()]}
          onChange={handleEditorChange}
        />
      ) : (
        <>
          {typeof label === "string" ? (
            <p className="cds--file--label">{label}</p>
          ) : (
            label
          )}
          <FileUploaderDropContainer
            labelText="Drag and drop files here or click to upload"
            accept={accept}
            multiple={false}
            onAddFiles={handleFileUpload}
            style={{ outerWidth: "100%" }}
          />
        </>
      )}
    </Column>
  );
};

export default FileEditor;
