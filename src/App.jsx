import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginForm from './pages/LoginForm'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm/>} />
      </Routes>
    </div>
  )
}

export default App
