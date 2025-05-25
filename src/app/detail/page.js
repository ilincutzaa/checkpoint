import { Suspense } from 'react';
import DetailClient from './DetailClient';
import styles from '@/app/detail/page.module.css';

export default function DetailPage() {
    return (
        <main className={styles.main}>
            <Suspense fallback={<div>Loading...</div>}>
                <DetailClient />
            </Suspense>
        </main>
    );
}
