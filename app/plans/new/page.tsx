"use client"

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { IoManOutline } from "react-icons/io5";
import { FaBus, FaCar } from "react-icons/fa";
import DestinationInput from "@/components/forms/DestinationInput";
import { useRouter } from 'next/navigation';

export type FormFields = {
  destination: string;
  numberOfTravelers: number;
  dayStartTime: string;
  dayEndTime: string;
  modeOfTransportation: string
}

const NewPlan = () => {
  const [advancedSetting, setAdvancedSettings] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = useForm<FormFields>();
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log('Submit: ',{...data, preferredMode: selectedMode});
  };

  const handleAdvancedSettingsClick = () => {
    setAdvancedSettings(prev => !prev);
  };

  const startTime = watch("dayStartTime");
  const endTime = watch("dayEndTime");

  const validateStartTime = () => {
    if (startTime && endTime) {
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
  
      return start < end || "Start time must be before end time";
    }
    return true;
  };

  const transportationModes = [
    { label: 'Walk', icon: <IoManOutline />, value: 'walk' },
    { label: 'Public Transport', icon: <FaBus />, value: 'public_transport' },
    { label: 'Car', icon: <FaCar />, value: 'car' },
  ];

  const handleModeSelect = (mode: string) => {
    setSelectedMode(prevMode => (prevMode === mode ? null : mode));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex items-center py-5">
        <button onClick={handleBackClick}>
          <IoIosArrowBack size={64} />
        </button>
        <span className="text-4xl">New Plan</span>
      </div>

      <form className="w-full px-8 flex flex-col items-start gap-y-3" onSubmit={handleSubmit(onSubmit)} >
        <DestinationInput register={register} setValue={setValue} watch={watch} errors={errors} />
        <div onClick={handleAdvancedSettingsClick} className={`${advancedSetting && 'text-deep-blue'}`}>
          Advanced Settings
        </div>
        {advancedSetting && (
          <div className="w-full flex flex-col gap-y-2">
            <div className="flex flex-col">
              <div className="w-full flex items-center justify-start gap-x-3">
                  <span>Number of Travelers</span>
                  <input type="number" min="1" className="w-10 border-2 border-black text-center" 
                        {...register("numberOfTravelers", { min: { value: 1, message: "There needs to be at least 1 traveler." }})} />
              </div>
              {errors.numberOfTravelers && <p className="text-red-500 text-sm">{errors.numberOfTravelers.message}</p>}
            </div>

            <div className="flex flex-col">
              <div className="flex gap-x-3">
                <span>Day Start Time</span>
                <input 
                  type="time" 
                  {...register("dayStartTime", {validate:validateStartTime})} 
                />
              </div>
              {errors.dayStartTime && <p className="text-red-500 text-sm">{errors.dayStartTime.message}</p>}
            </div>

            <div className="flex flex-col">
              <div className="flex gap-x-3">
                <span>Day End Time</span>
                <input 
                  type="time" 
                  {...register("dayEndTime")} 
                />
              </div>
              {errors.dayEndTime && <p className="text-red-500 text-sm">{errors.dayEndTime.message}</p>}
            </div>

            <div className="flex flex-col items-start justify-center">
              <span className="my-2">Preferred Mode of Transportation</span>
              <div className="flex items-center gap-x-5">
                {transportationModes.map((mode) => (
                  <div 
                    key={mode.value} 
                    onClick={() => handleModeSelect(mode.value)}
                    className={`flex flex-col items-center cursor-pointer ${
                      selectedMode === mode.value ? 'text-deep-blue' : 'text-gray-400'
                    }`}
                  >
                    <div className="text-3xl">{mode.icon}</div>
                    <span>{mode.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        <button type="submit" className=" mt-4 bg-deep-blue text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default NewPlan;
