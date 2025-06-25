import { AiFillStar } from 'react-icons/ai';
import type { HotelType } from '../../../backend/src/shared/type';
import { Link } from 'react-router-dom';

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-gray-300 rounded-lg p-8 gap-8'>
      <div className='w-full h-[300px]'>
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className='w-full h-full object-cover object-center rounded-lg'
        />
      </div>
      <div className='grid grid-rows-[1fr_2fr_1fr]'>
        <div>
          <div className='flex items-center'>
            <span className='flex'>
              {Array.from({ length: hotel.starRating }).map(() => (
                <AiFillStar className='text-yellow-500' size={20} />
              ))}
            </span>
            <span className='ml-1.5'>{hotel.type}</span>
          </div>
          <Link
            className='text-2xl font-bold cursor-pointer'
            to={`/detail/${hotel._id}`}
          >
            {hotel.name}
          </Link>
        </div>
        <div className='line-clamp-4'>{hotel.description}</div>
        <div className='grid grid-cols-2 items-end whitespace-nowrap'>
          <div className='flex items-center gap-1'>
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className='bg-gray-300 p-2 rounded-lg text-xs whitespace-nowrap'>
                {facility}
              </span>
            ))}
            <span className='text-sm text-gray-500'>
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} more`}
            </span>
          </div>
          <div className='flex flex-col items-end gap-1'>
            <span className='font-bold'>$ {hotel.pricePerNight}</span>
            <Link
              className='bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 transition-colors cursor-pointer max-w-fit'
              to={`/detail/${hotel._id}`}
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
