import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Sidebar from './components/Users/ProfileManagement/Sidebar/Sidebar';
import ProfileInfo from './components/Users/ProfileManagement/EmptyState/ProfileInfo/ProfileInfo';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import EmailVerification from './components/Auth/Verification/EmailVerification';
import EmailVerified from './components/Auth/Verification/EmailVerified';
import PasswordResetUrl from './components/Auth/Password Resetting/PasswordResetUrl';
import UserPasswordReset from './components/Auth/Password Resetting/UserPasswordReset';
import DashboardPage from './pages/DashboardPage';
import ProductPageById from './components/Product/ProductPageById';
import ProductPage from './pages/ProductPage';
import PasswordSetting from './components/Users/ProfileManagement/EmptyState/PasswordSetting/PasswordSetting';


import DashboardSidebar from './components/SellerDashboard/Sidebar/DashboardSidebar';
import SellerDashboard from './components/SellerDashboard/EmptyState/SellerDashboardPage/SellerDashboard';
import SellerProducts from './components/SellerDashboard/EmptyState/SellerProductPage/SellerProducts';
import UserAccountPage from './pages/UserAccountPages/UserAccountPage';
import UserProfileInfoPage from './pages/UserAccountPages/UserProfileInfoPage';
import CategoryProductPage from './pages/CategoryProductsPage';



function App() {

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {



  const location = useLocation();
  const isProfilePage = location.pathname.startsWith('/user/profile');
  const isDashboardPage = location.pathname.startsWith('/seller/')

  return (
    <>

      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email/:email" element={<EmailVerification />} />
          <Route path="/verify-email/token/:token" element={<EmailVerified />} />
          <Route path="/password-reset/" element={<PasswordResetUrl />} />
          <Route path="/password-reset/token/:token" element={<UserPasswordReset />} />
        </Routes>
      </div>


      {/* Define the user profile route separately */}
      <Routes>
        <Route path="/user/account" element={<UserAccountPage />} />
        <Route path="/user/account/manage-profile" element={<UserProfileInfoPage />} />
      </Routes>


      {/* Add other routes as needed */}
      <div className="flex">
        {isDashboardPage && <DashboardSidebar />}
        <Routes>
          <Route path="/seller/dashboard" element={<SellerDashboard />} />
          <Route path="/seller/products" element={<SellerProducts />} />
        </Routes>
      </div>
  

      <Routes>
        <Route path="/category/:categoryName" element={<CategoryProductPage />} />
      </Routes>


    </>
  );
}

export default App;
