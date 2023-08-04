import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { forwardRef } from "react";

export const addCourseGrid = [
  { type: "checkbox", width: "50" },
  {
    field: "Course_Code",
    headerText: "Course Code",
    width: "250",
    textAlign: "Right",
    isPrimaryKey: true,
  },
  {
    field: "Title",
    headerText: "Title",
    width: "200",
  },
  {
    field: "Languages",
    headerText: "Languages",
    width: "200",
  },
  {
    field: "Description",
    headerText: "Description",
    width: "320",
  },
  {
    field: "Captions",
    headerText: "Captions",
    width: "150",
    format: "C2",
    editType: "dropdownedit",
    textAlign: "Right",
  },
  {
    field: "Version",
    headerText: "Version",
    editType: "dropdownedit",
    width: "150",
  },
];

export const versionOptions = [
  { text: "Version 1.0", value: "1.0" },
  { text: "Version 2.0", value: "2.0" },
  { text: "Version 3.0", value: "3.0" },
  // Add more options as needed
];

export const YesNoOptions = [
  { text: "Yes", value: "Yes" },
  { text: "No", value: "No" },
  // Add more options as needed
];

export const LanguagesOptions = [
  { text: "English", value: "English" },
  // Add more options as needed
];
//   const versionDropDown = (props) => (
//     <DropDownListComponent
//       id="version"
//       dataSource={versionOptions}
//       fields={{ text: "text", value: "value" }}
//       value={props.defaultValue || versionOptions[0].value}
//     />
//   );

export const GridDropDown = forwardRef((props, ref) => {
  return (
    <DropDownListComponent
      id={props.field + "_editor"}
      dataSource={props.options}
      ref={ref} // Use forwardRef to forward the ref to the DropDownListComponent
      fields={{ text: "text", value: "value" }}
      value={props.defaultValue || props.options[0].value}
      placeholder={props.placeholderText || "Select a version"}
      floatLabelType="Auto"
    />
  );
});


export function CourseGridDropdown({ dataSource, fields, placeholder, defaultValue }) {
    console.log(JSON.stringify(dataSource))
    return (
      <div>
        <div className="text-gray-500 mb-2 mt-2">{fields.text}</div>
        <DropDownListComponent
          dataSource={dataSource}
          fields={fields}
          placeholder={placeholder || `Select a ${fields.text}`}
          value={defaultValue || dataSource[0].value}
        />
      </div>
    );
  }