import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';
import { FormFields } from '@/types';
import { useEffect, useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

type Props = {
    register: UseFormRegister<FormFields>;
    setValue: UseFormSetValue<FormFields>;
    errors: FieldErrors<FormFields>;
}

const CalendarInput = ({register, setValue, errors }: Props) => {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  useEffect(() => {
    register("start_date", {required: "Start date is required"});
    register("end_date", {required: "End date is required"});
  }, [register, date]);

  const handleDateChange = (item: RangeKeyDict) => {
    const { startDate, endDate } = item.selection;
    if (startDate && endDate) {
      setDate({
        startDate,
        endDate,
        key: 'selection'
      });
      setValue("start_date", startDate);
      setValue("end_date", endDate);
    }
  };

  return (
    <div>
      <div className="text-2xl">Duration<span className="text-red-500">*</span></div>
      <DateRange
        ranges={[date]}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
      />
      {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>}
      {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>}
    </div>
  );
};

export default CalendarInput