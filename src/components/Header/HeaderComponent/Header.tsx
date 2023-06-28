import "./Header.css";
import Button from "../../Common/Button/Button";
import Avatar from "../../Common/AvatarStacked/Avatar";
import { headerData } from "../../../utils/Constants/ComponentsConstants/constants";
import Login from "../../Login/LoginComponent/Login";

const Header = () => {
  const {h1_header_text, p_header_text, img, avatarStackedData, button } = headerData;
  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">
         {h1_header_text}
        </h1>
        <p>
        {p_header_text}
        </p>

        <div className="gpt3__header-content__input">
          {/* <input type="email" placeholder="Your Email Address" /> */}
          <Button styles={`${button.styles}`} text={`${button.text}`} />
          <Login />
        </div>
        <Avatar AvatarStacked={avatarStackedData} />
      </div>

      <div className="gpt3__header-image">
        <img src={img} />
      </div>
    </div>
  );
};

export default Header;
