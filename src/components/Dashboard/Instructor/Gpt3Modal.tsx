import { MdClose } from "react-icons/md";
const Gpt3Modal = ({
  setGpt3OptionSelected,
  resetSelectField,
  handleChange,
}) => {
  const handleResetAndClose = () => {
    //resetSelectField("Question_Type"); // Reset the selected option for the specified field
    handleChange({
      target: { name: "Question_Type", value: "Select one option" },
    });
    setGpt3OptionSelected(false);
  };

  return (
    <aside className="modal-container ">
      <div className="card_review text-center">
        <div className=" float-right">
          <button
            type="button"
            className="close-icon hover:drop-shadow-xl bg-light-gray hover:dark:bg-light-gray mt-[9px] mr-[-5px] dark:bg-slate-700"
            style={{ borderRadius: "50%" }}
            onClick={handleResetAndClose}>
            <MdClose />
          </button>
        </div>
        <div>This is for GPT-3</div>
      </div>
    </aside>
  );
};

export default Gpt3Modal;
