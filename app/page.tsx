"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
import SearchBar from '@/components/map/SearchBar';
import Filter from '@/components/map/Filter';
import initialActivities from '@/data/activities.json'
import { MdFilterAlt, MdOutlineFilterAlt } from "react-icons/md";

export default function Home() {
  const [coordinates, setCoordinates] = useState<[number, number]>([38.6916, -9.2160]); // initial coordinates
  const [zoom, setZoom] = useState(13);
  const [activities, setActivities] = useState(initialActivities)
  const [filterOn, setFilterOn] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev)
  }

  return (
    <main className="flex flex-col h-screen relative">
      <div className="flex-grow w-full max-w-3xl mx-auto relative">
        <div className="flex items-center justify-center">
          <SearchBar setCoordinates={setCoordinates} setZoom={setZoom} />
          {filterOn ? <MdFilterAlt  onClick={handleFilterOpen} size={50} className=' absolute z-50'/> 
          : <MdOutlineFilterAlt onClick={handleFilterOpen} size={50} className=' absolute z-50'/>}
        </div>
        {filterOpen && <Filter setActivities={setActivities}/>}
        <div className="absolute inset-0 z-10">
          <Map coordinates={coordinates} zoom={zoom} setZoom={setZoom} activities={activities}/>
        </div>
      </div>
      <div className="pb-16 md:pb-0"></div>
    </main>
  );
}