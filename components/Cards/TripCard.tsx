'use client';

import { PastTrip, Trip } from "@/types";

type Props = {
    trip: Trip | PastTrip;
    key: number;
}

function isPastTrip(trip: Trip | PastTrip): trip is PastTrip {
    return 'year' in trip;
  }

const TripCard = ({trip} : Props) => {

  const handleDetailClick = () => {
    alert("🤓")
  }

  const handleAddActivitiesClick = () => {
    alert("😎")
  }

  return (
  <div className=" bg-soft-lavender w-full flex flex-col justify-start items-center px-4 py-3 border-2 border-black rounded-3xl gap-2">
    <div className=" w-full px-4 flex justify-start items-start">
        <span className="text-3xl">Trip to {trip.destination}</span>
    </div>
    <div className=" w-full px-4 flex justify-start items-start">
        <span className="text-2xl">{trip.start_date} - {trip.end_date} {isPastTrip(trip) && `, ${trip.year}`} </span>
    </div>
    {!isPastTrip(trip) &&      
        <div className=" text-xl py-2 flex items-center justify-around gap-10">
            <button onClick={handleDetailClick} className="border-2 border-black px-2">Details</button>
            <button onClick={handleAddActivitiesClick} className="border-2 border-black px-2">Add Activities</button>
        </div>
    }
  </div>
  ); 
}


export default TripCard