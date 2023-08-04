import { SharpInformation } from "@/components/Common/Icons/Icons";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useDispatch } from "react-redux";

const SubmitQuestions = ({ page, setPage }) => {
  const dispatch = useDispatch();
  const reviewObj = {
    wrongAnswersReview: [
      {
        id: 2,
        review: "This is correction review for id 2",
      },
      {
        id: 3,
        review: "This is correction review for id 3",
      },
      {
        id: 4,
        review: "This is correction review for id 4",
      },
    ],
    correctAnswersReview: [
      {
        id: 5,
        review: "This is correction review for id 5",
      },
      {
        id: 6,
        review: "This is correction review for id 6",
      },
    ],
  };
  const handleGoToQuestionReviewPage = (page) => {
    dispatch(setPage(page));
  };
  return (
    <>
      <div
        className="bg-green-50 dark:bg-gray-800 dark:text-white border-t-4 border-green-500 rounded-b text-green-800 px-4 py-3 shadow-md"
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
              Dive deeper into the course materials for a comprehensive grasp of
              the subject.
            </p>
            <p className="text-sm">
              Your performance: 3 out of 5 correct answers.
            </p>
          </div>
        </div>
      </div>
      <div>
        <ul className=" text-left text-black dark:text-white">
          <li className="flex items-center space-x-3 mt-0 mb-0">
            <svg
              className="flex-shrink-0 w-5 h-5  mt-5 text-green-500 dark:text-green-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5"
              />
            </svg>

            <div>
              <h4 className="font-bold">
                Your understanding and expertise &nbsp;
                <span className="inline-flex items-center justify-center cursor-pointer">
                  <TooltipComponent
                    content="Accurately answered questions"
                    position="BottomCenter">
                    <SharpInformation />
                  </TooltipComponent>
                </span>
              </h4>
            </div>
          </li>

          <li className=" list-none">
            <div className=" sm:w-[900px] w-[300px] pl-8">
              {reviewObj.correctAnswersReview.map(({ id, review }, index) => {
                return (
                  <span
                    className="font-semibold truncate block cursor-pointer"
                    key={index + id}
                    onClick={() => handleGoToQuestionReviewPage(id)}>
                    {review}
                  </span>
                );
              })}
            </div>
          </li>

          <li className="flex items-center space-x-3 mt-0 mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="flex-shrink-0 w-6 h-6  mt-5 text-red-500 dark:text-red-400 ml-[-4px] mr-[-2px]"
              fill="none">
              <path
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <div>
              <h4 className="font-bold">
                What requires further examination and study &nbsp;
                <span className="inline-flex items-center justify-center cursor-pointer">
                  <TooltipComponent
                    content=" Inaccurately addressed questions"
                    position="BottomCenter">
                    <SharpInformation />
                  </TooltipComponent>
                </span>
              </h4>
            </div>
          </li>
          <li className=" list-none">
            <div className=" sm:w-[900px] w-[300px] pl-8">
              {reviewObj.wrongAnswersReview.map(({ id, review }, index) => {
                return (
                  <span
                    className="font-semibold truncate block cursor-pointer"
                    key={index + id}
                    onClick={() => handleGoToQuestionReviewPage(id)}>
                    {review}
                  </span>
                );
              })}
            </div>
          </li>
        </ul>
        <div className="flex justify-center">
          <button
            onClick={() => handleGoToQuestionReviewPage(1)}
            className="px-4 py-2 rounded-sm bg-transparent hover:bg-gray-100 dark:bg-gray-100 text-gray-600 dark:hover:bg-slate-600 dark:hover:border-slate-600 dark:hover:text-white hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition duration-300"
            style={{ width: "auto;" }}>
            Finish test
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmitQuestions;
