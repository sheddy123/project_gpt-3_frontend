import {
  ChevronDown,
  ChevronUp,
  Verified,
} from "@/components/Common/Icons/Icons";
import { useState, useRef, useEffect } from "react";
import "./Form.css";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { getCourseQuizDetailsService } from "@/services/api/CourseService/CourseService";
import { selectCourseQuizDetals } from "@/redux/features/courses/courseSlice";
import DOMPurify from "dompurify";

const CourseOverview = ({
  handleNext,
  disableNext,
  nextHide,
  page,
  courseId,
}) => {
  const [showTopContent, setShowTopContent] = useState(false);
  // Create a reference to the element you want to scroll to (e.g., a div)
  const scrollContainerRef = useRef(null);
  const handleScrollToBottom = () => {
    // Scroll the element into view
    setShowTopContent((prev) => !prev);
    scrollContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { currentColor } = useStateContext();
  const dispatch = useDispatch();
  const retrievedData = useSelector(selectCourseQuizDetals);
  console.log("retrieved data", retrievedData);
  const viewData = {
    courseQuizDetailsDto: {
      courseId: retrievedData?.courseQuizDetailsDto?.courseId,
      caption: retrievedData?.courseQuizDetailsDto?.caption,
      courseCode: retrievedData?.courseQuizDetailsDto?.courseCode,
      courseDescription: retrievedData?.courseQuizDetailsDto?.courseDescription,
      courseLanguages: retrievedData?.courseQuizDetailsDto?.courseLanguages,
      courseTitle: retrievedData?.courseQuizDetailsDto?.courseTitle,
      courseVersion: retrievedData?.courseQuizDetailsDto?.courseVersion,
      difficultyLevel: retrievedData?.courseQuizDetailsDto?.difficultyLevel,
      practiceTests: retrievedData?.courseQuizDetailsDto?.practiceTests,
      dateCreated: retrievedData?.courseQuizDetailsDto?.dateCreated,
    },
    difficultyLevel: retrievedData?.difficultyLevel,
    totalQuestions: retrievedData?.totalQuestions,
    totalPracticeTests: retrievedData?.totalPracticeTests,
    questionType: retrievedData?.questionType,
  };
  const sanitizedText = DOMPurify.sanitize(
    viewData?.courseQuizDetailsDto?.courseDescription ?? ""
  );
  useEffect(() => {
    dispatch(getCourseQuizDetailsService(courseId) as any);
  }, []);

  return (
    <>
      <div>
        <h1>About this course</h1>
        <div className="flex justify-between items-start">
          <p className="text-left">
            Test your knowledge with the{" "}
            <b>{viewData.courseQuizDetailsDto.courseTitle}</b> quiz!
          </p>
          <button
            onClick={() => handleNext(page)}
            disabled={disableNext}
            className={`bg-yellow-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded text-right ${nextHide}`}
            style={{ backgroundColor: currentColor }}>
            Get started
          </button>
        </div>
        <hr className="mb-3" />
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 
          }`}>
          {/* Row 1, Column 1 */}
          <div className="">
            <p className=" mb-0 mt-0">By the numbers</p>
          </div>

          {/* Row 1, Column 2 */}
          <div className="">
            <p className=" mb-0 mt-0">
              Skill level: <b>({viewData.difficultyLevel?.join(", ")}) Level</b>
            </p>
            <p className=" mb-0 mt-0">Students: </p>
            <p className=" mb-0 mt-0">Languages: English</p>
            <p className=" mb-0 mt-0">Captions: No</p>
          </div>

          {/* Row 1, Column 3 */}
          <div className="">
            <p className=" mb-0 mt-0">
              Practice tests: {viewData.totalPracticeTests}
            </p>
            <p className=" mb-0 mt-0">Questions: {viewData.totalQuestions}</p>
            <p className=" mb-0 mt-0">Lectures: ---</p>
            <p className=" mb-0 mt-0">Video: ---</p>
          </div>
        </div>

        <hr className="mb-3" />
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 ${
            showTopContent ? "" : "fade__content"
          } `}>
          {/* Row 1, Column 1 */}
          <div className="">
            <p className=" mb-0 mt-0">Description</p>
          </div>

          {/* Row 1, Column 2 */}
          <div className=" col-span-2">
            <p>
              <strong>
                <em>
                  Version {viewData.courseQuizDetailsDto.courseVersion},{" "}
                  {viewData.courseQuizDetailsDto.dateCreated}
                </em>
              </strong>
            </p>
            {sanitizedText}
          </div>
        </div>
        
        <div className={`long__text ${showTopContent ? "expanded" : ""}`}>
          {/* <hr className="mb-3" /> */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-3 gap-4 
          }`}>
            {/* Row 1, Column 2 */}
            <div className="">
              <p className=" mb-0 mt-0">About instructor</p>
            </div>

            {/* Row 1, Column 3 */}
            <div className="col-span-2">
              <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
                <img
                  className="rounded-full h-24 w-24"
                  src="https://avatars.githubusercontent.com/u/26222381?v=4"
                  alt="user-profile"
                />
                <div>
                  <p className="font-semibold text-xl ">
                    James Park
                    <span className="inline-flex items-center justify-center w-5 h-5 ml-1">
                      <Verified color="#31d26c" size={5} />
                    </span>{" "}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    Instructor
                  </p>
                </div>
              </div>
              <p>
                An ardent Software Technology Evangelist specializing in
                Frontend Development, with an extensive [n++] years of
                experience in the dynamic Software Industry &nbsp;
              </p>
              {/* <p>
                A certification buff with numerous certifications with the most
                recent ones being&nbsp;
              </p>
              <p>1. Microsoft Cybersecurity Architect [SC-100] </p>
              <p>2. Designing and Implementing Cloud [DP-420]</p>
              <p>
                3.Designing &amp; Implementing Microsoft DevOps&nbsp; Solutions
                [AZ-400]
              </p>
              <p>4. Developing Solutions for Microsoft Azure [AZ-204]</p>
              <p>
                5. Designing &amp; Implementing Azure Networking Solutions
                [AZ-700]
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="ud-btn ud-btn-medium ud-btn-ghost ud-heading-sm show-more-module--focusable-label--19jtd course-overview--show-more-btn--2jq19 flex flex-row items-center gap-2"
        aria-label="Show more"
        onClick={handleScrollToBottom}
        data-css-toggle-id="show-more--456">
        {showTopContent ? (
          <span
            className="flex flex-row items-center"
            style={{ color: currentColor }}>
            <span className="show-more-module--show-more--2bohq">
              Show less
            </span>
            <ChevronUp />
          </span>
        ) : (
          <span
            className="flex flex-row items-center"
            style={{ color: currentColor }}>
            <span className="show-more-module--show-less--1J4F5">
              Show more
            </span>
            <ChevronDown />
          </span>
        )}
      </button>
    </>
  );
};

export default CourseOverview;
