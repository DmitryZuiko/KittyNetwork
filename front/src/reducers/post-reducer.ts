interface post {
    postState: Array<any | null>
}

const INITIAL_STATE: post = {
    postState: []
}

export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "GET_ALL_POSTS":
            return {
                ...state,
                postState: action.payload.reverse()
            }
        default:
            return state
    }
}