interface iData {
    login: string,
    email: string,
    password: string
}

export const authorization = async(data: iData): Promise<any> => {
    let response = await fetch('http://localhost:5000/users/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

export const updateAvatar = async(data: {id: string, avatar: string}): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/users/avatar', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}

export const updateLogin = async(data: {id: string, login: string}): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/users/username', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}


export const getDataBaseUsers = async(): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: null
    });
    return await response.json();
}