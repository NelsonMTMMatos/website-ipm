import { City, FormFields } from '@/types';
import citiesData from '../../data/cities500.json';
import { useEffect, useState } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors, FieldError } from 'react-hook-form';

type Props = {
  register: UseFormRegister<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  watch: UseFormWatch<FormFields>;
  errors: FieldErrors<FormFields>;
}

const cities: City[] = citiesData as City[];

const DestinationInput = ({ register, setValue, watch, errors }: Props) => {
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue.length > 2) {
      const filtered = cities.filter((city: City) =>
        city.name.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleSelectCity = (cityName: string) => {
    setInputValue(cityName); 
    setValue('destination', cityName);
    setSuggestions([]);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="text-2xl">Destination<span className='text-red-500'>*</span></div>
      <input
        type="text"
        {...register("destination", { required: "Destination is required" })}
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Type city name"
        className="h-10 border-2 px-2 border-black"
      />
      {(errors.destination && suggestions.length == 0 && watch('destination') === '') ? 
        <p className='text-red-500 text-sm'>
          {(errors.destination as FieldError)?.message || ""}
        </p> 
          : 
        <></>}

      {suggestions.length != 0 && (
        <ul className=" px-2 border-2 border-black top-0 border-t-0">
          {suggestions.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelectCity(city.name)}
              className='pointer'
            >
              {city.name}, {city.admin1}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationInput;
