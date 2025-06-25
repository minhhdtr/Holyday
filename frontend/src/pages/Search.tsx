import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchContext } from '../contexts/SearchContext';
import * as apiClient from '../api-client';
import SearchResultCard from '../components/SearchResultCard';
import Pagenation from '../components/Pagination';
import StarRatingFilter from '../components/Filters/StarRatingFilter';
import HotelTypeFilter from '../components/Filters/HotelTypeFilter';
import FacilitiesFilter from '../components/Filters/FacilitiesFilter';
import MaxPriceFilter from '../components/Filters/MaxPriceFilter';

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<string[]>([]);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>();
  const [sortOptions, setSortOptions] = useState<string>('');

  const searchParams = {
    destionation: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelType,
    facilities: selectedHotelFacilities,
    maxPrice: selectedMaxPrice?.toString(),
    sortOptions: sortOptions,
  };
  const { data: hotelsData } = useQuery(['searchHotels', searchParams], () => apiClient.searchHotels(searchParams));

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;
    setSelectedHotelType((prevTypes) =>
      event.target.checked ? [...prevTypes, hotelType] : prevTypes.filter((type) => type !== hotelType)
    );
  };

  const handleHotelFacilitiesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedHotelFacilities((prevFacilities) =>
      event.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((f) => f !== facility)
    );
  };

  const handleMaxPriceChange = (value?: number) => {
    setSelectedMaxPrice(value);
  };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5'>
      <div className='rounded-lg border border-gray-300 p-5 h-fit lg:sticky lg:top-10'>
        <div className='space-y-5'>
          <h3 className='text-lg font-semibold border-b border-gray-300 pb-5'>Filter by:</h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange} />
          <HotelTypeFilter selectedHotelType={selectedHotelType} onChange={handleHotelTypeChange} />
          <FacilitiesFilter selectedHotelFacilities={selectedHotelFacilities} onChange={handleHotelFacilitiesChange} />
          <MaxPriceFilter selectedMaxPrice={selectedMaxPrice} onChange={handleMaxPriceChange} />
        </div>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between items-center'>
          <span className='text-xl font-bold'>
            {search.destination ? `${search.destination}: ` : ''}
            {hotelsData?.pagination.total} hotels found
          </span>
          <select
            value={sortOptions}
            onChange={(event) => setSortOptions(event.target.value)}
            className='border border-gray-300 rounded-lg p-2'
          >
            <option value=''>Sort by</option>
            <option value='pricePerNightAsc'>Price Per Night (low to high)</option>
            <option value='pricePerNightDesc'>Price Per Night (high to low)</option>
            <option value='starRatingDesc'>Star rating (high to low)</option>
            <option value='starRatingAsc'>Star rating (low to high)</option>
          </select>
        </div>
        {hotelsData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel} />
        ))}
        <div>
          <Pagenation
            page={hotelsData?.pagination.page || 1}
            pages={hotelsData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
