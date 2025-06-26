import type { HotelType } from '../../../backend/src/shared/type';

type Props = {
  hotel: HotelType;
  checkIn: Date;
  checkOut: Date;
  numberOfNights: number;
  adultCount: number;
  childCount: number;
};

const BookingDetailSummary = ({ checkIn, checkOut, numberOfNights, adultCount, childCount, hotel }: Props) => {
  return (
    <div className='grid grid-cols-1 gap-5 rounded-lg border border-gray-300 p-5 h-fit'>
      <h2 className='text-3xl font-bold'>Your Booking Details</h2>
      <div className='border-b py-2'>
        Destination:{' '}
        <div className='font-semibold'>
          {hotel.name}, {hotel.city}, {hotel.country}
        </div>
      </div>
      <div className='flex justify-between items-center border-b py-2'>
        <div>
          Check-in: <span className='font-semibold'>{checkIn.toLocaleDateString('en-GB')}</span>
        </div>
        <div>
          Check-out: <span className='font-semibold'>{checkOut.toLocaleDateString('en-GB')}</span>
        </div>
      </div>
      <div className='border-b py-2'>
        Number of nights: <div className='font-semibold'>{numberOfNights} nights</div>
      </div>
      <div className='border-b py-2'>
        Number of guests:{' '}
        <div className='font-semibold'>
          {adultCount} adult{adultCount > 1 ? 's' : ''} & {childCount} child{childCount > 1 ? 'ren' : ''}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailSummary;
