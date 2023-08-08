import NavLinks from "./NavLinks";
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
  const [open, setOpen] = useState(false);
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
    if (auth_message !== "Successfully logged in.") {
      const checkCookie = async () => {
        try {
          await cookiePresent();
        } catch (error) {
          console.error(error);
        }
      };

      checkCookie();
    }
  }, []);

  const auth_Items = (
    <>
      {/* <p>{nav_auth.text}</p> */}
      {auth_message === "Successfully logged in." ||
      auth_message === "Valid client request" ? (
        <Button
          styles={`${nav_auth.button[1].styles} md:block hidden`}
          text={`${nav_auth.button[1].text}`}
          onClick={logUserOut}
        />
      ) : (
        <Button
          styles={`${nav_auth.button[0].styles} md:block hidden`}
          text={`${nav_auth.button[0].text}`}
          onClick={() => dispatch(openModal(undefined))}
        />
      )}
    </>
  );

  return (
    <>
      <div className="gpt3__navbar">
        <div className="gpt3__navbar-links z-[500]">
          <div className="gpt3__navbar-links_logo">
            <img src={logo} />
          </div>
          <div className="gpt3__navbar-links_container">
            <Link to="/" className="py-7 px-3 inline-block text-white">
              Home
            </Link>
            <NavLinks />
          </div>
        </div>
        <div className="gpt3__navbar-sign">{auth_Items}</div>
        <ul
          className={`
        md:hidden bg-[#020F0F] fixed w-full top-0 overflow-y-auto bottom-0 z-[200] py-24 pl-4
        duration-500  ${open ? "left-0" : "left-[-100%]"}
        `}>
          <li>
            <Link to="/" className="py-7 px-3 inline-block text-white">
              Home
            </Link>
          </li>
          <NavLinks />
          <div className="py-5">
            <button className="bg-primary text-white  px-6 py-2 rounded-full">
              Get Started
            </button>
          </div>
        </ul>
        <div
          className="text-3xl md:hidden z-[500]"
          onClick={() => setOpen(!open)}>
          {open ? (
            <RiCloseLine color="#fff" size={27} />
          ) : (
            <RiMenu3Line color="#fff" size={27} />
          )}
        </div>
        {/* <div className="gpt3__navbar-menu">
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
      </div> */}
      </div>
    </>
  );
};

export default Navbar;
