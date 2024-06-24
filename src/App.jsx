import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/FakeAuthContext.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import ProtectedRoute from './pages/ProtectedRoute.jsx';

import CityList from './components/CityList.jsx';
import City from './components/City.jsx';
import CountriesList from './components/CountriesList.jsx';
import Form from './components/Form.jsx';
import SpinnerFullPage from './components/SpinnerFullPage.jsx';

// import Homepage from './pages/Homepage.jsx';
// import Product from './pages/Product.jsx';
// import Pricing from './pages/Pricing.jsx';
// import Login from './pages/Login.jsx';
// import AppLayout from './pages/AppLayout.jsx';
// import PageNotFound from './pages/PageNotFound.jsx';

const Homepage = lazy(() => import('./pages/Homepage.jsx'));
const Product = lazy(() => import('./pages/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout.jsx'));
const PageNotFound = lazy(() => import('./pages/PageNotFound.jsx'));

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />

              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />

              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />

                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
