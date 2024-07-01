import { env } from "../../enviroments/env.js";

export async function customFetch(method) {
    try {
        const response = await fetch(env.APIURL, {
            method: method
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function customFetchById(method, id) {
    try {
        const response = await fetch(`${env.APIURL}/${id}`, {
            method: method
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);

    }
}

export async function deleteFetch(method, id) {
    try {
        const response = await fetch(`${env.APIURL}/${id}`, {
            method: method
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = response;
        return data;
    } catch (error) {
        console.error(error);

    }
}

export async function createFetch(method, bodyData) {
    try {
        const response = await fetch(env.APIURL, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response;
        return data;
    } catch (error) {
        console.error(error);
    }
}

export async function updateFetch(method, bodyData, id) {
    try {
        const response = await fetch(`${env.APIURL}/${id}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response;
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function getCustomContact(method, id, path) {
    try {
        const response = await fetch(`${env.APIURL}/${path}/${id}`, {
            method: method
        });

        if (!response.ok) {
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return null;
    }
}

