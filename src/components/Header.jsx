import { ShoppingBasket } from "lucide-react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom"; 
export function Header({ cart }) {
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const itemCount = cart.length;

   return (
    <header className={styles.container}>
      <Link to="/" className={styles.logo}>
        <h1>TRJ Megastore</h1>
      </Link>



      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/login" className={styles.loginButton}>
          Login
        </Link>

        <Link to="/products" className={styles.loginButton}>
        Gerenciar Produtos
        </Link>

        <Link to="/cart" className={styles.cartInfo} style={{ position: "relative" }}>
        <ShoppingBasket size={28} />
          {itemCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "orange",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              {itemCount}
            </span>
          )}
          <p>Total: R$ {total.toFixed(2)}</p>
        </Link>
      </nav>
    </header>
  );
}