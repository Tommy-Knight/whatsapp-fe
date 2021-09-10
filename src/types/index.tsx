import { History } from "history";

export interface UserInterface {
    _id?: string;
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
	myRoomsDispatch: Function;
	user: UserInterface;
	allUsers: UserInterface[];
}