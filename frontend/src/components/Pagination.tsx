export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagenation = ({ page, pages, onPageChange }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center'>
      <ul className='flex border border-gray-300'>
        {pageNumbers.map((number) => (
          <li key={number} className={`px-2 py-1 ${page === number ? 'bg-gray-100' : ''}`}>
            <button className='hover:underline' onClick={() => onPageChange(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagenation;
