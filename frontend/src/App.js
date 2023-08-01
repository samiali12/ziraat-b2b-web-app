import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';
import Login from './components/Auth/Login/Login';
import Signup from './components/Auth/Signup/Signup';
import EmailVerification from './components/Auth/Verification/EmailVerification';
import EmailVerified from './components/Auth/Verification/EmailVerified';
import PasswordResetUrl from './components/Auth/Password Resetting/PasswordResetUrl';
import UserPasswordReset from './components/Auth/Password Resetting/UserPasswordReset';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route exact path="/home" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route exact path="/services" element={<ServicesPage />} />
      </Routes>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>

      <Routes>
        <Route exact path="/login" element={<Login/>} />
      </Routes>

      <Routes>
        <Route exact path="/signup" element={<Signup/>} />
      </Routes>

      <Routes>
        <Route exact path="/user/verify-email/:id" element={<EmailVerification />} />
      </Routes>

      <Routes>
        <Route path="/verify-email/token/:token" element={<EmailVerified/>} />
      </Routes>

      <Routes>
        <Route path="/password-reset/" element={<PasswordResetUrl/>} />
      </Routes>

      <Routes>
        <Route path="/password-reset/token/:token" element={<UserPasswordReset/>} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
