import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Product() {
    const {product, cart, setCart} = useOutletContext(); 
    const [amount, setAmount] = useState(1); 

    const handleAddToCart = () => {
        if (cart.some((item) => item.id === product.id)) {
            const copyCart = cart.map((item) => {
                if (item.id === product.id) {
                    return {
                        ...item, 
                        amount: parseInt(amount) 
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
        <div>
            <img src={product.images.jpg.image_url}></img>
            <div>
                <h2>{product.title}</h2>
                <p>{product.authors[0].name}</p>
                <p>{product.synopsis === null ? "No synopsis :(" : product.synopsis}</p>
            </div>
            <div>
                <h3>${product.price}</h3>
                <input type="number" value={amount} min={0} onChange={(event) => setAmount(event.target.value)}></input>
                <button onClick={handleAddToCart}>Add To Cart</button> 
            </div>
        </div>
    )
}