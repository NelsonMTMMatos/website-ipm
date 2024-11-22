"use client";

import React, { useEffect } from 'react';
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Tooltip } from 'react-leaflet';
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
  //const mapUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const mapUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <MapContainer center={coordinates} zoom={zoom}>
        <ZoomHandler setZoom={setZoom} />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={mapUrl}
        />
        <RecenterAutomatically coordinates={coordinates} zoom={zoom} />
        {zoom > 12 && activities.map((activity:Activity, index:number) => 
          <Marker position={L.latLng(activity.latitude, activity.longitude)} icon={icon} key={index}>
            { zoom > 14 &&
              <Tooltip permanent direction="bottom">
                {activity.name}
              </Tooltip>
            }
            <Popup className='w-[200px]'>
              <div>
                <div className='flex flex-col items-center justify-center gap-y-2'>
                  <div className='relative w-[150px] h-[100px]'>
                      <Link href={'/activities/' + activity.id}>
                      <Image
                        src={"/Activities/" + activity.image}
                        alt={activity.name}
                        layout="fill"
                        objectFit="cover"
                      />
                      </Link>
                  </div>
                  <div className=' w-full flex flex-col items-start gap-y-1'>
                    <span className='text-xl'><Link href={'/activities/' + activity.id}>{activity.name}</Link></span>
                    <span><b>Schedule:</b> {activity.opening_hours}-{activity.closing_hours}</span>
                  </div>
                  <div className=' w-full flex items-center justify-end'>
                    <Link href={'/activities/' + activity.id} className=' bg-deep-blue rounded-xl px-2 py-1'>
                      <span className='text-white'>See Details</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>)}
    </MapContainer>
    
  );
};

export default Map;