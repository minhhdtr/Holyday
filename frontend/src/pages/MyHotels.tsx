import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link } from 'react-router-dom';
import {
  BsBuilding,
  BsCurrencyDollar,
  BsMap,
  BsPeople,
  BsStar,
} from 'react-icons/bs';

const MyHotels = () => {
  const { data: hotelData } = useQuery(
    'fetchMyHotels',
    apiClient.fetchMyHotels,
    {
      onError: () => {
        const { showToast } = useAppContext();
        showToast({ message: 'Failed to fetch hotels', type: 'ERROR' });
      },
    }
  );

  return (
    <>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-4xl font-bold align-middle'>My Hotel</h1>
        <Link
          to='/add-hotel'
          className='flex bg-blue-600 text-white text-2xl px-4 py-2 rounded hover:bg-blue-500 transition-colors'
        >
          Add Hotel
        </Link>
      </div>

      <div className='flex flex-col gap-5'>
        {hotelData?.map((hotel) => {
          return (
            <div className='flex flex-col justify-between border border-gray-300 rounded-lg p-8 gap-5'>
              <h2 className='text-2xl font-bold'>{hotel.name}</h2>
              <div className='whitespace-pre-line'>
                <p className='text-gray-500'>{hotel.description}</p>
              </div>
              <div className='grid grid-cols-5 gap-2'>
                <div className='border border-gray-300 rounded-md flex items-center p-3'>
                  <BsMap className='mr-1.5' />
                  {hotel.city}, {hotel.country}
                </div>
                <div className='border border-gray-300 rounded-md flex items-center p-3'>
                  <BsBuilding className='mr-1.5' />
                  {hotel.type}
                </div>
                <div className='border border-gray-300 rounded-md flex items-center p-3'>
                  <BsCurrencyDollar className='mr-1.5' />
                  {hotel.pricePerNight} per night
                </div>
                <div className='border border-gray-300 rounded-md flex items-center p-3'>
                  <BsPeople className='mr-1.5' />
                  {hotel.adultCount} adults, {hotel.childCount} children
                </div>
                <div className='border border-gray-300 rounded-md flex items-center p-3'>
                  <BsStar className='mr-1.5' />
                  {hotel.starRating} stars
                </div>
              </div>
              <div className='flex justify-end'>
                <Link
                  to={`/edit-hotel/${hotel._id}`}
                  className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors'
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MyHotels;
