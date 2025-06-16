import { Route, BrowserRouter, Routes } from "react-router-dom";

import Layout from "./layouts/Layouts";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout>
            <p>Home Page.</p>
          </Layout>
        }
      />

        <Route path="/search" element={
          <Layout>
            <p>Search Page</p>
          </Layout>
        }
      />
      </Routes>
    </BrowserRouter>
  );
};

export default App;