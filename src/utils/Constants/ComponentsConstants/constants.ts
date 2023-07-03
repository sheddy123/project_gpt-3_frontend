import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import {
  IAvatarStacked,
  IBrands,
  IHeaderProps,
  INavLinks,
} from "@/interfaces/IConstants/IConstants";

//Avatar
export const avatarStackedData: IAvatarStacked[] = [
  {
    img: new URL("@/assets/images/portrait/portrait1.png", import.meta.url)
      .href,
  },
  {
    img: new URL("@/assets/images/portrait/portrait2.jpg", import.meta.url)
      .href,
  },
  {
    img: new URL("@/assets/images/portrait/portrait3.jpg", import.meta.url)
      .href,
  },
  {
    img: new URL("@/assets/images/portrait/portrait4.jpeg", import.meta.url)
      .href,
  },
  {
    img: new URL("@/assets/images/portrait/portrait5.jpeg", import.meta.url)
      .href,
  },
];

//Header Data
export const headerData: IHeaderProps = {
  h1_header_text: ` Embark on a Journey: Assess Coding Proficiency Like Never Before with
    GPT-3 Hybrid Program Test Generation`,
  p_header_text: `  Harness AI power for transformative coding proficiency assessment. Our
    groundbreaking GPT-3-based hybrid program test generation offers
    unparalleled insights into coding skills and capabilities.`,
  img: new URL("@/assets/images/ai-coding.png", import.meta.url).href,
  avatarStackedData: avatarStackedData,
  button: {
    styles: "",
    text: "Get Started",
  },
};

//Navlinks Data
export const navLinksData: INavLinks = {
  text: ["Home", "What is GPT3?", "Open AI", "Case Studies", "Library"],
  nav_auth: {
    text: "Sign in",
    button: {
      styles: "",
      text: "Sign up",
    },
  },
  icontype: {
    close: RiCloseLine,
    menu: RiMenu3Line,
  },
};


export const brandData : IBrands = {
    img: [
        new URL("@/assets/icons/c.png", import.meta.url).href,
        new URL("@/assets/icons/cpp.png", import.meta.url).href,
        new URL("@/assets/icons/html.png", import.meta.url).href,
        new URL("@/assets/icons/java.png", import.meta.url).href,
        new URL("@/assets/icons/js3.png", import.meta.url).href,
        new URL("@/assets/icons/php.png", import.meta.url).href,
        new URL("@/assets/icons/python.png", import.meta.url).href,
        new URL("@/assets/icons/sql.png", import.meta.url).href,
    ]
}