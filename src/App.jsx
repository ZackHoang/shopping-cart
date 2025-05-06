// import { useEffect } from 'react'
import { useState, useEffect } from 'react';
import './App.css'
import { Link, Outlet } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]); 
  const [product, setProduct] = useState({}); 
  const [mangasGenres, setMangasGenres] = useState([]); 

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/genres/manga?filter=genres")
    .then((response) => {
        return response.json(); 
    })
    .then((data) => {
        console.log(data);
        setMangasGenres(data.data); 
    })
}, [])

  return (
    <>
      <nav>
        <h1>MangaShop</h1>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="shop">Shop</Link>
          </li>
          <li>
            <Link to="cart">Cart</Link>
          </li>
        </ul>
      </nav>
      <Outlet context={{cart, setCart, product, setProduct, mangasGenres}}></Outlet>
    </>
  )
}

export default App
