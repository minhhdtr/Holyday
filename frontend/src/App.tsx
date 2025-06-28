import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import Layout from './layouts/Layouts';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import Search from './pages/Search';
import DetailHotel from './pages/DetailHotel';
import BookingHotel from './pages/BookingHotel';
import MyBookings from './pages/MyBookings';

const App = () => {
  const { isSignedIn } = useAppContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path='/search'
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path='/detail/:hotelId'
          element={
            <Layout>
              <DetailHotel />
            </Layout>
          }
        />
        <Route
          path='/register'
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path='/sign-in'
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isSignedIn && (
          <>
            <Route
              path='/my-bookings'
              element={
                <Layout>
                  <MyBookings />
                </Layout>
              }
            />
            <Route
              path='/add-hotel'
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path='/my-hotels'
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path='/edit-hotel/:hotelId'
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
            <Route
              path='/hotel/:hotelId/booking'
              element={
                <Layout>
                  <BookingHotel />
                </Layout>
              }
            />
          </>
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
