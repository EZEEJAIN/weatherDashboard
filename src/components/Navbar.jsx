import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { CgNotifications } from "react-icons/cg";

const Navbar = ({
  showPopular,
  setShowPopular,
  locationName,
  setLocationName,
  handleSearch,
  cities,
}) => {
  const popularCities = [
    {
      id: 511,
      name: "Ahmedabad",
      slug: "ahmedabad",
      isPopular: true,
      pincode: 380001,
    },
    {
      id: 672,
      name: "Gurgaon",
      slug: "gurgaon",
      isPopular: true,
      pincode: 122001,
    },
    {
      id: 7,
      name: "Hyderabad",
      slug: "hyderabad",
      isPopular: true,
      pincode: 500001,
    },
    {
      id: 2374,
      name: "Kolkata",
      slug: "kolkata",
      isPopular: true,
      pincode: 700001,
    },
    {
      id: 2136,
      name: "Lucknow",
      slug: "lucknow",
      isPopular: true,
      pincode: 226001,
    },
    {
      id: 1300,
      name: "Mumbai",
      slug: "mumbai",
      isPopular: true,
      pincode: 400001,
    },
    {
      id: 1318,
      name: "Navi Mumbai",
      slug: "navi-mumbai",
      isPopular: true,
      pincode: 400701,
    },
    {
      id: 2485,
      name: "New Delhi",
      slug: "new-delhi",
      isPopular: true,
      pincode: 110001,
    },
    { id: 1304, name: "Pune", slug: "pune", isPopular: true, pincode: 410301 },
    {
      id: 1848,
      name: "Abu Road",
      slug: "abu-road",
      isPopular: false,
      pincode: 307026,
    },
  ];

  return (
    <div className="md:flex justify-between md:space-x-10 items-center w-full h-20 md:pr-10 relative">
      <div className="text-gray-600 font-bold text-xl mb-2 md:mb-0 md:text-3xl cursor-pointer duration-300 text-start">
        <p>Dashboard</p>
      </div>
      <div className="flex justify-start items-center md:space-x-10">
        <div className="flex justify-start items-center space-x-4">
          <div className="box-content border border-gray-200/[0.7] flex justify-start items-center space-x-4 rounded-md py-2 px-3 w-80">
            <RiSearchLine className="text-lg text-gray-500 duration-300" />
            <input
              type="text"
              placeholder="Search by city..."
              className="text-sm text-black placeholder:text-gray-400 outline-none bg-transparent w-auto flex-1"
              value={locationName}
              onFocus={() => {
                setShowPopular(true);
                setLocationName("");
              }}
              onChange={(e) => {
                setLocationName(e.target.value)
              }}    
              onKeyPress={handleSearch}
            />
          </div>
          {showPopular && (
            <div className="z-50 absolute top-[85px] md:top-16 md:w-[39%] w-3/4 max-h-56 overflow-scroll no-scrollbar">
              {locationName.length > 0
                ? cities.map((city, index) => (
                    <p
                      className="px-3 py-2 bg-white hover:cursor-pointer hover:bg-gray-100 duration-300 text-sm "
                      onClick={() => {
                        setShowPopular(false);
                        setLocationName(city.name);
                      }}
                    >
                      {city.name}- {city.pincode}
                    </p>
                  ))
                : popularCities.map((city, index) => (
                    <p
                      className="p-3 bg-white hover:cursor-pointer hover:bg-gray-100 duration-300 text-sm "
                      onClick={() => {
                        setShowPopular(false);
                        setLocationName(city.name);
                      }}
                    >
                      {city.name}- {city.pincode}
                    </p>
                  ))}
            </div>
          )}
        </div>
        <div className="hidden md:flex justify-start items-center space-x-2 md:space-x-5">
          <CgNotifications className="text-2xl text-gray-700 cursor-pointer duration-300" />
          <div class="flex -space-x-1 overflow-hidden cursor-pointer duration-300">
            <img
              className="inline-block h-7 w-7 rounded-full"
              src="/Ellipse1.svg"
              alt=""
              width={5}
              height={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
