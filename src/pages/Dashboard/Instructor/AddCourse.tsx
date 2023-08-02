import DynamicForm from "@/components/DynamicForm/DynamicForm";
import { FormFieldDescriptions } from "@/interfaces/IFeatures/IFeatures";
import { createCourseService } from "@/services/api/CourseService/CourseService";
import { FieldType } from "@/utils/Constants/ApiConstants/api_constants";
import { useDispatch } from "react-redux";

const AddCourse = () => {
  const dispatch = useDispatch();
  const handleSubmitCourseForm = (formData: {
    [key: string]: string | boolean;
  }) => {
    const courseObject = {
      title: formData.Title,
      languages: formData.Languages,
      captions: formData.Captions,
      version: formData.Version,
      description: formData.Description,
      course_code: formData.course_code
    }
    // Implement the dispatching logic for course form here
    // For example, dispatch an action or call an API to save the form data
    console.log("Submitting course form:", courseObject, formData);
    dispatch(createCourseService(courseObject) as any);
    // Dispatch your action or call API here to handle the form data
  };
  // FormFields.ts
  const courseFormFields: FormFieldDescriptions = {
    description_h2: "Personal information",
    description_paragraph:
      "Use a permanent address where you can receive mail.",
    fields: [
      {
        name: "Title",
        type: FieldType.Input,
        options: [],
        label: "Title",
        required: true,
      },
      {
        name: "course_code",
        type: FieldType.Input,
        options: [],
        label: "Course Code",
        required: true,
      },
      {
        name: "Description",
        type: FieldType.TextArea,
        options: [],
        label: "Description",
        required: true,
      },
      {
        name: "Version",
        type: FieldType.Select,
        options: ["1", "2", "3"],
        label: "",
        required: true,
      },
      {
        name: "Languages",
        type: FieldType.Select,
        options: ["English"],
        label: "Languages",
        required: true,
      },
      {
        name: "Captions",
        type: FieldType.Radio,
        options: ["Yes", "No"],
        label: "Captions",
        required: true,
      },
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

  // Add more form fields here if needed

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
        <h1>Add Course</h1>
        <DynamicForm
          formFields={courseFormFields}
          onSubmit={handleSubmitCourseForm}
        />
      </div>
    </>
  );
};

export default AddCourse;
