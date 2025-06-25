import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../contexts/SearchContext';
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValue(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate('/search');
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className='p-1 bg-orange-500 rounded shadow-md grid grid-cols-1 lg:grid-cols-5 items-center gap-1 w-full'
    >
      <div className='flex flex-row flex-1 items-center bg-white p-2 rounded'>
        <MdTravelExplore size={25} className='mr-1.5' />
        <input
          type='text'
          placeholder='Where are you going?'
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className='w-full focus:outline-none'
        />
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          dateFormat='dd/MM/yyyy'
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText='Check-in'
          className='w-full p-2 bg-white focus:outline-none rounded'
          wrapperClassName='min-w-full'
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          dateFormat='dd/MM/yyyy'
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText='Check-out'
          className='w-full p-2 bg-white focus:outline-none rounded'
          wrapperClassName='min-w-full'
        />
      </div>
      <div className='flex px-2 py-1 bg-white gap-2 rounded'>
        <label className='flex items-center'>
          Adults:
          <input
            type='number'
            min='1'
            value={adultCount}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
            className='w-full p-1 focus:outline-none font-bold'
          />
        </label>
        <label className='flex items-center'>
          Children:
          <input
            type='number'
            min='0'
            value={childCount}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
            className='w-full p-1 focus:outline-none font-bold'
          />
        </label>
      </div>
      {/* <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          dateFormat='dd/MM/yyyy'
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText='Check-in'
          className='w-full p-2 bg-white focus:outline-none rounded'
          wrapperClassName='min-w-full'
        />
      </div>
      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          dateFormat='dd/MM/yyyy'
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText='Check-out'
          className='w-full p-2 bg-white focus:outline-none rounded'
          wrapperClassName='min-w-full'
        />
      </div> */}
      <div className='flex gap-1'>
        <button
          type='submit'
          className='w-2/3 bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition-colors cursor-pointer'
        >
          Search
        </button>
        <button
          type='submit'
          className='w-1/3 bg-red-600 text-white p-2 rounded hover:bg-red-500 transition-colors cursor-pointer'
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
