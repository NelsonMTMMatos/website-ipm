"use client";

import React from 'react';
import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer } from 'react-leaflet';

const Map = () => {
  return (
    <MapContainer center={[38.6916, -9.2160]} zoom={13} zoomControl={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
  );
};

export default Map;