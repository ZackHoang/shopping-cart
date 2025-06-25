import { Link, useOutletContext } from "react-router-dom";
import styles from "./Shop.module.css"

export default function Shop() {
    const {loading, setLoading, setAlphabetical, page, setPage, genreID, setGenreID, mangas, mangasGenres, setProduct} = useOutletContext(); 

    const handleSort = (e) => {
        setAlphabetical(e.target.value); 
        setLoading(true); 
    }

    const handleGenreID = (e) => {
        if (e.target.checked === true && !genreID.some((id) => id === e.target.value)) {
            if (genreID.some((id) => id === "")) {
                console.log(genreID); 
                setGenreID([e.target.value]); 
            } else {
                console.log(genreID); 
                setGenreID([...genreID, e.target.value]); 
            }
        } else {
            let removeGenreID = genreID.filter((id) => id !== e.target.value); 
            console.log(removeGenreID); 
            if (removeGenreID.length === 0) {
                removeGenreID = [""]; 
            }
            setGenreID(removeGenreID); 
        }
        setLoading(true); 
    }

    const handlePage = (e) => {
        if (e.target.value === "+" && page < 5) {
            setPage(page + 1); 
            setLoading(true); 
        } else if (e.target.value === "-" && page > 1) {
            setPage(page - 1); 
            setLoading(true); 
        }
    }

    const handleProduct = (manga) => {
        setProduct(manga); 
    } 

    return (
        <div className={styles.container}>
            <form className={styles.filter}>
                <h2 className={styles.filterHeader}>Filter</h2>
                <div className={styles.filterChildren}>
                    <h3>Sort</h3>
                    <select name="sort" id="sort" onChange={handleSort}>
                        <option value="asc">Name: A-Z</option>
                        <option value="desc">Name: Z-A</option>
                    </select>
                </div>
                <div className={styles.filterChildren}>
                    <h3>Genre</h3>
                    {mangasGenres.map((genre) => {
                        return <div key={genre.mal_id}>
                            <input type="checkbox" id={genre.name} name={genre.name} value={genre.mal_id} onClick={handleGenreID}></input>
                            <label htmlFor={genre.name}>{genre.name}</label> 
                        </div>
                    })}
                </div>
            </form>
            {loading === true && <div className={styles.loader}></div>}
            {loading === false && <div className={styles.mangas}>
            {mangas.map((manga) => {
                return <Link className={styles.manga} to="/product" key={manga.id} onClick={() => handleProduct(manga)}>
                    <img src={manga.images.jpg.image_url}></img>
                    <figcaption className={styles.mangaTitle}>{manga.title}</figcaption>
                    <p>{`$${manga.price}`}</p>
                </Link>
            })}
            </div>
            }
            <div className={styles.page}>
                <button className={styles.pageBtn} value="-" disabled={page === 1} onClick={handlePage}>&#60;</button>
                <p>{page}</p>
                <button className={styles.pageBtn} value="+" disabled={page === 5} onClick={handlePage}>&#62;</button>
            </div>
        </div>
    )
}