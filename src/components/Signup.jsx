import styles from "./Signup.module.css";
import { Link } from "react-router";

export function Signup() {
    return (
        <div className={styles.SignupContainer}>
            <h1>Cadastro de Usuário</h1>
            <form className={styles.signupForm}>
                <label htmlFor="name">Nome completo:</label>
                <input type="text" id="name" name="name" required className={styles.input} />

                <label htmlFor="email">E-Mail:</label>
                <input type="email" id="email" name="email" required className={styles.input} />

                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" name="password" required className={styles.input} />

                <button type="submit" className={styles.button}>Cadastrar</button>
            </form>
            <Link to="/login" className={styles.loginLink}>Já tem uma conta? Faça login</Link>
        </div>
    );
}