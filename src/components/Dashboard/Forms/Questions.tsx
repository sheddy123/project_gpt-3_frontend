import { selectFormTotalQuestionsLength } from "@/redux/features/form/formSlice";
import { useSelector } from "react-redux";

const Questions = ({ component, data, handleChange }) => {
  const questLength = useSelector(selectFormTotalQuestionsLength);
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
        <h4>Quiz {component} | {questLength} questions</h4>

        {/* Use the data prop as needed */}
        <p>{data}</p>
      </div>
      {/* Common Billing UI elements can be placed here if needed */}
      {/* Example: Billing navigation buttons */}
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
        <div className="col-span-2 bg-blue-500 text-white py-4 px-6 rounded-md">33</div>
        <div className="bg-red-500 text-white py-4 px-6 rounded-md">
          <div>2</div>
          <div>3</div>
          <div>3</div>
          <div>3</div>
          <div>3</div>
          </div>
      </div>
   

      <button onClick={handleChange}>Submit</button>
    </div>
  );
};

export default Questions;
