'use client'

import {useNetworkStatus} from "@/app/hooks/network-status";
import styles from '@/app/components/status-banner.module.css'
import {useServerStatus} from "@/app/hooks/server-status";
import {getQueueLength} from "@/app/utils/requests-queue";

export default function StatusBanner() {
    const {isOffline} = useNetworkStatus()
    const {isServerDown} = useServerStatus()

    if(isOffline && isServerDown) {
        return (
            <div className={styles.bothDown}>No internet connection and server unreachable. Saved {getQueueLength()} request(s)</div>
        )
    }

    if(isOffline) {
        return (
            <div className={styles.internetDown}>Internet connection lost. Saved {getQueueLength()} request(s)</div>
        )
    }

    if(isServerDown) {
        return (
            <div className={styles.serverDown}>Server is unreachable. Saved {getQueueLength()} request(s)</div>
        )
    }

    return (
        <div className={styles.allGood}>Connection stable. Awaiting to sync {getQueueLength()} request(s)</div>
    )
}