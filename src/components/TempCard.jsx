import moment from "moment";
import React from "react";
import { GrLocation } from "react-icons/gr";
import { LuWind } from "react-icons/lu";
import { MdOutlineWaterDrop } from "react-icons/md";
import { WiWindy } from "react-icons/wi";
import { TbTemperature } from "react-icons/tb";

const TempCard = ({
  showPopular,
  incolor,
  color,
  locationName,
  lastUpdated,
  currentTemprature,
  weatherCondition,
  airPressure,
  humidity,
  windSpeed,
  dayTemprature,
}) => {
 
  const time = ["Morning", "Afternoon", "Evening", "Night"];
  return (
    <div
      className={`box-content ${color} md:flex justify-between items-center md:space-x-5 xl:space-x-10 rounded-md px-7 py-5 lg:mr-10 space-y-5 md:space-y-0`}
    >
      <div className="flex-col justify-start items-center space-y-5">
        <div className="flex justify-between items-center w-full space-x-10 md:space-x-24 lg:space-x-6">
          <div div className="flex justify-center items-center space-x-3 text-blue-900/[0.8]">
            <GrLocation className="text-xl" />
            <p className="text-xl font-semibold whitespace-nowrap">
              {locationName && !showPopular ? locationName : "Loading..."}
            </p>
          </div>
          <div className="flex justify-center items-center space-x-3 text-blue-900/[0.8] whitespace-nowrap text-sm sm:text-base">
            <p>Last Updated {moment(lastUpdated).format("LTS")}</p>
          </div>
        </div>
        <div className="flex-col flex justify-start items-center">
          <p className="text-[80px] text-blue-900/[0.8] font-semibold">
            {currentTemprature}
            <sup>
              <span className="text-4xl font-normal"> &deg;C</span>
            </sup>
          </p>
          <p className="text-blue-900/[0.8] font-normal -ml-9">
            {weatherCondition}
          </p>
        </div>
        <div className="flex justify-between items-center text-blue-900/[0.8] font-medium">
          <div className="flex justify-start items-center space-x-3">
            <WiWindy className="text-4xl" />
            <p>{airPressure} hpa</p>
          </div>
          <div className="flex justify-start items-center space-x-3">
            <MdOutlineWaterDrop className="text-xl" />
            <p>{humidity} %</p>
          </div>
          <div className="flex justify-start items-center space-x-3">
            <LuWind className="text-xl" />
            <p>{windSpeed} KMPH</p>
          </div>
        </div>
      </div>
      <div
        className={`box-content ${incolor} flex-col flex justify-start items-start space-y-7 rounded-md p-7 h-48 md:w-[35%] overflow-scroll no-scrollbar`}
      >
        <div>
          <p className="text-blue-900/[0.8] font-medium text-xl tracking-wider">
            Temperature
          </p>
        </div>
        <div>
          <TbTemperature className="text-4xl text-blue-900/[0.8] mt-7" />
        </div>
        <div className="flex justify-start items-start">
          <div className="flex justify-between items-center space-x-5 lg:space-x-10 w-full ">
            {time.map((elem, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-xs text-blue-900 font-normal space-y-2"
              >
                <p className="tracking-wider">{elem}</p>
                <p className="font-medium">{dayTemprature[index]}&deg;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
