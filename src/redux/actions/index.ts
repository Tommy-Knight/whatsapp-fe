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
