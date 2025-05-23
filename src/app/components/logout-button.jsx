import {useRouter} from "next/navigation";
import styles from "@/app/components/logout-button.module.css";

export default function LogoutButton(){
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            });

            if (res.ok) {
                router.push('/');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <div className={styles.container}>
            <button className={styles.button} onClick={handleLogout}>Logout</button>
        </div>
    )
}