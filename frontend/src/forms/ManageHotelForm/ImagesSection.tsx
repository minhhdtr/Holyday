import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className='text-gray-700 font-bold text-lg flex-1'>Images</h2>

      <div className='flex flex-col border border-gray-300 py-4 px-6'>
        <input
          type='file'
          accept='image/*'
          multiple
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('imageFiles', {
            validate: (imageFiles) => {
              const length = imageFiles?.length;
              if (length === 0) {
                return 'At least one image is required';
              } else if (length > 6) {
                return 'You can upload a maximum of 6 images';
              } else {
                return true;
              }
            },
          })}
        ></input>
      </div>
      {errors.imageFiles && (
        <span className='text-red-500 text-xs'>
          {errors.imageFiles?.message}
        </span>
      )}
    </div>
  );
};

export default ImagesSection;
