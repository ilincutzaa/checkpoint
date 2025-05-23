import styles from "@/app/page.module.css"
import LoginForm from "@/app/components/login-form.jsx";

export default function Login() {
    return (
        <main className={styles.main}>
            <LoginForm></LoginForm>
        </main>
    );
}