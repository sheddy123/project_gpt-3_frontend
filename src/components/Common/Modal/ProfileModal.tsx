import { IProfileModal } from "@/interfaces/ProfileModal/IProfileModal";
import { useState } from "react";
import Button from "../Button/Button";
import { closeModal, openConfetti } from "@/redux/features/modal/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { createProfileService } from "@/services/api/ProfileService/profileService";
import { unwrapResult } from "@reduxjs/toolkit";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);

  const [inputs, setInputs] = useState<IProfileModal>({
    years_of_experience: "",
    level: "",
    programming_skills: [],
    profile_summary: "",
    user_id: "",
  });

  const [errors, setErrors] = useState<IProfileModal>({
    years_of_experience: "",
    level: "",
    programming_skills: "",
    profile_summary: "",
    user_id: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      const checkbox = event.target as HTMLInputElement;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: handleCheckboxChange(value, checkbox.checked),
      }));
    } else {
      const input = event.target as HTMLInputElement | HTMLTextAreaElement;
      setInputs((prevInputs) => ({
        ...prevInputs,
        [name]: input.value,
      }));
    }

    // Clear error message when input changes
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    const { programming_skills } = inputs;
    let updatedSkills: string[];

    if (checked) {
      updatedSkills = [...programming_skills, name];
    } else {
      updatedSkills = programming_skills.filter((skill) => skill !== name);
    }

    return updatedSkills;
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    let isValid = true;
    const newErrors: IProfileModal = {
      years_of_experience: "",
      level: "",
      programming_skills: "",
      profile_summary: "",
      user_id: "",
    };

    if (!inputs.years_of_experience) {
      newErrors.years_of_experience = "Years of experience is required";
      isValid = false;
    }

    if (!inputs.level) {
      newErrors.level = "Level is required";
      isValid = false;
    }

    if (inputs.programming_skills.length === 0) {
      newErrors.programming_skills =
        "At least one programming skill is required";
      isValid = false;
    }

    if (!inputs.profile_summary) {
      newErrors.profile_summary = "Profile summary is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Proceed with form submission if all validations pass
      // Handle form submission logic here
      inputs.user_id = store?.authReducer?.auth_response.user_name;
      inputs.programming_skills = JSON.stringify(inputs.programming_skills);
      dispatch(createProfileService(inputs) as any)
        .then(unwrapResult)
        .then((result) => {
          //
          dispatch(closeModal(undefined));
          dispatch(openConfetti(undefined));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <aside className="modal-container ">
      <div
        className="modal animate__animated animate__fadeInDown"
        style={{ maxWidth: "778px" }}>
        <div className="header"></div>
        <div className="content">
          <form className="w-full max-w-lg mx-auto">
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3 justify-center">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="years_of_experience">
                  Years of programming experience
                </label>
                <div className="flex justify-center">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="years_of_experience"
                      value="1-3"
                      checked={inputs.years_of_experience === "1-3"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">1-3 years</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="years_of_experience"
                      value="3-5"
                      checked={inputs.years_of_experience === "3-5"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">3-5 years</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="years_of_experience"
                      value="5-above"
                      checked={inputs.years_of_experience === "5-above"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">5 years above</span>
                  </label>
                </div>
                {errors.years_of_experience && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.years_of_experience}
                  </p>
                )}
              </div>
              <div className="w-full px-3 mt-10 justify-center">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="level">
                  Level
                </label>
                <div className="flex justify-center">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="level"
                      value="beginner"
                      checked={inputs.level === "beginner"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Beginner</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="level"
                      value="intermediate"
                      checked={inputs.level === "intermediate"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Intermediate</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="level"
                      value="expert"
                      checked={inputs.level === "expert"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Expert</span>
                  </label>
                </div>
                {errors.level && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.level}
                  </p>
                )}
              </div>
              <div className="w-full px-3 mt-10 justify-center">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="programming_skills">
                  Programming skills
                </label>
                <div className="flex">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programming_skills"
                      value="java"
                      checked={inputs.programming_skills.includes("java")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Java</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programming_skills"
                      value="c++"
                      checked={inputs.programming_skills.includes("c++")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">C++</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programming_skills"
                      value="python"
                      checked={inputs.programming_skills.includes("python")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Python</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programming_skills"
                      value="php"
                      checked={inputs.programming_skills.includes("php")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">PHP</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programming_skills"
                      value="javascript"
                      checked={inputs.programming_skills.includes("javascript")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">JavaScript</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programming_skills"
                      value="c#"
                      checked={inputs.programming_skills.includes("c#")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">C#</span>
                  </label>
                </div>
                {errors.programming_skills && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.programming_skills}
                  </p>
                )}
              </div>

              <div className="w-full px-3 mt-10 justify-center">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="profile-summary">
                  Profile summary
                </label>
                <textarea
                  className="bg-gray-200 appearance-none border-2 h-40 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-600"
                  id="profile-summary"
                  name="profile_summary"
                  value={inputs.profile_summary}
                  onChange={handleChange}></textarea>
                {errors.profile_summary && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.profile_summary}
                  </p>
                )}
              </div>
              <div className="w-full px-3 mt-4">
                <Button
                  styles="w-[242px]"
                  text="Submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </aside>
  );
};

export default ProfileModal;
