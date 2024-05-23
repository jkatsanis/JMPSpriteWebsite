export async function bFetch<T>(url: string, method: string, data?: any): Promise<T> {
    const options: RequestInit = {
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        return responseData as T;
    } catch (error) {
        console.log('[Error:]', error);
        return null!;
    }
}
