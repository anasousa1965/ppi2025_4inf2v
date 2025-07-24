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
  const warrantyText = {
    "12m": "12 Meses de Garantia Estendida",
    "24m": "24 Meses de Garantia Estendida",
  };

  const subtotalServices = warrantyPrices[selectedWarranty];

   return (
    <div className={styles.cartPage}>
      <h2>TRJ Megastore - Carrinho de Compras</h2>

      {groupedCart.length === 0 ? (
        <p className={styles.empty}>Seu carrinho está vazio.</p>
      ) : (
        <div className={styles.content}>
          {/* ESQUERDA */}
          <div className={styles.left}>
            <button className={styles.clearButton} onClick={clearCart}>
              REMOVER TODOS OS PRODUTOS
            </button>
            <ul className={styles.cartList}>
              {groupedCart.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <img src={item.thumbnail} alt={item.title} />
                  <div className={styles.details}>
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

            {/* SERVIÇOS */}
            <div className={styles.services}>
              <h3>🛠 SERVIÇOS</h3>
              <h4>📌 GARANTIA ESTENDIDA ORIGINAL AMPLIADA</h4>

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
                12 Meses de Garantia Estendida Kabum
                <span className={styles.installment}>Até 10x sem juros de R$ 38,31</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="warranty"
                  value="24m"
                  checked={selectedWarranty === "24m"}
                  onChange={(e) => setSelectedWarranty(e.target.value)}
                />
                24 Meses de Garantia Estendida Kabum
                <span className={styles.installment}>Até 10x sem juros de R$ 51,83</span>
              </label>

              <p className={styles.cond}>
                Ao adicionar a <strong>Garantia Estendida Original Ampliada</strong>, declaro que tive acesso, li e aceito as <span className={styles.link}>Condições gerais</span>
              </p>

              <p className={styles.subtotal}>
                <strong>Subtotal serviços:</strong> R$ {subtotalServices.toFixed(2)}
              </p>
            </div>
          </div>

          {/* DIREITA */}
          <div className={styles.right}>
            <h3>RESUMO</h3>
            <p><strong>Valor dos Produtos:</strong> R$ {total.toFixed(2)}</p>
            <p><strong>Total a prazo:</strong> R$ {(total + subtotalServices).toFixed(2)}</p>
            <p><em>(em até 10x de R$ {((total + subtotalServices) / 10).toFixed(2)} sem juros)</em></p>
            <hr />
            <p>
              <strong>Valor à vista no PIX:</strong><br />
              <span className={styles.pix}>R$ {(totalPix - subtotalServices).toFixed(2)}</span><br />
              <small>(Economize: R$ {economy})</small>
            </p>
            <div className={styles.buttons}>
              <button className={styles.continue}>CONTINUAR</button>
              <button className={styles.back}>VOLTAR</button>
              </div>
          </div>
        </div>
      )}
    </div>
  );
  }