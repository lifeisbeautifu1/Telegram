"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Feature = ({ image, title, paragraph }) => {
    return (<div className="w-full md:w-1/2 lg:w-[33.3%] px-4">
      <div className="max-w-[260px] pt-5 pb-2 mx-auto">
        <img src={image} alt={title} decoding="async" className="max-w-[256px] w-40 mx-auto"/>
        {/* <video
          className="max-w-[256px] w-40 mx-auto"
          src={duck}
          autoPlay
          loop
          muted
        ></video> */}
        <h1 className="text-[#0088cc] text-center mt-4 mb-1.5 text-[26px] tracking-[-1px]">
          {title}
        </h1>
        <p className="font-[15px] text-center leading-[160%]">
          <b>Telegram</b> {paragraph}
        </p>
      </div>
    </div>);
};
exports.default = Feature;
