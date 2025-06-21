import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailSection';
import TypeSection from './TypeSection';
import FacilitySection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';

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
  onSave?: (data: FormData) => void;
  isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data: HotelFormData) => {
    // console.log(data);
    const formData = new FormData();
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
    Array.from(data.imageFiles).forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    onSave?.(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={onSubmit} className='flex flex-col gap-5'>
        <DetailsSection />
        <TypeSection />
        <FacilitySection />
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
  );
};

export default ManageHotelForm;
