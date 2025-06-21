import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-options-config';
import type { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch('type');

  return (
    <div>
      <h2 className='text-gray-700 font-bold text-lg flex-1'>Type</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`flex items-center gap-2 border rounded-md py-1 px-2 cursor-pointer ${
              typeWatch === type
                ? 'bg-blue-300 border-blue-500'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <input
              type='radio'
              value={type}
              {...register('type', { required: 'This is required' })}
              className='hidden'
            />
            <span className='text-gray-700'>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className='text-red-500 text-xs'>{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
