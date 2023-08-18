// DynamicForm.tsx
import { DynamicFormProps } from "@/interfaces/IFeatures/IFeatures";
import { FieldType } from "@/utils/Constants/ApiConstants/api_constants";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import {
  HtmlEditor,
  Image,
  Count,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
  IToolbarSettings,
} from "@syncfusion/ej2-react-richtexteditor";
import Gpt3Modal from "../Dashboard/Instructor/Gpt3Modal";

const DynamicForm: React.FC<DynamicFormProps> = ({
  formFields,
  onSubmit,
  isLoading,
  initialValues,
  currentMode,
}) => {
  const { currentColor } = useStateContext();
  const [additionalInputs, setAdditionalInputs] = useState<{
    [key: string]: string[];
  }>({});
  const [gpt3OptionSelected, setGpt3OptionSelected] = useState(false);

  const [formValues, setFormValues] = useState<{
    [key: string]: string | string[];
  }>(
    formFields.fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: field.type === FieldType.Checkbox ? [] : "",
      }),
      {}
    )
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>(
    formFields.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleRichtextChange = (name: string) => (args: any) => {
    const value = args.value; // Get the HTML content of the RichTextEditor
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    // Clear the error message when the user starts typing in the Richtext field
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  useEffect(() => {
    // Initialize formValues with initial Richtext values
    const initialRichtextValues = formFields.fields
      .filter((field) => field.type === FieldType.RichText)
      .reduce((acc, field) => ({ ...acc, [field.name]: "" }), {});
    setFormValues((prevValues) => ({
      ...prevValues,
      ...initialRichtextValues,
      ...initialValues, // Apply initial values from the initialValues prop
    }));

    // Clean up event listeners
    return () => {
      formFields.fields.forEach((field) => {
        if (field.type === FieldType.RichText) {
          const rteElement = document.getElementById(field.name);
          if (rteElement) {
            rteElement.removeEventListener(
              "keyup",
              handleRichtextChange(field.name)
            );
          }
        }
      });
    };
  }, [formFields.fields]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

      setFormValues((prevValues) => {
        if (value === "GPT-3 hybrid") {
          setGpt3OptionSelected(true);
        }
        if (type === "checkbox") {
          const isChecked = (e.target as HTMLInputElement).checked;
          const prevSelected = prevValues[name] as string[]; // Get the previously selected options
          let updatedSelected: string[] = [];

          if (isChecked) {
            // Add the newly selected option
            updatedSelected = [...prevSelected, value];
          } else {
            // Remove the deselected option
            updatedSelected = prevSelected.filter((item) => item !== value);
          }

          return {
            ...prevValues,
            [name]: updatedSelected,
          };
        } else {
          // For other input types (text, textarea, select, etc.), handle them normally
          return {
            ...prevValues,
            [name]: value,
          };
        }
      });
    

    // Clear the error message when the user starts typing in the field
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleAddMore = (fieldName: string) => {
    setAdditionalInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: [...(prevInputs[fieldName] || []), ""],
    }));
  };
  const getAdditionalFields = () => {
    const additionalFields = [];
    for (const field of formFields.fields) {
      if (field.addMore && Object.keys(additionalInputs).length > 0) {
        additionalFields.push(...additionalInputs[field.name]);
      }
    }
    return additionalFields;
  };

  const getAdditionalFieldValues = () => {
    const additionalValues: { [key: string]: string } = {};
    for (const field of formFields.fields) {
      if (field.addMore && Object.keys(additionalInputs).length > 0) {
        additionalValues[field.name] = additionalInputs[field.name].join(",");
      }
    }
    return additionalValues;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allFields = [...formFields.fields, ...getAdditionalFields()];

    let fieldErrors = {};
    for (const field of allFields) {
      const value = formValues[field.name];

      if (field.required && !value) {
        fieldErrors[field.name] = "Field is required";
      } else if (
        field.type === FieldType.Checkbox &&
        (!Array.isArray(value) || value.length === 0)
      ) {
        fieldErrors[field.name] = "Please select at least one option";
      }
    }

    setErrors(fieldErrors);

    if (Object.keys(fieldErrors).length > 0) {
      return;
    }

    const allFormValues = {
      ...formValues,
      ...getAdditionalFieldValues(),
    };

    // Proceed with the submission if there are no errors
    onSubmit(allFormValues);
  };

  const handleAdditionalInputChange =
    (fieldName: string, index: number) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setAdditionalInputs((prevInputs) => ({
        ...prevInputs,
        [fieldName]: prevInputs[fieldName].map((value, i) =>
          i === index ? newValue : value
        ),
      }));
    };

  const handleDeleteAdditionalInput = (fieldName: string, index: number) => {
    setAdditionalInputs((prevInputs) => ({
      ...prevInputs,
      [fieldName]: prevInputs[fieldName].filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="myForm">
        <div className="border-b dark:border-slate-200 border-gray-900/10 pb-12">
          <h2 className="dark:text-white text-base font-semibold leading-7 text-gray-900">
            {formFields.description_h2}
          </h2>
          <p className="mt-1 dark:text-white text-sm leading-6 text-gray-600">
            {formFields.description_paragraph}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {formFields.fields.map((field) => (
              <>
                {field.type === FieldType.Input && (
                  <>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor={field.name}
                        className={`${
                          currentMode == "Dark"
                            ? "text-slate-100"
                            : "text-gray-900"
                        } block  text-sm  leading-6 font-semibold`}>
                        {field.label}{" "}
                        {field.required && (
                          <span className="text-red-500">* </span>
                        )}
                        {errors[field.name] && (
                          <span className="text-red-500 text-sm font-semibold">
                            {errors[field.name]}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                        value={formValues[field.name] as string}
                        onChange={handleChange}
                      />
                    </div>
                    {/* This is used to add same input type if addMore is set to true */}

                    {field.addMore && (
                      <button
                        type="button"
                        onClick={() => handleAddMore(field.name)}
                        className="rounded-md mt-4 dark:text-white px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                        style={{ background: currentColor }}>
                        Add more
                      </button>
                    )}
                    {additionalInputs[field.name] &&
                      additionalInputs[field.name].map((value, index) => (
                        <div key={index} className="sm:col-span-3">
                          <label
                            htmlFor={field.name}
                            className={`${
                              currentMode == "Dark"
                                ? "text-slate-100"
                                : "text-gray-900"
                            } block  text-sm  leading-6 font-semibold`}>
                            Additional {field.name}&nbsp;
                            {index + 1} &nbsp;
                            {field.required && (
                              <span className="text-red-500">*</span>
                            )}
                          </label>
                          <input
                            type="text"
                            id={`${field.name}_additional_${index}`}
                            name={`${field.name}_additional_${index}`}
                            className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            value={value}
                            required={field.required}
                            onChange={handleAdditionalInputChange(
                              field.name,
                              index
                            )}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteAdditionalInput(field.name, index)
                            }
                            className="rounded-md mt-2 px-3 py-1.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-red-500">
                            Delete
                          </button>
                        </div>
                      ))}
                  </>
                )}
                {field.type === FieldType.TextArea && (
                  <div className="col-span-full">
                    <label
                      htmlFor={field.name}
                      className={`${
                        currentMode == "Dark"
                          ? "text-slate-100"
                          : "text-gray-900"
                      } block  text-sm  leading-6 font-semibold`}>
                      {field.name}{" "}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                    </label>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={formValues[field.name] as string}
                      onChange={handleChange}
                      rows={3}
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                      //required={field.required}
                    />
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm font-semibold">
                        {errors[field.name]}
                      </span>
                    )}
                  </div>
                )}
                {field.type === FieldType.RichText && (
                  <div className="col-span-full">
                    <label
                      htmlFor={field.name}
                      className={`${
                        currentMode == "Dark"
                          ? "text-slate-100"
                          : "text-gray-900"
                      } block  text-sm  leading-6 font-semibold`}>
                      {field.name}{" "}
                      {field.required && (
                        <span className="text-red-500">* </span>
                      )}
                      {errors[field.name] && (
                        <span className="text-red-500 text-sm font-semibold">
                          {errors[field.name]}
                        </span>
                      )}
                    </label>

                    <RichTextEditorComponent
                      id={field.name}
                      name={field.name}
                      className="form-control"
                      height={350}
                      showCharCount={true}
                      //maxLength={100}
                      placeholder={"Type something"}
                      toolbarSettings={
                        field?.toolbarSettings as IToolbarSettings
                      }
                      value={formValues[field.name] as string}
                      // Use the custom event listener for handling Richtext changes
                      change={handleRichtextChange(field.name)}>
                      <Inject
                        services={[
                          Toolbar,
                          Image,
                          Link,
                          Count,
                          HtmlEditor,
                          QuickToolbar,
                        ]}
                      />
                    </RichTextEditorComponent>
                  </div>
                )}

                {field.type === FieldType.Select && (
                  <div className="sm:col-span-3">
                    <label
                      htmlFor={field.name}
                      className={`${
                        currentMode == "Dark"
                          ? "text-slate-100"
                          : "text-gray-900"
                      } block  text-sm  leading-6 font-semibold`}>
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">* </span>
                      )}
                      {errors[field.name] && (
                        <span className="text-red-500 text-sm font-semibold">
                          {errors[field.name]}
                        </span>
                      )}
                    </label>
                    <select
                      id={field.name}
                      name={field.name}
                      autoComplete={field.name}
                      onChange={handleChange}
                      className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6">
                      {field.options?.map((option) => {
                        const selectValue =
                          option.value == "Select one option"
                            ? ""
                            : option.value;
                        return (
                          <option
                            key={option.id}
                            value={selectValue}
                            selected={formValues[field.name] === option.value}>
                            {option.value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                {field.type === FieldType.Radio && (
                  <div className="space-y-2 sm:col-span-3">
                    <legend
                      className={`${
                        currentMode == "Dark"
                          ? "text-slate-100"
                          : "text-gray-900"
                      } block  text-sm  leading-6 font-semibold`}>
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">* </span>
                      )}
                      {errors[field.name] && (
                        <span className="text-red-500 text-sm">
                          {errors[field.name]}
                        </span>
                      )}
                    </legend>
                    {field.options?.map((option) => (
                      <div
                        className="flex items-center gap-x-3"
                        key={option.id}>
                        <input
                          id={`${field.name}_${option.id}`}
                          name={field.name} // Set the name attribute to the field name
                          value={option.value}
                          checked={formValues[field.name] === option.value} // Check if this option is the currently selected one
                          onChange={handleChange}
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 "
                          // required={field.required}
                        />
                        <label
                          key={option.value}
                          htmlFor={`${field.name}_${option.id}`} // Add htmlFor attribute to associate label with input
                          className={`block text-sm font-medium leading-6 ${
                            currentMode == "Dark"
                              ? "text-slate-100"
                              : "text-gray-900"
                          }`}>
                          {option.value}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {field.type === FieldType.Checkbox && (
                  <div
                    className={`${
                      currentMode == "Dark" ? "text-slate-100" : "text-gray-900"
                    } space-y-2 sm:col-span-3`}>
                    <legend
                      className={` block  text-sm  leading-6 font-semibold`}>
                      {field.label}{" "}
                      {field.required && (
                        <span className="text-red-500">* </span>
                      )}
                      {errors[field.name] && (
                        <span className="text-red-500 text-sm">
                          {errors[field.name]}
                        </span>
                      )}
                    </legend>
                    {field.options?.map((option, index) => (
                      <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                          <div className={`flex items-center`}>
                            <input
                              id={`${field.name}_${option.id}`} // Use a unique identifier for each checkbox
                              name={field.name} // Set the name attribute to the field name
                              value={option.value}
                              checked={(
                                formValues[field.name] as string[]
                              ).includes(option.value as string)} // Check if the option value is present in the array of selected values
                              onChange={handleChange}
                              type="checkbox"
                              className="h-4 w-4 border-gray-300 text-indigo-600"
                              //      required={field.required}
                            />
                            <label
                              htmlFor={`${field.name}_${option.id}`} // Add htmlFor attribute to associate label with input
                              className={`ml-2 ${
                                currentMode == "Dark"
                                  ? "text-slate-100"
                                  : "text-gray-900"
                              }`}>
                              {option.value}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {/* <button
          type="button"
          className="text-sm font-semibold dark:text-white leading-6 text-gray-900">
          Cancel
        </button> */}
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md dark:text-white  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            style={{ background: currentColor }}>
            Save
          </button>
        </div>
      </form>
      {gpt3OptionSelected && (
        <Gpt3Modal
          setGpt3OptionSelected={setGpt3OptionSelected}
          handleChange={handleChange}
          resetSelectField={(fieldName) => {
            //console.log("Before reset:", formValues); // Log the current values before resetting
            setFormValues((prevValues) => {
              const updatedValues = {
                ...prevValues,
                [fieldName]: "", // Reset the selected option for the specified field
              };
              //console.log("Updated values:", updatedValues); // Log the values after updating
              return updatedValues; // Return the updated values
            });
          }}
        />
      )}
    </>
  );
};

export default DynamicForm;
