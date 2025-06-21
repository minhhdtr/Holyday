import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import Layout from './layouts/Layouts';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';

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
              <p>Search Page</p>
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

        {isSignedIn && (<>
          <Route
            path='/add-hotel'
            element={
              <Layout>
                <AddHotel />
              </Layout>
            }
          />
        </>)}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
