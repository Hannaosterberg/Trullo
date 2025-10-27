export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function apiPost(path: string, body: any, token?:string) {
    const res = await fetch(`${API_BASE}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}`} : {}),
        },
        body: JSON.stringify(body),
    });
    const json = await res.json();
    if(!res.ok) throw new Error(json?.error || json?.message || "API Error");
    return json;
}

export async function apiGet(path: string, token?: string) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}`} : {}),

        },
    });
    const json = await res.json();
    if(!res.ok) throw new Error(json?.error || json?.message || "API Error");
    return json;
}