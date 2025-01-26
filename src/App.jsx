import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import ForgotPasswordForm from "./Pages/ForgotPasswordForm";
import ContactUsAdminPanel from "./Pages/ContactUsAdminPanel";
import ProductListingPage from "./pages/ProductManagement/ProductListing";
import OrderManagementPage from "./pages/OrderManagement/OrderList";
import TransactionManagement from "./pages/TransectionManagement/TransactionManagement";
import CustomerList from "./pages/CustomerManagement/CustomerList";
import AddProductPage from "./pages/ProductManagement/AddProductPage";
import ProfilePage from "./pages/Profile";
import OrderDetails from "./Pages/OrderManagement/OrderDetails";
import ProductDetailsPage from "./pages/ProductManagement/ProductDetailsPage";
import TransectionDetailsPage from "./pages/TransectionManagement/TransectionDetailsPage";
import OrderPage2 from "./pages/OrderManagement/OrderList2";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/dashboard" element={<Layout> <Dashboard /> </Layout>} />
        <Route path="/products" element={<Layout> <ProductListingPage /> </Layout>} />
        <Route path="/products/:id" element={<Layout> <ProductDetailsPage /> </Layout>} />
        <Route path="/products/add" element={<Layout> <AddProductPage /> </Layout>} />
        {/* <Route path="/orders" element={<Layout> <OrderManagementPage /> </Layout>} /> */}
        <Route path="/orders" element={<Layout> <OrderPage2 /> </Layout>} />
        <Route path="/orders/:id" element={<Layout> <OrderDetails/> </Layout>} />
        <Route path="/transactions" element={<Layout> <TransactionManagement /> </Layout>} />
        <Route path="/transactions/:id" element={<Layout> <TransectionDetailsPage /> </Layout>} />
        <Route path="/customers" element={<Layout> <CustomerList /></Layout>}/>
        <Route path="/contact-us" element={<Layout> <ContactUsAdminPanel /> </Layout>}/>
        <Route path="/profile" element={<Layout> <ProfilePage /> </Layout>}/>
      </Routes>
    </div>
  );
};

export default App;
