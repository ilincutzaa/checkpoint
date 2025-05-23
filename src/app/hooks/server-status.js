import {useEffect, useState} from "react";

export function useServerStatus(pingUrl = '/api/health') {
    const [isServerDown, setIsServerDown] = useState(false);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(pingUrl)
                if(!response.ok) {
                    throw new Error("Problem reaching the server")
                }
                setIsServerDown(false)
            } catch (error) {
                setIsServerDown(true)
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [pingUrl])

    return {isServerDown}
}