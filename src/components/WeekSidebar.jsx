import moment from "moment";
import React from "react";

const WeekSidebar = ({ forcastInfo }) => {
  return (
    <div className="text-xl text-gray-500 md:w-[600px] py-4 font-medium pl-4 lg:pl-10 space-y-10 pt-7">
      <p className="text-xl text-black font-medium">Week Forecast</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:flex lg:flex-col gap-x-20">
        {forcastInfo &&
          forcastInfo.length > 0 &&
          forcastInfo.slice(1).map((days, index) => (
            <div className="text-sm font-normal flex items-center justify-between">
              <div className="flex flex-col items-start space-y-1">
                <p className="text-black ">
                  {index === 0
                    ? "Tomorrow"
                    : moment(days.date).format("dddd")}
                </p>
                <p className="text-black/[0.3] text-xs ">
                  {moment(days.date).format("LL")}
                </p>
              </div>
              <div>
                <p className="text-black font-medium">
                  {days.day.avgtemp_c}&deg;
                </p>
              </div>
              <div className="w-16">
                <img src={days.day.condition.icon} alt="" srcset="" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WeekSidebar;
