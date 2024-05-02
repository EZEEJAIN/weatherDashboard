import React from "react";

const Details = ({ color, detail, detailName, unit, image }) => {
  return (
    <div
      className={`box-content ${color} flex justify-between items-center space-x-4 rounded-md p-5 w-auto`}
    >
      <div className="flex-col flex justify-start items-start space-y-2 text-start">
        <p className="text-black font-medium text-base md:text-xl text-start">{detailName}</p>
        <p className="text-gray-400/[0.6] text-xs md:text-sm">
          Today <span className="lowercase whitespace-nowrap text-start"> {detail}</span>
        </p>
        <p className="text-gray-700 font-medium text-sm md:text-md">{unit}</p>
      </div>
      <div className=" text-3xl md:text-6xl text-blue-200/[0.8]">{image}</div>
    </div>
  );
};

export default Details;
