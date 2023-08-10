import {
  Button,
  DialogTitle,
  Dialog,
  IconButton,
  DialogContent,
} from "@mui/material";
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import { FormFieldDescriptions } from "@/interfaces/IFeatures/IFeatures";
import {
  selectAllDropdownQuestionFields,
  selectCreateQuestionResponse,
} from "@/redux/features/questions/questionSlice";
import {
  createQuestionService,
  editQuestionService,
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
import { useStateContext } from "@/utils/Helpers/ContextProvider";

export const QuestionDialog = ({
  open,
  onClose,
  //onSubmit,
  AppBar,
  Toolbar,
  CloseIcon,
  Typography,
  Transition,
  //fullScreen
  darkTheme,
  whiteTheme,
  ThemeProvider,
  isEditing,
  initialValue,
}) => {
  const dispatch = useDispatch();

  const initialValueObj = {
    [FieldLabel.Course]: initialValue?.courseCode, // For Select, provide the value of the selected option
    [FieldLabel.Difficulty]: initialValue?.difficultyLevel, // For Select, provide the value of the selected option
    [FieldLabel.solution_Type]: isEditing ? "MCQ" : "", // For Radio, provide the value of the selected option
    [FieldLabel.Optional_fields]: initialValue?.optionalFields, // For Radio, provide the value of the selected option
    [FieldLabel.Answer]: initialValue?.answer, // For Input, provide the value
    [FieldLabel.question_Type]: initialValue?.questionType, // For Select, provide the value of the selected option
    [FieldLabel.Question]: initialValue?.question ?? "", // For RichText, provide the HTML content
    [FieldLabel.Options]: initialValue?.options ?? "", // For RichText, provide the HTML content
    [FieldLabel.Language]: initialValue?.language ?? "", // For RichText, provide the HTML content
    [FieldLabel.QuestionId]: initialValue?.questionId, // For RichText, provide the HTML content
  };

  const handleSubmitCourseForm = async (formData: {
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
      questionId: formData?.QuestionId,
      language: formData?.Language,
    };

    const serviceFunction = isEditing
      ? editQuestionService
      : createQuestionService;
    const response = await dispatch(serviceFunction(questionFormObj) as any);
    console.log(response);
    if (
      response?.payload?.status == "Successfully inserted" ||
      response?.payload?.status == "Successfully updated"
    ) {
      setTimeout(() => {
        onClose();
      }, 3000);

      setResetForm(true);
      setLoading(true);
    }
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
  const { currentMode } = useStateContext();

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
        value: "",
      },
      {
        name: FieldLabel.Difficulty,
        type: FieldType.Select,
        options: addQuestionFormData?.difficulty,
        label: FieldName.Difficulty,
        required: true,
        value: "",
      },
      {
        name: FieldLabel.solution_Type,
        type: FieldType.Radio,
        options: addQuestionFormData?.solution,
        label: FieldName.SolutionType,
        required: true,
        value: "",
      },
      {
        name: FieldLabel.Optional_fields,
        type: FieldType.Radio,
        options: addQuestionFormData?.optionalField,
        label: FieldName.OptionalFields,
        required: false,
        value: "",
      },
      
      {
        name: FieldLabel.question_Type,
        type: FieldType.Select,
        options: addQuestionFormData?.questionType,
        label: FieldName.QuestionType,
        required: true,
        value: "",

      },
      {
        name: FieldLabel.Language,
        type: FieldType.Select,
        options: addQuestionFormData?.language,
        label: FieldName.Language,
        required: true,
        value: "",
      },
      {
        name: FieldLabel.Answer,
        type: FieldType.Input,
        options: [],
        label: FieldName.Answer,
        required: true,
        value: "",
      },
      {
        name: FieldLabel.Question,
        type: FieldType.RichText,
        options: [],
        label: FieldName.Question,
        required: true,
        toolbarSettings: toolbarSettings1,
        value: "",
      },
      {
        name: FieldLabel.Options,
        type: FieldType.Input,
        options: [],
        label: FieldName.Options,
        required: true,
        toolbarSettings: toolbarSettings2,
        value: "",
        addMore: true
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
      <ThemeProvider theme={currentMode == "Dark" ? darkTheme : whiteTheme}>
        <Dialog
          fullScreen
          open={open}
          onClose={onClose}
          TransitionComponent={Transition}>
          <AppBar
            sx={{ position: "relative" }}
            color="primary"
            enableColorOnDark>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={onClose}
                aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {isEditing ? "Edit question" : "Create new question"}
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <DialogTitle> Question</DialogTitle> */}
          <DialogContent
            sx={{
              backgroundColor: `${currentMode == "Dark" ? "#33373e" : "#fff"}`,
            }}>
            <div
              className={`m-2 md:m-10 mt-24 p-2 md:p-10 ${
                currentMode == "Dark" ? "bg-[#42464d]" : "bg-white"
              } shadow rounded-sm overflow-hidden prose prose-slate dark:prose-invert max-w-none prose-img:shadow-md prose-p:mb-0 prose-p:mt-0 dark:prose-hr:border-t-2 prose-hr:border-t-2 dark:prose-hr:border-white`}>
              <h1
                className={`${
                  currentMode == "Dark" ? "text-slate-100" : "text-slate-900"
                }`}>
                {isEditing ? "Edit question" : "Add question"}
              </h1>
              <DynamicForm
                key={resetForm ? "reset" : "normal"}
                formFields={courseFormFields}
                onSubmit={handleSubmitCourseForm}
                isLoading={loading}
                initialValues={initialValueObj}
                currentMode={currentMode}
              />
              <Toaster position="top-right" />
            </div>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
      {/* <Dialog open={open} >
        <DialogTitle textAlign="center">Create New Account</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {columns.map((column) => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              ))}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button color="secondary" onClick={handleSubmit} variant="contained">
            Create New Account
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};
