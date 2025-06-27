import { useForm } from 'react-hook-form';
import type { UserType } from '../../../../backend/src/shared/type';

type Props = {
  currentUser: UserType;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const Booking = ({ currentUser }: Props) => {
  const { register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className='grid grid-cols-1 gap-5 rounded-lg border border-gray-300 h-fit p-5'>
      <h2 className='text-3xl font-bold'>Confirm your detail</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <label className='text-sm text-gray-700 font-bold flex-1'>
          First Name
          <input
            type='text'
            readOnly
            disabled
            {...register('firstName')}
            className='mt-1 w-full border border-gray-300 bg-gray-200 p-2 rounded font-normal'
          />
        </label>
        <label className='text-sm text-gray-700 font-bold flex-1'>
          Last Name
          <input
            type='text'
            readOnly
            disabled
            {...register('lastName')}
            className='mt-1 w-full border border-gray-300 bg-gray-200 p-2 rounded font-normal'
          />
        </label>
        <label className='text-sm text-gray-700 font-bold flex-1 md:col-span-2'>
          Email
          <input
            type='email'
            readOnly
            disabled
            {...register('email')}
            className='mt-1 w-full border border-gray-300 bg-gray-200 p-2 rounded font-normal'
          />
        </label>
      </div>
    </form>
  );
};

export default Booking;
