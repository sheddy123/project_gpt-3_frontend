import { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "@/assets/images/logo.svg";
import "./Navbar.css";
import { trimAndConvertToLowerCase } from "@/utils/Helpers/helpers";
import Button from "@/components/Common/Button/Button";
import { navLinksData } from "@/utils/Constants/ComponentsConstants/constants";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/redux/features/modal/modalSlice";
import useLogout from "@/utils/Hooks/useLogout";
import { useEffect } from "react";
import useCookiePresent from "@/utils/Hooks/useCookiePresent";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { text, nav_auth, icontype } = navLinksData;
  const logout = useLogout();
  const cookiePresent = useCookiePresent();
  const dispatch = useDispatch();
  const auth_message = useSelector((store) => store?.authReducer?.message);

  const menuItems = text.map((item, index) => (
    <p key={`${index + item}`}>
      <Link to={`${trimAndConvertToLowerCase(item)}`}>{item}</Link>
    </p>
  ));

  const logUserOut = async () => {
    await logout();
  };

  useEffect(() => {
    
    
    const checkCookie = async () => {
      try {
        await cookiePresent();
      } catch (error) {
        console.error(error);
      }
    };
  
    checkCookie();
  }, []);

  const auth_Items = (
    <>
      {/* <p>{nav_auth.text}</p> */}
      {auth_message === "Successfully logged in." || auth_message === "Valid client request" ? (
        <Button
          styles={`${nav_auth.button[1].styles}`}
          text={`${nav_auth.button[1].text}`}
          onClick={logUserOut}
        />
      ) : (
        <Button
          styles={`${nav_auth.button[0].styles}`}
          text={`${nav_auth.button[0].text}`}
          onClick={() => dispatch(openModal(undefined))}
        />
      )}
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
