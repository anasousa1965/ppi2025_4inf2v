import { useState } from "react";
import styles from "./ProductsManager.module.css";

export function ProductsManager() {
const [products, setProducts] = useState([
    { id: 1, title: "Base Líquida", price: 120, description: "Base líquida de cobertura média" },
    { id: 2, title: "Máscara de Cílios", price: 80, description: "Máscara para alongamento e volume" },
  ]);

  const [formState, setFormState] = useState({
    id: null,
    title: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      if (formState.id) {
          setProducts((prevProducts) =>
              prevProducts.map((p) => (p.id === formState.id ? { ...p, ...formState } : p))
          );
           } else {
          const newProduct = { ...formState, id: Date.now() };
          setProducts((prevProducts) => [...prevProducts, newProduct]);
      }
       setFormState({ id: null, title: "", price: "", description: "" });
  };

  const handleRemove = (id) => {
    if (window.confirm("Tem certeza que deseja remover este produto?")) {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setFormState(product);
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciamento de Produtos de Maquiagem</h2>

 <div className={styles.formSection}>
        <h3>{formState.id ? "Editar Produto" : "Adicionar Produto"}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Nome do Produto</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Preço</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formState.price}
              onChange={handleChange}
              required
              className={styles.input}
             />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              required
              className={styles.textarea}
               />
          </div>
          <button type="submit" className={styles.button}>
            {formState.id ? "Salvar Alterações" : "Adicionar"}
          </button>
          {formState.id && (
            <button
              type="button"
              onClick={() => setFormState({ id: null, title: "", price: "", description: "" })}
              className={styles.cancelButton}
            >
              Cancelar Edição
            </button>
          )}
        </form>
      </div>

      <div className={styles.listSection}>
        <h3>Lista de Produtos de Maquiagem</h3>
        <ul className={styles.productList}>
          {products.map((product) => (
            <li key={product.id} className={styles.productItem}>
              <div className={styles.productInfo}>
                <p>
                  <strong>{product.title}</strong> - R$ {product.price}
                </p>
                <p>{product.description}</p>
              </div>
              <div className={styles.productActions}>
                <button onClick={() => handleEdit(product)} className={styles.editButton}>
                  Editar
                </button>
                <button onClick={() => handleRemove(product.id)} className={styles.removeButton}>
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}