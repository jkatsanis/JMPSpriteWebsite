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
        let responseData;
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            // Handle non-JSON response
            responseData = await response.text();
        }

        if(responseData === "Bad Request")
        {
            Log.log("[ERROR] Bad Request!");
        }

        return responseData as T;
    } catch (error) {
        Log.log("[ERROR] " + error);
        throw error!;
    }
}

export class Log
{
    public static log(msg: string)
    {
        console.log(msg);
    }
}
