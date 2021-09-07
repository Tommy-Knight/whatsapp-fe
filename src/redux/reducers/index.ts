import {initialState} from "../store"

const rootReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "TEST":
            return {
                ...state,
                testRandomNumber: Math.random(),
            }
        default:
            return state
    }
}

export default rootReducer