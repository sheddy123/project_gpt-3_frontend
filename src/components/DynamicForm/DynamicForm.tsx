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
} from "@syncfusion/ej2-react-richtexteditor";
import { FormValidator } from "@syncfusion/ej2-react-inputs";
const DynamicForm: React.FC<DynamicFormProps> = ({ formFields, onSubmit }) => {
  const { currentColor } = useStateContext();
  const [formValues, setFormValues] = useState<{
    [key: string]: string | boolean;
  }>(
    formFields.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>(
    formFields.fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleRichtextChange = (name: string) => (args: any) => {
    const value = args.value; // Get the HTML content of the RichTextEditor

    console.log("value is", args, name);
    // setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
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
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    console.log("Type is " + type);
    if (type === "checkbox") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      //console.log("Name is ", name, " value is ", value,"Form values are ", JSON.stringify(formValues))
      setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    }

    // Clear the error message when the user starts typing in the field
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
                    className="block dark:text-white text-sm font-medium leading-6 text-gray-900">
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
                    required={field.required}
                  />
                </div>
              )}
              {field.type === FieldType.TextArea && (
                <div className="col-span-full">
                  <label
                    htmlFor={field.name}
                    className="block text-sm dark:text-white font-medium leading-6 text-gray-900">
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
                    required={field.required}
                  />
                </div>
              )}
              {field.type === FieldType.RichText && (
                <div className="col-span-full">
                  <label
                    htmlFor={field.name}
                    className="block text-sm dark:text-white font-medium leading-6 text-gray-900">
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <RichTextEditorComponent
                    id={field.name}
                    name={field.name}
                    className="form-control"
                    height={200}
                    showCharCount={true}
                    maxLength={100}
                    placeholder={"Type something"}
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
                    className="block text-sm dark:text-white font-medium leading-6 text-gray-900">
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <select
                    id={field.name}
                    name={field.name}
                    autoComplete={field.name}
                    onChange={handleChange}
                    className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6">
                    <option value="">Select an option</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {field.type === FieldType.Radio && (
                <div className="mt-6 space-y-2">
                  <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </legend>
                  {field.options?.map((option) => (
                    <div className="flex items-center gap-x-3">
                      <input
                        id={field.name}
                        name={field.name}
                        value={option}
                        checked={formValues[field.name] === option}
                        onChange={handleChange}
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 "
                        required={field.required}
                      />
                      <label
                        key={option}
                        className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              {field.type === FieldType.Checkbox && (
                <div className="mt-6 space-y-6">
                  <legend className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                    {field.name}{" "}
                    {field.required && <span className="text-red-500">*</span>}
                  </legend>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        id={field.name}
                        name={field.name}
                        checked={formValues[field.name] as boolean}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                      />
                      <label htmlFor={field.name} className="ml-2">
                        {field.label}
                      </label>
                    </div>
                  </div>
                </div>
              )}
              {errors[field.name] && (
                <span className="text-red-500">{errors[field.name]}</span>
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
