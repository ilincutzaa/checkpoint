import { Suspense } from 'react';
import UpdateClient from './UpdateClient.js';

import styles from '@/app/detail/page.module.css';

export default function UpdatePage() {
    return (
        <main className={styles.main}>
            <Suspense fallback={<div>Loading...</div>}>
                <UpdateClient />
            </Suspense>
        </main>
    );
}
