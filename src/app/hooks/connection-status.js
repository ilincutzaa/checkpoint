'use client'
import {useNetworkStatus} from "@/app/hooks/network-status";
import {useServerStatus} from "@/app/hooks/server-status";

export function useConnectionStable() {
    const { isOffline} = useNetworkStatus();
    const { isServerDown } = useServerStatus()
    return !isOffline && !isServerDown;
}