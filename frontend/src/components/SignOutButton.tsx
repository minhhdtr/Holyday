import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client';
import { useAppContext } from '../contexts/AppContext';

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('validateToken');
      showToast({
        message: 'Sign out successful',
        type: 'SUCCESS',
      });
      window.location.href = '/';
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: 'ERROR',
      });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className='text-blue-600 rounded-md px-3 font-bold bg-white hover:bg-gray-100 hover:cursor-pointer'
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
