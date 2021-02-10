interface iData {
    login: string,
    avatar: string,
    userID: string,
    postID: string,
    text: string
}

export const getAllCommentsFromServer = async(): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/comments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: null
    });
    return await response.json();
}

export const addCommentToServer = async(data: iData): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}