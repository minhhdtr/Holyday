import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
  onClose: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  const toastStyles = {
    SUCCESS: 'bg-green-600 text-white',
    ERROR: 'bg-red-600 text-white',
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${toastStyles[type]}`}>
      <div className='flex justify-center items-center'>
        <span className='text-md font-semibold'>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
