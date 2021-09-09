import { UserInterface } from "../../types";

export const userAction = (user: UserInterface) => {
	return {
		type: "USER",
		payload: user,
	};
};

export const allUsersAction = (allUsers: UserInterface[]) => {
	return {
		type: "ALL_USERS",
		payload: allUsers,
	};
};

export const myRoomsAction = (myRooms: any) => {
	return {
		type: "MY_ROOMS",
		payload: myRooms,
	};
};
export const selectedMembersAction = (selectedMembers: any) => {
	return {
		type: "SELECTED_MEMBERS",
		payload: selectedMembers,
	};
};

export const clearSelectedMembersAction = () => {
	return {
		type: "CLEAR_SELECTED_MEMBERS",
	};
};

export const selectedRoomAction = (selectedRoom: any) => {
	return {
		type: "SELECTED_ROOM",
		payload: selectedRoom,
	};
};