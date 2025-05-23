import styles from "@/app/page.module.css"
import SignupForm from "@/app/components/signup-form.jsx";

export default function Signup() {
    return (
        <main className={styles.main}>
            <SignupForm></SignupForm>
        </main>
    );
}