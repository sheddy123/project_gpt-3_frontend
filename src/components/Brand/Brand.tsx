import React from "react";
import { google, slack, atlassian, dropbox, shopify } from "./imports";
import "./Brand.css";
import { brandData } from "../../utils/constants";

const Brand = () => (
  <div className="gpt3__brand ">
    {brandData.img.map((img, index) => (
      <div className="div__brand__img" key={img + index}>
        <img src={img} />
      </div>
    ))}
  </div>
);

export default Brand;
