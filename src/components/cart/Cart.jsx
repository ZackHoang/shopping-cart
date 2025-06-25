import { Link, useOutletContext } from "react-router-dom";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";
import Confetti from 'react-confetti'
import styles from "./Cart.module.css"

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
        <div className={styles.container}>
            <h2>Current Cart</h2>
            <div className={styles.items}>
                {cart.length > 0 && 
                    cart.map((item) => {
                        return <div className={styles.manga} key={item.id}>
                            <div className={styles.mangaInfo1}>
                                <img className={styles.cover} src={item.images.jpg.image_url}></img>
                                <h3 className={styles.title}>{item.title}</h3>
                            </div>
                            <div className={styles.mangaInfo2}>
                                <h3>${item.price}</h3>
                                <input type="number" value={item.amount} min={0} onChange={(event) => handleChangeAmount(item, event.target.value)}></input>
                                <TiDeleteOutline className={styles.deleteBtn} onClick={() => handleDeleteItem(item)}/>
                            </div>
                        </div>
                    })
                }
                {cart.length === 0 &&
                    <hgroup className={styles.empty}>
                        <h3>You have nothing in your cart right now</h3>
                        <Link className={styles.link} to="/shop">Go get yourself something!</Link>
                    </hgroup>
                }
            </div>
            <form className={styles.checkOut} onSubmit={handlePurchase}>
                <h3>Total</h3>
                <h2>${cart.reduce((accumulator, currentValue) => accumulator + currentValue.price*currentValue.amount, 0)}</h2>
                <button className={styles.purchaseBtn} type="submit">Purchase</button>
            </form>
            {purchased && <Confetti width={self.innerWidth} height={self.innerHeight} gravity={1} numberOfPieces={50} recycle={false} onConfettiComplete={() => setPurchased(false)}/>}
        </div>
    )
}