import "./Header.css";
import Avatar from "../../Common/AvatarStacked/Avatar";
import { headerData } from "../../../utils/Constants/ComponentsConstants/constants";
import Button from "../../Common/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../redux/features/modal/modalSlice";
import Modal from "../../Common/Modal/Modal";

const Header = () => {
  const dispatch = useDispatch();
  const modalReducer = useSelector((state) => state.modalReducer);
  const modal = modalReducer.isOpen && <Modal />;

  const { h1_header_text, p_header_text, img, avatarStackedData, button } =
    headerData;
  return (
    <>
      {modal}
      <div className="gpt3__header section__padding" id="home">
        <div className="gpt3__header-content">
          <h1 className="gradient__text">{h1_header_text}</h1>
          <p>{p_header_text}</p>

          <div className="gpt3__header-content__input">
            <Button
              onClick={() => dispatch(openModal(undefined))}
              styles={`${button.styles}`}
              text={`${button.text}`}
            />
            {/* <input type="email" placeholder="Your Email Address" /> */}
          </div>
          <Avatar AvatarStacked={avatarStackedData} />
        </div>

        <div className="gpt3__header-image">
          <img src={img} />
        </div>
      </div>
    </>
  );
};

export default Header;
