import type { weather } from "../Types/type"
function GetDate(input: string) {

  // Creating a new Date object using the UTC timestamp string
  const date = new Date(input);
  // Define an array of month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get the month index from the date object
  const monthIndex = date.getUTCMonth();

  // Retrieve the month name using the month index
  const monthName = monthNames[monthIndex];

  // Get the day of the month
  const dayOfMonth = date.getUTCDate();

  // Construct the formatted date string
  const formattedDateString = `${monthName} ${dayOfMonth}`;

  return (formattedDateString)
}



export default function WheatherReport({ weatherdata }: { weatherdata: weather }) {
  return (
    <>
      {
        weatherdata?.data && <div className="">

          <h1 className="text-center text-6xl my-10">Today weather</h1>

          <div className="flex flex-col items-center p-8 rounded-md w-[300] sm:px-12 dark:bg-gray-50 dark:text-gray-800">
            <div className="text-center">
              <h2 className="text-xl font-semibold">{weatherdata?.location.name}</h2>
              <p className="text-sm dark:text-gray-600">{GetDate(weatherdata?.data.time)}</p>
            </div>
            <div className="mb-2 text-3xl font-semibold">{weatherdata?.data.values.temperature}°
            </div>
            <p className="dark:text-gray-600">Humidity : {weatherdata.data.values.humidity}</p>
            <p className="dark:text-gray-600">Visibility : {weatherdata.data.values.visibility}</p>

          </div>
        </div>
      }
      {/* Error output */}
      {
        weatherdata?.message &&

        <div role="alert">
          <div className="mx-5 border  border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p className="font-bold">{weatherdata?.type}</p>
            <h1> {weatherdata?.message}</h1>
          </div>
        </div>
      }
    </>

  )
}
