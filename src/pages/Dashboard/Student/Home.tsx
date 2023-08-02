import ProfileModal from "@/components/Common/Modal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { openModal } from "@/redux/features/modal/modalSlice";
import {
  CoursesList,
  Leaders,
  MyLearningProgress,
  YouMayLike,
} from "@/components/Dashboard";
import { useStateContext } from "@/utils/Helpers/ContextProvider";


const Home = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const { setActiveMenu } = useStateContext();

  useEffect(() => {
    dispatch(openModal(undefined));
    setActiveMenu(true);
  }, []);

  
  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-[#42464D] shadow rounded-sm overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className=" col-span-2">
            <CoursesList /> <MyLearningProgress />
          </div>
          <div className=" col-span-2 md:col-span-1">
            <Leaders /> <YouMayLike />
          </div>
        </div>
      </div>
      {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white shadow rounded-sm min-h-screen">
        <div className="grid grid-rows-3 md:grid-flow-col  gap-4">
          <div className="md:row-span-2 md:col-span-2 ...">
            <CoursesList />
            <MyLearningProgress />
          </div>
          <div className="md:col-span-2 ..."></div>
          <div className="md:row-span-3 ...">
            <Leaders />
            <YouMayLike />
            <div className="">04 fbndhjsdhjds d fddshjsdjhdhsf fhdshjsd</div>
          </div>
        </div>
      </div> */}
      <div className="mt-24">
        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
          {!store?.profileReducer?.years_of_experience && <ProfileModal />}
        </div>
      </div>
    </>
  );
};

export default Home;
