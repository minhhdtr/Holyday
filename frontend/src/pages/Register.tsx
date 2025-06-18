import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      // console.log('Registration successful');
      await queryClient.invalidateQueries('validateToken');
      showToast({
        message: 'Registration successful',
        type: 'SUCCESS',
      });
      navigate('/');
    },
    onError: (error: Error) => {
      // console.error(error.message);
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5 '>
      <h2 className='text-3xl font-bold'>Create an account</h2>

      <div className='flex flex-col md:flex-row gap-5'>
        <label className='text-gray-700 font-bold text-sm flex-1'>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('firstName', { required: 'This is required' })}
          ></input>
          {errors.firstName && (
            <span className='text-red-500 text-xs'>
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className='text-gray-700 font-bold text-sm flex-1'>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register('lastName', { required: 'This is required' })}
          ></input>
          {errors.lastName && (
            <span className='text-red-500 text-xs'>
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className='text-gray-700 font-bold text-sm flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('email', { required: 'This is required' })}
        ></input>
        {errors.email && (
          <span className='text-red-500 text-xs'>{errors.email.message}</span>
        )}
      </label>
      <label className='text-gray-700 font-bold text-sm flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('password', {
            required: 'This is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        ></input>
        {errors.password && (
          <span className='text-red-500 text-xs'>
            {errors.password.message}
          </span>
        )}
      </label>
      <label className='text-gray-700 font-bold text-sm flex-1'>
        Confirm password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('confirmPassword', {
            validate: (value) => {
              if (!value) return 'This is required';
              else if (watch('password') !== value)
                return 'Passwords do not match';
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <span className='text-red-500 text-xs'>
            {errors.confirmPassword.message}
          </span>
        )}
      </label>

      <span className='flex justify-between items-center'>
        <span className='text-sm'>
          Already have an account? 
          <Link to='/sign-in' className='underline'>
            Sign in here
          </Link>
        </span>
        <button
          type='submit'
          className='bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-500 transition-colors duration-300'
        >
          Create account
        </button>
      </span>
    </form>
  );
};

export default Register;
