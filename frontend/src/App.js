import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage';


function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>

      <Routes>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
