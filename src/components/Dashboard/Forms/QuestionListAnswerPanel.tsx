import { Star } from "@/components/Common/Icons/Icons";

const QuestionListAnswerPanel = ({
  questionNumber,
  fillColor,
  currentColor,
  currentMode,
  handleClick,
  component,
  selectedQuestion
}) => {
  
  const questionAnswerPanelClass = `${
    currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
  }`;
  const isSelected = selectedQuestion.includes(questionNumber) || questionNumber == component;
  const currentComponentClass = questionNumber == component ? "bg-black text-white dark:bg-white dark:text-black" : "";

//const currentComponentClass = questionNumber == component ? "bg-black text-white dark:bg-white dark:text-black" : "";
  return (
    <>
    {/* <li
        className={`flex flex-row items-center cursor-pointer px-6 pb-1 mt-4 h-16 hover:bg-black ${currentComponentClass} hover:text-white dark:hover:bg-white dark:hover:text-black mb-2`}
        onClick={() => handleClick(questionNumber)}
      >
        <Star
          currentMode={currentMode}
          currentColor={currentColor}
          fillColor={isSelected ? "teal-500" : ""}
        />
        <span className="font-bold text-[16px] mr-3">Question {questionNumber}</span>
        {questionNumber === 1 && (
          <span className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-18 bg-orange-400 pb-1 px-2 text-white">
            Skipped
          </span>
        )}
      </li> */}
       {" "}
      {isSelected || questionNumber == component ? (
        <li
          className={`flex flex-row items-center cursor-pointer px-6 pb-1 mt-4 h-16 hover:bg-black ${currentComponentClass} hover:text-white dark:hover:bg-white dark:hover:text-black mb-2`}
          onClick={() => handleClick(questionNumber)}>
          <Star
            currentMode={currentMode}
            currentColor={currentColor}
            fillColor={isSelected ? "teal-500" : ""}
          />{" "}
          <span className="font-bold text-[16px] mr-3">Question {questionNumber}</span>{" "}
         {questionNumber == 1 && <span className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-18 bg-orange-400 pb-1 px-2 text-white ">
            Skipped
          </span>}
        </li>
      ) : (
        <li
          className={`flex flex-row items-center cursor-pointer px-6 h-16 faded-li ${questionAnswerPanelClass} pt-1`}
          >
          <Star
            currentMode={currentMode}
            currentColor={currentColor}
            fillColor={fillColor}
          />{" "}
          <span className="font-bold text-[16px]">Question {questionNumber}</span>
        </li>
      )} 
    </>
  );
};

export default QuestionListAnswerPanel;
