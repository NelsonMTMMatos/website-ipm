"use client"

import { Activity } from '@/types';
import activitiesData from '../../data/activities.json';
import { useEffect, useState } from 'react';

const activities: Activity[] = activitiesData as Activity[];

const tags = ["", "outdoor", "indoor", "museum", "historical", "restaurant", "garden"]

type Props = {
  setCoordinates: (coords: [number, number]) => void;
  setZoom: (zoom: number) => void;
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
};

const SearchBar = ({setCoordinates, setZoom, setActivities}: Props) => {
  const [suggestions, setSuggestions] = useState<Activity[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (inputValue.length > 0 && tags.includes(inputValue.toLowerCase())) {
      const filtered = activities.filter((activity: Activity) =>
        activity.tags.includes(inputValue.toLowerCase())
      );
      setActivities(filtered);
    }else setActivities(activities);
    
    if (inputValue.length > 0 && !selected) {
      const filtered = activities.filter((activity: Activity) =>
        activity.name.toLowerCase().includes(inputValue.toLowerCase()) 
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setZoom(13);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSelected(false);
  };

  const handleSelectActivity = (activity: Activity) => {
    setInputValue(activity.name);
    setSuggestions([]);
    setCoordinates([activity.latitude, activity.longitude]);
    setZoom(18);
    setSelected(true);
  };

  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-2/3 max-w-xs flex flex-col">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search for Activity"
        className={`h-10 border-2 px-3 border-gray-500 rounded-t-2xl 
          ${suggestions.length == 0 ? 'rounded-b-2xl' : 'rounded-b-none'}  focus:border-black`}
      />
      {suggestions.length != 0 && (
        <ul className=" px-3 pb-1 border-2 border-black top-0 rounded-b-2xl border-t-0 bg-white">
          {suggestions.map((activity, index) => (
            <li
              key={index}
              onClick={() => handleSelectActivity(activity)}
              className='pointer'
            >
              {activity.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
