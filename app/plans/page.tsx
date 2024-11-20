'use client';

import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { Trip } from "@/types";
import { IoAddCircleOutline } from "react-icons/io5";
import TripCard from "@/components/Cards/TripCard";
import { useEffect, useState } from "react";
import { isPastTrip } from "@/utils";

const Plans = () => {
  const router = useRouter();
  const [trips, setTrips] = useState([]); 

  const handleBackClick = () => {
    router.push('/');
  };

  useEffect(() => {
    const storedTrips = sessionStorage.getItem('trips');
    setTrips(JSON.parse(storedTrips || '[]'));
  }, []);

  const handleTripClick = (trip: Trip) => {
    router.push('/plans/' + trip.id)
  }

  const activeTrips = () => trips.filter(trip => !isPastTrip(trip));
  const pastTrips = () => trips.filter(isPastTrip);
  

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-full flex items-center py-5">
            <button onClick={handleBackClick}>
                <IoIosArrowBack size={64}/>
            </button>
            <span className="text-4xl">Plans</span>
        </div>

        <div className=" w-full px-6 flex flex-col items-center justify-center gap-5">
            {activeTrips().map((trip:Trip, index:number) => 
              <TripCard key={index} trip={trip} onClick={handleTripClick} hasActivity={false} enableButton={true}/>)}
        </div>
        <div className=" my-5 flex items-center gap-2 text-3xl" onClick={() => {router.push('/plans/new')}}>
            <IoAddCircleOutline size={40}/> 
            <span>Create New</span>
        </div>
        <div className="px-6 w-full mt-6 flex flex-col items-center justify-center">
            <div className="w-full">
                <div className=" border-b-8 border-dotted border-gray-500 w-full my-4 px-8"></div>
            </div>
            <div className=" w-full flex justify-start items-start">
                <span className=" text-2xl">Past Trips</span>
            </div>
            <div className=" w-full py-5 flex flex-col items-center justify-center gap-5">
                {pastTrips().map((trip:Trip, index:number) => 
                  <TripCard key={index} trip={trip} onClick={handleTripClick} hasActivity={false} enableButton={false} />)}
            </div>
        </div>
    </div>
  );
};

export default Plans;
