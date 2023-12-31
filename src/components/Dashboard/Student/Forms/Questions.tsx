import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Star } from "@/components/Common/Icons/Icons";
import { useState } from "react";
import DOMPurify from "dompurify";
import QuestionListAnswerPanel from "./QuestionListAnswerPanel";
import { useDispatch, useSelector } from "react-redux";
import { selectStudentPerformanceResponse } from "@/redux/features/questions/questionSlice";
import { selectFormData } from "@/redux/features/form/formSlice";

const Questions = ({
  component,
  data,
  handleChange,
  handleNext,
  handlePrev,
  page,
  selectedQuestion,
  selectAnswerOption,
  selectAnsweredQuestions,
  selectQuestionsSkipped,
  isSubmitted,
  lastPage,
  setSkippedQuestion,
  setPage,
  wholeQuestions,
  questionType,
}) => {
  const { currentColor, currentMode } = useStateContext();
  const [fillColor, setFillColor] = useState("slate-400");
  const [selectedItem, setSelectedItem] = useState(null);
  const sanitizedText = DOMPurify.sanitize(data.question);
  const dispatch = useDispatch();
  const currentQuestionAnsweredObject = selectAnsweredQuestions.find(
    (item) => item.formId === component + 1
  );
  const options =
    questionType === "GPT-3 hybrid"
      ? data?.options?.split("@@")
      : data?.options?.split(";");
  const currentQuestionAnswered =
    currentQuestionAnsweredObject?.formId == component + 1
      ? currentQuestionAnsweredObject.selectedAnswer
      : "";
  const currentQuestionAnsweredClass =
    currentQuestionAnsweredObject?.formId == component + 1
      ? "bg-black text-[#FAEBD7] dark:bg-[#20232a] dark:border-[#20232a] dark:border-[white]"
      : "";

  const requiredQuestionIds = Array.from(
    { length: wholeQuestions?.length },
    (_, index) => index
  );
  const matchingObjects = selectAnsweredQuestions.filter((item) =>
    requiredQuestionIds.includes(item.id)
  );

  const questionTextAnswered =
    matchingObjects.length <= 1 ? "question" : "questions";
  //const numberOfQuestionsSkipped = matchingObjects.length
  const handleItemClick = (item) => {
    if (!isSubmitted) {
      const { selectedAnswer } = item;

      setSelectedItem(selectedAnswer);

      dispatch(selectAnswerOption(item));
    }
  };

  const handleClick = (page: number) => {
    if (page > 1) {
      dispatch(setSkippedQuestion(page));
    }
    dispatch(setPage(page + 1));
  };

  const feedbackResponse = useSelector(selectStudentPerformanceResponse);
  const questionFeedback = {
    feedbackList: feedbackResponse?.feedbackList ?? [],
    gradeScore: feedbackResponse?.gradeScore,
    sessionQuizAnswers: feedbackResponse?.sessionQuizAnswers,
    initialQuestions: useSelector(selectFormData).map((item, index) => ({
      ...item,
      formId: index + 2,
    })),
  };
  const currentQuestionFeedback = questionFeedback.feedbackList?.filter(
    (feedback) => feedback.id == data.id
  )[0];

  return (
    <div>
      <div>
        {!isSubmitted && (
          <i className=" text-red-700 dark:text-orange-500">
            <b>Important:</b> Do Not Close or Refresh the Page! Closing,
            reloading, or refreshing the page during the quiz will result in the
            loss of your progress and answers. Please stay on this page until
            you've completed the quiz to ensure your responses are successfully
            submitted. Thank you for your cooperation!
          </i>
        )}
        <h2>Short Quiz</h2>
        <h4>
          Quiz {component} | {wholeQuestions?.length} questions
        </h4>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
        <div className="col-span-2  dark:text-gray-200  py-4 px-6 rounded-md p-3 mt-3">
          {isSubmitted && (
            <div
              className="bg-green-50 dark:bg-gray-800 dark:text-white border-t-4 border-green-500 rounded-b text-green-800 px-4 py-3 shadow-md mb-10"
              role="alert">
              <div className="flex">
                <div className="py-1">
                  <svg
                    className="fill-current h-6 w-6 text-green-400 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20">
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">
                    {currentQuestionFeedback?.feedback}
                    {/* Dive deeper into the course materials for a comprehensive
                    grasp of the subject. */}
                  </p>
                  <p className="text-sm">
                    <em>Correct answer: {currentQuestionFeedback?.answer}</em>
                  </p>
                  <p className="text-sm">
                    Your performance: {questionFeedback.gradeScore} out of{" "}
                    {questionFeedback.feedbackList?.length} correct answers.
                  </p>
                </div>
              </div>
            </div>
          )}
          <span className={`flex flex-row items-center`}>
            <Star
              currentMode={currentMode}
              currentColor={currentColor}
              fillColor={"dark:fill-[#f5f5f4] fill-[#424237]"}
            />{" "}
            <span className="font-bold text-[16px]">Question {component}:</span>
          </span>
          <h5
            dangerouslySetInnerHTML={{ __html: sanitizedText }}
            className="pt-3 mb-10"
          />
          <ul className="space-y-4">
            {options?.map((item, index) => (
              <li
                key={index}
                className={`border border-[#676161]  p-4 rounded-lg flex items-center cursor-pointer w-full hover:bg-black hover:text-[#FAEBD7] hover:dark:bg-[#20232a] hover:dark:border-[#20232a]
                ${
                  selectedItem === item || currentQuestionAnswered == item
                    ? "dark:bg-[#20232a] dark:border-[#20232a] bg-black text-[#FAEBD7] " +
                      currentQuestionAnsweredClass
                    : ""
                } 
                
                dark:border-[white] hover:dark:border-[white]`}
                style={{
                  borderColor:
                    selectedItem === item && currentMode == "Dark"
                      ? "#20232a"
                      : "",
                }}
                onClick={() =>
                  handleItemClick({
                    selectedAnswer: item,
                    formId: data.formId,
                    courseId: data.courseId,
                    id: data.id,
                  })
                }>
                <div className="w-4 h-4 border hover_answer_div border-black dark:border-[#FFF8DC] rounded-full mr-2 hover:w-4 hover:h-4 hover:border hover:border-white hover:dark:border-[#FFF8DC] hover:rounded-full hover:mr-2">
                  {selectedItem === item || currentQuestionAnswered == item ? (
                    <div className="w-full h-full bg-[#FAEBD7] dark:bg-[#FFF8DC] rounded-full"></div>
                  ) : (
                    <div className="hover:w-full hover:h-full hover:bg-[#FAEBD7] hover:dark:bg-[#FFF8DC] hover:rounded-full"></div>
                  )}
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 float-right">
            {page != 2 && !isSubmitted && (
              <button
                onClick={() => handlePrev(page, data.id)}
                className="flex-1 px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-slate-600 dark:hover:border-slate-600 dark:hover:text-white text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300">
                Previous
              </button>
            )}
            {isSubmitted ? (
              <button
                onClick={() => handleClick(lastPage)}
                className="flex-1 px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 dark:bg-gray-100 text-gray-600 dark:hover:bg-slate-600 dark:hover:border-slate-600 dark:hover:text-white hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300">
                Back to results
              </button>
            ) : component == wholeQuestions?.length ? (
              <button
                onClick={handleChange}
                className="flex-1 px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 dark:bg-gray-100 text-gray-600 dark:hover:bg-slate-600 dark:hover:border-slate-600 dark:hover:text-white hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300">
                Submit
              </button>
            ) : (
              <button
                onClick={() => handleNext(page, data.id)}
                className="flex-1 px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 dark:bg-gray-100 text-gray-600 dark:hover:bg-slate-600 dark:hover:border-slate-600 dark:hover:text-white hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300">
                Next
              </button>
            )}
          </div>
        </div>

        <div className=" bg-gray-50 shadow dark:text-gray-200 dark:bg-main-dark-bg rounded-sm pt-6 pb-6 mt-3 relative">
          <div className="flex justify-between mb-3 mt-0 px-6">
            <span className="flex flex-row items-center">
              <span className="text-xl font-semibold">All questions</span>
              <button
                type="button"
                className="text-md font-semibold text-gray-400">
                <AiOutlineCaretDown />
              </button>
            </span>
          </div>
          <hr className="mb-3 mt-2 dark:hr__border" />
          <ul className=" list-none p-0 mb-10">
            {[...Array(wholeQuestions?.length)].map((_, index) => {
              return (
                <QuestionListAnswerPanel
                  key={index}
                  questionNumber={index + 1}
                  fillColor={fillColor}
                  currentMode={currentMode}
                  currentColor={currentColor}
                  handleClick={handleClick}
                  component={component}
                  selectedQuestion={selectedQuestion}
                  selectQuestionsSkipped={selectQuestionsSkipped}
                  wholeQuestions={wholeQuestions}
                  isSubmitted={isSubmitted}
                  id={wholeQuestions[index]?.id}
                  selectAnsweredQuestions={selectAnsweredQuestions}
                />
              );
            })}
          </ul>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <p className=" text-gray-500 text-sm px-6 py-3">
              {selectAnsweredQuestions.length - 1} {questionTextAnswered}{" "}
              answered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
