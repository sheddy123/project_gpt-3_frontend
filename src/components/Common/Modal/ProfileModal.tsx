import { IProfileModal } from "@/interfaces/ProfileModal/IProfileModal";
import { useState } from "react";
import Button from "../Button/Button";
import { closeModal, openConfetti } from "@/redux/features/modal/modalSlice";
import { useDispatch } from "react-redux";

const ProfileModal = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState<IProfileModal>({
    yearsOfExperience: "",
    level: "",
    programmingSkills: [],
    profileSummary: "",
  });

  const [errors, setErrors] = useState<IProfileModal>({
    yearsOfExperience: "",
    level: "",
    programmingSkills: "",
    profileSummary: "",
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
    const { programmingSkills } = inputs;
    let updatedSkills: string[];

    if (checked) {
      updatedSkills = [...programmingSkills, name];
    } else {
      updatedSkills = programmingSkills.filter((skill) => skill !== name);
    }

    return updatedSkills;
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    let isValid = true;
    const newErrors: IProfileModal = {
      yearsOfExperience: "",
      level: "",
      programmingSkills: "",
      profileSummary: "",
    };

    if (!inputs.yearsOfExperience) {
      newErrors.yearsOfExperience = "Years of experience is required";
      isValid = false;
    }

    if (!inputs.level) {
      newErrors.level = "Level is required";
      isValid = false;
    }

    if (inputs.programmingSkills.length === 0) {
      newErrors.programmingSkills =
        "At least one programming skill is required";
      isValid = false;
    }

    if (!inputs.profileSummary) {
      newErrors.profileSummary = "Profile summary is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      // Proceed with form submission if all validations pass
      // Handle form submission logic here
      console.log("Submit button clicked", JSON.stringify(inputs));
      dispatch(closeModal(undefined));
      dispatch(openConfetti(undefined));
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
                  htmlFor="yearsOfExperience">
                  Years of programming experience
                </label>
                <div className="flex justify-center">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio"
                      name="yearsOfExperience"
                      value="1-3"
                      checked={inputs.yearsOfExperience === "1-3"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">1-3 years</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="yearsOfExperience"
                      value="3-5"
                      checked={inputs.yearsOfExperience === "3-5"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">3-5 years</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      className="form-radio"
                      name="yearsOfExperience"
                      value="5-above"
                      checked={inputs.yearsOfExperience === "5-above"}
                      onChange={handleChange}
                    />
                    <span className="ml-2">5 years above</span>
                  </label>
                </div>
                {errors.yearsOfExperience && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.yearsOfExperience}
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
                  htmlFor="programmingSkills">
                  Programming skills
                </label>
                <div className="flex">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programmingSkills"
                      value="java"
                      checked={inputs.programmingSkills.includes("java")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Java</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programmingSkills"
                      value="c++"
                      checked={inputs.programmingSkills.includes("c++")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">C++</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programmingSkills"
                      value="python"
                      checked={inputs.programmingSkills.includes("python")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">Python</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programmingSkills"
                      value="php"
                      checked={inputs.programmingSkills.includes("php")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">PHP</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programmingSkills"
                      value="javascript"
                      checked={inputs.programmingSkills.includes("javascript")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">JavaScript</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="programmingSkills"
                      value="c#"
                      checked={inputs.programmingSkills.includes("c#")}
                      onChange={handleChange}
                    />
                    <span className="ml-2">C#</span>
                  </label>
                </div>
                {errors.programmingSkills && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.programmingSkills}
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
                  name="profileSummary"
                  value={inputs.profileSummary}
                  onChange={handleChange}></textarea>
                {errors.profileSummary && (
                  <p className="text-red-500 text-xs italic">
                    * {errors.profileSummary}
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
