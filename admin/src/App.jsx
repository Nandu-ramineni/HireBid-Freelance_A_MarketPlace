import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Homepage from './Pages/Homepage';
import DataProvider from './context/DataProvider';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminSignIn from './components/Auth/Signin';

const App = () => {
  const token = Cookies.get('accessToken');
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          {/* Public Route */}
          <Route
            path="/login"
            element={token ? <Navigate to="/" replace /> : <AdminSignIn />}
          />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/*" element={<Homepage />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
};

export default App;
