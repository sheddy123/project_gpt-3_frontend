import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  questionLength: 0,
  totalQuestions: 0,
  isSubmitted: false,
  lastPage: 0,
  selectedQuestion: [1],
  questionsSkipped: [1],
  answeredQuestions: [
    {
      formId: 0,
      selectedAnswer: "",
      isClicked: false,
      courseId: "",
      id:0
    },
  ],
  data: [
    {
      formId: 5,
      question: `Which of the following is a bug and item tracking tool that can be integrated into your DevOps processes? `,
      options: ["Maven", "JIRA", "Jenkins"],
      answer: "JIRA",
      courseId: 100,
      id:78
    },
    {
      formId: 6,
      question: `Your DevOps team is currently looking at the integration of Azure DevOps services and Microsoft Teams. Your team has already added the Azure Boards app to Microsoft Teams.

      Which of the following command is used to link a specific Azure Boards project to the respective Teams channel?`,
      options: [
        "@azure boards connect",
        "@azure boards link",
        "@azure boards create",
      ],
      answer: "@azure boards link",
      courseId: 100,
      id: 31
    },
    {
      formId: 7,
      question: `Your DevOps team is currently using the Azure DevOps suite of services. They have defined a project in Azure DevOps and are currently using Azure Boards for work tracking purposes. They want to make use of chart widgets to track different project metrics.

      Which of the following can be used to track the below metric?
      
      <b>“Time taken to close a work item after work on it has started”</b>`,
      options: ["Velocity", "Sprint Capacity", "Lead time", "Cycle Time"],
      answer: "Cycle Time",
      courseId: 100,
      id: 14
    },
    {
      formId: 8,
      question: `Your DevOps team is currently using the Azure DevOps suite of services. They have defined a project in Azure DevOps and are currently using Azure Boards for work tracking purposes. They want to make use of chart widgets to track different project metrics.

      Which of the following can be used to track the below metric?
      
      <b>“Time taken to close a work item after it was created”</b>`,
      options: ["Velocity", "Sprint Capacity", "Lead time", "Cycle Time"],
      answer: "Lead time",
      courseId: 100,
      id: 4
    },
    {
      formId: 9,
      question: `Your DevOps team is currently using the Azure DevOps suite of services. They have defined a project in Azure DevOps and are currently using Azure Boards for work tracking purposes. They want to make use of chart widgets to track different project metrics.

      Which of the following can be used to track the below metric?
      
      <b>“Track the team’s capacity to deliver work sprint after sprint”</b>`,
      options: ["Velocity", "Sprint Capacity", "Lead time", "Cycle Time"],
      answer: "Velocity",
      courseId: 100,
      id: 1
    }
  ],
  title: {
    0: "About Course",
    1: "Course Overview",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setSelectedQuestion: (state, action) => {
      const isNumberSelected = state.selectedQuestion.includes(action.payload);
      if (!isNumberSelected) {
        state.selectedQuestion.push(action.payload);
      }
    },
    setSkippedQuestion: (state, action) => {
      const skippedQuest = action.payload - 1;

      const updatedQuestionsArray = state.answeredQuestions.map((item, index) => ({
        ...item,
        id: index, // Update the formId to start from 1
      }));

      const answeredQuestionIndex = updatedQuestionsArray.some(
        (selected) => selected.id === skippedQuest
      );
      if (answeredQuestionIndex) {
        const filteredArray = state.questionsSkipped.filter(
          (item) => item !== skippedQuest
        );
        state.questionsSkipped = filteredArray;
      } else {
        // Number doesn't exist in the array, add it
        if (!state.questionsSkipped.includes(skippedQuest))
          state.questionsSkipped.push(skippedQuest);
      }
    },

    selectAnswerOption: (state, action) => {
      const { questionId, selectedAnswer, courseId,  id } = action.payload;

      //console.log("Updated questions array ", JSON.stringify(updatedQuestionsArray), "Skipped ", skippedQuest);
      const answeredQuestionIndex = state.answeredQuestions.findIndex(
        (item) => item.id === id
      );
      if (answeredQuestionIndex !== -1) {
        // If the question is already answered, update the selectedAnswer
        state.answeredQuestions[answeredQuestionIndex].selectedAnswer =
          selectedAnswer;
        state.answeredQuestions[answeredQuestionIndex].isClicked = true;
        state.answeredQuestions[answeredQuestionIndex].formId = questionId;
        state.answeredQuestions[answeredQuestionIndex].courseId = courseId;
        state.answeredQuestions[answeredQuestionIndex].id = id;
      } else {
        // If the question is not answered, add it to answeredQuestions
        state.answeredQuestions.push({
          formId: questionId,
          selectedAnswer,
          isClicked: true,
          courseId: courseId,
          id: id
        });
      }
    },
    resetSelectedQuestions: (state) => {
      //state.answeredQuestions = [1];
      state.questionsSkipped = [1];
      state.selectedQuestion = [1];
      state.isSubmitted = false;
    },
    resetAnsweredQuestions: (state) => {
      state.answeredQuestions = [
        {
          formId: 0,
          selectedAnswer: "",
          isClicked: false,
          courseId: "",
          id: 0
        },
      ];
    },
    setData: (state, action) => {
      const { name, value } = action.payload;
      state.data[name] = value;
    },
    setQuestionLength: (state, action) => {
      state.questionLength = action.payload;
    },
    setTotalQuestions: (state, action) => {
      state.totalQuestions = action.payload;
    },
    submitQuestion: (state) => {
      state.isSubmitted = true;
      state.lastPage = state.data.length + 1;
      //Math.max(
//        ...state.data.map((obj) => obj.formId)
  //    );
      //console.log("Questions are already marked" , JSON.stringify(state.answeredQuestions), "Last page", state.lastPage);
    },
  },
});

