import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/mainLayout'
import Home from './page/Home'
import Products from './page/Products'
import Login from './page/Login'
import Cart from './page/Cart'
import AdminDashboard from './page/AdminDashboard'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="Home" element={<Home />} />
          <Route path="Products" element={<Products />} />
          <Route path="Cart" element={<Cart />} />
          <Route path="Admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
