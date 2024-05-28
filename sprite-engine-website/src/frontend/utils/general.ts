import { URL } from "frontend/macros";
import { PATH_TO_ACCOUNT_FOLDER } from "frontend/macros";

function handleResponse(responseData: string) {
    if (responseData === "Bad Request") {
        const stack = new Error("Bad Request");
        throw stack;
    }
}

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

        handleResponse(responseData);

        return responseData as T;
    } catch (error: any) {
        Log.log("[ERROR] " + (error as Error).message);
        return error.message;
    }
}

export class Log
{
    public static log(msg: string)
    {
        console.log(msg);
    }
}

export function getOriginalPath(path: string) : string
{
    return URL + "/" + path;
}

export function getOriginalPicturePath(path: string) : string
{
    return `${PATH_TO_ACCOUNT_FOLDER}/accounts/icons/` + path;
}