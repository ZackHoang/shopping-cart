import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

export default function Shop() {
    const [loading, setLoading] = useState(true); 
    const [alphabetical, setAlphabetical] = useState("asc"); 
    const [page, setPage] = useState(1); 
    const [genreID, setGenreID] = useState([""]); 
    const [mangas, setMangas] = useState([]); 
    const {mangasGenres, setProduct} = useOutletContext(); 

    useEffect(() => {
        const queryURL = `https://api.jikan.moe/v4/manga?sfw&genres=${genreID.join(",")}&page=${page}&start_date=2020-01-01&order_by=title&sort=${alphabetical}`; 
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
        <div>
            <form>
                <h2>Filter</h2>
                <div>
                    <h3>Sort</h3>
                    <select name="sort" id="sort" onChange={handleSort}>
                        <option value="asc">Name: A-Z</option>
                        <option value="desc">Name: Z-A</option>
                    </select>
                </div>
                <div>
                    <h3>Genre</h3>
                    {mangasGenres.map((genre) => {
                        return <div key={genre.mal_id}>
                            <input type="checkbox" id={genre.name} name={genre.name} value={genre.mal_id} onClick={handleGenreID}></input>
                            <label htmlFor={genre.name}>{genre.name}</label> 
                        </div>
                    })}
                </div>
            </form>
            {loading === true && <h2>Loading...</h2>}
            {loading === false && <div>
            {mangas.map((manga) => {
                return <Link to="/product" key={manga.id} onClick={() => handleProduct(manga)}>
                    <img src={manga.images.jpg.image_url}></img>
                    <p>{`$${manga.price}`}</p>
                    <figcaption>{manga.title}</figcaption>
                </Link>
            })}
            </div>
            }
            <div>
                <button value="-" onClick={handlePage}>-</button>
                <p>{page}</p>
                <button value="+" onClick={handlePage}>+</button>
            </div>
        </div>
    )
}