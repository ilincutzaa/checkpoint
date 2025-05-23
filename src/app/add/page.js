import GameCreateForm from "@/app/components/game-create-form";
import styles from '@/app/add/page.module.css'

export default function Add() {
    return (
        <main className={styles.main}>
            <GameCreateForm />
        </main>
    );
}