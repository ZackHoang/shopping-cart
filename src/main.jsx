import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Shop from './components/shop/Shop.jsx'
import Cart from './components/cart/Cart.jsx'
import Home from './components/home/Home.jsx'
import Product from './components/product/Product.jsx'

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App/>,
    children: [
      {index: true, element: <Home/>},
      {path: "shop", element: <Shop/>}, 
      {path: "cart", element: <Cart/>}, 
      {path: "product", element: <Product/>}
    ]
  },
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
