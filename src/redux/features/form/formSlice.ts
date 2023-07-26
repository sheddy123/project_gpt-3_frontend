import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 0,
  questionLength: 0,
  totalQuestions: 0,
  data: {
    billFirstName: "",
    billLastName: "",
    billAddress1: "",
    billAddress2: "",
    billCity: "",
    billState: "",
    billZipCode: "",
    sameAsBilling: false,
    shipFirstName: "",
    shipLastName: "",
    shipAddress1: "",
    shipAddress2: "",
    shipCity: "",
    shipState: "",
    shipZipCode: "",
    optInNews: false,
  },
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
    setSameAsBilling: (state, action) => {
      const { sameAsBilling } = action.payload;
      if (sameAsBilling) {
        state.data.shipFirstName = state.data.billFirstName;
        state.data.shipLastName = state.data.billLastName;
        state.data.shipAddress1 = state.data.billAddress1;
        state.data.shipAddress2 = state.data.billAddress2;
        state.data.shipCity = state.data.billCity;
        state.data.shipState = state.data.billState;
        state.data.shipZipCode = state.data.billZipCode;
      } else {
        state.data.shipFirstName = "";
        state.data.shipLastName = "";
        state.data.shipAddress1 = "";
        state.data.shipAddress2 = "";
        state.data.shipCity = "";
        state.data.shipState = "";
        state.data.shipZipCode = "";
      }
      state.data.sameAsBilling = sameAsBilling;
    },
  },
});

// Selectors (optional)
export const selectFormPage = (state) => state.formReducer.page;
export const selectFormData = (state) => state.formReducer.data;
export const selectFormTitle = (state) => state.formReducer.title;
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
export const { setPage, setData, setSameAsBilling, setQuestionLength, setTotalQuestions } =
  formSlice.actions;

// Reducer
export default formSlice.reducer;
