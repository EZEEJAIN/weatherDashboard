import React, { useEffect, useState } from "react";
import WeekSidebar from "../components/WeekSidebar";
import Navbar from "../components/Navbar";
import Details from "../components/Details";
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import TempCard from "../components/TempCard";
import { GiAirZigzag, GiHeavyRain } from "react-icons/gi";
import axios from "axios";
import { TbUvIndex } from "react-icons/tb";
import { FaCloud } from "react-icons/fa";

const Dashboard = () => {
  const TempCardItems = [
    {
      incolor: "bg-blue-50/[1.5]",
      color: "bg-blue-300/[0.4]",
      detail: "Wind Speed",
      detailName: "Wind",
      unit: "12 KMPH",
      image: <LuWind />,
    },
  ];

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [currentWeatherInfo, setCurrentWeatherInfo] = useState(null);
  const [forcastInfo, setForcastInfo] = useState(null);
  const [cities, setCities] = useState(null);

  const getCurrentWeatherInfo = async (query) => {
    const API_KEY = "5837bc5f14854f34b4875101240105";
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${query}&days=10&aqi=yes&alerts=yes`
      );
      setCurrentWeatherInfo(response.data.current);
      setForcastInfo(response.data.forecast.forecastday);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            const getCityByLatLong = async () => {
              const API_KEY = "pk.914389d197eb0df52bec3f533e0c5953";
              try {
                const response = await axios.get(
                  `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
                );
                setLocationName(response.data.address.city_district);
                return response.data.address.city_district;
              } catch (error) {
                setError(error.message);
              }
            };

            getCityByLatLong()
              .then((data) => {
                getCurrentWeatherInfo(data);
              })
              .catch((error) => {
                console.log("error", error);
              });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();

    // Clean up event listeners on unmount
    return () => {
      setLocation(null);
      setError(null);
    };
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      getCurrentWeatherInfo(locationName.split("-")[0]);
    }
  };

  useEffect(() => {
    const getCitiesByQuery = async (query) => {
      try {
        const response = await axios.get(
          `https://apis.91trucks.com/v1/city/search?q=${query}&langCode=en`
        );
        setCities(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getCitiesByQuery(locationName);
  }, [locationName]);

  const [showPopular, setShowPopular] = useState(false);

  useEffect(() => {
    if (locationName.length > 0 && !showPopular)
      getCurrentWeatherInfo(locationName.split("-")[0]);
  }, [locationName]);

  let detailItems = [
    {
      color: "bg-blue-200/[0.2]",
      detail: "Wind Speed",
      detailName: "Wind",
      unit: `${currentWeatherInfo?.wind_kph} KMPH`,
      image: <LuWind />,
    },
    {
      color: "bg-blue-200/[0.2]",
      detail: "Humidity",
      detailName: "Humidity",
      unit: `${currentWeatherInfo?.humidity}%`,
      image: <WiHumidity />,
    },
    {
      color: "bg-blue-200/[0.2]",
      detail: "Precipitation",
      detailName: "Precipitation",
      unit: `${currentWeatherInfo?.precip_in}%`,
      image:<GiHeavyRain />
    },
    {
      color: "bg-blue-200/[0.2]",
      detail: "pressure",
      detailName: "Air pressure",
      unit: `${currentWeatherInfo?.pressure_in} in`,
      image: <GiAirZigzag/>
    },
    {
      color: "bg-blue-200/[0.2]",
      detail: "cloud",
      detailName: "Cloud",
      unit: `${currentWeatherInfo?.cloud}%`,
      image: <FaCloud/>,
    },
    {
      color: "bg-blue-200/[0.2]",
      detail: "uv",
      detailName: "UV index",
      unit: `${currentWeatherInfo?.uv}%`,
      image:<TbUvIndex />
    },
  ];

  return (
    <div className="lg:flex justify-start items-start px-3 lg:px-10 py-2 w-full">
      <div className="flex-col justify-start items-start space-y-3 lg:border-r lg:w-[75%] xl:w-full">
        <Navbar
          showPopular={showPopular}
          setShowPopular={setShowPopular}
          locationName={locationName}
          setLocationName={setLocationName}
          handleSearch={handleSearch}
          cities={cities}
        />
        {TempCardItems.map((elem, index) => (
          <TempCard
            key={index}
            showPopular={showPopular}
            color={elem.color}
            incolor={elem.incolor}
            locationName={locationName}
            lastUpdated={currentWeatherInfo?.last_updated}
            currentTemprature={currentWeatherInfo?.temp_c}
            weatherCondition={currentWeatherInfo?.condition?.text}
            airPressure={currentWeatherInfo?.pressure_mb}
            humidity={currentWeatherInfo?.humidity}
            windSpeed={currentWeatherInfo?.wind_kph}
            dayTemprature={
              forcastInfo && forcastInfo[0]?.hour.length > 0
                ? [
                    forcastInfo[0]?.hour[7]?.temp_c,
                    forcastInfo[0]?.hour[12]?.temp_c,
                    forcastInfo[0]?.hour[18]?.temp_c,
                    forcastInfo[0]?.hour[21]?.temp_c,
                  ]
                : []
            }
          />
        ))}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-y-5 gap-x-5 pt-5 lg:pr-10">
          {detailItems.map((elem, index) => (
            <Details
              key={index}
              color={elem.color}
              detail={elem.detail}
              detailName={elem.detailName}
              unit={elem.unit}
              image={elem.image}
            />
          ))}
        </div>
      </div>
      <WeekSidebar forcastInfo={forcastInfo} />
    </div>
  );
};

export default Dashboard;
