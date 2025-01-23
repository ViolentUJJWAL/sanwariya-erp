import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import Layout from './Layout/Layout'
import Dashboard from './pages/Dashboard'
import ProductListingPage from './pages/ProductManagement/ProductListing'
import OrderManagementPage from './pages/OrderManagement/OrderList'
import TransactionManagement from './pages/TransectionManagement/TransactionManagement'
import CustomerList from './pages/CustomerManagement/CustomerList'
import AddProductPage from './pages/ProductManagement/AddProductPage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dashboard" element={<Layout> <Dashboard /> </Layout>} />
        <Route path="/products" element={<Layout> <ProductListingPage /> </Layout>} />
        <Route path="/add-product" element={<Layout> <AddProductPage /> </Layout>} />
        <Route path="/orders" element={<Layout> <OrderManagementPage /> </Layout>} />
        <Route path="/transactions" element={<Layout> <TransactionManagement /> </Layout>} />
        <Route path="/customers" element={<Layout> <CustomerList /> </Layout>} />
      </Routes>
    </div>
  )
}

export default App;
