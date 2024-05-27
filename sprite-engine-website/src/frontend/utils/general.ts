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
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json() as T;
        } else {
            // Handle non-JSON responses here
            // For example, return response.text() for text responses
            throw new Error('Unexpected response format');
        }
    } catch (error) {
        console.error('[Error:]', error);
        return null!;
    }
}

export class Log
{
    public static log(msg: string)
    {
        console.log(msg);
    }
}
