type Props = {
  selectedMaxPrice?: number;
  onChange: (value?: number) => void;
};

const MaxPriceFilter = ({ selectedMaxPrice, onChange }: Props) => {
  return (
    <div className=''>
      <h4 className='text-md font-semibold mb-2'>Max Price</h4>
      <input
        type='number'
        className='w-full px-2 py-1 border rounded text-sm'
        placeholder='Enter max price'
        value={selectedMaxPrice || ''}
        onChange={(e) => {
          const value = e.target.value ? parseFloat(e.target.value) : undefined;
          onChange(value);
        }}
      />
    </div>
  );
};

export default MaxPriceFilter;
