// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { TabNav } from "@/components";
import DynamicForm from "@/components/DynamicForm/DynamicForm";
import { FormFieldDescriptions } from "@/interfaces/IFeatures/IFeatures";
import { Toaster } from "react-hot-toast";
import { selectAllDropdownQuestionFields } from "@/redux/features/questions/questionSlice";
import {
  createHybridGpt3Service,
  postHybridGpt3Service,
} from "@/services/api/OpenAiGpt3Service/openAiGpt3Service";
import {
  FieldLabel,
  FieldName,
  FieldType,
} from "@/utils/Constants/ApiConstants/api_constants";
import { Gpt3TabNavs } from "@/utils/Constants/ComponentsConstants/constants";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import {
  getArraysForFields,
  moveSelectOneToTop,
} from "@/utils/Helpers/helpers";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Gpt3Modal = ({
  setGpt3OptionSelected,
  resetSelectField,
  handleChange,
  onClose,
}) => {
  const handleResetAndClose = () => {
    //resetSelectField("Question_Type"); // Reset the selected option for the specified field
    handleChange({
      target: { name: "Question_Type", value: "Select one option" },
    });
    setGpt3OptionSelected(false);
  };
  const [resetForm, setResetForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentMode } = useStateContext();
  const [activeTab, setActiveTab] = useState("prompt request-tab");
  const [course, setCourse] = useState("");
  const handleTabClick = (id) => {
    setActiveTab(id);
  };
  const addQuestionFormData = getArraysForFields(
    useSelector(selectAllDropdownQuestionFields)
  );
  const gpt3Response3 = useSelector((store) => store?.gpt3Reducer);
  const initialValueObj = {};
  const initialValueCompletedObj = {
    [FieldLabel.Prompt]: gpt3Response3?.choices[0]?.message?.content ?? "",
  };
 

  const completedFormFields: FormFieldDescriptions = {
    description_h2: "",
    description_paragraph: "",
    buttonText: "Save & Close",
    fields: [
      {
        name: FieldLabel.Prompt,
        type: FieldType.TextArea,
        options: [],
        label: FieldName.Prompt,
        required: true,
        value: "",
      },
    ],
  };
  const formFields: FormFieldDescriptions = {
    description_h2: "",
    description_paragraph: "",
    buttonText: "Submit",
    fields: [
      {
        name: FieldLabel.Course,
        type: FieldType.Select,
        options: moveSelectOneToTop(addQuestionFormData?.course),
        label: FieldName.Course,
        required: true,
        value: "",
      },
      //C++,C#,C,Java,Javascript, Python,PHP
      {
        name: FieldLabel.Model,
        type: FieldType.Select,
        options: [
          { id: 0, value: "Select one option" },
          { id: 1, value: "gpt-3.5-turbo" },
          { id: 1, value: "gpt-3.5-turbo-0613" },
          { id: 1, value: "gpt-3.5-turbo-16k-0613" },
          { id: 1, value: "gpt-3.5-turbo-16k" },

          // { id: 1, value: "gpt-3.5-turbo-instruct" },
          // { id: 2, value: "davinci-002" },
          // { id: 3, value: "text-davinci-001" },
          // { id: 4, value: "text-curie-001" },
          // { id: 5, value: "text-babbage-001" },
          // { id: 6, value: "text-ada-001" },
          // { id: 7, value: "davinci-instruct-beta" },
          // { id: 8, value: "davinci" },
          // { id: 9, value: "curie-instruct-beta" },
          // { id: 10, value: "curie" },
          // { id: 11, value: "babbage" },
          // { id: 12, value: "ada" },
        ],
        label: FieldName.Model,
        required: true,
        value: "",
        hasTooltip: true,
        tooltipText: `<p>
        <strong>Models</strong>, <i>(in the context of ChatGpt refers to the underlying neural network architecture and its associated parameters that enable the model to understand and generate human-like text responses in a conversational manner.)</i>.
        <br/>Note: <b>gpt-3.5-turbo</b> performs better than others however, it is slower than others  
        <br/><i>The models are ordered based on their capabilities OpenAI offers different variants or sizes of ChatGPT models, ranging from smaller models with fewer parameters to larger, more powerful models. The choice of model variant can affect performance, cost, and response time.</i>
        </p>`
      },
      {
        name: FieldLabel.Max_Tokens,
        type: FieldType.Input,
        input_type: FieldType.Number,
        options: [],
        label: FieldName.Max_Tokens,
        required: true,
        value: "",
        min: 1,
        max: 4000,
        step: 1,
        hasTooltip: true,
        tooltipText: `<p>
          <strong>Tokens</strong> <i>(in the context of OpenAI GPT models are clusters of characters representing the fundamental unit of text.)</i> 
          <ul>
            <li><b>Four(4)</b> characters make a token</>
            <li>The word <strong>"QuizTest"</strong> is considered one token.</li>
            <li>If you have two words, like <b>"Quiz"</b> and <b>"Test,"</b> they count as two tokens.</li>
            <li>Even a single space between words, like in <b>"Quiz Test,"</b> is counted as two tokens because there are two chunks: <b>"Quiz"</b> and <b>"Test."</b></li>
          </ul>
        </p>`
      },
      {
        name: FieldLabel.Temperature,
        type: FieldType.Input,
        input_type: FieldType.Number,
        options: [],
        label: FieldName.Temperature,
        required: true,
        value: "",
        min: 0,
        max: 2,
        step: 0.1,
        hasTooltip: true,
        tooltipText: `<p>
        <strong>Temperature</strong>, <i>(is a parameter that controls the randomness of the model's output. It affects the diversity and creativity of the responses generated by the model.)</i>.
      <br/> Here is how it works:
      <ul><li>Low Temperature <b>(e.g., 0.2):</b> When you set the temperature to a low value, the model becomes more deterministic. It is more likely to produce responses that are highly probable according to its training data. This can result in more focused and predictable output.</li>

      <li>High Temperature <b>(e.g., 1.0):</b> When you set the temperature to a high value, the model becomes more random. It is more likely to produce diverse and creative responses, even if they are less likely according to the training data. High temperature values can lead to more surprising and varied outputs. </li>
        </p>`
      },
      {
        name: FieldLabel.Prompt,
        type: FieldType.TextArea,
        options: [],
        label: FieldName.Prompt,
        required: true,
        value: "",
        hasTooltip: true,
        tooltipText: `<p>
        <strong>Prompts</strong>, <i>(refers to the input or instruction you provide to the model to generate a specific response. Prompts are the textual cues or queries that you use to communicate with the model and request the information or text you want)</i>.
<br/>
        Prompt works based on the <b>Structure</b>, <b>Variety</b>, <b>Context</b> <br/>You can copy this example, and paste in the prompt editor
        <br/><b>Example:</b> <br/>
        {
          "instructions": "Generate 1 easy difficulty programming questions for PHP with formatted code snippets:",
          "questions": [
              {
                  "difficulty": "easy",
                  "language": "PHP",
                  "question": "You are working with PHP's 'echo' statement. What is the correct way to display 'Hello, World!' on the screen?",
                  "options": ["a) print 'Hello, World!';", "b) display('Hello, World!');", "c) echo 'Hello, World!';", "d) console.log('Hello, World!');"],
                  "answer": "c) echo 'Hello, World!';",
                  "feedback": "Correct! The 'echo' statement is used to output text or variables in PHP."
              }
          ],
          "context": "Generate 1 easy difficulty programming questions for PHP with formatted code snippets:"
      }
      
      </p>`
      },
    ],
  };
  
  const dispatch = useDispatch();
  const handleCompleteHybridGpt3Form = async (formData: {
    [key: string]: string | boolean | string[];
  }) => {
    const regex = /\{[^{}]*\}/g;
    const validSegments = formData?.Prompt.match(regex);
    const validObjects = validSegments
      ?.map((segment) => {
        try {
          return JSON.parse(segment);
        } catch (error) {
          return null; // Invalid JSON segment
        }
      })
      .filter(Boolean);
    const gpt3Object = {
      prompt: validObjects,
      courseCode: course,
    };
    console.log("Complete data", gpt3Object);
    const response = await dispatch(postHybridGpt3Service(gpt3Object) as any);
    console.log("Response is: " , response);
    if (response?.payload == "Saved successfully") {
      setTimeout(() => {
        handleResetAndClose();
        onClose();
      }, 3000);
    } else {
      alert(response?.payload);
    }
  };

  const handleSubmitCourseForm = async (formData: {
    [key: string]: string | boolean | string[];
  }) => {
    const gpt3Obj = {
      model: formData?.Model,
      //prompt: formData?.Prompt,
      messages:[{"role":"system", "content":formData?.Prompt}],
      temperature: parseFloat(formData?.Temperature),
      max_tokens: parseFloat(formData?.Max_Tokens),
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    setCourse(formData?.Course);
    console.log(gpt3Obj);
    dispatch(createHybridGpt3Service(gpt3Obj) as any);
    setActiveTab("completed-tab");
  };

  function renderActiveTab(activeTab) {
    return (
      <div>
        {Gpt3TabNavs.map((tab) => {
          if (`${tab.name}-tab` === activeTab) {
            return (
              <div key={tab.id}>
                {tab.name === "prompt request" && (
                  <DynamicForm
                    key={resetForm ? "reset" : "normal"}
                    formFields={formFields}
                    onSubmit={handleSubmitCourseForm}
                    isLoading={loading}
                    initialValues={initialValueObj}
                    currentMode={currentMode}
                  />
                )}
                {tab.name === "completed" && (
                  <DynamicForm
                    key={resetForm ? "reset" : "normal"}
                    formFields={completedFormFields}
                    onSubmit={handleCompleteHybridGpt3Form}
                    isLoading={loading}
                    initialValues={initialValueCompletedObj}
                    currentMode={currentMode}
                  />
                )}
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }

  return (
    <aside className="modal-container ">
      <div className="relative w-full max-w-7xl max-h-full overflow-hidden">
        <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between border-b rounded-t dark:border-gray-600">
            <div className=" mb-[-7px]">
              {/* @ts-ignore */}
              <TabNav
                handleTabClick={handleTabClick}
                tabNavs={Gpt3TabNavs}
                activeTab={activeTab}
              />
            </div>
            
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleResetAndClose}
              data-modal-hide="defaultModal">
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <div className="p-6 space-y-6">
              
              {activeTab == "prompt request-tab" &&
            <i className={`${currentMode == "Dark" ? "text-orange-300" : "text-red-700"}`}>
            <b>Important:</b> Do Not Close/Refresh Page or switch tabs before generating questions! Closing,
            reloading, or swtiching tabs during question generation, will result in loss of data. Please stay on this page until
            you've completely uploaded the questions.
          </i>}
          {activeTab == "completed-tab" && <i className={`${currentMode == "Dark" ? "text-orange-300" : "text-red-700"}`}>
            <b>Important:</b> Please review generated questions before uploading questions.
          </i>}
              <div id="myTabContent">{renderActiveTab(activeTab)}</div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            {/* <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              I accept
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
              Decline
            </button> */}
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </aside>
  );
};

export default Gpt3Modal;
