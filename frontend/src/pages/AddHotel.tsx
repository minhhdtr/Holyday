import { useMutation } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: 'Hotel added successfully', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Failed to add hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>;
};

export default AddHotel;
