import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import {
  IAvatarStacked,
  IBrands,
  IHeaderProps,
  INavLinks,
  ITabDescription,
} from "@/interfaces/IConstants/IConstants";
import {
  IToolbarSettings,
  ToolbarType,
} from "@syncfusion/ej2-react-richtexteditor";

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
  h1_header_text: ` Embark on a Health Odyssey: Unlock Personalized Coverage with Our Innovative Quote Generator`,
  p_header_text: `  Discover tailored health coverage with our advanced quote platform.  Tailor your coverage with ease, as our advanced system offers you a personalized journey through three distinct health insurance products. Embrace the security of comprehensive care, where your health is the priority. Get ready to experience a new era in insurance – where quotes are not just numbers, but gateways to a healthier and more protected life.`,
  img: new URL("@/assets/images/nurse.jpg", import.meta.url).href,
  avatarStackedData: avatarStackedData,
  button: {
    styles: "",
    text: "Get Quote",
  },
};

//Navlinks Data
export const navLinksData: INavLinks = {
  text: ["Home", "Dashboard", "Open AI", "Case Studies", "Library"],
  nav_auth: {
    text: "Sign in",
    button: [
      {
        styles: "",
        text: "Sign in",
      },
      {
        styles: "",
        text: "Sign out",
      },
    ],
  },
  icontype: {
    close: RiCloseLine,
    menu: RiMenu3Line,
  },
};

export const brandData: IBrands = {
  img: [
    new URL("@/assets/icons/c.png", import.meta.url).href,
    new URL("@/assets/icons/csharp.png", import.meta.url).href,
    new URL("@/assets/icons/cpp.png", import.meta.url).href,
    new URL("@/assets/icons/html.png", import.meta.url).href,
    new URL("@/assets/icons/java.png", import.meta.url).href,
    new URL("@/assets/icons/js3.png", import.meta.url).href,
    new URL("@/assets/icons/php.png", import.meta.url).href,
    new URL("@/assets/icons/python.png", import.meta.url).href,
    new URL("@/assets/icons/sql.png", import.meta.url).href,
    new URL("@/assets/icons/os.jpeg", import.meta.url).href,
  ],
};

export const dashboardSidebar = {
  img: new URL("@/assets/images/3d_villian_prev.png", import.meta.url).href,
};

export const iconLevelUp = {
  img: new URL("@/assets/icons/level_up.png", import.meta.url).href,
};

export const TabNavs: ITabDescription[] = [
  { id: 1, name: "inprogress", content: "in progress" },
  { id: 2, name: "upcoming", content: "upcoming" },
  { id: 3, name: "completed", content: "completed" },
];

export const Gpt3TabNavs: ITabDescription[] = [
  { id: 1, name: "prompt request", content: "prompt request" },
  { id: 2, name: "completed", content: "completed" },
];

export const toolbarSettings1: IToolbarSettings = {
  items: [
    "Bold",
    "Italic",
    "Underline",
    "StrikeThrough",
    "FontName",
    "FontSize",
    "FontColor",
    "BackgroundColor",
    "LowerCase",
    "UpperCase",
    "|",
    "Formats",
    "Alignments",
    "OrderedList",
    "UnorderedList",
    "Outdent",
    "Indent",
    "|",
    "CreateLink",
    "Image",
    "|",
    "ClearFormat",
    "Print",
    "SourceCode",
    "FullScreen",
    "|",
    "Undo",
    "Redo",
  ],
  type: ToolbarType.Expand,
};

export const toolbarSettings2: IToolbarSettings = {
  items: [
    "Bold",
    "Italic",
    "Underline",
    "OrderedList",
    "FullScreen",
    "|",
    "Undo",
    "Redo",
  ],
  type: ToolbarType.Expand,
};

export const links = [
  {
    name: "Health Insurance",
    submenu: true,
    sublinks: [
      {
        Head: "HealthInsurance",
        sublink: [
          { name: "Individual Health", link: "/dashboard/home" },
          { name: "Company Health", link: "/dashboard/questions" },
          { name: "Family Health", link: "/dashboard" },
        ],
      },
    ],
  },
  // {
  //   name: "Women",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "Topwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Bottomwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "innerwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "sleepwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "footwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: "Kid's",
  //   submenu: true,
  //   sublinks: [
  //     {
  //       Head: "Topwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "Bottomwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "innerwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },

  //     {
  //       Head: "sleepwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //     {
  //       Head: "footwear",
  //       sublink: [
  //         { name: "T-shirt", link: "/" },
  //         { name: "Casual shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //         { name: "formal shirts", link: "/" },
  //       ],
  //     },
  //   ],
  // },
];
