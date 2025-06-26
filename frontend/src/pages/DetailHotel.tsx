import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfo from '../forms/GuestInfoForm/GuestInfo';

const DetailHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery('fetchHotelById', () => apiClient.fetchHotelById(hotelId || ''), {
    enabled: !!hotelId,
  });

  if (!hotel) {
    return <></>;
  }

  return (
    <div className='space-y-8'>
      <div>
        <span className='flex'>
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className='text-yellow-500' size={20} />
          ))}
        </span>
        <h1 className='text-3xl font-bold'>{hotel.name}</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {hotel.imageUrls.map((image, index) => (
          <div key={index} className='w-full h-[300px]'>
            <img src={image} className='w-full h-full object-cover object-center rounded-md' />
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2'>
        {hotel.facilities.map((facility, index) => (
          <div key={index} className='border border-gray-300 p-2 rounded-lg text-center'>
            {facility}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5'>
        <div className='whitespace-pre-line'>
          <p>{hotel.description}</p>
        </div>
        <div className='h-fit'>
          <GuestInfo
            hotelId={hotel._id}
            pricePerNight={hotel.pricePerNight}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailHotel;
