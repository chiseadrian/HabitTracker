const baseURL = process.env.REACT_APP_API_URL;


export const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
}

export const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseURL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';  //se pone asi en caso de que el token sea null, seguir trabajando con strings

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }
}