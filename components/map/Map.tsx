"use client";

import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { Activity } from '@/types';
import Link from "next/link";
import Image from 'next/image';

const icon = L.icon({
  iconUrl: '/icons/marker.png',
  iconSize: [44, 50],
  iconAnchor: [22, 50]
});

type Props = {
  setZoom: React.Dispatch<React.SetStateAction<number>>;
}

function ZoomHandler({setZoom}:Props) {
  
  const mapEvents = useMapEvents({
      zoomend: () => {
          setZoom(mapEvents.getZoom());
      },
  });

  return null
}

type MapProps = {
  coordinates: [number, number];
  zoom: number;
  setZoom: React.Dispatch<React.SetStateAction<number>>;
  activities: Activity[]
}

type RecenterMapProps = {
  coordinates: [number, number];
  zoom: number;
}

const RecenterAutomatically = ({coordinates, zoom}: RecenterMapProps) => {
  const map = useMap();
  useEffect(() => {
     map.setView(coordinates, zoom);
   }, [coordinates]);
   return null;
 }

const Map = ({coordinates, zoom, setZoom, activities}: MapProps) => {
  return (
    <MapContainer center={coordinates} zoom={zoom}>
        <ZoomHandler setZoom={setZoom} />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterAutomatically coordinates={coordinates} zoom={zoom} />
        {zoom > 12 && activities.map((activity:Activity, index:number) => 
          <Marker position={L.latLng(activity.latitude, activity.longitude)} icon={icon} key={index}>
            <Popup className='w-[200px]'>
              <div>
                <Link href={'/activities/' + activity.id} className='flex flex-col items-center justify-center'>
                  <Image className='pb-3' src={"/Activities/" + activity.image} alt={activity.name} width={150} height={120} />
                </Link>
                <span className='text-xl'> {activity.name} </span>
                <h1>{activity.description}</h1>
              </div>
            </Popup>
          </Marker>)}
    </MapContainer>
    
  );
};

export default Map;