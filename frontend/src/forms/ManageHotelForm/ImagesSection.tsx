import { useFormContext } from 'react-hook-form';
import type { HotelFormData } from './ManageHotelForm';

const ImagesSection = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch('imageUrls');

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      'imageUrls',
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };

  return (
    <div>
      <h2 className='text-gray-700 font-bold text-lg flex-1'>Images</h2>

      <div className='flex flex-col border border-gray-300 py-4 px-6'>
        {existingImageUrls && (
          <div className='grid grid-cols-6 gap-4 p-4'>
            {existingImageUrls.map((url, index) => (
              <div key={index} className='relative group'>
                <img src={url} className='min-h-full object-cover' />
                <button
                  onClick={(e) => handleDelete(e, url)}
                  className='absolute inset-0 flex items-center justify-center bg-black hover:opacity-75 opacity-0 group-hover:opacity-100 text-white'
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type='file'
          accept='image/*'
          multiple
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('imageFiles', {
            validate: (imageFiles) => {
              const length = imageFiles?.length + (existingImageUrls?.length || 0);
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
