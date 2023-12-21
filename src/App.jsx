import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./componets/HomePage";
import DashBoard from "./componets/DashBoard";
import DashboardProducts from "./componets/DashboardProducts";
import DashboardOrders from "./componets/DashboardOrders";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/home" element={<DashBoard />} />
          <Route path="/dashboard/" element={<DashBoard />} />
          <Route path="/dashboard/products" element={<DashboardProducts />} />
          <Route path="/dashboard/orders" element={<DashboardOrders />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
