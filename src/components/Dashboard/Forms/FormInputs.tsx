import { useDispatch, useSelector } from "react-redux";
import {
  selectFormPage,
  selectFormQuestionLength,
  setQuestionLength,
  setTotalQuestions,
} from "@/redux/features/form/formSlice";
import CourseOverview from "./CourseOverview";
import CourseQuestionLists from "./CourseQuestionLists";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useEffect } from "react";
import Questions from "./Questions";
import SubmitQuestions from "./SubmitQuestions";

const FormInputs = ({
  handleChange,
  handleNext,
  nextHide,
  disableNext,
  handlePrev,
  selectedQuestion,
  setSelectedQuestion,
}) => {
  const page = useSelector(selectFormPage);
  const questLength = useSelector(selectFormQuestionLength);
  const { setActiveMenu } = useStateContext();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setActiveMenu(false);
    //setSelectedQuestion([]);
  }, []);

  const QuestionsData = [
    {
      id: 2,
      data: `Which of the following is a bug and item tracking tool that can be integrated into your DevOps processes?`,
      options: ["Maven", "JIRA", "Kenkins"],
      answer: "JIRA",
    },
    {
      id: 3,
      data: `Your DevOps team is currently looking at the integration of Azure DevOps services and Microsoft Teams. Your team has already added the Azure Boards app to Microsoft Teams.

      Which of the following command is used to link a specific Azure Boards project to the respective Teams channel?`,
      options: [
        "@azure boards connect",
        "@azure boards link",
        "@azure boards create",
      ],
      answer: "@azure boards link",
    },
    {
      id: 4,
      data: `Your DevOps team is currently using the Azure DevOps suite of services. They have defined a project in Azure DevOps and are currently using Azure Boards for work tracking purposes. They want to make use of chart widgets to track different project metrics.

      Which of the following can be used to track the below metric?
      
      <b>“Time taken to close a work item after work on it has started”</b>`,
      options: ["Velocity", "Sprint Capacity", "Lead time", "Cycle Time"],
      answer: "Cycle Time",
    },
    {
      id: 5,
      data: `Your DevOps team is currently using the Azure DevOps suite of services. They have defined a project in Azure DevOps and are currently using Azure Boards for work tracking purposes. They want to make use of chart widgets to track different project metrics.

      Which of the following can be used to track the below metric?
      
      <b>“Time taken to close a work item after it was created”</b>`,
      options: ["Velocity", "Sprint Capacity", "Lead time", "Cycle Time"],
      answer: "Lead time",
    },
    {
      id: 6,
      data: `Your DevOps team is currently using the Azure DevOps suite of services. They have defined a project in Azure DevOps and are currently using Azure Boards for work tracking purposes. They want to make use of chart widgets to track different project metrics.

      Which of the following can be used to track the below metric?
      
      <b>“Track the team’s capacity to deliver work sprint after sprint”</b>`,
      options: ["Velocity", "Sprint Capacity", "Lead time", "Cycle Time"],
      answer: "Velocity",
    },
    // Add more billing data as needed
  ];
  const display = {
    0: (
      <CourseOverview
        handleNext={handleNext}
        nextHide={nextHide}
        disableNext={disableNext}
        page={page}
      />
    ),
    1: <CourseQuestionLists handleChange={handleChange} />,
    ...QuestionsData.reduce((acc, step, index) => {
      acc[step.id] = (
        <Questions
          key={step.id}
          component={index + 1}
          data={step.data}
          options={step.options}
          answer={step.answer}
          questLength={questLength}
          handleChange={handleChange}
          handleNext={handleNext}
          handlePrev={handlePrev}
          selectedQuestion={selectedQuestion}
          page={page}
        />
      );
      return acc;
    }, {}),
  };
  useEffect(() => {
    dispatch(setQuestionLength(Object.keys(display).length));
    dispatch(setTotalQuestions(QuestionsData.length));
  }, []);

  const isOnLastPage = page === questLength;
  const displayRequiredPage = !isOnLastPage ? (
    display[page]
  ) : (
    <SubmitQuestions />
  );

  const content = (
    <div className="form-inputs flex-col">{displayRequiredPage}</div>
  );

  return content;
};
export default FormInputs;
