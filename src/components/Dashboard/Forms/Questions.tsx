import { selectFormTotalQuestionsLength } from "@/redux/features/form/formSlice";
import { useSelector } from "react-redux";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Star } from "@/components/Common/Icons/Icons";
import { useState } from "react";
import DOMPurify from 'dompurify';

const Questions = ({ component, data, handleChange, options, answer }) => {
  const questLength = useSelector(selectFormTotalQuestionsLength);
  const { currentColor, currentMode } = useStateContext();
  const [fillColor, setFillColor] = useState("slate-400");
  const [selectedItem, setSelectedItem] = useState(null);
  const items = ['Question 1', 'Question 2', 'Question 3', 'Question 4', 'Question 5', 'Question 6'];

  const sanitizedText = DOMPurify.sanitize(data);
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClick = () => {
    // Toggle the fillColor when the li is clicked
    setFillColor((prevColor) =>
      prevColor === "slate-400" ? "teal-500" : "slate-400"
    );
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
          Quiz {component} | {questLength} questions
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
          <h5 dangerouslySetInnerHTML={{ __html: sanitizedText }} className="pt-3 mb-10"/>
            
          <ul className="space-y-4">
            {options.map((item, index) => (
              <li
                key={index}
                className={`border border-[#676161]  p-4 rounded-lg flex items-center cursor-pointer w-full ${
                  selectedItem === item &&
                  "dark:bg-[#20232a] dark:border-[#20232a] bg-black text-[#FAEBD7]"
                } dark:border-[white]`}
                style={{borderColor: selectedItem === item && currentMode == "Dark" ? "#20232a" : ""}}
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
        </div>

        <div className=" bg-gray-50 shadow dark:text-gray-200 dark:bg-main-dark-bg rounded-sm pt-6 pb-6 mt-3">
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
          <hr className="mb-3 mt-2 darK:hr__border" />
          <ul className=" list-none p-0">
            <li
              className="flex flex-row items-center cursor-pointer px-6 pb-1 mt-2"
              onClick={handleClick}>
              <Star
                currentMode={currentMode}
                currentColor={currentColor}
                fillColor={fillColor}
              />{" "}
              <span className="font-bold text-[16px] mr-3">Question 1</span>{" "}
              <span className="text-xs cursor-pointer hover:drop-shadow-xl font-semibold rounded-lg w-18 bg-orange-400 pb-1 px-2 text-white ">
                Skipped
              </span>
            </li>
            <li
              className={`flex flex-row items-center cursor-pointer px-6 faded-li ${
                currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
              } pt-1`}
              onClick={handleClick}>
              <Star
                currentMode={currentMode}
                currentColor={currentColor}
                fillColor={fillColor}
              />{" "}
              <span className="font-bold text-[16px]">Question 2</span>
            </li>
            <li
              className={`flex flex-row items-center cursor-pointer px-6 faded-li ${
                currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
              } `}
              onClick={handleClick}>
              <Star
                currentMode={currentMode}
                currentColor={currentColor}
                fillColor={fillColor}
              />{" "}
              <span className="font-bold text-[16px]">Question 3</span>
            </li>
            <li
              className={`flex flex-row items-center cursor-pointer px-6 faded-li ${
                currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
              } `}
              onClick={handleClick}>
              <Star
                currentMode={currentMode}
                currentColor={currentColor}
                fillColor={fillColor}
              />{" "}
              <span className="font-bold text-[16px]">Question 4</span>
            </li>
            <li
              className={`flex flex-row items-center cursor-pointer px-6 faded-li ${
                currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
              }`}
              onClick={handleClick}>
              <Star
                currentMode={currentMode}
                currentColor={currentColor}
                fillColor={fillColor}
              />{" "}
              <span className="font-bold text-[16px]">Question 5</span>
            </li>
            <li
              className={`flex flex-row items-center cursor-pointer px-6 faded-li ${
                currentMode == "Dark" ? "faded-li_dark" : "faded-li_light"
              }`}
              onClick={handleClick}>
              <Star
                currentMode={currentMode}
                currentColor={currentColor}
                fillColor={fillColor}
              />{" "}
              <span className="font-bold text-[16px]">Question 6</span>
            </li>
          </ul>

          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            <p className=" text-gray-500 text-sm px-6">2 questions skipped</p>
          </div>
        </div>
      </div>

      <button onClick={handleChange}>Submit</button>
    </div>
  );
};

export default Questions;
