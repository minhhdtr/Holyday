import { useForm } from 'react-hook-form';
import type { PaymentIntentResponse, UserType } from '../../../../backend/src/shared/type';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import type { StripeCardElement } from '@stripe/stripe-js';
import { useAppContext } from '../../contexts/AppContext';
import { useSearchContext } from '../../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as apiClient from '../../api-client';

type Props = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  checkIn: string;
  checkOut: string;
  adultCount: number;
  childCount: number;
  hotelId: string;
  ammount: number;
  paymentIntentId: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const stripe = useStripe();

  const elements = useElements();

  const search = useSearchContext();

  const { hotelId } = useParams();

  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      adultCount: search.adultCount,
      childCount: search.childCount,
      hotelId: hotelId,
      ammount: paymentIntent.amount,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const { showToast } = useAppContext();

  const { mutate: createBooking, isLoading } = useMutation(apiClient.createBooking, {
    onSuccess: () => {
      showToast({
        message: 'Booking created successfully!',
        type: 'SUCCESS',
      });
    },
    onError: () => {
      showToast({
        message: 'Failed to create booking',
        type: 'ERROR',
      });
    },
  });

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
        },
      },
    });
    if (result.paymentIntent?.status === 'succeeded') {
      createBooking({
        ...formData,
        paymentIntentId: result.paymentIntent.id,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='grid grid-cols-1 gap-5 rounded-lg border border-gray-300 h-fit p-5'
    >
      <h2 className='text-3xl font-bold'>Confirm your details</h2>

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

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Your Price Summary</h2>
        <div className='bg-blue-300 rounded-md p-5'>
          <h3 className='text-xl font-semibold'>Total Ammount: $ {paymentIntent.amount.toFixed(2)}</h3>
          <p className='text-sm text-gray-700'>Includes all taxes and charges.</p>
        </div>
      </div>

      <div className='space-y-2'>
        <h2 className='text-xl font-semibold'>Payment Detail</h2>
        <CardElement id='payment-element' className='border rounded-md p-2' />
      </div>

      <div className='flex justify-end mt-5'>
        <button
          type='submit'
          disabled={isLoading}
          className=' bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700 transition-colors disabled:bg-gray-400'
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
