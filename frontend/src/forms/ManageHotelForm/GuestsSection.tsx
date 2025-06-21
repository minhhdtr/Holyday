import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-gray-700 font-bold text-lg flex-1'>Guests</h2>

      <div className='flex flex-col md:flex-row md:justify-between gap-5 bg-gray-100 border-gray-300 py-4 px-6'>
        <label className='text-gray-700 font-bold text-sm flex-1 md:max-w-[50%]'>
          Adults
          <input
            type='number'
            min={1}
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('adultCount', { required: 'This is required' })}
          ></input>
          {errors.adultCount && (
            <span className='text-red-500 text-xs'>
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className='text-gray-700 font-bold text-sm flex-1 md:max-w-[50%]'>
          Children
          <input
            type='number'
            min={0}
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('childCount', { required: 'This is required' })}
          ></input>
          {errors.childCount && (
            <span className='text-red-500 text-xs'>
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
