interface post {
    commentState: Array<any | null>
}

const INITIAL_STATE: post = {
    commentState: []
}

export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "GET_ALL_COMMENTS":
            return {
                ...state,
                commentState: action.payload
            }
        default:
            return state
    }
}