// Selectors (optional)
export const selectFormPage = (state) => state.formReducer.page;
export const selectFormData = (state) => state.formReducer.data;
export const selectFormTitle = (state) => state.formReducer.title;
export const selectIsSubmitted = (state) => state.formReducer.isSubmitted;
export const selectLastPage = (state) => state.formReducer.lastPage;
export const selectQuestionsSkipped = (state) =>
  state.formReducer.questionsSkipped;
export const selectAnsweredQuestions = (state) =>
  state.formReducer.answeredQuestions;
export const selectSelectedQuestion = (state) =>
  state.formReducer.selectedQuestion;
export const selectFormQuestionLength = (state) =>
  state.formReducer.questionLength;
export const selectFormTotalQuestionsLength = (state) =>
  state.formReducer.totalQuestions;
export const selectDisablePrev = (state) => state.formReducer.page === 0;
export const selectDisableNext = (state) => {
  return (
    state.formReducer.page === state.formReducer.questionLength ||
    (state.formReducer.page === 0 && !selectCanNextPage1) ||
    (state.formReducer.page === 1 && !selectCanNextPage2)
  );
};
export const selectPrevHide = (state) =>
  state.formReducer.page === 0 && "remove-button";
export const selectNextHide = (state) =>
  state.formReducer.page === state.formReducer.questionLength - 1 &&
  "remove-button";
export const selectSubmitHide = (state) =>
  state.formReducer.page !== state.formReducer.questionLength - 1 &&
  "remove-button";

// Selector to compute the value of canSubmit
export const selectCanSubmit = (state) => {
  const { page, data } = state.formReducer;
  const {
    billAddress2,
    sameAsBilling,
    shipAddress2,
    optInNews,
    ...requiredInputs
  } = data;

  const requiredInputsValues = Object.values(requiredInputs);
  const areAllRequiredInputsFilled = requiredInputsValues.every(Boolean);
  const isOnLastPage = page === state.formReducer.questionLength - 1;

  return areAllRequiredInputsFilled && isOnLastPage;
};

// Selector to compute canNextPage1
export const selectCanNextPage1 = (state) => {
  const { data } = state.formReducer;

  const canNextPage1 = Object.keys(data)
    .filter((key) => key.startsWith("bill") && key !== "billAddress2")
    .map((key) => data[key])
    .every(Boolean);

  return canNextPage1;
};

// Selector to compute canNextPage2
export const selectCanNextPage2 = (state) => {
  const { data } = state.formReducer;

  const canNextPage2 = Object.keys(data)
    .filter((key) => key.startsWith("ship") && key !== "shipAddress2")
    .map((key) => data[key])
    .every(Boolean);

  return canNextPage2;
};

// Actions
export const {
  setPage,
  setData,
  setQuestionLength,
  setTotalQuestions,
  setSelectedQuestion,
  resetSelectedQuestions,
  selectAnswerOption,
  resetAnsweredQuestions,
  setSkippedQuestion,
  submitQuestion,
} = formSlice.actions;

// Reducer
export default formSlice.reducer;
