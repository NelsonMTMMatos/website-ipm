'use client';

import { Trip } from "@/types";
import { formatDateToShortString, getTripYear, isPastTrip } from "@/utils";

type Props = {
    trip: Trip;
    key: number;
    onClick: (trip:Trip) => void;
    hasActivity: boolean;
}

const TripCard = ({trip, onClick, hasActivity} : Props) => {
  return (
  <div className={`${hasActivity ? 'text-gray-500' : 'text-black'} bg-mist-blue w-full flex flex-col justify-start items-center px-4 py-3 border-2 border-black rounded-3xl gap-2`}
       onClick={() => {if(!isPastTrip(trip)) onClick(trip)}}>
    <div className=" w-full px-4 flex justify-start items-start">
        <span className="text-3xl">Trip to {trip.destination}</span>
    </div>
    <div className=" w-full px-4 flex justify-start items-start">
        <span className="text-xl">
          {`${formatDateToShortString(trip.start_date)} - ${formatDateToShortString(trip.end_date)} ${`, ${getTripYear(trip)}`}`}
        </span>
    </div>
  </div>
  ); 
}


export default TripCard