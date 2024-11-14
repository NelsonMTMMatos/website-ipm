"use client";

import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Activity, FilterFields } from '@/types';
import activitiesData from '../../data/activities.json';
import options from '../../data/filterOptions.json';
import {isBetween} from "@/utils"

type Props = {
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
};

const activities: Activity[] = activitiesData as Activity[];

const Filter = ({setActivities}: Props) => {
  const [type, setType] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  
  const handleOnClick = () => {
    const filtered = activities.filter((activity: Activity) =>
      activity.tags.includes(type.toLowerCase()) || type === "" && 
      isBetween(activity.opening_hours, activity.closing_hours, hours) &&
      activity.price >= priceRange[0] && activity.price <= priceRange[1]
    );

    console.log("Filtered: ", filtered)
    setActivities(filtered);
  }

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value[1] - value[0] >= 1)
      setPriceRange(value as [number, number]);
  };

  console.log("type: ", type);
  console.log("hours: ", hours);
  console.log("priceRange: ", priceRange);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-3/4 max-w-xs flex flex-col items-center bg-white p-4 gap-y-4 rounded shadow-md">
      <div className="flex w-full items-center justify-start gap-x-2">
        <span className="w-20">Type:</span>
        <select className="px-1 bg-gray-200" onChange={(e) => setType(e.target.value)}>
          {options.map((option: string, index: number) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full items-center justify-start gap-x-2">
        <span className="w-20">Open at:</span>
        <input type="time" className="bg-gray-200" onChange={(e) => setHours(e.target.value)}/>
      </div>
      <div className="flex w-full items-center justify-start gap-x-2">
        <span className="w-auto">Price:</span>
        <div className=' flex justify-center items-center gap-x-3 w-full'>
          <span className=' w-6'>€{priceRange[0]}</span>
          <Slider
            range
            step={1}
            min={0}
            max={100}
            defaultValue={[0, 100]}
            value={priceRange}
            onChange={handleRangeChange}
            className=' flex-grow'
          />
          <span className='w-6'>€{priceRange[1]}</span>
          </div>
      </div>
      <div className='w-full px-4 flex items-center justify-end'>
        <button type="submit" className=" bg-deep-blue text-white text-center px-3 py-1 rounded" onClick={handleOnClick}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
