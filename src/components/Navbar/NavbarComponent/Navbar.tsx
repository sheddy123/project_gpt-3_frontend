import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../../assets/images/logo.svg";
import "./Navbar.css";
import Button from "../../Common/Button/Button";
import { navLinksData } from "../../../utils/constants";
import { trimAndConvertToLowerCase } from "../../../utils/helpers";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { text, nav_auth, icontype } = navLinksData;

  const menuItems = text.map((item, index) => (
    <p key={`${index + item}`}>
      <a href={`#${trimAndConvertToLowerCase(item)}`}>{item}</a>
    </p>
  ));

  const auth_Items = (
    <>
      <p>{nav_auth.text}</p>
      <Button
        styles={`${nav_auth.button.styles}`}
        text={`${nav_auth.button.text}`}
      />
    </>
  );

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} />
        </div>
        <div className="gpt3__navbar-links_container">{menuItems}</div>
      </div>
      <div className="gpt3__navbar-sign">{auth_Items}</div>
      <div className="gpt3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">{menuItems}</div>
            <div className="gpt3__navbar-menu_container-links-sign">
              {auth_Items}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
