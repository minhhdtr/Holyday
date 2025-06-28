import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import MyBookingsCard from '../components/MyBookingsCard';

const MyBookings = () => {
  const { data: hotels } = useQuery('fetchMyBookings', apiClient.fetchMyBookings);

  if (!hotels) {
    return <div>No bookings found</div>;
  }

  return (
    <div className='space-y-5'>
      <h1 className='text-3xl font-bold'>My Bookings</h1>

      {hotels.map((hotel) => (
        <MyBookingsCard
          key={hotel._id}
          imageUrls={hotel.imageUrls}
          name={hotel.name}
          city={hotel.city}
          country={hotel.country}
          bookings={hotel.bookings.map((booking) => ({
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            adultCount: booking.adultCount,
            childCount: booking.childCount,
          }))}
        />
      ))}
    </div>
  );
};

export default MyBookings;
