"use client"

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { usePathname, useRouter } from 'next/navigation';
import { IoAddCircleOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Activity, Trip } from "@/types";
import TripCard from "@/components/Cards/TripCard";
import { activityInTrip, getActivityIndex, isPastTrip } from "@/utils";
import activities from '@/data/activities.json'

const Page = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [trips, setTrips] = useState<Trip[]>([]);

  const activeTrips = () => trips.filter(trip => !isPastTrip(trip));
  const activityId = Number(pathname.split('/')[2]);
  const activityIndex = getActivityIndex(activityId)

  const handleBackClick = () => {
    router.back()
  }

  useEffect(() => {
    const storedTrips = sessionStorage.getItem('trips');
    setTrips(JSON.parse(storedTrips || '[]'));
  }, []);

  const handleTripClick = (trip:Trip) => {
    const storedTrips = JSON.parse(sessionStorage.getItem('trips') || '[]') as Trip[];
    const index = storedTrips.findIndex(t => t.id === trip.id);

    if(index != -1){
        storedTrips.splice(index, 1);
        if(!activityInTrip(trip, activityId)){
            trip.activities.push(activities.at(activityIndex) as Activity)
            sessionStorage.setItem('trips', JSON.stringify([...storedTrips, trip]))
            router.push('/');
        }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-full flex items-center py-5">
            <button onClick={handleBackClick}>
                <IoIosArrowBack size={64}/>
            </button>
            <span className="text-4xl">Choose a plan</span>
        </div>

        <div className=" w-full p-10 flex flex-col items-center justify-center gap-5">
            {activeTrips().map((trip:Trip, index:number) => 
                <TripCard 
                  key={index} 
                  trip={trip} 
                  onClick={handleTripClick} 
                  hasActivity={activityInTrip(trip, activityId)}
                  enableButton={false}
                />)}
        </div>
        <div className="flex items-center gap-2 text-3xl">
            <Link href='/plans/new' className="flex items-center gap-2 text-3xl">
                <IoAddCircleOutline size={40}/> 
            </Link>
            <span>Create New</span>
        </div>
    </div>
  )
}

export default Page