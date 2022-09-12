"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Article = ({ image, title, paragraph, date }) => {
    return (<react_router_dom_1.Link to="/" className="news w-full md:w-1/2 flex flex-col py-4 px-3">
      <img src={image} className="opacity-100 block max-h-[220px] max-w-full h-auto mx-auto" alt={title}/>
      <h1 className="text-[#0088cc] mt-3 mb-1 px-4 font-bold leading-[160%]">
        {title}
      </h1>
      <p className="text-[#333] leading-[160%] px-4 text-sm">{paragraph}</p>
      <span className="mt-1 px-4 text-sm text-[#888]">{date}</span>
    </react_router_dom_1.Link>);
};
exports.default = Article;
