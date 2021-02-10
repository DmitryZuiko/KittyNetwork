interface iData {
    userId: string,
    friendId: string
}

export const getAllFriends = async(id: string): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch(`http://localhost:5000/users/friends/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: null
    });
    return await response.json();
}

export const addFriend = async(data: iData): Promise<any> => {
    const token = localStorage.getItem("token");
    let response = await fetch('http://localhost:5000/users/friends', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.status !== "ok") {
        alert(result.message)
    }
}