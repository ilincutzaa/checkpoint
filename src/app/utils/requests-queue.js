const LOCAL_STORAGE_KEY = 'pendingOps';

export function enqueueRequest(op) {
    const existing = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...existing, op]));
}

export async function flushQueue() {
    //await new Promise(resolve => setTimeout(resolve, 3000));
    console.log("flushing queue.......");
    const reqs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    for (const request of reqs) {
        if(request == null)
            continue;
        const response = await fetch(request.url, {
            method: request.method,
            headers: request.headers,
            body: request.body,
        });

        if (!response.ok) {
            console.log('Error fetching from queue. Might be from a duplicate request of delete');
        }
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function getQueueLength() {
    try{
        const reqs = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]')
        return reqs.length;
    }
    catch(e) {
        return 0
    }
}
