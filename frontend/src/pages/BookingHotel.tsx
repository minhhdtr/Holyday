import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as apiClient from '../api-client';
import { useSearchContext } from '../contexts/SearchContext';
import Booking from '../forms/BookingForm/Booking';
import BookingDetailSummary from '../components/BookingDetailSummary';

const BookingHotel = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.ceil((search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24));
      setNumberOfNights(nights);
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery('fetchHotelById', () => apiClient.fetchHotelById(hotelId as string), {
    enabled: !!hotelId,
  });

  const { data: currentUser } = useQuery('fetchCurrentUser', apiClient.fetchCurrentUser);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-5'>
      {hotel && (
        <BookingDetailSummary
          hotel={hotel}
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          numberOfNights={numberOfNights}
          adultCount={search.adultCount}
          childCount={search.childCount}
        />
      )}
      {currentUser && <Booking currentUser={currentUser} />}
    </div>
  );
};

export default BookingHotel;
