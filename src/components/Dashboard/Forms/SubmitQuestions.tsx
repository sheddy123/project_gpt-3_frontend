import { SharpInformation } from "@/components/Common/Icons/Icons";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const SubmitQuestions = ({page}) => {
  console.log("Current page: " + page);
  const clickSpan = (e) => {
    console.log("clickSpan ", e);
  };
  return (
    <>
      <div
        className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
        role="alert">
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
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
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt long
                texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf jg
                tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt long
                texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf jg
                tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt long
                texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf jg
                tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
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
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt long
                texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf jg
                tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt long
                texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf jg
                tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt long
                texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf jg
                tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
              <span
                className="font-semibold truncate block cursor-pointer"
                onClick={clickSpan}>
                long texttttttttttttttttttttttttttttttttttttt fdjkfjkfd gfjgfjgf
                jg tttttttttttttttttttttttttttttttttttttttttttttttttttttttt
              </span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SubmitQuestions;
