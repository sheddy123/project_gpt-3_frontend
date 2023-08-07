import DynamicForm from "@/components/DynamicForm/DynamicForm";
import { FormFieldDescriptions } from "@/interfaces/IFeatures/IFeatures";
import {
  selectAllDropdownQuestionFields,
  selectCreateQuestionResponse,
} from "@/redux/features/questions/questionSlice";
import {
  createQuestionService,
  getCourseDopdownListsService,
} from "@/services/api/QuestionService/QuestionService";
import {
  FieldLabel,
  FieldName,
  FieldType,
} from "@/utils/Constants/ApiConstants/api_constants";
import {
  toolbarSettings1,
  toolbarSettings2,
} from "@/utils/Constants/ComponentsConstants/constants";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

const AddQuestions = () => {
  const dispatch = useDispatch();

  const handleSubmitCourseForm = (formData: {
    [key: string]: string | boolean | string[];
  }) => {
    const questionFormObj = {
      answer: formData?.Answer,
      course: formData?.Course,
      options: formData?.Options,
      question: formData?.Question,
      difficulty: formData?.Difficulty,
      question_type: formData?.Question_Type,
      solution_type: formData?.Solution_Type,
      optional_fields: formData?.Optional_fields,
    };
    dispatch(createQuestionService(questionFormObj) as any);
    setResetForm(true);
    setLoading(true);
  };
  const questionResponse = useSelector(selectCreateQuestionResponse);
  const [resetForm, setResetForm] = useState(false);
  const [loading, setLoading] = useState(false);

  function getArraysForFields(data) {
    const arrays = {};

    data?.forEach((item) => {
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
    useSelector(selectAllDropdownQuestionFields)
  );
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

  useEffect(() => {
    setLoading(false);
    if (resetForm && questionResponse === "Successfully inserted") {
      // toast.success(`${questionResponse}`, {
      //   position: "top-right",
      // });
      // After resetting the form, set resetForm back to false
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white  dark:bg-[#42464D] shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white">
        <h1>Add Questions</h1>
        <DynamicForm
          key={resetForm ? "reset" : "normal"}
          formFields={courseFormFields}
          onSubmit={handleSubmitCourseForm}
          isLoading={loading}
        />
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default AddQuestions;
