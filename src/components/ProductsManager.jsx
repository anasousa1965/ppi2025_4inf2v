import styles from "./Product.module.css";

export function ProductsManager() {
  // Variáveis simples para controlar estado
  let products = [
    { id: 1, name: "Produto A", price: 100, description: "Descrição A" },
    { id: 2, name: "Produto B", price: 200, description: "Descrição B" },
  ];

  // Só para exemplo, não faz nada ainda
  function handleSubmit(event) {
    event.preventDefault();
    alert("Salvar produto (implemente a lógica aqui)");
  }

  return (
    <div className={styles.ProductContainer}>
      <h1>Gerenciar Produtos</h1>

      <form className={styles.productForm} onSubmit={handleSubmit}>
        <label htmlFor="name">Nome do Produto:</label>
        <input type="text" id="name" name="name" required className={styles.input} />

        <label htmlFor="price">Preço:</label>
        <input type="number" id="price" name="price" required className={styles.input} />

        <label htmlFor="description">Descrição:</label>
        <textarea id="description" name="description" className={styles.input}></textarea>

        <button type="submit" className={styles.button}>Salvar Produto</button>
      </form>

      <h2>Produtos cadastrados</h2>
      <ul className={styles.productList}>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <strong>{product.name}</strong> - R$ {product.price}
            <p>{product.description}</p>
            <button className={styles.editButton}>Editar</button>
            <button className={styles.deleteButton}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}