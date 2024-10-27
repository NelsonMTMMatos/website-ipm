'use client';

import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import trips from '../../data/trips.json'
import { PastTrip, Trip } from "@/types";
import TripCard from "@/components/Cards/TripCard";
import { IoAddCircleOutline } from "react-icons/io5";
import pastTrips from '../../data/pastTrips.json'

const Plans = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const handleNewPlan = () => {
  };

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="w-full flex items-center py-5">
            <button onClick={handleBackClick}>
                <IoIosArrowBack size={64}/>
            </button>
            <span className="text-4xl">Plans</span>
        </div>

        <div className=" w-full p-10 flex flex-col items-center justify-center gap-5">
            {trips.map((trip:Trip, index:number) => <TripCard key={index} trip={trip}/>)}
        </div>
        <div className="flex items-center gap-2 text-3xl">
            <Link href='/' className="flex items-center gap-2 text-3xl">
                <IoAddCircleOutline size={40}/> 
            </Link>
            <span>Create New</span>
        </div>
        <div className=" w-full mt-14 flex flex-col items-center justify-center">
            <div className=" w-full px-4">
                <div className=" border-b-8 border-dotted border-gray-500 w-full my-4 px-8"></div>
            </div>
            <div className=" w-full px-4 flex justify-start items-start">
                <span className=" text-2xl">Past Trips</span>
            </div>
            <div className=" w-full py-5 px-4 flex flex-col items-center justify-center gap-5">
                {pastTrips.map((trip:PastTrip, index:number) => <TripCard key={index} trip={trip}/>)}
            </div>
        </div>
    </div>
  );
};

export default Plans;
