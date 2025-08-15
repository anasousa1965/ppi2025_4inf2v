import styles from "./Cart.module.css";
import { useState } from "react";

export function Cart({ cart, setCart }) {
  const [selectedWarranty, setSelectedWarranty] = useState("none");

  const groupedCart = cart.reduce((acc, product) => {
    const existing = acc.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ ...product, quantity: 1 });
    }
    return acc;
  }, []);

  function updateQuantity(productId, delta) {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (delta > 0) {
        const product = prevCart.find((p) => p.id === productId);
        updatedCart.push(product);
      } else {
        const index = prevCart.findIndex((p) => p.id === productId);
        if (index !== -1) {
          updatedCart.splice(index, 1);
        }
      }
      return updatedCart;
    });
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const totalPix = (total * 0.9).toFixed(2);
  const economy = (total - totalPix).toFixed(2);

  const warrantyPrices = {
    none: 0,
    "12m": 383.10,
    "24m": 518.30,
  };

  const subtotalServices = warrantyPrices[selectedWarranty];

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>Carrinho de Compras</h2>

      {groupedCart.length === 0 ? (
        <p className={styles.empty}>Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className={styles.grid}>
            <div className={styles.leftPanel}>
              <button className={styles.clearButton} onClick={clearCart}>
                Remover todos os produtos
              </button>

              <ul className={styles.productList}>
                {groupedCart.map((item) => (
                  <li key={item.id} className={styles.productCard}>
                    <img src={item.thumbnail} alt={item.title} />

                    <div className={styles.productInfo}>
                      <h3>{item.title}</h3>
                      <p className={styles.price}>R$ {item.price.toFixed(2)}</p>
                      <div className={styles.quantityControl}>
                        <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.summaryBox}>
              <h3>Resumo</h3>
              <p><strong>Valor dos produtos:</strong> R$ {total.toFixed(2)}</p>
              <p><strong>Total a prazo:</strong> R$ {(total + subtotalServices).toFixed(2)}</p>
              <p><em>em até 10x de R$ {((total + subtotalServices) / 10).toFixed(2)} sem juros</em></p>
              <hr />
              <p>
                <strong>Valor à vista no PIX:</strong><br />
                <span className={styles.pixPrice}>R$ {(totalPix - subtotalServices).toFixed(2)}</span><br />
                <small>Economize: R$ {economy}</small>
              </p>

              <div className={styles.actions}>
                <button className={styles.primary}>Continuar</button>
                <button className={styles.secondary}>Voltar</button>
              </div>
            </div>
          </div>

          <div className={styles.servicesFullWidth}>
            <h3>Garantia Estendida Original Ampliada</h3>

            <label>
              <input
                type="radio"
                name="warranty"
                value="none"
                checked={selectedWarranty === "none"}
                onChange={(e) => setSelectedWarranty(e.target.value)}
              />
              Sem garantia
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                value="12m"
                checked={selectedWarranty === "12m"}
                onChange={(e) => setSelectedWarranty(e.target.value)}
              />
              12 meses – Até 10x de R$ 38,31
            </label>

            <label>
              <input
                type="radio"
                name="warranty"
                value="24m"
                checked={selectedWarranty === "24m"}
                onChange={(e) => setSelectedWarranty(e.target.value)}
              />
              24 meses – Até 10x de R$ 51,83
            </label>

            <p className={styles.note}>
              Ao adicionar a garantia estendida, você declara que leu e aceita os{" "}
              <span className={styles.link}>termos e condições</span>.
            </p>

            <p className={styles.subtotal}>
              <strong>Subtotal dos serviços:</strong> R$ {subtotalServices.toFixed(2)}
            </p>
          </div>
        </>
      )}
    </div>
  );
}