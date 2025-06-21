import { useFormContext } from 'react-hook-form';
import { hotelFacilities } from '../../config/hotel-options-config';
import type { HotelFormData } from './ManageHotelForm';

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-gray-700 font-bold text-lg flex-1'>Facilities</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className={`flex items-center gap-2 py-1 px-2 cursor-pointer`}
          >
            <input
              type='checkbox'
              value={facility}
              {...register('facilities', {
                validate: (facilities: string[]) => {
                  return facilities && facilities.length > 0
                    ? true
                    : 'At least one facility must be selected';
                },
              })}
            />
            <span className='text-gray-700'>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className='text-red-500 text-xs'>
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
