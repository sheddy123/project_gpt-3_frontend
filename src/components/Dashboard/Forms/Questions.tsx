import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Star } from "@/components/Common/Icons/Icons";
import { useState } from "react";
import DOMPurify from "dompurify";
import QuestionListAnswerPanel from "./QuestionListAnswerPanel";

const Questions = ({
  component,
  data,
  handleChange,
  options,
  answer,
  questLength,
  handleNext,
  handlePrev,
  page,
  selectedQuestion
}) => {
  const { currentColor, currentMode } = useStateContext();
  const [fillColor, setFillColor] = useState("slate-400");
  const [selectedItem, setSelectedItem] = useState(null);
  const sanitizedText = DOMPurify.sanitize(data);
  

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClick = () => {
    
    // Toggle the fillColor when the li is clicked
    // setFillColor((prevColor) =>
    //   prevColor === "slate-400" ? "teal-500" : "slate-400"
    // );
  };

  //   const renderBillingContent = () => {
  //     switch (component) {
  //       case "Billing1":
  //         return (
  //           <div>
  //             {/* Billing1 Content */}
  //             <h2>Billing 1</h2>
  //             {/* Use the data prop as needed */}
  //             <p>{data}</p>
  //           </div>
  //         );
  //       case "Billing2":
  //         return (
  //           <div>
  //             {/* Billing2 Content */}
  //             <h2>Billing 2</h2>
  //             {/* Use the data prop as needed */}
  //             <p>{data}</p>
  //           </div>
  //         );
  //       // Add more cases for additional billing components as needed
  //       default:
  //         return null;
  //     }
  //   };

  return (
    <div>
      <div>
        {/* Billing1 Content */}
        <h2>Short Quiz</h2>
        <h4>
          Quiz {component} | {questLength - 2} questions
        </h4>

        {/* Use the data prop as needed */}
      </div>

      {/* Common Billing UI elements can be placed here if needed */}
      {/* Example: Billing navigation buttons */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
        <div className="col-span-2  dark:text-gray-200  py-4 px-6 rounded-md p-3 mt-3">
          <span
            className={`flex flex-row items-center cursor-pointer`}
            onClick={handleClick}>
            <Star
              currentMode={currentMode}
              currentColor={currentColor}
              fillColor={fillColor}
            />{" "}
            <span className="font-bold text-[16px]">Question {component}:</span>
          </span>
          <h5
            dangerouslySetInnerHTML={{ __html: sanitizedText }}
            className="pt-3 mb-10"
          />

          <ul className="space-y-4">
            {options.map((item, index) => (
              <li
                key={index}
                className={`border border-[#676161]  p-4 rounded-lg flex items-center cursor-pointer w-full ${
                  selectedItem === item &&
                  "dark:bg-[#20232a] dark:border-[#20232a] bg-black text-[#FAEBD7]"
                } dark:border-[white]`}
                style={{
                  borderColor:
                    selectedItem === item && currentMode == "Dark"
                      ? "#20232a"
                      : "",
                }}
                onClick={() => handleItemClick(item)}>
                <div className="w-4 h-4 border border-black dark:border-[#FFF8DC] rounded-full mr-2">
                  {selectedItem === item && (
                    <div className="w-full h-full bg-[#FAEBD7] dark:bg-[#FFF8DC] rounded-full"></div>
                  )}
                </div>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 float-right">
            <button
              onClick={() => handlePrev(page)}
              className="flex-1 px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300">
              Previous
            </button>
            <button
              onClick={() => handleNext(page)}
              className="flex-1 px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300">
              Next
            </button>
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
            {[...Array(5)].map((_, index) => (
              <QuestionListAnswerPanel
                key={index}
                questionNumber={index + 1}
                fillColor={fillColor}
                currentMode={currentMode}
                currentColor={currentColor}
                handleClick={handleClick}
                component={component}
                selectedQuestion={selectedQuestion}
              />
            ))}
          </ul>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <p className=" text-gray-500 text-sm px-6 py-3">
              2 questions skipped
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
