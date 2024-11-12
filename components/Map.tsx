"use client";

import React, { useState } from 'react';
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import activities from '../data/activities.json'
import { Activity } from '@/types';
import Link from "next/link";

var icon = L.icon({
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

const Map = () => {
  const [zoom, setZoom] = useState(1)
  console.log(zoom)
  return (
    <MapContainer center={[38.6916, -9.2160]} zoom={zoom} zoomControl={true}>
        <ZoomHandler setZoom={setZoom} />
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zoom > 15 && activities.map((activity:Activity) => 
          <Marker position={L.latLng(activity.latitude, activity.longitude)} icon={icon}>
            <Popup className='w-[200px]'>
              <div>
                <Link href={'/activities/' + activity.id} className='flex flex-col items-center justify-center'>
                  <img className='pb-3' src={"/Activities/" + activity.image} alt={activity.name} style={{ width: '100%', height: 'auto' }} />
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