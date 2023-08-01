import { Star } from "@/components/Common/Icons/Icons";
import React from "react";
const QuestionListAnswerPanel = React.memo(
  ({
    questionNumber,
    fillColor,
    currentColor,
    currentMode,
    handleClick,
    component,
    selectedQuestion,
    selectQuestionsSkipped,
    isSubmitted
  }) => { const questionAnswerPanelClass = `${
    currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
  }`;
  const isSelected = selectedQuestion.includes(questionNumber);// || questionNumber == component;
  
  const currentComponentClass = questionNumber == component ? "bg-black text-white dark:bg-white dark:text-black" : "";
  //const currentComponentClass = questionNumber == component && selectQuestionsSkipped.length == 1 ? "bg-black text-white dark:bg-white dark:text-black" : "";
  console.log("Component is ", component, "Question Number", questionNumber, "selectQuestionsSkipped " , selectQuestionsSkipped)
  return (
    <>
      {isSelected && !isSubmitted  ? (
        <li
          className={`flex flex-row items-center cursor-pointer px-6 pb-1 mt-4 h-16 hover:bg-black ${currentComponentClass} hover:text-white dark:hover:bg-white dark:hover:text-black mb-2`}
          onClick={() => handleClick(questionNumber)}>
          <Star
            currentMode={currentMode}
            currentColor={currentColor}
            fillColor={selectQuestionsSkipped.includes(questionNumber) ? "fill-[#9ca8a7]" : "fill-[#14b8a6]"}
          />{" "}
          <span className="font-bold text-[16px] mr-3">Question {questionNumber}</span>{" "}
         {selectQuestionsSkipped.includes(questionNumber) && <span className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-18 bg-orange-400 pb-1 px-2 text-white ">
            Skipped
          </span>}
        </li>
      ) : (
        <li
          className={`flex flex-row items-center px-6 h-16 faded-li ${questionAnswerPanelClass} pt-1`}
          >
          <Star
            currentMode={currentMode}
            currentColor={currentColor}
            fillColor={!selectQuestionsSkipped.includes(questionNumber) ? "fill-[#14b8a6]" : `fill-[#9ca8a7]`}
          />{" "}
          <span className="font-bold text-[16px]">Question {questionNumber}</span>
          {/* {console.log("Current question is ", JSON.stringify(selectQuestionsSkipped), questionNumber, selectQuestionsSkipped.includes(questionNumber))} */}
          {selectQuestionsSkipped.includes(questionNumber) && <span className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-18 bg-orange-400 pb-1 px-2 text-white ">
            Skipped
          </span>}
        </li>
      )} 
    </>
  );
});

export default QuestionListAnswerPanel;
