import { UserInterface } from "../../types";
import { initialState } from "../store";

const rootReducer = (
	state = initialState,
	action: { type: string; payload: UserInterface | any }
) => {
	switch (action.type) {
		case "USER":
			return { ...state, user: action.payload };

		case "ALL_USERS":
			return { ...state, allUsers: action.payload };

		case "MY_ROOMS":
			return { ...state, myRooms: action.payload };

		case "SELECTED_MEMBERS":
			const membersArray = [...state.selectedMembers];
			const combineArrays = membersArray.concat(action.payload);
			const newArray = combineArrays.filter((item, pos) => combineArrays.indexOf(item) === pos);
			console.log("🎃", membersArray, "🎪", newArray);
			return { ...state, selectedMembers: newArray };

		case "CLEAR_SELECTED_MEMBERS":
			return { ...state, selectedMembers: [] };

		default:
			return state;
	}
};

export default rootReducer;
