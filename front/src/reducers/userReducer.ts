interface user {
    id: string,
    avatar: string,
    login: string,
    dataBaseUsers: Array<{userId: string, login: string, avatar: string}>
}

const INITIAL_STATE: user = {
    id: "",
    avatar: "",
    login: "",
    dataBaseUsers: []
}

export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                id: action.payload.id,
                avatar: action.payload.avatar,
                login: action.payload.login
            }
        case "CLEAN_USER":
            return {
                ...state,
                id: "",
                avatar: "",
                login: ""
            }
        case "UPDATE_AVATAR":
            return {
                ...state,
                avatar: action.payload
            }
        case "UPDATE_LOGIN":
            return {
                ...state,
                login: action.payload
            }
        case "GET_DATABASE_USERS":
            return {
                ...state,
                dataBaseUsers: action.payload.filter((item: any) => item.login !== state.login)
            }
        default:
            return state
    }
}