import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm';

const EditHotel = () => {
  const { showToast } = useAppContext();
  const { hotelId } = useParams();
  const { data: hotel } = useQuery('fetchMyHotelById', () =>
    apiClient.fetchMyHotelById(hotelId!)
  );
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: 'Hotel updated successfully', type: 'SUCCESS' });
    },
    onError: () => {
      showToast({ message: 'Failed to update hotel', type: 'ERROR' });
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return (
    <ManageHotelForm hotel={hotel} isLoading={isLoading} onSave={handleSave} />
  );
};

export default EditHotel;
