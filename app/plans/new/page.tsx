"use client"

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import DestinationInput from "@/components/forms/DestinationInput";
import { useRouter } from 'next/navigation';
import { FormFields } from "@/types";
import CalendarInput from "@/components/forms/CalendarInput";
import AdvancedSettingsInput from "@/components/forms/AdvancedSettingsInput";
import { dateToISOString, hasOverlap } from "@/utils";

const NewPlan = () => {
  const [advancedSetting, setAdvancedSettings] = useState(false);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);
  const { register, handleSubmit, setValue, setError, watch, formState: { errors } } = useForm<FormFields>();
  const router = useRouter();

  const handleBackClick = () => {
    router.push('/plans');
  };

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const {destination, start_date, end_date, numberOfTravelers, dayStartTime, dayEndTime, } = data
    
    if (hasOverlap(start_date, end_date)) {
      setError("start_date", {
          type: "manual",
          message: "Selected dates overlap with an existing trip.",
      });
      return;
    }
    
    const newTrip = {
      destination: destination,
      start_date: dateToISOString(start_date),
      end_date: dateToISOString(end_date),
      numberOfTravelers: numberOfTravelers ?? 1,
      dayStartTime: dayStartTime ?? '09:00',
      dayEndTime: dayEndTime ?? '18:00', 
      modeOfTransportation: selectedMode ?? ''
    }

    const plans = JSON.parse(sessionStorage.getItem('trips') || '[]');
    plans.push(newTrip);
    sessionStorage.setItem('trips', JSON.stringify(plans))
    
    router.push('/plans');
  };

  const handleAdvancedSettingsClick = () => {
    setAdvancedSettings(prev => !prev);
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

        <CalendarInput register={register} setValue={setValue} errors={errors}/>

        <div onClick={handleAdvancedSettingsClick} className=' flex items-center justify-center'>
          {advancedSetting ? <IoIosArrowDown size={20} /> : <IoIosArrowForward size={20}/>}
          <span>Advanced Settings</span>
        </div>
        {advancedSetting && 
         <AdvancedSettingsInput 
            register={register} 
            watch={watch} 
            errors={errors} 
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode}
          />
        }
        <button type="submit" className=" mt-4 bg-deep-blue text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
};

export default NewPlan;
