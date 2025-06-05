import styles from "@/app/components/button.module.css";

export default function LogoutButton(){

    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            });

            if (res.ok) {
                window.location.replace('/')
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