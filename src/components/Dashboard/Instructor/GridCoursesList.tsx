
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useEffect, useRef, useState } from "react";
import DynamicGridListComponent from "./DynamicGridList";
import { courseColumnConfigs } from "../data/InstructorQuestionGrid";
import { useDispatch, useSelector } from "react-redux";
import { selectAllCourses } from "@/redux/features/courses/courseSlice";
import {
  createCourseService,
  deleteCourseService,
  editCourseService,
  getCourseService,
} from "@/services/api/CourseService/CourseService";
import toast from "react-hot-toast";

const GridCoursesList = () => {
  useEffect(() => {
    dispatch(getCourseService() as any);
    gridRef?.current?.clearSelection();
  }, []);
  const courseData = {
    allCourses: useSelector(selectAllCourses) || [],
  };
  const dispatch = useDispatch();
  const [actionSuccess, setActionSuccess] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const gridRef = useRef(null);
  useEffect(() => {
    dispatch(getCourseService() as any);
    gridRef?.current?.clearSelection();
  }, []);

  const handleActionBegin = async (args) => {
    const courseObj = {
      title: args.data?.title,
      captions: args.data?.captions,
      course_code: args.data?.course_code,
      description: args.data?.description,
      languages: args.data?.languages,
      version: args.data?.version,
      courseId: args.data?.courseId,
    };

    try {
      if (args.requestType === "save" && args.action === "add") {
        await dispatch(createCourseService(courseObj) as any);
        setActionSuccess((prev) => ({ ...prev, add: true }));
      } else if (args.requestType === "save" && args.action === "edit") {
        await dispatch(editCourseService(courseObj) as any);
        setActionSuccess((prev) => ({ ...prev, edit: true }));
      } else if (args.requestType === "delete") {
        const res = await dispatch(
          deleteCourseService(args.data[0]?.courseId) as any
        );
        if (res?.payload === "Your error message") {
          toast.error("Server is busy. Please try again!", {
            position: "top-right",
          });
        } else {
          setActionSuccess((prev) => ({ ...prev, delete: true }));
        }
      }
      await dispatch(getCourseService() as any);
    } catch (error) {
      toast.error("Action failed. Please try again!", {
        position: "top-right",
      });
      console.error("Error processing data:", error);
    }

    args.cancel = true;
  };
  return (
    <>
      <DynamicGridListComponent
        columnConfigs={courseColumnConfigs}
        dataSourceObj={courseData?.allCourses}
        handleActionBegin={handleActionBegin}
        actionSuccess={actionSuccess}
        gridRef={gridRef}
        componentNameText={"Course"}
        setActionSuccess={setActionSuccess}
      />
    </>
  );
};

export default GridCoursesList;
