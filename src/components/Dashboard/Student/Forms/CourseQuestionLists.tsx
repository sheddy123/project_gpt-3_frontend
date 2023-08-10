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
import { courseQuestionsGrid } from "../../data/StudentQuestionGrid";
import DropDownComponent from "../DropdownComponent";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useEffect } from "react";
import Button from "@/components/Common/Button/Button";
import { useSelector } from "react-redux";
import { selectCourseQuizDetals } from "@/redux/features/courses/courseSlice";
import { IStudentCourseQuizById } from "@/interfaces/IFeatures/IFeatures";
import avatar2 from "../../data/avatar2.jpg";
import { CourseStatus } from "@/utils/Constants/ApiConstants/api_constants";
const CourseQuestionLists = ({ handleChange }) => {
  const retrievedData: IStudentCourseQuizById = useSelector(
    selectCourseQuizDetals
  );
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
  const elementIds = [
    "Title",
    "Difficulty",
    "Status",
    "Solution",
    "QuestionType",
    "Language"
  ];

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
  const difficultyDataSrc = retrievedData.difficultyLevel; //["Easy", "Medium", "Difficult"];
  const titleDataSrc = retrievedData.title; //["Easy", "Medium", "Difficult"];
  const solutionDataSrc = ["MCQ"];
  const questionTypeDataSrc = retrievedData.questionType; // ["GPT-3-Based Hybrid", "Traditional questions"];
  const languageDataSrc = retrievedData.language;
  const toolbarOptions = [
    //{ template: () => <CustomInput value={customSearchText} onChange={setCustomSearchText} />, },
    {
      template: () => (
        <DropDownComponent
          handleOnClick={dropdownOnChangeHandler}
          filterData={titleDataSrc}
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
    {
      template: () => (
        <DropDownComponent
          handleOnClick={dropdownOnChangeHandler}
          filterData={languageDataSrc}
          currentMode={null}
          filterText="Language"
          id={"Language"}
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
    fields: ["Title", "Solution", "Difficulty", "Status", "QuestionType", "Language"],
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

  const courseQuestionsData = retrievedData.courseQuizDetailsDtoList.map(
    (item) => ({
      CourseID: item.courseId,
      Title: item.courseTitle,
      Solution: avatar2, // Replace this with the correct property
      Acceptance: "65%", // Replace this with the correct property
      Difficulty: item.difficultyLevel,
      Language: item.language,
      Status: item.statusText,
      StatusBg:
        item.statusText == CourseStatus.Active
          ? "#8BE78B"
          : item.statusText == CourseStatus.Pending
          ? "#FEC90F"
          : "#8BE78B", // You can set the desired background color here
      Start: "Begin test",
      QuestionType: item.questionType,
    })
  );

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
