import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import LatestDestinationCard from '../components/LatestDestinationCard';

const HomePage = () => {
  const { data: hotels } = useQuery('fetchHotels', apiClient.fetchHotels);

  if (!hotels) {
    return <div>Loading...</div>;
  }
  if (hotels.length === 0) {
    return <div>No hotels available</div>;
  }

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className='space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className='grid gap-4'>
        <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
