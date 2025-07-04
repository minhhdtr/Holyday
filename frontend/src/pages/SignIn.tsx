import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
      showToast({
        message: 'Sign in successful',
        type: 'SUCCESS',
      });
      await queryClient.invalidateQueries('validateToken');
      navigate(location.state?.from?.pathname || '/');
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit} className='flex flex-col gap-5'>
      <h2 className='text-3xl font-bold'>Sign in</h2>

      <label className='text-gray-700 font-bold text-sm flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal'
          {...register('email', { required: 'This is required' })}
        ></input>
        {errors.email && <span className='text-red-500 text-xs'>{errors.email.message}</span>}
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
        {errors.password && <span className='text-red-500 text-xs'>{errors.password.message}</span>}
      </label>

      <span className='flex justify-between items-center'>
        <span className='text-sm'>
          Not register?
          <Link to='/register' className='underline'>
            Create an account here
          </Link>
        </span>
        <button
          type='submit'
          className='bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-500 transition-colors duration-300'
        >
          Sign in
        </button>
      </span>
    </form>
  );
};

export default SignIn;
