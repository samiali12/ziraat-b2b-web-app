import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage';
import ServicesPage from './pages/ServicesPage';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route exact path="/services" element={<ServicesPage />} />
      </Routes>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
