// import { useEffect, useRef, useState } from "react";
// import {
//   Edit,
//   Inject,
//   Toolbar,
//   ColumnDirective,
//   ColumnsDirective,
//   GridComponent,
//   Page,
// } from "@syncfusion/ej2-react-grids";
// import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   createCourseService,
//   deleteCourseService,
//   editCourseService,
//   getCourseService,
// } from "@/services/api/CourseService/CourseService";
// import { selectAllCourses } from "@/redux/features/courses/courseSlice";
// import { useStateContext } from "@/utils/Helpers/ContextProvider";
// import {
//   LanguagesOptions,
//   YesNoOptions,
//   addCourseGrid,
//   versionOptions,
// } from "../data/InstructorQuestionGrid";

// import "./Grid.css";
// import toast, { Toaster } from "react-hot-toast";

// function GridCoursesList() {
//   const { currentMode } = useStateContext();
//   const dispatch = useDispatch();
//   const gridRef = useRef(null);
//   const [actionSuccess, setActionSuccess] = useState({
//     add: false,
//     edit: false,
//     delete: false,
//   });

//   useEffect(() => {
//     dispatch(getCourseService() as any);
//     gridRef?.current?.clearSelection();
//   }, []);

//   const courseData = {
//     allCourses: useSelector(selectAllCourses) || [],
//   };

//   const handleDialogClose = () => {
//     // Perform any necessary actions when the dialog is closed
//     // Show the success toast after the function executes successfully
//   };
//   useEffect(() => {
//     if (actionSuccess.add || actionSuccess.edit || actionSuccess.delete) {
//       gridRef.current.closeEdit();
//       gridRef.current.refresh();
//       gridRef.current.clearSelection();

//       handleDialogClose();

//       // Reset the state variables after UI updates
//       const showSuccessToast = (action) => {
//         let notif_Message = "";
//         switch (action) {
//           case "add":
//             notif_Message = "added";
//             break;
//           case "edit":
//             notif_Message = "edited";
//             break;
//           case "delete":
//             notif_Message = "deleted";
//             break;
//         }
//         toast.success(`Course ${notif_Message} successfully!`, {
//           position: "top-right",
//         });
//       };

//       Object.keys(actionSuccess).forEach((action) => {
//         if (actionSuccess[action]) {
//           showSuccessToast(action);
//           setActionSuccess((prev) => ({ ...prev, [action]: false }));
//         }
//       });
//     }
//   }, [actionSuccess]);

//   const handleActionBegin = async (args) => {
//     //  console.log("Args is ", JSON.stringify(args))
//     const courseObj = {
//       title: args.data?.title,
//       captions: args.data?.captions,
//       course_code: args.data?.course_code,
//       description: args.data?.description,
//       languages: args.data?.languages,
//       version: args.data?.version,
//       courseId: args.data?.courseId,
//     };

//     try {
//       if (args.requestType === "save" && args.action === "add") {
//         await dispatch(createCourseService(courseObj) as any);
//         setActionSuccess((prev) => ({ ...prev, add: true }));
//       } else if (args.requestType === "save" && args.action === "edit") {
//         await dispatch(editCourseService(courseObj) as any);
//         setActionSuccess((prev) => ({ ...prev, edit: true }));
//       } else if (args.requestType === "delete") {
//         const res = await dispatch(
//           deleteCourseService(args.data[0]?.courseId) as any
//         );
//         if (res?.payload === "Your error message") {
//           toast.error("Server is busy. Please try again!", {
//             position: "top-right",
//           });
//         } else {
//           setActionSuccess((prev) => ({ ...prev, delete: true }));
//         }
//       }
//       await dispatch(getCourseService() as any);
//     } catch (error) {
//       toast.error("Action failed. Please try again!", {
//         position: "top-right",
//       });
//       console.error("Error processing data:", error);
//     }

//     args.cancel = true;
//   };

//   const editOptions = {
//     allowEditing: true,
//     allowAdding: true,
//     allowDeleting: true,
//     mode: "Dialog",
//     template: ""
//   };

//   const toolbarOptions = ["Add", "Edit", "Delete", "Search"];

//   const settings = { checkboxMode: "ResetOnRowClick", persistSelection: false };
//   return (
//     <div className={`not-prose ${currentMode === "Dark" ? "darkMode" : ""}`}>
//       <div className="e-adaptive-demo e-bigger">
//         <div className="e-mobile-layout">
//           <div className="e-mobile-content">
//             <GridComponent
//               dataSource={courseData?.allCourses}
//               height="100%"
//               pageSettings={{ pageSize: 8, pageSizes: true }}
//               ref={gridRef}
//               enableAdaptiveUI={true}
//               allowFiltering={true}
//               actionBegin={handleActionBegin}
//               allowSorting={true}
//               allowPaging={true}
//               toolbar={toolbarOptions}
//               editSettings={editOptions}
//               selectionSettings={settings}>
//               <ColumnsDirective>
//                 <ColumnDirective
//                   type="checkbox"
//                   field="courseId"
//                   width="50"
//                   // isPrimaryKey={true}
//                   // visible={false}
//                 />
//                 <ColumnDirective
//                   field="course_code"
//                   headerText="Course Code"
//                   width="250"
//                   validationRules={{ required: true }}
//                   textAlign="Right"
//                 />
//                 <ColumnDirective field="title" headerText="Title" width="200" />
//                 <ColumnDirective
//                   field="languages"
//                   headerText="Languages"
//                   width="200"
//                   editType="custom"
//                   editTemplate={(props) => (
//                     <div>
//                       <div className=" text-gray-500 mb-2 mt-2">Language</div>
//                       <DropDownListComponent
//                         id="languages"
//                         dataSource={LanguagesOptions}
//                         fields={{ text: "text", value: "value" }}
//                         placeholder={
//                           props.placeholderText || "Select a Language"
//                         }
//                         value={props.defaultValue || LanguagesOptions[0].value}
//                       />
//                     </div>
//                   )}
//                 />
//                 <ColumnDirective
//                   field="description"
//                   headerText="Description"
//                   width="320"
//                   validationRules={{ required: true }}
//                 />
//                 <ColumnDirective
//                   field="captions"
//                   headerText="Captions"
//                   width="150"
//                   editType="custom"
//                   editTemplate={(props) => (
//                     <div>
//                       <div className=" text-gray-500 mb-2 mt-2">Caption</div>
//                       <DropDownListComponent
//                         id="caption"
//                         dataSource={YesNoOptions}
//                         fields={{ text: "text", value: "value" }}
//                         placeholder={
//                           props.placeholderText || "Select a caption"
//                         }
//                         value={props.defaultValue || YesNoOptions[0].value}
//                       />
//                     </div>
//                   )}
//                 />
//                 <ColumnDirective
//                   field="version"
//                   headerText="Version"
//                   width="150"
//                   editType="custom"
//                   editTemplate={(props) => (
//                     <div>
//                       <div className=" text-gray-500 mb-2 mt-2">Version</div>
//                       <DropDownListComponent
//                         id="version"
//                         dataSource={versionOptions}
//                         fields={{ text: "text", value: "value" }}
//                         placeholder={
//                           props.placeholderText || "Select a version"
//                         }
//                         value={props.defaultValue || versionOptions[0].value}
//                       />
//                     </div>
//                   )}
//                 />
//               </ColumnsDirective>
//               <Inject services={[Page, Edit, Toolbar]} />
//             </GridComponent>
//           </div>
//         </div>
//       </div>
//       <Toaster position="top-right" />
//     </div>
//   );
// }

//

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
