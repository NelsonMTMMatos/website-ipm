"use client";

import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('@/components/map/Map'), { ssr: false });
import SearchBar from '@/components/map/SearchBar';

export default function Home() {
  const [coordinates, setCoordinates] = useState<[number, number]>([38.6916, -9.2160]); // initial coordinates
  const [zoom, setZoom] = useState(13);

  return (
    <main className="flex flex-col h-screen relative">
      <div className="flex-grow w-full max-w-3xl mx-auto relative">
        <SearchBar setCoordinates={setCoordinates} setZoom={setZoom} />
        <div className="absolute inset-0 z-10">
          <Map coordinates={coordinates} zoom={zoom} setZoom={setZoom}/>
        </div>
      </div>
      <div className="pb-16 md:pb-0"></div>
    </main>
  );
}