import { hotelFacilities } from '../../config/hotel-options-config';

type Props = {
  selectedHotelFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedHotelFacilities, onChange }: Props) => {
  return (
    <div className='border-b border-gray-300 pb-5'>
      <h4 className='text-md font-semibold mb-2'>Hotel Facilities</h4>
      {hotelFacilities.map((hotelFaccility) => (
        <label key={hotelFaccility} className='flex items-center space-x-2'>
          <input
            type='checkbox'
            className='rounded'
            value={hotelFaccility}
            checked={selectedHotelFacilities.includes(hotelFaccility)}
            onChange={onChange}
          />
          <span className='text-sm'>{hotelFaccility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
