import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./componets/HomePage";
import DashBoard from "./componets/DashBoard";
import DashboardProducts from "./componets/DashboardProducts";
import DashboardOrders from "./componets/DashboardOrders";

import RegisterPage from "./componets/RegisterPage";
import ProductPage from "./componets/ProductPage";
import ProductDetails from "./componets/ProductDetails";
import MyCart from "./componets/MyCart";
import DashBoardAddProduct from "./componets/DashBoardAddProduct";
import DashboardUpdateProduct from "./componets/DashboardUpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/home" element={<DashBoard />} />
          <Route path="/dashboard/" element={<DashBoard />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/products/add" element={<DashBoardAddProduct />} />
          <Route path="/dashboard/products/:productId" element={<DashboardUpdateProduct />} />
          <Route path="/dashboard/orders" element={<DashboardOrders />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/product/:category" element={<ProductPage />} />
          <Route path="/productDetail/:productId" element={<ProductDetails />} />
          <Route path="/mycart" element={<MyCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
