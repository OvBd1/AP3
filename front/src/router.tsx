import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import MainLayout from './layout/mainLayout'
import { tokenPayload } from './interface/tokenPayload'
import Home from './page/Home'
import Products from './page/Products'
import Login from './page/Login'
import Cart from './page/Cart'
import Profile from './page/Profile'
import AdminDashboard from './page/AdminDashboard'

export default function App() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const user = jwtDecode<tokenPayload>(token)
        console.log(user)
        setAdmin(user.auth)
      } catch (error) {
        console.error('Invalid token:', error)
        setAdmin(false)
      }
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="Home" element={<Home />} />
          <Route path="Products" element={<Products />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="Admin" element={admin ? <AdminDashboard /> : <Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
