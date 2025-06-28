type Props = {
  imageUrls: string[];
  name: string;
  city: string;
  country: string;
  bookings: {
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    ammount: number;
  }[];
};

const MyBookingsCard = ({ imageUrls, name, city, country, bookings }: Props) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5'>
      <div className='lg:w-full lg:h-[350px]'>
        <img src={imageUrls[0]} className='w-full h-full object-cover object-center rounded-lg' />
      </div>
      <div className='flex flex-col gap-5 overflow-y-auto max-h-[300px]'>
        <div className='flex flex-col gap-2'>
          <h2 className='text-xl font-semibold'>{name}</h2>
          <p>
            {city}, {country}
          </p>
        </div>
        {bookings.map((booking, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <span className='font-bold'>Dates:</span>
              <span className='text-gray-600'>
                {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className='flex gap-2'>
              <span className='font-bold'>Guests:</span>
              <span className='text-gray-600'>
                {booking.adultCount} Adult{booking.adultCount > 1 ? 's' : ''}, {booking.childCount} Child
                {booking.childCount > 1 ? 'ren' : ''}
              </span>
            </div>
            <div className='flex gap-2'>
              <span className='font-bold'>Total ammount:</span>
              <span className='text-gray-600'>${booking.ammount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingsCard;
