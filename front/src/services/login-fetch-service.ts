interface iData {
    email: string,
    password: string
}

export const login = async(data: iData): Promise<any> => {
    let response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    });
    const json = await response.json();
    return json;
}