// import { useEffect } from 'react'
import { useState, useEffect } from 'react';
import styles from './App.module.css'
import { Link, Outlet } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

function App() {
  const [loading, setLoading] = useState(true); 
  const [alphabetical, setAlphabetical] = useState("asc"); 
  const [page, setPage] = useState(1); 
  const [genreID, setGenreID] = useState([""]); 
  const [mangas, setMangas] = useState([]); 

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

  useEffect(() => {
    const queryURL = `https://api.jikan.moe/v4/manga?sfw&genres=${genreID.join(",")}&page=${page}&start_date=2000-01-01&order_by=title&sort=${alphabetical}&type=manga`; 
    console.log(queryURL); 
    fetch(queryURL)
    .then((response) => {
        return response.json(); 
    })
    .then((data) => { 
        const mappedMangas = data.data.map((manga) => ({
            ...manga, 
            id: crypto.randomUUID(),
            price: Math.round(0.5 * manga.title.length), 
            amount: 1
        })); 
        const filteredMangas = []; 
        for (let i = 0; i < mappedMangas.length; i++) {
            if (!filteredMangas.some((manga) => manga.title === mappedMangas[i].title)) {
                filteredMangas.push(mappedMangas[i]); 
            }
        }
        console.log(filteredMangas); 
        setMangas(filteredMangas); 
    })
    .catch((e) => {
        console.error(e); 
    })
    .finally(() => {
        setLoading(false); 
    })        

  }, [alphabetical, page, genreID]);

  return (
    <>
      <nav className={styles.navBar}>
        <h1 className={styles.brand}>MangaShop</h1>
        <ul className={styles.linksContainer}>
          <li className={styles.list}>
            <FaHome className={styles.icon} />
            <Link className={styles.link} to="/">Home</Link>
          </li>
          <li className={styles.list}>
            <FaShoppingBag className={styles.icon} />
            <Link className={styles.link} to="shop">Shop</Link>
          </li>
          <li className={styles.list}>
            <FaShoppingCart className={styles.icon} />
            <Link className={styles.link} to="cart">Cart</Link>
          </li>
        </ul>
      </nav>
      <Outlet context={{
        loading, setLoading,
        alphabetical, setAlphabetical,
        page, setPage,
        genreID, setGenreID,
        mangas, setMangas,
        cart, setCart,
        product, setProduct,
        mangasGenres}}></Outlet>
    </>
  )
}

export default App
