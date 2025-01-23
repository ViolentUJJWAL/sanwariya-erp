import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './pages/LoginForm'
import Layout from './Layout/Layout'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path="/dashboard" element={<Layout> <Dashboard/> </Layout>} />
      </Routes>
    </div>
  )
}

export default App;
