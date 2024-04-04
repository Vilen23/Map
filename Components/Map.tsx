"use client";
import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRecoilValue } from "recoil";
import { startAtom } from "@/store/atoms";

const icon = L.icon({
  iconUrl: "/Loc2.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const icon2 = L.icon({
  iconUrl: "/Loc1.png",
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const icon3 = L.icon({
  iconUrl: "/Frame.png",
  iconSize: [20, 100], 
  iconAnchor: [25, 50], 
});

interface MapProps {
  Loc1: {
    lat: number;
    lng: number;
  };
  Loc2: {
    lat: number;
    lng: number;
  };
  speed: number;
  distance: number;
}

function ChangeView({ bounds }: { bounds: any }) {
  const map = useMap();
  try {
    map.fitBounds(bounds);
    return null;
  } catch (error) {
    map.fitBounds([[0, 0], [0, 0]]);
    console.log(error);
  }
}

export default function Map({ Loc1, Loc2, speed, distance }: MapProps) {
  const [position, setPosition] = useState(Loc1);
  const start = useRecoilValue(startAtom);

  useEffect(() => {
    setPosition(Loc1);
  }, [Loc1, Loc2, speed, distance]);

  useEffect(() => {
    setPosition({
      lat: Loc1.lat || 0,
      lng: Loc1.lng || 0,
    });
  }, [Loc1, Loc2, speed, distance]);

  useEffect(() => {
    if (speed > 0 && distance > 0) {
      const totalTime = distance / speed; 
      let elapsedTime = 0; 
  
      const interval = setInterval(() => {
        elapsedTime += 1;
  
        if (elapsedTime > totalTime) {
          clearInterval(interval);
          setPosition(Loc2);
          return;
        }
  
        const newPosition = {
          lat: Loc1.lat + (Loc2.lat - Loc1.lat) * elapsedTime / totalTime,
          lng: Loc1.lng + (Loc2.lng - Loc1.lng) * elapsedTime / totalTime,
        };
  
        setPosition(newPosition);
      }, 1000);
  
      return () => clearInterval(interval);
    }
  }, [Loc1, Loc2, speed, distance]);

  return (
    <div className="w-[100vw] flex justify-center items-center  mt-[100px]">
      <MapContainer
        className="h-[600px] w-[1200px]"
        bounds={[
          [Loc1.lat, Loc1.lng],
          [Loc2.lat, Loc2.lng],
        ]}
        zoom={12}
        scrollWheelZoom={false}
      >
        <ChangeView
          bounds={[
            [Loc1.lat, Loc1.lng],
            [Loc2.lat, Loc2.lng],
          ]}
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker icon={icon} position={[Loc1.lat, Loc1.lng]}></Marker>
        <Marker icon={icon2} position={[Loc2.lat, Loc2.lng]}></Marker>
        {start && <Marker icon={icon3} position={[position.lat, position.lng]}></Marker>}
      </MapContainer>
    </div>
  );
}
