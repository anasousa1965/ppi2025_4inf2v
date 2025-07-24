import { createContext } from 'react';

export const CartContext = createContext(
{
    products: [],
    cart: [],
    addToCart: () => {},
    updateQtyCart: () => {},
    clearCart: () => {}
}
);

export function CartProvider({ children}) {
    export function ProductList({ addToCart }) {
      var category = "beauty";
      var limit = 12;
      var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;
    
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        async function fetchProducts() {
          try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setProducts(data.products);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        }
        setTimeout(() => {
          fetchProducts();
        }, 100);
      }, []);


    const [cart, setcart] =
}
