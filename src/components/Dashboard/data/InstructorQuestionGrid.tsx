import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import {
  HtmlEditor,
  Image,
  Count,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  IToolbarSettings,
} from "@syncfusion/ej2-react-richtexteditor";

function findIndexByValue(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      return i;
    }
  }
  return -1; // Return -1 if the value is not found in the array
}

export const courseColumnConfigs = [
  {
    type: "checkbox",
    field: "courseId",
    width: "50",
    // isPrimaryKey: true,
    // visible: false,
  },
  {
    field: "course_code",
    headerText: "Course Code",
    width: "250",
    validationRules: { required: true },
    textAlign: "Right",
  },
  {
    field: "title",
    headerText: "Title",
    width: "200",
  },
  {
    field: "languages",
    headerText: "Languages",
    width: "200",
    editType: "custom",
    editTemplate: (props) => (
      <div>
        <div className=" text-gray-500 mb-2 mt-2">Language</div>
        <DropDownListComponent
          id="languages"
          dataSource={LanguagesOptions}
          fields={{ text: "text", value: "value" }}
          placeholder={props.placeholderText || "Select a Language"}
          value={props.languages || LanguagesOptions[0].value}
        />
      </div>
    ),
  },
  {
    field: "description",
    headerText: "Description",
    width: "320",
    validationRules: { required: true },
  },
  {
    field: "captions",
    headerText: "Captions",
    width: "150",
    editType: "custom",
    editTemplate: (props) => {
      
      return (
        <div>
          <div className=" text-gray-500 mb-2 mt-2">Caption</div>
          <DropDownListComponent
            id="caption"
            dataSource={YesNoOptions}
            fields={{ text: "text", value: "value" }}
            placeholder={props.placeholderText || "Select a caption"}
            value={props.captions || YesNoOptions[0].value}
          />
        </div>
      );
    },
  },
  {
    field: "version",
    headerText: "Version",
    width: "150",
    editType: "custom",
    editTemplate: (props) => {
      return (
        <div>
          <div className=" text-gray-500 mb-2 mt-2">Version</div>
          <DropDownListComponent
            id="version"
            dataSource={versionOptions}
            fields={{ text: "text", value: "value" }}
            placeholder={props.placeholderText || "Select a version"}
            value={props.version || versionOptions[0].value}
          />
        </div>
      );
    },
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
