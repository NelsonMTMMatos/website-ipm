"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
import SearchBar from '@/components/map/SearchBar';
import Filter from '@/components/map/Filter';
import initialActivities from '@/data/activities.json'
import { MdFilterAlt, MdOutlineFilterAlt } from "react-icons/md";
import defaultFilterOptions from '@/data/defaultFilterOptions.json'
import trips from "@/data/trips.json"

export default function Home() {
  const [coordinates, setCoordinates] = useState<[number, number]>([38.6916, -9.2160]); // initial map coordinates
  const [zoom, setZoom] = useState(13);
  const [activities, setActivities] = useState(initialActivities)
  const [filterIcon, setFilterIcon] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)

  const handleFilterOpen = () => {
    setFilterOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!sessionStorage.getItem('filters'))
      sessionStorage.setItem('filters', JSON.stringify(defaultFilterOptions));
    if(!sessionStorage.getItem('trips'))
      sessionStorage.setItem('trips', JSON.stringify(trips));
  }, [])

  useEffect(() => {
    filterOpen ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [filterOpen]);

  return (
    <main className="flex flex-col h-screen relative">
      <div className="flex-grow w-full max-w-3xl mx-auto relative">
        <div className="relative flex items-center justify-center">
          <SearchBar setCoordinates={setCoordinates} setZoom={setZoom} />
          <div className="absolute top-4 right-6 z-50">
            {filterIcon ? <MdFilterAlt onClick={handleFilterOpen} size={40} className="cursor-pointer" />
            : <MdOutlineFilterAlt onClick={handleFilterOpen} size={40} className="cursor-pointer" />}
          </div>
        </div>
        {filterOpen && (
          <div className="absolute inset-0 bg-opacity-70 flex items-center justify-center z-50">
            <Filter
              setActivities={setActivities}
              setFilterIcon={setFilterIcon}
              setFilterOpen={setFilterOpen}
            />
          </div>
        )}
        <div className="absolute inset-0 z-10" onClick={() => setFilterOpen(false)}>
          <Map coordinates={coordinates} zoom={zoom} setZoom={setZoom} activities={activities} />
        </div>
      </div>
      <div className="pb-16 md:pb-0"></div>
    </main>
  );
}