// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { AiOutlineMenu } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { BsChatLeft } from "react-icons/bs";
import { RiNotification3Line } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Cart, Chat, Notification, UserProfile } from "..";
import { useStateContext } from "@/utils/Helpers/ContextProvider";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { links } from "./data/dummy";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    handleClick,
    isClicked,
    setScreenSize,
    screenSize,
  } = useStateContext();
  const store = useSelector((store) => store?.authReducer);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);
  const activeLink = `pb-2 px-2 border-b-4 border-[${currentColor}] font-semibold`;
  const normalLink = "pb-2 px-2 text-gray-500 font-semibold ";

  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      />
      <div className="hidden md:flex items-center space-x-1">
        {links.map((item, index) => (
          <div key={item.title + index} className="flex items-center">
            {item.links
              .filter(
                (link) => link.role === store?.auth_response.roles?.[0].roleName
              )
              .map((link, linkIndex) => (
                <div
                  key={link.name + linkIndex}
                  onMouseEnter={() => handleDropdownToggle(linkIndex)}
                  onMouseLeave={() => handleDropdownToggle(linkIndex)}>
                  <NavLink
                    to={`/dashboard/${link.linkName}`}
                    style={({ isActive }) => ({
                      color: isActive ? currentColor : "",
                      borderColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }>
                    <span className="capitalize">{link.name}</span>
                    {link?.children && (
                      <div
                        className={`${
                          openDropdown === linkIndex ? "block" : "hidden"
                        } absolute z-10 bg-white shadow-lg`}>
                        {link?.children.map((child, childIndex) => (
                          <NavLink
                            to={`/dashboard/${child}`}
                            key={child + childIndex}
                            className="block px-4 py-2 text-gray-800 top-8  hover:bg-gray-100">
                            {child}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </NavLink>
                </div>
              ))}
          </div>
        ))}
      </div>
      {/* <div className="hidden md:flex items-center space-x-1">
        {links.map((item, index) => (
          <div key={`${item}${index}`}>
            {item.links
              .filter(
                (link) => link.role === store?.auth_response.roles?.[0].roleName
              )
              .map((link) => (
                <>
                  <NavLink
                    to={`/dashboard/${link.linkName}`}
                    key={`${item} ${link.name}${index}`}
                    style={({ isActive }) => ({
                      color: isActive ? currentColor : "",
                      borderColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onMouseEnter={() => handleDropdownToggle(index)}
                    onMouseLeave={() => handleDropdownToggle(index)}>
                    <span
                      key={`${item} ${link}${index}`}
                      className="capitalize ">
                      {link.name}
                    </span>
                  </NavLink>
                </>
              ))}    
          </div>
        ))}
      </div> */}
      <div className="flex">
        {/* <NavButton
          title="Cart"
          customFunc={() => handleClick("cart")}
          color={currentColor}
          icon={<FiShoppingCart />}
        />
        <NavButton
          title="Chat"
          dotColor="#03C9D7"
          customFunc={() => handleClick("chat")}
          color={currentColor}
          icon={<BsChatLeft />}
        /> */}
        <NavButton
          title="Notification"
          dotColor="rgb(254, 201, 15)"
          customFunc={() => handleClick("notification")}
          color={currentColor}
          icon={<RiNotification3Line />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick("userProfile")}>
            <img
              className="rounded-full w-8 h-8"
              src={store?.auth_response.image_url}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{" "}
              <span className="text-gray-400 font-bold ml-1 text-14">
                {store?.auth_response.user_name}
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
