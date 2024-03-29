import type { forcast } from "../Types/type"
function formateDate(date: string) {
  const currentDate = new Date(date)
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  // Determine AM or PM
  const meridiem = currentHours >= 12 ? 'PM' : 'AM';
  // Convert to 12-hour format
  const formattedHours = currentHours % 12 || 12;
  // Formatting time components to ensure they have leading zeros if necessary
  const formattedMinutes = currentMinutes < 10 ? '0' + currentMinutes : currentMinutes;
  // Constructing the current time string in 12-hour format
  const currentTimeString = `${formattedHours}:${formattedMinutes} ${meridiem}`;
  return currentTimeString;
}
export default function ForcastReport({ forcastdata }: { forcastdata: forcast }) {
  return (
    <>
      {forcastdata?.timelines &&
        <div>

          <h1 className="text-center text-6xl my-10">Forcast</h1>
          <div className="text-center flex justify-center">

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 px-5 justify-items-">

              {/* format time */}
              {forcastdata?.timelines && forcastdata?.timelines.minutely.map(data => {
                const time = formateDate(data.time);
                return (
                  <a href="#" key={data.time.toString()} className=" px-24 md:px-5 lg:px-10 xl- text-center block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{time}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Temperature : {data.values.temperature}&deg; C</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Humudity : {data.values.humidity}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Wind-Speed{data.values.windSpeed} km/h</p>
                  </a>
                )
              }
              )}

            </div>

          </div>
        </div>
      }
      {/* Error output */}
      {forcastdata?.message &&
        <div role="alert">
          <div className="mx-5 my-10 border border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p className="font-bold">{forcastdata?.type} </p>
            <h1>{forcastdata?.message}</h1>
          </div>
        </div>
      }

    </>
  )
}
