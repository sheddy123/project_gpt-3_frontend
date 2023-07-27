import {
  ColumnDirective,
  ColumnsDirective,
  Grid,
  GridComponent,
  Page,
  Selection,
  Edit,
  Sort,
  Filter,
} from "@syncfusion/ej2-react-grids";
import {
  Inject,
  Search,
  SearchSettingsModel,
  Toolbar,
  ToolbarItems,
} from "@syncfusion/ej2-react-grids";
import {
  courseQuestionsData,
  courseQuestionsGrid,
} from "@/components/Dashboard/data/dummy";
import DropDownComponent from "../DropdownComponent";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useEffect } from "react";
import Button from "@/components/Common/Button/Button";
const CourseQuestionLists = ({ handleChange }) => {
  function CustomInput({ onChange, value }) {
    return (
      <input
        type="text"
        placeholder="Custom Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  let grid: Grid | null;
  const elementIds = ['Title', 'Difficulty', 'Status', 'Solution', 'QuestionType'];

  const dropdownOnChangeHandler = (args) => {
    if (args == "Reset") {
      
      grid.searchSettings.key = "";
      elementIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          element.value = null;
        }
      });
    } else if (grid) {
      grid.search(args.value);
    }
  };

  const { currentMode, currentColor } = useStateContext();
  const statusDataSrc = ["Active", "Pending", "Completed"];
  const difficultyDataSrc = ["Easy", "Medium", "Difficult"];
  const solutionDataSrc = ["MCQ"];
  const questionTypeDataSrc = ["GPT-3-Based Hybrid", "Traditional questions"];
  const toolbarOptions = [
    //{ template: () => <CustomInput value={customSearchText} onChange={setCustomSearchText} />, },
    {
      template: () => (
        <DropDownComponent
          handleOnClick={dropdownOnChangeHandler}
          filterData={null}
          currentMode={null}
          filterText="Title"
          id={"Title"}
        />
      ),
    },
    {
      template: () => (
        <DropDownComponent
          handleOnClick={dropdownOnChangeHandler}
          filterData={difficultyDataSrc}
          currentMode={null}
          filterText="Difficulty"
          id={"Difficulty"}
        />
      ),
    },
    {
      template: () => (
        <DropDownComponent
          handleOnClick={dropdownOnChangeHandler}
          filterData={statusDataSrc}
          currentMode={null}
          filterText="Status"
          id={"Status"}
        />
      ),
    },
    // {
    //   template: () => (
    //     <DropDownComponent
    //       handleOnClick={dropdownOnChangeHandler}
    //       filterData={solutionDataSrc}
    //       currentMode={null}
    //       filterText="Solution"
    //       id={"Solution"}
    //     />
    //   ),
    // },
    {
      template: () => (
        <DropDownComponent
          handleOnClick={dropdownOnChangeHandler}
          filterData={questionTypeDataSrc}
          currentMode={null}
          filterText="QuestionType"
          id={"QuestionType"}
        />
      ),
    },
    {
      template: () => (
        <Button
          styles="reset__button"
          backgroundColor={currentColor}
          text="Reset"
          onClick={() => dropdownOnChangeHandler("Reset")}
        />
      ),
    },
    { text: "Search" },
  ];
  const selectionsettings = { persistSelection: true };
  const editing = { allowDeleting: false, allowEditing: false };
  const searchOptions = {
    fields: ["Title", "Solution", "Difficulty", "Status", "QuestionType"],
    ignoreCase: true,
    operator: "contains",
  };

  const created = () => {
    document
      .getElementById(grid.element.id + "_searchbar")
      .addEventListener("keyup", () => {
        grid.search(event.target.value);
      });
  };
  const clickHandler = (args) => {
    if (args.item.id === "Click") {
      alert("Custom toolbar Click...");
    }
  };

  useEffect(() => {
    const inputElement = document.querySelector(".e-input");
    inputElement.placeholder = "Search questions";
  }, []);
  return (
    <div className={`not-prose ${currentMode == "Dark" ? "darkMode" : ""}`}>
      <GridComponent
        dataSource={courseQuestionsData}
        enableHover={false}
        allowPaging
        pageSettings={{ pageCount: 5 }}
        searchSettings={searchOptions}
        selectionSettings={selectionsettings}
        toolbar={toolbarOptions}
        toolbarClick={clickHandler}
        editSettings={editing}
        ref={(g) => (grid = g)}
        created={created}
        allowSorting>
        <ColumnsDirective>
          {/* <ColumnDirective headerTemplate={() => <input type="radio" name="radioGroup" />} width='50' textAlign="Center" /> */}
          {courseQuestionsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Selection, Toolbar, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default CourseQuestionLists;
