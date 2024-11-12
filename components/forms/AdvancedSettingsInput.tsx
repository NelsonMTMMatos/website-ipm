import { FormFields } from '@/types';
import { IoManOutline } from "react-icons/io5";
import { FaBus, FaCar } from "react-icons/fa";
import { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';

type Props = {
    register: UseFormRegister<FormFields>;
    watch: UseFormWatch<FormFields>;
    errors: FieldErrors<FormFields>;
    selectedMode: string | null
    setSelectedMode: React.Dispatch<React.SetStateAction<string | null>>;
  }

const AdvancedSettingsInput = ({ register, watch, errors, selectedMode, setSelectedMode}: Props) => {
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
    <div className="w-full flex flex-col gap-y-2">
        <div className="flex flex-col">
            <div className="w-full flex items-center justify-start gap-x-3">
                <span>Number of Travelers</span>
                <input type="number" placeholder='1' min="1" className="w-10 border-2 border-black text-center" 
                        {...register("numberOfTravelers", { min: { value: 1, message: "There needs to be at least 1 traveler." }})} />
            </div>
            {errors.numberOfTravelers && <p className="text-red-500 text-sm">{errors.numberOfTravelers.message}</p>}
        </div>

        <div className="flex flex-col">
            <div className="flex gap-x-3">
                <span>Day Start Time</span>
                <input type="time" defaultValue="09:00"
                       {...register("dayStartTime", {validate:validateStartTime})} 
                />
            </div>
            {errors.dayStartTime && <p className="text-red-500 text-sm">{errors.dayStartTime.message}</p>}
        </div>

        <div className="flex flex-col">
            <div className="flex gap-x-3">
                <span>Day End Time</span>
                <input type="time" defaultValue="18:00"
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
  )
}

export default AdvancedSettingsInput