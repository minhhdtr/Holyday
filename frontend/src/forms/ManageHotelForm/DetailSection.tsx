import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelForm';

const DetailSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-3xl font-bold mb-3'>Add Hotel</h1>

      <label className='text-gray-700 font-bold text-lg flex-1'>
        Name
        <input
          type='text'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('name', { required: 'This is required' })}
        ></input>
        {errors.name && (
          <span className='text-red-500 text-xs'>{errors.name.message}</span>
        )}
      </label>
      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 font-bold text-lg flex-1'>
          City
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('city', { required: 'This is required' })}
          ></input>
          {errors.city && (
            <span className='text-red-500 text-xs'>{errors.city.message}</span>
          )}
        </label>
        <label className='text-gray-700 font-bold text-lg flex-1'>
          Country
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('country', { required: 'This is required' })}
          ></input>
          {errors.country && (
            <span className='text-red-500 text-xs'>
              {errors.country.message}
            </span>
          )}
        </label>
      </div>
      <label className='text-gray-700 font-bold text-lg flex-1'>
        Description
        <textarea
          rows={10}
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('description', { required: 'This is required' })}
        ></textarea>
        {errors.description && (
          <span className='text-red-500 text-xs'>
            {errors.description.message}
          </span>
        )}
      </label>
      <label className='text-gray-700 font-bold text-lg flex-1 md:max-w-[50%]'>
        Price per night
        <input
          type='number'
          min={1}
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('pricePerNight', { required: 'This is required' })}
        ></input>
        {errors.pricePerNight && (
          <span className='text-red-500 text-xs'>
            {errors.pricePerNight.message}
          </span>
        )}
      </label>
      <label className='text-gray-700 font-bold text-lg flex-1 md:max-w-[50%]'>
        Star Rating
        <select
          {...register('starRating', { required: 'This is required' })}
          className='border rounded w-full py-1 px-2 font-normal'
        >
          <option value='' className='text-sm font-bold'>
            Select star rating
          </option>
          {[1, 2, 3, 4, 5].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className='text-red-500 text-xs'>
            {errors.starRating.message}
          </span>
        )}
      </label>
    </div>
  );
};

export default DetailSection;
