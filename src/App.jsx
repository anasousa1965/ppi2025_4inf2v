import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { useState } from "react";
import { Cart } from "./components/Cart";
import { Route, Routes } from "react-router";

export default function App() {
  
  return (
    // React Fragment
    <>
      <CartProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart}removeFromCart={removeFromCart}/>}/>
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} addToCart={addToCart}/>} />
      </Routes>
  
  </>
  );
}
  