interface iData {
    login: string,
    avatar: string,
    userID: string,
    text: string,
    image: string,
}

export const getAllPostFromServer = async(): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: null
    });
    return await response.json();
}

export const addPostToServer = async(data: iData): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export const updateLikes = async(data: {postId: string, userId: string}): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/posts/likes', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}