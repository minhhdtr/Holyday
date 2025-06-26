import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import type { HotelType } from '../../../../backend/src/shared/type';

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (data: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((data: HotelFormData) => {
    const formData = new FormData();
    if (hotel) {
      formData.append('id', hotel._id);
    }
    formData.append('name', data.name);
    formData.append('city', data.city);
    formData.append('country', data.country);
    formData.append('description', data.description);
    formData.append('type', data.type);
    formData.append('pricePerNight', data.pricePerNight.toString());
    formData.append('starRating', data.starRating.toString());
    formData.append('adultCount', data.adultCount.toString());
    formData.append('childCount', data.childCount.toString());
    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }
    Array.from(data.imageFiles || []).forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    onSave(formData);
  });

  return (
    <>
      <h1 className='text-4xl font-bold mb-5'>
        {hotel ? 'Edit Hotel' : 'Add Hotel'}
      </h1>
      <FormProvider {...formMethods}>
        <form onSubmit={onSubmit} className='flex flex-col gap-5'>
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestsSection />
          <ImagesSection />
          <span className='flex justify-end'>
            <button
              type='submit'
              disabled={isLoading}
              className='mt-3 bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-500 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed'
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </span>
        </form>
      </FormProvider>
    </>
  );
};

export default ManageHotelForm;
