import DynamicForm from "@/components/DynamicForm/DynamicForm";
import { FormFieldDescriptions } from "@/interfaces/IFeatures/IFeatures";
import { selectAllDropdownCourses } from "@/redux/features/courses/courseSlice";
import {
  createCourseService,
  getCourseDopdownListsService,
} from "@/services/api/CourseService/CourseService";
import {
  FieldLabel,
  FieldName,
  FieldType,
} from "@/utils/Constants/ApiConstants/api_constants";
import {
  toolbarSettings1,
  toolbarSettings2,
} from "@/utils/Constants/ComponentsConstants/constants";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const AddQuestions = () => {
  const dispatch = useDispatch();
  const handleSubmitCourseForm = (formData: {
    [key: string]: string | boolean | string[];
  }) => {
    const courseObject = {
      title: formData.Title,
      languages: formData.Languages,
      captions: formData.Captions,
      version: formData.Version,
      description: formData.Description,
      course_code: formData.course_code,
    };
    // Implement the dispatching logic for course form here
    // For example, dispatch an action or call an API to save the form data
    console.log("Submitting course form:", formData);
    //dispatch(createCourseService(courseObject) as any);
    // Dispatch your action or call API here to handle the form data
  };

  function getArraysForFields(data) {
    const arrays = {};

    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (
          key.endsWith("Id") &&
          item[key] !== null &&
          item[key.replace("Id", "Value")] !== null
        ) {
          const fieldName = key.replace("Id", "");
          if (!arrays[fieldName]) {
            arrays[fieldName] = [];
          }
          arrays[fieldName].push({
            id: item[key],
            value: item[key.replace("Id", "Value")],
          });
        }
      });
    });

    return arrays;
  }

  const addQuestionFormData = getArraysForFields(
    useSelector(selectAllDropdownCourses)
  );
  // const courseData = data
  // .filter(item => item.courseId !== null && item.courseValue !== null)
  // .map(item => {
  //   return { id: item.courseId, value: item.courseValue };
  // });

  // FormFields.ts
  const courseFormFields: FormFieldDescriptions = {
    description_h2: "",
    description_paragraph: "",
    fields: [
      {
        name: FieldLabel.Course,
        type: FieldType.Select,
        options: addQuestionFormData?.course,
        label: FieldName.Course,
        required: true,
      },
      {
        name: FieldLabel.Difficulty,
        type: FieldType.Select,
        options: addQuestionFormData?.difficulty,
        label: FieldName.Difficulty,
        required: true,
      },
      {
        name: FieldLabel.solution_Type,
        type: FieldType.Radio,
        options: addQuestionFormData?.solution,
        label: FieldName.SolutionType,
        required: true,
      },
      {
        name: FieldLabel.Optional_fields,
        type: FieldType.Radio,
        options: addQuestionFormData?.optionalField,
        label: FieldName.OptionalFields,
        required: false,
      },
      {
        name: FieldLabel.Answer,
        type: FieldType.Input,
        options: [],
        label: FieldName.Answer,
        required: true,
      },
      {
        name: FieldLabel.question_Type,
        type: FieldType.Select,
        options: addQuestionFormData?.questionType,
        label: FieldName.QuestionType,
        required: true,
      },
      {
        name: FieldLabel.Question,
        type: FieldType.RichText,
        options: [],
        label: FieldName.Question,
        required: true,
        toolbarSettings: toolbarSettings1,
      },
      {
        name: FieldLabel.Options,
        type: FieldType.RichText,
        options: [],
        label: FieldName.MultipleOptions,
        required: true,
        toolbarSettings: toolbarSettings2,
      },

      // {
      //   name: "Title",
      //   type: FieldType.Input,
      //   options: [],
      //   label: "Title",
      //   required: true,
      // },
      // {
      //   name: "course_code",
      //   type: FieldType.Input,
      //   options: [],
      //   label: "Course Code",
      //   required: true,
      // },
      // {
      //   name: "Description",
      //   type: FieldType.RichText,
      //   options: [],
      //   label: "Description",
      //   required: true,
      // },
      // {
      //   name: "Version",
      //   type: FieldType.Select,
      //   options: ["1", "2", "3"],
      //   label: "",
      //   required: true,
      // },
      // {
      //   name: "Languages",
      //   type: FieldType.Select,
      //   options: ["English"],
      //   label: "Languages",
      //   required: true,
      // },
      // {
      //   name: "Captions",
      //   type: FieldType.Radio,
      //   options: ["Yes", "No"],
      //   label: "Captions",
      //   required: true,
      // },
      // {
      //   name: "isFeatured",
      //   type: FieldType.Checkbox,
      //   options: [],
      //   label: "Featured",
      //   required: true,
      // },
    ],
    // Add more form fields here if needed
  };

  useEffect(() => {
    dispatch(getCourseDopdownListsService() as any);
  }, []);
  // Add more form fields here if needed

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
        <h1>Add Questions</h1>
        <DynamicForm
          formFields={courseFormFields}
          onSubmit={handleSubmitCourseForm}
        />
      </div>
    </>
  );
};

export default AddQuestions;
