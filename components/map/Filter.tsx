"use client";

import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Activity } from '@/types';
import activitiesData from '../../data/activities.json';
import {isBetween} from "@/utils"
import defaultFilterOptions from '@/data/defaultFilterOptions.json'

type Props = {
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  setFilterIcon: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const activities: Activity[] = activitiesData as Activity[];

const options = ["", "Outdoor", "Indoor", "Museum", "Historical", "Restaurant", "Garden"]

const Filter = ({ setActivities, setFilterIcon, setFilterOpen}: Props) => {
  const [type, setType] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [priceRange, setPriceRange] = useState<number[]>([0,100]);

  useEffect(() => {
    const filters = JSON.parse(sessionStorage.getItem('filters') || 'null');
    console.log(filters)
    if(filters){
      setType(filters.type)
      setHour(filters.hour)
      setPriceRange(filters.priceRange)
    }
  }, [])

  
  const handleReset = () => {
    setType(defaultFilterOptions.type);
    setHour(defaultFilterOptions.hour);
    setPriceRange(defaultFilterOptions.priceRange);
  }
  
  const handleApply = () => {
    const filtered = activities.filter((activity: Activity) =>
      (activity.tags.includes(type.toLowerCase()) || type === "") && 
      (isBetween(activity.opening_hours, activity.closing_hours, hour) || hour === "") &&
      activity.price >= priceRange[0] && activity.price <= priceRange[1]
    );

    setActivities(filtered);
    const isPriceRangeDefault = JSON.stringify(priceRange) === JSON.stringify(defaultFilterOptions.priceRange);
    !(type === "" && hour === "" && isPriceRangeDefault) ? setFilterIcon(true) : setFilterIcon(false)
    setFilterOpen(false);

    sessionStorage.setItem('filters', JSON.stringify({
      type: type,
      hour: hour,
      priceRange: priceRange
    }))
  }

  const handleRangeChange = (value: number | number[]) => {
    if (Array.isArray(value) && value[1] - value[0] >= 1)
      setPriceRange(value as [number, number]);
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50
                    w-3/4 max-w-xs flex flex-col items-center bg-white p-4 gap-y-4 rounded-2xl shadow-md">
      <div className="flex w-full items-center justify-start gap-x-2">
        <span  className="w-20">Type:</span>
        <select value={type} className="px-1 bg-platinum" onChange={(e) => setType(e.target.value)}>
          {options.map((option: string, index: number) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full items-center justify-start gap-x-2">
        <span className="w-20">Open at:</span>
        <input type="time" value={hour} className=" bg-platinum" onChange={(e) => setHour(e.target.value)}/>
      </div>
      <div className="flex w-full items-center justify-start gap-x-2">
        <span className="w-auto">Price:</span>
        <div className=' flex justify-center items-center gap-x-3 w-full'>
          <span className=' w-6'>{priceRange[0]}€</span>
          <Slider
            range
            step={1}
            min={0}
            max={100}
            defaultValue={[0, 100]}
            value={priceRange}
            onChange={handleRangeChange}
            className=' flex-grow '
          />
          <span className='w-6'>{priceRange[1]}€</span>
          </div>
      </div>
      <div className='w-full flex items-center justify-end gap-x-3'>
        <button className=' bg-[#A7A7A7] text-white px-3 py-1 rounded-sm' onClick={handleReset}> Reset</button>
        <button className=" bg-deep-blue text-white px-3 py-1 rounded-sm" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;
