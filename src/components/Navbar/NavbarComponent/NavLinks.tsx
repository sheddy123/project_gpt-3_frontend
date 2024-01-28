import  { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "@/utils/Constants/ComponentsConstants/constants";
import { ChevronDown, ChevronUp } from "@/components/Common/Icons/Icons";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group text-white"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");
                setSubHeading("");
              }}
            >
              {link.name}
              <span className="text-xl md:hidden inline">
              {heading === link.name ? <ChevronUp />  : <ChevronDown />}
               
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
              <ChevronDown />
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute top-20 hidden group-hover:md:block hover:md:block">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 left-3 absolute 
                     bg-sky-100 rotate-45"
                    ></div>
                  </div>
                  <div className=" bg-sky-100 p-5 grid grid-cols-3 mt-[-5px] gap-10 w-[227px] rounded-sm shadow">
                    {link.sublinks.map((mysublinks) => (
                      <div>
                        {/* <h1 className="text-lg font-semibold ">
                          {mysublinks.Head}
                        </h1> */}
                        {mysublinks.sublink.map((slink) => (
                            <ul className="list-none">
                          <li className=" text-[16px] text-gray-600 my-2.5 w-[227px]">
                            <Link
                              to={slink.link}
                              className="hover:text-primary font-poppins "
                            >
                              {slink.name}
                            </Link>
                          </li>
                          </ul>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks) => (
              <div>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center md:pr-0 pr-5 text-white"
                  >
                    {slinks.Head}

                    <span className="text-xl md:mt-1 md:ml-2 inline">
                    {subHeading === slinks.Head
                            ? <ChevronUp />  : <ChevronDown />}
                      
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink) => (
                      <li className="py-3 pl-14 text-white">
                        <Link to={slink.link}>{slink.name}</Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;