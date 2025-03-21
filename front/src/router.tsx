import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layout/mainLayout'
import Home from './page/Home'
import Products from './page/Products'
import Login from './page/Login'
import Cart from './page/Cart'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="Products" element={<Products />} />
          <Route path="Cart" element={<Cart />} />
          {/* <Route path="NousConnaitre" element={<NousConnaitre />} />
          <Route path="EspacePresse" element={<EspacePresse />} />
          <Route path="AdminPanel" element={<AdminPanel />} />
          <Route path="Panier" element={<Panier />} />
          <Route path="NosProjets" element={<NosProjets />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
