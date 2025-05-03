'use client'

import { useEffect, useState } from "react";

export function useNetworkStatus() {
    const [isOffline, setOffline] = useState(true)

    useEffect(() => {
        setOffline(!window.navigator.onLine);

        function handleOffline() {
            setOffline(true);
        }
        function handleOnline() {
            setOffline(false);
        }

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    return { isOffline };
}
