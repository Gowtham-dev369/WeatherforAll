import { useEffect, useState } from "react"
import type { weather, forcast } from "./Types/type" // Type Import

// components import 
import WheatherReport from "./Components/WheatherReport";
import ForcastReport from "./Components/ForcastReport";


export default function App() {
  const [currentlocation, setcurrentLocation] = useState(''); // Current Location
  const [location, setLocation] = useState(''); // User Imput Location
  const [weatherData, setWeatherData] = useState<weather | undefined>(); // Sotre Weather Data
  const [ForcastData, setForcastData] = useState<forcast | undefined>(); // Store Forcast Data
  const [wtoggel, setWtoggle] = useState(true);
  const [ftoggel, setFtoggle] = useState(false);
  const api = import.meta.env.VITE_APIKEY;
  // const api = 'gGfcbjAyRu0lE66hq3z6LupJ6axNeumO';
  const options = { method: 'GET', headers: { accept: 'application/json' } };

  //Geting User Data By their IP and get date for current location
  useEffect(() => {
    let locationData;
    const locdata = async () => {
      const data = await fetch(`https://ipapi.co/json`).then(res => res.json()).catch(err => console.log(err));
      locationData = await data.city;
      setcurrentLocation(locationData);
      CurrentWeaterReport(locationData);
      CurrentForcast(locationData);
    }
    locdata();
  }, [])


  // getting current report has one argument
  const CurrentWeaterReport = (loc: string) => {
    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${loc}&apikey=${api}`, options).then(res => res.json()).then(res => setWeatherData(res)).catch(err => console.log(err))
  }
  // getting current report has one argument
  const CurrentForcast = (loc: string) => {
    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${loc}&apikey=${api}`, options).then(res => res.json()).then(res => setForcastData(res)).catch(err => console.log(err))
  }

  // getting report on Search
  const WeaterReport = () => {
    fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${api}`, options).then(res => res.json()).then(res => setWeatherData(res)).catch(err => console.log(err))
  }
  const Forcast = () => {
    fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&apikey=${api}`, options).then(res => res.json()).then(res => setForcastData(res)).catch(err => console.log(err)),
      console.log(ForcastData)
  }
  const getData = () => {
    WeaterReport();
    Forcast();
    setcurrentLocation(location)
    setLocation("")
  }


  return (
    <>
      <div className="">

        {/* SearchBar  */}
        <form className="max-w-md mx-auto pt-5" onSubmit={(e)=> e.preventDefault()}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" value={location} onChange={(e) => setLocation(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Bangalore.. etc" />
            <button onClick={getData} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>


        <h1 className="text-center py-10">Current City : <b>{currentlocation}</b></h1>

        {/* Toggle Button */}
        <div className="flex justify-center items-center my-10 ">
          <div className="inline-flex rounded-md shadow-sm justify-center items-center" role="group">
            <button type="button" onClick={() => { setWtoggle(true), setFtoggle(false) }} className="px-8 py-3 text-xl font-medium text-white bg-blue-700  rounded-s-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-2   dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
              Weather
            </button>
            <button type="button" onClick={() => { setWtoggle(false), setFtoggle(true) }} className="px-8 py-3 text-xl font-medium text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 hover:text-white focus:z-10 focus:ring-2   dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
              Forcast
            </button>
          </div>
        </div>

        {/* weatherData */}
        {
          wtoggel &&
          <WheatherReport weatherdata={weatherData as weather} />
        }
        {/* Forcast  */}
        {ftoggel &&
          <ForcastReport forcastdata={ForcastData as forcast} />
        }
      </div>
    </>
  )
}

