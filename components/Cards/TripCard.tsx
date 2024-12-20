'use client';

import { Trip } from "@/types";
import { formatDateToShortString, getTripYear, isPastTrip } from "@/utils";
import Link from "next/link";

type Props = {
    trip: Trip;
    key: number;
    onClick: (trip:Trip) => void;
    hasActivity: boolean;
    enableButton: boolean;
}

const TripCard = ({trip, onClick, hasActivity, enableButton} : Props) => {
  return (
  <div className={`${hasActivity ? 'text-gray-500' : 'text-black'} bg-[rgb(236,236,240)] w-full flex flex-col 
                    justify-start items-center px-4 py-3 border-2 border-black rounded-3xl gap-2`}
                    onClick={() => {if(!isPastTrip(trip) && !enableButton) onClick(trip)}}>
    <div className=" w-full px-4 flex justify-start items-start">
        <span className="text-3xl">Trip to {trip.destination}</span>
    </div>
    <div className=" w-full px-4 flex justify-start items-start">
        <span className="text-xl">
          {`${formatDateToShortString(trip.start_date)} - ${formatDateToShortString(trip.end_date)} ${`, ${getTripYear(trip)}`}`}
        </span>
    </div>
    {enableButton &&
      <div className=" w-full flex items-center justify-around text-white">
        <button className=" bg-deep-blue rounded-2xl px-3 py-1" onClick={() => {onClick(trip)}}>Trip Schedule</button>
        <Link href={'/'} className="bg-deep-blue rounded-2xl px-3 py-1">Add Activities</Link>
      </div> 
    }
  </div>
  ); 
}


export default TripCard