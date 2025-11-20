import "./styles/theme.css";
import "./styles/global.css";

import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { Route, Routes } from "react-router";
import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "./context/SessionContext"; // <-- ADICIONADO AQUI
import { ToastContainer } from "react-toastify";
import { Login } from "./components/Login";
import { User } from "./components/User";

export default function App() {
  return (
    <>
      <ToastContainer />

      <SessionProvider>         {/* <-- ENVOLVE TUDO O QUE PRECISA DA SESSÃO */}
        <CartProvider>          {/* <-- Mantém seu Carrinho funcionando */}
          <Header />

          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<Login value="signin" />} />
            <Route path="/register" element={<Login value="register" />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </CartProvider>
      </SessionProvider>
    </>
  );
}
