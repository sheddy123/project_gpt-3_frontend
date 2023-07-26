import Form from "@/components/Dashboard/Forms/Form";
import {
  selectDisablePrev,
  selectFormPage,
  selectPrevHide,
  setPage,
} from "@/redux/features/form/formSlice";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";

const Courses = () => {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { currentColor } = useStateContext();
  const page = useSelector(selectFormPage);
  const disablePrev = useSelector(selectDisablePrev);
  const prevHide = useSelector(selectPrevHide);
  const handlePrev = (page: number) => {
    dispatch(setPage(page - 1));
  };
  console.log("Disable previous", disablePrev);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
        {/* <button
          type="button"
          className={`text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3`}
          style={{ backgroundColor: currentColor }}>
          <div className="flex items-center">
            {disablePrev ? (
              <NavLink
                to={"/dashboard/home"}
                className="ml-2 flex items-center text-white">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"></path>
                </svg>
                Back
              </NavLink>
            ) : (
              <button
                type="button"
                className={`button ${prevHide} flex flex-row items-center`}
                onClick={() => handlePrev(page)}
                disabled={disablePrev}>&nbsp;&nbsp;
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"></path>
                </svg>
                Prev
              </button>
            )}
          </div>
        </button> */}
        <button
          type="button"
          className={`text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3`}
          style={{ backgroundColor: currentColor }}
          onClick={() => handlePrev(page)}
          disabled={disablePrev}>
          <div className="flex items-center">
            {disablePrev ? (
              <NavLink
                to={"/dashboard/home"}
                className="ml-2 flex items-center text-white">
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"></path>
                </svg>
                Back
              </NavLink>
            ) : (
              <>
                &nbsp;&nbsp;
                <svg
                  className="w-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"></path>
                </svg>
                Prev
              </>
            )}
          </div>
        </button>
        <div>
          <Form />
        </div>
      </div>
    </>
  );
};

export default Courses;
