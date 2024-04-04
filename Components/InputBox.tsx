"use client";

import React from "react";
import { inputAtom, startAtom } from "@/store/atoms";
import { useRecoilState } from "recoil";

export default function InputBox() {
  const [input, setInput] = useRecoilState(inputAtom);
  const [start, setStart] = useRecoilState(startAtom);
  const handleStart = async () => {
    //Calculate distance bw two Locations
    await CalculateDistance();
    setStart(true);
  };

  function deg2rad(deg: any) {
    return deg * (Math.PI / 180);
  }

  const CalculateDistance = () => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(input.Loc2.lat - input.Loc1.lat);
    const dLng = deg2rad(input.Loc2.lng - input.Loc1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(input.Loc1.lat)) *
        Math.cos(deg2rad(input.Loc2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    setInput({ ...input, distance: distance });
    return distance;
  };

  return (
    <div className="pt-10">
      <div className="flex gap-20 items-center ">
        <div className="flex flex-col">
          <label htmlFor="exampleFormControlInput1">Location 1</label>
          <input
            onChange={(e) =>
              setInput({
                ...input,
                Loc1: { ...input.Loc1, lat: parseFloat(e.target.value) || 0 },
              })
            }
            onClick={() => setStart(false)}
            type="number"
            className=" p-2 bg-transparent focus:outline-none text-white border-b-2 w-[200px]"
            id="exampleFormControlInput1"
            placeholder="Latitude"
          />
          <input
            onChange={(e) =>
              setInput({
                ...input,
                Loc1: { ...input.Loc1, lng: parseFloat(e.target.value) || 0 },
              })
            }
            onClick={() => setStart(false)}
            type="number"
            className=" p-2 bg-transparent mt-2 focus:outline-none text-white border-b-2 w-[200px]"
            id="exampleFormControlInput1"
            placeholder="Longitude"
          />
        </div>
        <div className="flex flex-col gap-4 justify-center items-center">
          <input
            onChange={(e) =>
              setInput({ ...input, speed: parseFloat(e.target.value) || 20 })
            }
            onClick={() => setStart(false)}
            type="number"
            className=" p-2 bg-transparent focus:outline-none text-white border-b-2 w-[200px]"
            id="exampleFormControlInput1"
            placeholder="Speed(in Km/hr)"
          />
          <button
            className="bg-white text-black px-3 py-1 font-bold rounded-lg hover:scale-110 transition-all duration-500  text-2xl"
            onClick={handleStart}
          >
            Start
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="exampleFormControlInput1">Location 2</label>
          <input
            onChange={(e) =>
              setInput({
                ...input,
                Loc2: { ...input.Loc2, lat: parseFloat(e.target.value) || 0 },
              })
            }
            onClick={() => setStart(false)}
            type="number"
            className=" p-2 bg-transparent focus:outline-none text-white border-b-2 w-[200px]"
            id="exampleFormControlInput1"
            placeholder="Latitude"
          />
          <input
            onChange={(e) =>
              setInput({
                ...input,
                Loc2: { ...input.Loc2, lng: parseFloat(e.target.value) || 0 },
              })
            }
            onClick={() => setStart(false)}
            type="number"
            className=" p-2 bg-transparent mt-2 focus:outline-none text-white border-b-2 w-[200px]"
            id="exampleFormControlInput1"
            placeholder="Longitude"
          />
        </div>
      </div>
    </div>
  );
}
