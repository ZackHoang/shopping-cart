import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./Product.module.css"

export default function Product() {
    const {product, cart, setCart} = useOutletContext(); 
    const [amount, setAmount] = useState(1); 

    const handleAddToCart = () => {
        if (cart.some((item) => item.title === product.title)) {
            const copyCart = cart.map((item) => {
                if (item.title === product.title) {
                    return {
                        ...item, 
                        amount: item.amount + parseInt(amount)
                    }
                }
            }); 
            console.log(copyCart); 
            setCart(copyCart); 
        } else {
            const copyCart = [...cart, {
                ...product, 
                amount: parseInt(amount)
            }]; 
            console.log(copyCart); 
            setCart(copyCart); 
        }
        alert(`${product.title} added into cart!`); 
    }

    return (
        <div className={styles.container}>
            <img loading="lazy" className={styles.cover} src={product.images.jpg.large_image_url}></img>
            <div className={styles.info}>
                <div>
                    <h2 className={styles.mangaTitle}>{product.title}</h2>
                    <p>Author: {product.authors[0].name}</p>
                    <p>{product.synopsis === null ? "No synopsis :(" : product.synopsis}</p>
                </div>
                <div className={styles.price}>
                    <h3 className={styles.priceTag}>${product.price}</h3>
                    <input className={styles.amount} type="number" value={amount} min={0} onChange={(event) => setAmount(event.target.value)}></input>
                    <button className={styles.purchaseBtn} onClick={handleAddToCart}>Add To Cart</button> 
                </div>
            </div>
        </div>
    )
}