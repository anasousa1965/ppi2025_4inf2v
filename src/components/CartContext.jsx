import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../context/SessionContext";

export const CartContext = createContext({
  products: [],
  loading: false,
  error: null,
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  clearCart: () => {},
  removeFromCart: () => {},
  isAdmin: false,
  refreshProducts: () => {},
});

export function CartProvider({ children }) {
  const { session, profile } = useContext(SessionContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cart, setCart] = useState([]);

  // -------------------------
  // 1) Carrega produtos do Supabase
  // -------------------------
  async function refreshProducts() {
    const { data, error } = await supabase.from("product_2v").select("*");

    if (error) setError(error.message);
    else setProducts(data);

    setLoading(false);
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  // -------------------------
  // 2) Carrega o carrinho do usuário logado
  // -------------------------
  useEffect(() => {
    if (!session?.user) {
      setCart([]);
      return;
    }

    async function loadCart() {
      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", session.user.id);

      if (!error) setCart(data);
    }

    loadCart();
  }, [session]);

  // -------------------------
  // 3) Salvar carrinho no Supabase
  // -------------------------
  async function syncCartToSupabase(newCart) {
    if (!session?.user) return;

    await supabase.from("cart").delete().eq("user_id", session.user.id);

    if (newCart.length > 0) {
      await supabase.from("cart").insert(
        newCart.map((item) => ({
          user_id: session.user.id,
          product_id: item.id,
          quantity: item.quantity,
        }))
      );
    }
  }

  // -------------------------
  // 4) Funções do Carrinho
  // -------------------------
  async function addToCart(product) {
    const exists = cart.find((item) => item.id === product.id);

    let newCart;

    if (exists) {
      newCart = cart.map((it) =>
        it.id === product.id
          ? { ...it, quantity: it.quantity + 1 }
          : it
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
    await syncCartToSupabase(newCart);
  }

  async function updateQtyCart(productId, quantity) {
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );

    setCart(newCart);
    await syncCartToSupabase(newCart);
  }

  async function removeFromCart(productId) {
    const newCart = cart.filter((item) => item.id !== productId);

    setCart(newCart);
    await syncCartToSupabase(newCart);
  }

  async function clearCart() {
    setCart([]);
    await syncCartToSupabase([]);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        error,
        cart,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
        isAdmin: profile?.admin || false,
        refreshProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

