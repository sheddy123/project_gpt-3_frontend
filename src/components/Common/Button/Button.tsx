import { IButtonProps } from "@/interfaces/IConstants/IConstants";

const Button: React.FC<IButtonProps> = ({
  styles,
  text,
  onClick,
  backgroundColor,
}) => {
  return (
    <>
      <button
        type="button"
        className={`text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br  font-medium rounded-none text-sm px-5 py-2.5 text-center ${styles} cursor-pointer`}
        onClick={onClick}
        style={{ background: backgroundColor }}>
        {text}
      </button>
    </>
  );
};

Button.defaultProps = {
  backgroundColor: "", // Set a default value for filterText if not provided
};
export default Button;
