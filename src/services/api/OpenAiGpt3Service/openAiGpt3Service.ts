// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Questions_Url } from "@/utils/Constants/ApiConstants/api_constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const createHybridGpt3Service = createAsyncThunk(
  "users/openai/createHybridGpt3Service",
  async (prop: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_HYBRID_GPT3_SECRET_ID}`,
    };
    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .post(import.meta.env.VITE_OPEN_AI_URL, prop, {
              //withCredentials: true,
              signal,
              headers,
            })
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Questions generated successfully",
          error: (err) =>
            err?.response?.data?.msg ?? "Server is down, please try again",
        }
      );
      
      //   const response = await axios.post(
      //     import.meta.env.VITE_OPEN_AI_URL,
      //     prop,
      //     {
      //       //withCredentials: true,
      //       signal,
      //       headers,
      //     }
      //   );
      console.log("Response received from server ", response.data);
      return response.data;
      //   return {
      //     warning:
      //       "This model version is deprecated. Migrate before January 4, 2024 to avoid disruption of service. Learn more https://platform.openai.com/docs/deprecations",
      //     id: "cmpl-7pyZGoXx3O2ZckFbfUG6VcFJCEKik",
      //     object: "text_completion",
      //     created: 1692621906,
      //     model: "text-davinci-003",
      //     choices: [
      //       {
      //         //text: '\n[QUESTION]\nQuestion 1 (Medium difficulty): Explain the purpose of the keyword "public" in C++.\n\nCorrect Answer: public is a keyword in C++ that is used to specify that a class member is accessible outside the class.\n\nFeedback: Correct! The keyword public is used to specify that a class member should be accessible even outside its own class. This means that a public class member can be used by other classes and objects. \n\nQuestion 2 (Difficult difficulty): Compare and contrast the usage of classes and structures in C++.\n\nCorrect Answer: Classes and structures in C++ have some similarities, such as both classes and structures can contain data members and member functions. However, they differ in other aspects, such as only classes can have base classes, while structures have no base classes. In addition, a structure can have only public members, while a class can have both public and private members.\n\nFeedback: Correct!',
      //         text: "\n[QUESTION (MEDIUM)]\nQuestion 1: How do you declare a constant in C++?\na) constant = value;\nb) const var = value;\nc) const = value;\nd) const type var = value;\n\nCorrect Answer: d) const type var = value;\n\nFeedback: Correct! In C++, you declare a constant by using the keyword 'const' followed by the data type of the variable, the variable name and its initial value.",
      //         index: 0,
      //         logprobs: null,
      //         finish_reason: "length",
      //       },
      //     ],
      //     usage: {
      //       prompt_tokens: 229,
      //       completion_tokens: 200,
      //       total_tokens: 429,
      //     },
      //   };
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);

export const postHybridGpt3Service = createAsyncThunk(
  "users/openai/postHybridGpt3Service",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .post(
              `${Questions_Url}${
                import.meta.env.VITE_CREATE_QUESTION_GPT3_URL
              }`,
              props,
              {
                withCredentials: true,
                signal,
              }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Questions saved successfully",
          error: (err) =>
            err?.response?.data?.msg ?? "Server is down, please try again",
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Server is down, please try again");
    } finally {
      controller.abort();
    }
  }
);
