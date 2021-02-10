interface friend {
    friendState: Array<any | null>
}

const INITIAL_STATE: friend = {
    friendState: []
}

export default function (state = INITIAL_STATE, action: any) {
    switch (action.type) {
        case "GET_ALL_FRIENDS":
            return {
                ...state,
                friendState: action.payload
            }
        default:
            return state
    }
}