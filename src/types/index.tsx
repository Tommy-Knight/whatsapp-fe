import { History } from "history";

export interface UserInterface {
	name?: string;
	surname?: string;
	email?: string;
	password?: string;
	avatar?: string;
	status?: string;
}

export interface Props {
	history: History;
	userDispatch: Function;
	allUsersDispatch: Function;
	user: UserInterface;
	allUsers: UserInterface[];
}
