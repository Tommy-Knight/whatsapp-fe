import {UserInterface} from "../../types"
import { initialState } from "../store"

const rootReducer = (state = initialState, action: { type: string; payload: UserInterface; }) => {
  switch (action.type) {
		case "USER":
			return {
				...state,
				user: action.payload,
			};
		case "ALL_USERS":
			return {
				...state,
				allUsers: action.payload,
			};
		default:
			return state;
	}
}

export default rootReducer