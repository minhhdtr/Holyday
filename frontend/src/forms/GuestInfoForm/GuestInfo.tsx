import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfo = ({ hotelId, pricePerNight }: Props) => {
  const { isSignedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const search = useSearchContext();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
    mode: 'onBlur',
  });

  const checkIn = watch('checkIn');
  const checkOut = watch('checkOut');
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onNotSignedInSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValue('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
    navigate('/sign-in', { state: { from: location } });
  };

  const onSignedInSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValue('', data.checkIn, data.checkOut, data.adultCount, data.childCount);
    navigate(`/hotel/${hotelId}/booking`, { state: { from: location } });
  };

  return (
    <div className='flex flex-col p-4 gap-4 bg-blue-200'>
      <h3 className='text-md font-bold'>$ {pricePerNight}</h3>
      <form
        onSubmit={isSignedIn ? handleSubmit(onSignedInSubmit) : handleSubmit(onNotSignedInSubmit)}
        className='flex flex-col gap-4'
      >
        <div className='grid grid-cols-1 items-center gap-4'>
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue('checkIn', date as Date)}
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
              required
              selected={checkOut}
              onChange={(date) => setValue('checkOut', date as Date)}
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
                className='w-full p-1 focus:outline-none font-bold'
                {...register('adultCount', {
                  required: 'This is required',
                  min: {
                    value: 1,
                    message: 'At least one adult is required',
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className='flex items-center'>
              Children:
              <input
                type='number'
                min='0'
                className='w-full p-1 focus:outline-none font-bold'
                {...register('childCount', {
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && <span className='text-red-500 text-sm'>{errors.adultCount.message}</span>}
          </div>
        </div>
        {isSignedIn ? (
          <button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500'>Book now</button>
        ) : (
          <button className='bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500'>Sign in to book</button>
        )}
      </form>
    </div>
  );
};

export default GuestInfo;
