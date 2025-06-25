import styles from "./Home.module.css"; 
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <div className={styles.title}>
            <h2 className={styles.description}>YOUR ONE STOP SHOP FOR MANGA</h2>
            <Link className={styles.link} to="shop">SHOP NOW</Link>
        </div>
    )
}