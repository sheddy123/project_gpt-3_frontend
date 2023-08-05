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

const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, onSubmit }) => {
  const { currentColor } = useStateContext();
  // const [formValues, setFormValues] = useState<{
  //   [key: string]: string | boolean;
  // }>(
  //   formFields.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  // );
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
    
    // if (type === "checkbox") {
    //   console.log("target is ", e.target);
    //   setFormValues((prevValues) => ({
    //     ...prevValues,
    //     [name]: (e.target as HTMLInputElement).checked,
    //   }));
    // }
    setFormValues((prevValues) => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = formFields.fields.filter((field) => field.required);

    let fieldErrors = {};
    for (const field of requiredFields) {
      const value = formValues[field.name];

      // Check for missing values based on the field type
      if (
        (field.type === FieldType.Input || field.type === FieldType.RichText) &&
        !value
      ) {
        fieldErrors[field.name] = "Field is required";
      } else if (
        field.type === FieldType.Select &&
        (value === "" || value === undefined)
      ) {
        fieldErrors[field.name] = "Please select an option";
      } else if (
        field.type === FieldType.Radio &&
        (value === "" || value === undefined)
      ) {
        fieldErrors[field.name] = "Please select an option";
      } else if (
        field.type === FieldType.Checkbox &&
        (!Array.isArray(value) || value.length === 0)
      ) {
        fieldErrors[field.name] = "Please select at least one option";
      }
    }

    // Set the field errors
    setErrors(fieldErrors);
    // If there are any errors, stop the submission
    if (Object.keys(fieldErrors).length > 0) {
      return;
    }
    // Proceed with the submission if there are no errors
    onSubmit(formValues);
  };

  return (
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
                <div className="sm:col-span-3">
                  <label
                    htmlFor={field.name}
                    className="block dark:text-white text-sm  leading-6 font-semibold text-gray-900">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    id={field.name}
                    name={field.name}
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    value={formValues[field.name] as string}
                    onChange={handleChange}
                    //  required={field.required}
                  />
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm font-semibold">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              )}
              {field.type === FieldType.TextArea && (
                <div className="col-span-full">
                  <label
                    htmlFor={field.name}
                    className="block text-sm dark:text-white font-semibold leading-6 text-gray-900">
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
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
                    className="block text-sm dark:text-white font-semibold leading-6 text-gray-900">
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <RichTextEditorComponent
                    id={field.name}
                    name={field.name}
                    className="form-control"
                    height={350}
                    showCharCount={true}
                    maxLength={100}
                    placeholder={"Type something"}
                    toolbarSettings={field?.toolbarSettings as IToolbarSettings}
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
                  {errors[field.name] && (
                    <span className="text-red-500 text-sm font-semibold">
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              )}
              {field.type === FieldType.Select && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor={field.name}
                    className="block text-sm dark:text-white font-semibold leading-6 text-gray-900">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
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
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {field.type === FieldType.Radio && (
                <div className="space-y-2 sm:col-span-3">
                  <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                    {errors[field.name] && (
                      <span className="text-red-500 text-sm">
                        {errors[field.name]}
                      </span>
                    )}
                  </legend>
                  {field.options?.map((option) => (
                    <div className="flex items-center gap-x-3" key={option.id}>
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
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        {option.value}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {field.type === FieldType.Checkbox && (
                <div className="space-y-2 sm:col-span-3">
                  <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {field.label}{" "}
                    {field.required && <span className="text-red-500">*</span>}
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
                            className="ml-2">
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
        <button
          type="button"
          className="text-sm font-semibold dark:text-white leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md dark:text-white  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          style={{ background: currentColor }}>
          Save
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
