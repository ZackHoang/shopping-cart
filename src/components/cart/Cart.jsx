import { Link, useOutletContext } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";
import Confetti from 'react-confetti'

export default function Cart() {
    const {cart, setCart} = useOutletContext(); 
    const [purchased, setPurchased] = useState(false); 

    const handleChangeAmount = (searchItem, amount) => {
        const copyCart = cart.map((item) => {
            if (item.id === searchItem.id) {
                return {
                    ...item, 
                    amount: parseInt(amount)
                }
            }
        }); 
        console.log(copyCart); 
        setCart(copyCart); 
    }

    const handlePurchase = (e) => {
        e.preventDefault(); 
        setPurchased(true); 
    }

    const handleDeleteItem = (deleteItem) => {
        setCart(cart.filter((item) => item.id !== deleteItem.id)); 
    }

    return(
        <div>
            <h2>Current Cart</h2>
            {cart.length > 0 && 
                cart.map((item) => {
                    return <div key={item.id}>
                        <div>
                            <img src={item.images.jpg.image_url}></img>
                            <h3>{item.title}</h3>
                        </div>
                        <div>
                            <h3>${item.price}</h3>
                            <input type="number" value={item.amount} min={0} onChange={(event) => handleChangeAmount(item, event.target.value)}></input>
                            <TiDeleteOutline onClick={() => handleDeleteItem(item)}/>
                        </div>
                    </div>
                })
            }
            {cart.length === 0 &&
                <hgroup>
                    <h3>You have nothing in your cart right now</h3>
                    <Link to="/shop">Go get yourself something!</Link>
                </hgroup>
            }
            <form onSubmit={handlePurchase}>
                <h3>Total</h3>
                <h2>${cart.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.amount, 0)}</h2>
                <button type="submit">Purchase</button>
            </form>
            {purchased && <Confetti gravity={1} numberOfPieces={50} recycle={false} onConfettiComplete={() => setPurchased(false)}/>}
        </div>
    )
}